import Link from 'next/link';

const InternalLinks = ({ currentCategory, currentSlug }) => {
  // カテゴリー別の関連リンク
  const linksByCategory = {
    '生前準備': [
      { href: '/articles/2025-01-14-shukatu-toha', text: '終活とは？いつから始める？' },
      { href: '/articles/2025-01-18-seizen-seiri', text: '生前整理はいつから？' },
      { href: '/articles/2025-01-22-30dai-40dai-shukatu', text: '30代・40代の終活' },
    ],
    '相続税': [
      { href: '/articles/2025-01-15-souzokuzei-kakaranai', text: '相続税がかからない財産一覧' },
      { href: '/articles/2025-06-26-相続税-計算方法-基礎控除', text: '相続税の計算方法' },
    ],
    '相続手続き': [
      { href: '/articles/2025-01-16-souzoku-tetsuzuki-kigen', text: '相続手続きの期限一覧表' },
      { href: '/articles/2025-06-29-相続手続き-必要書類-期限', text: '相続手続きに必要な書類' },
    ],
    '葬儀・お墓': [
      { href: '/articles/2025-01-17-kazokuso-hiyou', text: '家族葬の費用相場' },
      { href: '/articles/2025-06-28-家族葬-費用-相場', text: '家族葬とは？メリット・デメリット' },
    ],
    'エンディングノート': [
      { href: '/articles/2025-01-19-shukatu-note-kakikata', text: '終活ノートの書き方完全ガイド' },
      { href: '/articles/2025-07-01-エンディングノートの書き方', text: 'エンディングノートの活用法' },
    ],
    '遺言書': [
      { href: '/articles/2025-01-20-igonsho-kakikata', text: '公正証書遺言の作成費用' },
      { href: '/articles/2025-06-27-遺言書-自筆証書遺言-書き方', text: '自筆証書遺言の書き方' },
    ],
  };

  // 現在のカテゴリーに基づいて関連リンクを取得
  const relevantLinks = linksByCategory[currentCategory] || [];
  
  // 現在の記事を除外
  const filteredLinks = relevantLinks.filter(link => !link.href.includes(currentSlug));

  if (filteredLinks.length === 0) return null;

  return (
    <div className="internal-links">
      <h3>関連記事</h3>
      <ul>
        {filteredLinks.map((link, index) => (
          <li key={index}>
            <Link href={link.href}>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InternalLinks;