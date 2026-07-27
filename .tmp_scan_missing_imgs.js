const fs = require('fs');
const path = require('path');

const ROOT = 'E:/learn.github.io';
const STATIC = path.join(ROOT, 'static');
const SKIP_DIRS = new Set(['node_modules', '.git', '.docusaurus', 'build', '.idea', '.github']);

function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      walk(full, exts, out);
    } else if (exts.some(ext => e.name.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(ROOT, ['.md', '.mdx']);

// ![alt](url) 或 ![alt](url "title") ；<img src="url">
const mdImgRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const htmlImgRe = /<img[^>]*\ssrc=["']([^"']+)["']/g;

const report = []; // {file, line, raw, resolved, exists}
let totalRefs = 0;
let missingCount = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split(/\r?\n/);

  const collect = (re, extractor) => {
    let m;
    while ((m = re.exec(content)) !== null) {
      const url = extractor(m);
      // 计算行号
      const idx = content.indexOf(m[0], m.index); // 安全
      const lineNo = content.slice(0, m.index).split(/\r?\n/).length;
      handleRef(f, lineNo, url);
    }
  };

  const handleRef = (file, lineNo, rawUrl) => {
    totalRefs++;
    const url = rawUrl.trim();
    // 跳过外链 / 锚点 / data uri / 邮件
    if (/^(https?:|mailto:|tel:|data:|#)/i.test(url)) return;

    // 去掉 query/hash
    const clean = url.split(/[?#]/)[0];

    let candidates = [];
    if (clean.startsWith('/')) {
      // 绝对路径 -> 相对于 static
      candidates.push(path.join(STATIC, clean.slice(1)));
    } else {
      // 相对路径：相对于 md 文件
      candidates.push(path.join(path.dirname(file), clean));
      // Docusaurus 里 static 下的资源也常以 img/... 直接引用
      candidates.push(path.join(STATIC, clean));
    }

    const exists = candidates.some(p => {
      try { return fs.existsSync(p) && fs.statSync(p).isFile(); } catch { return false; }
    });

    if (!exists) {
      missingCount++;
      report.push({ file: path.relative(ROOT, file).replace(/\\/g, '/'), line: lineNo, url: clean });
    }
  };

  collect(mdImgRe, m => m[1]);
  collect(htmlImgRe, m => m[1]);
}

console.log('扫描文件数:', files.length);
console.log('本地图片引用总数:', totalRefs);
console.log('缺失图片引用数:', missingCount);
console.log('----');
// 按文件分组输出
const byFile = {};
for (const r of report) {
  (byFile[r.file] = byFile[r.file] || []).push(r);
}
for (const f of Object.keys(byFile).sort()) {
  console.log(`\n## ${f}  (${byFile[f].length})`);
  for (const r of byFile[f]) {
    console.log(`  L${r.line}: ${r.url}`);
  }
}
