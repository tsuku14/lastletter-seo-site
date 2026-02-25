// mdxファイルのdescriptionフィールドを修正するスクリプト
// 問題: 先頭に改行があるmdxファイルはgray-matterがfrontmatterを解析できない
// 解決策: trimStart()してから解析し、descriptionを本文から抽出して追加

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dir = path.join(__dirname, '..', 'articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
let fixed = 0;
let skipped = 0;

files.forEach(f => {
  const filepath = path.join(dir, f);
  const rawFile = fs.readFileSync(filepath, 'utf-8');

  // trimStartして先頭改行問題を解決
  const raw = rawFile.trimStart();
  const parsed = matter(raw);
  const data = parsed.data;
  const content = parsed.content;

  if (!data.description || data.description.length < 30) {
    // 本文の最初の実質的な段落を抽出
    const lines = content.split('\n');
    let desc = '';
    for (const line of lines) {
      const trimmed = line.trim();
      // 見出し・空行・リスト・フロントマター区切りをスキップ
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('-') ||
          trimmed.startsWith('*') || trimmed === '---' || trimmed.startsWith('import ') ||
          trimmed.startsWith('export ')) continue;

      if (trimmed.length > 30) {
        desc = trimmed
          .replace(/#{1,6}\s+[^\n]*/g, '')
          .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/`[^`]+`/g, '')
          .replace(/[|>]/g, '')
          .trim()
          .substring(0, 120);
        if (desc.length > 30) break;
      }
    }

    if (desc.length > 30) {
      data.description = desc;

      // frontmatterを更新してファイルを書き直す
      // ただし、元のmdxは先頭改行あり - それを維持しない（trimStartした状態で書く）
      const newContent = matter.stringify(content, data);
      fs.writeFileSync(filepath, newContent, 'utf-8');
      fixed++;
      if (fixed <= 5) {
        console.log('Fixed:', f);
        console.log('  desc:', desc.substring(0, 80));
      }
    } else {
      console.log('Could not extract desc:', f, '- content starts:', content.substring(0, 80));
      skipped++;
    }
  }
});
console.log('\nTotal fixed:', fixed, '/ skipped:', skipped, '/ total:', files.length);
