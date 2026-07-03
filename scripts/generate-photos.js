const fs = require('fs');
const path = require('path');

const PHOTOS_DIR = path.join(__dirname, '..', 'public', 'photos');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'lib', 'photos.generated.json');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function extractTimestamp(filename) {
  const match = filename.match(/^KakaoTalk_(\d{8})_(\d{6})/);
  return match ? `${match[1]}${match[2]}` : '';
}

function main() {
  if (!fs.existsSync(PHOTOS_DIR)) {
    fs.writeFileSync(OUTPUT_FILE, '[]\n');
    return;
  }

  const files = fs
    .readdirSync(PHOTOS_DIR)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));

  // 오래된 순 정렬 (타임스탬프 없는 파일은 맨 뒤로)
  files.sort((a, b) => {
    const ta = extractTimestamp(a);
    const tb = extractTimestamp(b);
    if (ta === tb) return a.localeCompare(b);
    if (ta === '') return 1;
    if (tb === '') return -1;
    return ta < tb ? -1 : 1;
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(files, null, 2) + '\n');
  console.log(`[generate-photos] ${files.length}장 반영 → ${path.relative(process.cwd(), OUTPUT_FILE)}`);
}

main();
