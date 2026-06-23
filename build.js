const fs = require('fs');
const os = require('os');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('styles.css', 'utf8');
const js = fs.readFileSync('script.js', 'utf8');

let out = html.replace('<link rel="stylesheet" href="styles.css" />', `<style>\n${css}\n</style>`);
out = out.replace('<script src="script.js"></script>', '');
out = out.replace('</body>', `<script>\n${js}\n</script>\n</body>`);

// Resolve Desktop path dynamically
let desktopPath = path.join(os.homedir(), 'Desktop');
if (!fs.existsSync(desktopPath)) {
  const onedriveDesktop = path.join(os.homedir(), 'OneDrive', 'Desktop');
  if (fs.existsSync(onedriveDesktop)) {
    desktopPath = onedriveDesktop;
  }
}

const outputPath = path.join(desktopPath, 'portafolio_juan.html');
fs.writeFileSync(outputPath, out);
console.log(`File bundled successfully at: ${outputPath}`);
