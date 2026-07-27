const fs = require('fs');
const path = require('path');

const ROOT = 'E:/learn.github.io';
const STATIC = path.join(ROOT, 'static');
const COS = path.join(STATIC, 'img', 'cos');

// cos 目录下所有文件名集合
const cosFiles = new Set();
for (const e of fs.readdirSync(COS)) {
  cosFiles.add(e);
}

function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (['node_modules', '.git', '.docusaurus', 'build', '.idea', '.github'].includes(e.name)) continue;
      walk(full, exts, out);
    } else if (exts.some(ext => e.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(ROOT, ['.md', '.mdx']);
const mdImgRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const htmlImgRe = /<img[^>]*\ssrc=["']([^"']+)["']/g;

// 对每个引用,模拟修复:去掉 /learn/ 和 /learn/3481/ 中间层,再去掉 !xxx 后缀
// 然后看 basename 能否在 cosFiles 找到
const matchable = [];
const trulyMissing = [];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const handle = (rawUrl) => {
    const url = rawUrl.trim();
    if (/^(https?:|mailto:|tel:|data:|#)/i.test(url)) return;
    const clean = url.split(/[?#]/)[0];
    if (!clean.includes('/img/cos/learn/')) return; // 只关注这类
    // 去掉中间层: /img/cos/learn/3481/x 或 /img/cos/learn/x => /img/cos/x
    const fixed = clean.replace('/img/cos/learn/3481/', '/img/cos/').replace('/img/cos/learn/', '/img/cos/');
    // 去掉图床处理后缀 !large 等
    const noSuffix = fixed.replace(/!\w+$/, '');
    const base = path.basename(noSuffix);
    const exists = cosFiles.has(base);
    const rec = { file: path.relative(ROOT, f).replace(/\\/g, '/'), orig: clean, fixed, base, exists };
    if (exists) matchable.push(rec);
    else trulyMissing.push(rec);
  };
  let m;
  while ((m = mdImgRe.exec(content)) !== null) handle(m[1]);
  while ((m = htmlImgRe.exec(content)) !== null) handle(m[1]);
}

console.log('可修复(去掉 learn 层后命中 cos 文件):', matchable.length);
console.log('真正缺失(改路径后仍找不到):', trulyMissing.length);
console.log('----');
console.log('\n## 真正缺失明细:');
for (const r of trulyMissing) {
  console.log(`  ${r.file}\n    原始: ${r.orig}\n    期望文件: static/img/cos/${r.base}`);
}
console.log('\n## 可修复按文件统计:');
const byFile = {};
for (const r of matchable) (byFile[r.file] = byFile[r.file] || []).push(r);
for (const f of Object.keys(byFile).sort()) console.log(`  ${f}: ${byFile[f].length} 处`);
