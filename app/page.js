import fs from 'fs'
import path from 'path'
import Link from 'next/link'

function getArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  
  try {
    const filenames = fs.readdirSync(articlesDirectory)
    const articles = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(articlesDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const title = fileContents.split('\n')[0].replace('# ', '') || filename.replace('.md', '')
        
        // 記事のカテゴリを推定
        let category = '一般'
        if (title.includes('終活')) category = '終活'
        else if (title.includes('相続') || title.includes('遺産')) category = '相続'
        else if (title.includes('エンディング') || title.includes('ノート')) category = 'エンディングノート'
        else if (title.includes('遺言')) category = '遺言書'
        else if (title.includes('保険') || title.includes('税金')) category = '税務・保険'
        
        return {
          slug: filename.replace('.md', ''),
          title: title,
          filename: filename,
          category: category
        }
      })
      .sort((a, b) => b.filename.localeCompare(a.filename))
    
    return articles
  } catch (error) {
    return []
  }
}

export default function HomePage() {
  const articles = getArticles()
  const categories = [...new Set(articles.map(a => a.category))]

  return (
    <div>
      {/* ヒーローセクション */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '4rem 2rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1.5rem',
            color: '#1e3a8a',
            fontWeight: '700',
            lineHeight: '1.2'
          }}>
            終活・相続の総合情報センター
          </h1>
          
          <p style={{ 
            fontSize: '1.3rem', 
            marginBottom: '2rem', 
            lineHeight: '1.7',
            color: '#475569',
            maxWidth: '800px',
            margin: '0 auto 2rem auto'
          }}>
            人生の重要な準備について、専門家による信頼できる情報を分かりやすくお届けします。<br/>
            大切な人のために、今できることから始めませんか。
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
            marginTop: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📚</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e3a8a' }}>{articles.length}+</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>専門記事</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔄</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e3a8a' }}>毎日</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>新規更新</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1e3a8a' }}>信頼性</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem' }}>専門家監修</div>
            </div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }}>
        {/* カテゴリフィルター */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            marginBottom: '2rem',
            color: '#1e3a8a',
            fontWeight: '600'
          }}>
            📖 最新記事一覧
          </h2>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {categories.map(category => (
              <span key={category} style={{
                background: '#e0e7ff',
                color: '#3730a3',
                padding: '0.5rem 1rem',
                borderRadius: '25px',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* 記事グリッド */}
        {articles.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>記事を準備中です...</p>
          </div>
        ) : (
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {articles.map((article, index) => (
              <Link 
                key={article.slug}
                href={`/articles/${article.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <article style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '2rem',
                  height: 'auto',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(30, 58, 138, 0.15)'
                  e.currentTarget.style.borderColor = '#3730a3'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'
                  e.currentTarget.style.borderColor = '#e2e8f0'
                }}
                >
                  {/* カテゴリバッジ */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: '#1e3a8a',
                    color: 'white',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    fontWeight: '500'
                  }}>
                    {article.category}
                  </div>

                  <h3 style={{ 
                    margin: '0 0 1rem 0', 
                    fontSize: '1.3rem',
                    color: '#1e3a8a',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    paddingRight: '5rem'
                  }}>
                    {article.title}
                  </h3>
                  
                  <div style={{ 
                    color: '#64748b', 
                    fontSize: '0.9rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>📄</span>
                    <span>{article.filename}</span>
                  </div>
                  
                  <div style={{ 
                    color: '#3730a3',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span>続きを読む</span>
                    <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* CTA セクション */}
        <section style={{
          marginTop: '5rem',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
          color: 'white',
          padding: '3rem 2rem',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            📧 重要な情報を見逃さないために
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '2rem',
            opacity: '0.9',
            lineHeight: '1.6'
          }}>
            終活・相続に関する最新情報や重要な法改正について、<br/>
            専門家による信頼できる情報をお届けします。
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            opacity: '0.8'
          }}>
            ※ このサイトは毎日自動更新されます
          </div>
        </section>
      </section>
    </div>
  )
}
