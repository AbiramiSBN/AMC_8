import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const assetsDir = path.join(process.cwd(), "assets");

  let pdfLinks = "<li>No PDFs found</li>";
  try {
    const pdfs = fs.readdirSync(assetsDir)
      .filter(f => f.toLowerCase().endsWith(".pdf"))
      .sort();

    if (pdfs.length) {
      pdfLinks = pdfs
        .map(f => `
          <li>
            📘 <a href="/assets/${f}" target="_blank">${f}</a>
          </li>
        `)
        .join("");
    }
  } catch {}

  res.setHeader("Content-Type", "text/html");
  res.end(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>AMC 8 – Memory Cheats & Resources</title>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
body{margin:0;font-family:system-ui;background:#0b1020;color:#eaf0ff}
h1,h2{margin:.6em 0}
section{padding:22px;border-bottom:1px solid #1f2937}
.card{background:#111a33;padding:18px;border-radius:14px;margin-bottom:16px}
table{width:100%;border-collapse:collapse;margin-top:10px}
th,td{border:1px solid #334155;padding:6px;text-align:center}
th{background:#0f172a}
a{color:#7aa6ff;text-decoration:none}
ul{padding-left:20px}
small{opacity:.6}
</style>
</head>

<body>

<section>
<h1>AMC 8 – Complete Memory Cheats</h1>
<small>Single-file • Vercel-ready • PDFs auto-detected</small>
</section>

<!-- GOOD RESOURCES -->
<section class="card">
<h2>📚 Good Resources (PDFs)</h2>
<p>Drop any PDFs into <code>/assets</code>. They appear here automatically.</p>
<ul>
${pdfLinks}
</ul>
</section>

<!-- PAGE 1 -->
<section class="card">
<h2>📘 Page 1 – Core Values</h2>

<b>Squares (11²–25²)</b>
<table>
<tr><th>n²</th><th>Value</th></tr>
${[
[11,121],[12,144],[13,169],[14,196],[15,225],
[16,256],[17,289],[18,324],[19,361],[20,400],
[21,441],[22,484],[23,529],[24,576],[25,625]
].map(x=>`<tr><td>${x[0]}²</td><td>${x[1]}</td></tr>`).join("")}
</table>

<p><b>Cubes:</b> 2³=8, 3³=27, 4³=64, 5³=125, 6³=216, 7³=343</p>
<p><b>Powers of 2:</b> 16 → 32 → 64 → 128 → 256 → 512 → 1024</p>
<p><b>Factorials:</b> 3!=6, 4!=24, 5!=120, 6!=720</p>
<p><b>Pythagorean Triples:</b> (3,4,5), (6,8,10), (9,12,15), (12,16,20), (5,12,13), (8,15,17), (7,24,25)</p>
</section>

<!-- PAGE 2 -->
<section class="card">
<h2>📗 Page 2 – Roots, Fractions, Primes</h2>

<p><b>Square Roots:</b> √121–√625 → 11–25</p>

<b>Fractions → Decimals</b>
<table>
<tr><th>Fraction</th><th>Decimal</th></tr>
<tr><td>1/8</td><td>0.125</td></tr>
<tr><td>3/8</td><td>0.375</td></tr>
<tr><td>5/8</td><td>0.625</td></tr>
<tr><td>7/8</td><td>0.875</td></tr>
<tr><td>1/5</td><td>0.2</td></tr>
<tr><td>2/5</td><td>0.4</td></tr>
<tr><td>3/5</td><td>0.6</td></tr>
<tr><td>4/5</td><td>0.8</td></tr>
</table>

<p><b>Repeating Decimals:</b> 1/9=0.111…, 2/9=0.222…, 4/9=0.444…</p>
<p><b>Primes ≤100:</b> 2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97</p>
</section>

<!-- PAGE 3 -->
<section class="card">
<h2>📙 Page 3 – Combinations</h2>

<table>
<tr><th>nCr</th><th>Value</th></tr>
<tr><td>5C2</td><td>10</td></tr>
<tr><td>5C3</td><td>10</td></tr>
<tr><td>6C2</td><td>15</td></tr>
<tr><td>6C3</td><td>20</td></tr>
<tr><td>4C1 = 4C3</td><td>4</td></tr>
<tr><td>3C1 = 3C2</td><td>3</td></tr>
</table>

<p><b>Rules:</b> nCr = nC(n−r), order does NOT matter</p>
</section>

<section>
<small>Tip: Add AoPS, mock tests, or strategy PDFs — no code changes needed.</small>
</section>

</body>
</html>`);
}
