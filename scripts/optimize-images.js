const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// 画像最適化の設定
const config = {
  jpeg: { quality: 85, progressive: true },
  png: { quality: 85, compressionLevel: 9 },
  webp: { quality: 85 },
  avif: { quality: 80 },
  sizes: [
    { width: 640, suffix: '-640w' },
    { width: 750, suffix: '-750w' },
    { width: 828, suffix: '-828w' },
    { width: 1080, suffix: '-1080w' },
    { width: 1200, suffix: '-1200w' },
    { width: 1920, suffix: '-1920w' },
  ]
};

async function optimizeImage(inputPath, outputDir) {
  const ext = path.extname(inputPath).toLowerCase();
  const basename = path.basename(inputPath, ext);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // 元の画像を最適化
    if (ext === '.jpg' || ext === '.jpeg') {
      await image
        .jpeg(config.jpeg)
        .toFile(path.join(outputDir, `${basename}-optimized.jpg`));
    } else if (ext === '.png') {
      await image
        .png(config.png)
        .toFile(path.join(outputDir, `${basename}-optimized.png`));
    }
    
    // WebP版を作成
    await image
      .webp(config.webp)
      .toFile(path.join(outputDir, `${basename}.webp`));
    
    // AVIF版を作成
    await image
      .avif(config.avif)
      .toFile(path.join(outputDir, `${basename}.avif`));
    
    // レスポンシブ画像を生成
    for (const size of config.sizes) {
      if (metadata.width > size.width) {
        // WebP版
        await image
          .resize(size.width)
          .webp(config.webp)
          .toFile(path.join(outputDir, `${basename}${size.suffix}.webp`));
        
        // AVIF版
        await image
          .resize(size.width)
          .avif(config.avif)
          .toFile(path.join(outputDir, `${basename}${size.suffix}.avif`));
      }
    }
    
    console.log(`✅ 最適化完了: ${basename}`);
  } catch (error) {
    console.error(`❌ エラー: ${inputPath}`, error);
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );
    
    console.log(`🖼️  ${imageFiles.length}個の画像を処理します...`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      await optimizeImage(inputPath, outputDir);
    }
    
    console.log('\n✅ すべての画像の最適化が完了しました！');
  } catch (error) {
    console.error('❌ ディレクトリ処理エラー:', error);
  }
}

// 実行
const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images/optimized');

processDirectory(inputDir, outputDir);