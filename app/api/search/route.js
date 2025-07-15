import { NextResponse } from 'next/server';
import { getAllArticles } from '../../../lib/articles';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }
  
  const articles = getAllArticles();
  const lowerQuery = query.toLowerCase();
  
  // 検索アルゴリズム
  const results = articles
    .map(article => {
      let score = 0;
      const fm = article.frontmatter;
      
      // タイトルでの一致
      if (fm.title.toLowerCase().includes(lowerQuery)) {
        score += 10;
        if (fm.title.toLowerCase().startsWith(lowerQuery)) {
          score += 5;
        }
      }
      
      // キーワードでの一致
      if (fm.keywords && Array.isArray(fm.keywords)) {
        fm.keywords.forEach(keyword => {
          if (keyword.toLowerCase().includes(lowerQuery)) {
            score += 5;
          }
        });
      }
      
      // 説明文での一致
      if (fm.description && fm.description.toLowerCase().includes(lowerQuery)) {
        score += 3;
      }
      
      // カテゴリーでの一致
      if (fm.category && fm.category.toLowerCase().includes(lowerQuery)) {
        score += 2;
      }
      
      return {
        ...article,
        score
      };
    })
    .filter(article => article.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ score, ...article }) => article);
  
  return NextResponse.json({ results });
}