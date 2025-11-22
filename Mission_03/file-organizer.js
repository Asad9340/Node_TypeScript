const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'output', 'messy-files');
const organizerDir = path.join(__dirname, 'output', 'organized-files');

const categories = {
  images: ['.jpg', '.jpeg', '.png', '.gif'],
  documents: ['.pdf', '.docx', '.txt', '.xlsx'],
  audio: ['.mp3', '.wav', '.aac'],
  video: ['.mp4', '.avi', '.mkv'],
};

const testFiles = [
  'photo1.jpg',
  'document1.pdf',
  'song1.mp3',
  'video1.mp4',
  'notes.txt',
  'image.png',
  'report.docx',
  'movie.avi',
  'audio.wav',
];

function initializedDirectories() {
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });

    testFiles.forEach(file => {
      fs.writeFileSync(
        path.join(sourceDir, file),
        `This is a test file: ${file}`
      );
    });
  }
  console.log('Messy directories created!!!.');

  if (!fs.existsSync(organizerDir)) {
    fs.mkdirSync(organizerDir, { recursive: true });
  }

  Object.keys(categories).forEach(category => {
    const categoryPath = path.join(organizerDir, category);
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }
  });
}

function getCategory(fileName) {
  const ext = path.extname(fileName).toLowerCase();

  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }
  return 'others';
}

function organizeFiles() {
  console.log('file organizer \n');
  console.log('Source: ', sourceDir);
  console.log('Destination: ', organizerDir);
  console.log('\n' + '-'.repeat(50) + '\n');

  const files = fs.readdirSync(sourceDir);

  if (files.length === 0) {
    console.log('No files to organize.');
    return;
  }
  console.log('Files found: ', files.length);
  const stats = {
    total: 0,
    byCategory: {},
  };
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const stat = fs.statSync(sourcePath);
    if (stat.isDirectory()) {
      return;
    }
    const category = getCategory(file);
    const destPath = path.join(organizerDir, category, file);

    fs.copyFileSync(sourcePath, destPath);
    console.log(`Moved: ${file} --> ${category}/`);
    stats.total++;
    stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;
    console.log(`${file}`);
    console.log(`${category}`);
    console.log(`${stat.size}`);
  });
}

function showHelp() {
  console.log('\n' + '-'.repeat(50) + '\n');
  console.log(`
    file organizer - usage:

    commands:
    init - create files
    organize - organize files into categories

    example:
    node file-organizer.js init
    node file-organizer.js organize
    `);
}

const command = process.argv[2];
switch (command) {
  case 'init':
    initializedDirectories();
    break;
  case 'organize':
    organizeFiles();
    break;
  default:
    showHelp();
    break;
}
