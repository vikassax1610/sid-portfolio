const fs = require('fs');
const path = require('path');

const walk = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory()
      ? walk(path.join(dir, file), filelist)
      : filelist.concat(path.join(dir, file));
  });
  return filelist;
};

const components = walk('./src/components').filter(f => f.endsWith('.jsx'));
const cssFile = './src/app/globals.css';

components.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace specific Hex Colors from prompt with Primary
  content = content.replace(/#7c3aed|#8b5cf6|#a855f7|#9333ea|#c084fc|#ec4899|#f472b6|#d946ef|#e879f9/gi, '#1769FF');

  // Convert Gradients to Solid Primary (for buttons mostly, user requested background: #1769FF, hover: #0057FF)
  content = content.replace(/bg-gradient-to-[a-z]+ from-violet-\d+(?: via-purple-\d+)? to-pink-\d+/g, 'bg-primary hover:bg-primary-hover transition-colors');
  content = content.replace(/bg-gradient-to-[a-z]+ from-violet-\d+ to-purple-\d+/g, 'bg-primary hover:bg-primary-hover transition-colors');
  content = content.replace(/bg-gradient-to-[a-z]+ from-blue-\d+(?: via-blue-\d+)? to-blue-\d+/g, 'bg-primary hover:bg-primary-hover transition-colors');
  content = content.replace(/bg-gradient-to-[a-z]+ from-violet-600 to-pink-500/g, 'bg-primary');

  // Custom tailwind token replacements
  content = content.replace(/text-violet-\d+(?:\/\d+)?/g, 'text-primary');
  content = content.replace(/text-purple-\d+(?:\/\d+)?/g, 'text-primary');
  content = content.replace(/text-pink-\d+(?:\/\d+)?/g, 'text-primary');
  content = content.replace(/text-blue-\d+(?:\/\d+)?/g, 'text-primary');

  content = content.replace(/bg-violet-100(?:\/\d+)?/g, 'bg-primary-soft');
  content = content.replace(/bg-violet-50(?:\/\d+)?/g, 'bg-primary-soft');
  content = content.replace(/bg-blue-100(?:\/\d+)?/g, 'bg-primary-soft');
  content = content.replace(/bg-blue-50(?:\/\d+)?/g, 'bg-primary-soft');

  content = content.replace(/border-violet-\d+(?:\/\d+)?/g, 'border-border-subtle');
  content = content.replace(/border-blue-\d+(?:\/\d+)?/g, 'border-border-subtle');

  // Shadows
  content = content.replace(/shadow-violet-\d+(?:\/\d+)?/g, 'shadow-custom');
  content = content.replace(/shadow-blue-\d+(?:\/\d+)?/g, 'shadow-custom');
  content = content.replace(/hover:shadow-violet-\d+(?:\/\d+)?/g, 'hover:shadow-custom-hover');
  content = content.replace(/hover:shadow-blue-\d+(?:\/\d+)?/g, 'hover:shadow-custom-hover');

  // RGBA inline string replacement
  // Replace purple / pink rgb values
  content = content.replace(/rgba\(\s*124\s*,\s*58\s*,\s*237/g, 'rgba(23, 105, 255');
  content = content.replace(/rgba\(\s*236\s*,\s*72\s*,\s*153/g, 'rgba(255, 180, 0');
  content = content.replace(/rgba\(\s*99\s*,\s*102\s*,\s*241/g, 'rgba(23, 105, 255');

  // Replace generic text slate colors to primary/secondary text tokens
  content = content.replace(/text-slate-900/g, 'text-text-main');
  content = content.replace(/text-slate-800/g, 'text-text-main');
  content = content.replace(/text-gray-900/g, 'text-text-main');
  content = content.replace(/text-gray-800/g, 'text-text-main');
  
  content = content.replace(/text-gray-500/g, 'text-text-sec');
  content = content.replace(/text-gray-600/g, 'text-text-sec');
  content = content.replace(/text-gray-400/g, 'text-text-sec');
  content = content.replace(/text-slate-600/g, 'text-text-sec');
  content = content.replace(/text-slate-700/g, 'text-text-sec');

  // Glass UI replacements
  content = content.replace(/bg-white\/(?:60|65|70|80|90|50)/g, 'bg-glass');
  content = content.replace(/border-white\/(?:80|85|90)/g, 'border-glass-border');
  
  // Custom Shadows global replace
  content = content.replace(/hover:shadow-2xl/g, 'hover:shadow-custom-hover');
  content = content.replace(/hover:shadow-xl/g, 'hover:shadow-custom-hover');
  content = content.replace(/shadow-xl/g, 'shadow-custom');
  content = content.replace(/shadow-lg/g, 'shadow-custom');
  content = content.replace(/shadow-md/g, 'shadow-custom');

  fs.writeFileSync(file, content);
});

// Update globals.css
let cssContent = fs.readFileSync(cssFile, 'utf8');

cssContent = cssContent.replace(/--color-violet-primary:\s*#7c3aed;/g, '--color-primary: #1769FF;');
cssContent = cssContent.replace(/--color-violet-soft:\s*#ede9fe;/g, 
  `--color-primary-hover: #0057FF;
  --color-primary-light: #60A5FA;
  --color-primary-soft: #DBEAFE;
  --color-accent: #FFB400;
  --color-accent-light: #FDE68A;
  --color-bg-main: #FAFAF9;
  --color-bg-sec: #F5F5F4;
  --color-surface: #FFFFFF;
  --color-text-main: #191919;
  --color-text-sec: #6B7280;
  --color-border-subtle: #E5E7EB;
  --color-glass: rgba(255,255,255,0.65);
  --color-glass-border: rgba(255,255,255,0.45);
  --shadow-custom: 0 4px 24px rgba(0,0,0,0.05);
  --shadow-custom-hover: 0 10px 40px rgba(0,0,0,0.08);`
);
cssContent = cssContent.replace(/--color-navy:\s*#1e1b4b;/g, '');
cssContent = cssContent.replace(/--color-navy-mid:\s*#312e81;/g, '');

cssContent = cssContent.replace(/background:\s*linear-gradient\(135deg,\s*#fdfcff\s*0%,\s*#f5f2ff\s*45%,\s*#ede9ff\s*100%\);/g, 'background: var(--color-bg-main);');
cssContent = cssContent.replace(/color:\s*#1e1b4b;/g, 'color: var(--color-text-main);');

cssContent = cssContent.replace(/background:\s*linear-gradient\(135deg,\s*#4f46e5,\s*#7c3aed,\s*#ec4899\);/g, 'background: linear-gradient(135deg, #1769FF, #3B82F6);');
cssContent = cssContent.replace(/background:\s*linear-gradient\(135deg,\s*#d97706,\s*#f59e0b\);/g, 'background: linear-gradient(135deg, #FFB400, #F59E0B);');

cssContent = cssContent.replace(/background:\s*rgba\(124,\s*58,\s*237,\s*0\.08\);/g, 'background: rgba(23, 105, 255, 0.08);');
cssContent = cssContent.replace(/border:\s*1px\s*solid\s*rgba\(124,\s*58,\s*237,\s*0\.2\);/g, 'border: 1px solid rgba(23, 105, 255, 0.2);');
cssContent = cssContent.replace(/color:\s*#7c3aed;/g, 'color: var(--color-primary);');

fs.writeFileSync(cssFile, cssContent);

console.log("Colors successfully replaced globally.");
