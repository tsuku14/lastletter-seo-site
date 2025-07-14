// カテゴリ名とスラッグのマッピング
export const categorySlugMap = {
  '相続税': 'inheritance-tax',
  '相続手続き': 'inheritance-procedures',
  '信託制度': 'trust-system',
  '法的制度': 'legal-system',
  '生前準備': 'lifetime-preparation',
  '遺言書': 'will',
  'エンディングノート': 'ending-note',
  'デジタル終活': 'digital-ending',
  '保険・税務': 'insurance-tax',
  '訃報・連絡': 'obituary-notice',
  '葬儀・お墓': 'funeral-grave',
  '介護・福祉': 'care-welfare',
  'その他': 'others'
};

// 逆引き用のマップ
export const slugToCategoryMap = Object.fromEntries(
  Object.entries(categorySlugMap).map(([key, value]) => [value, key])
);

// カテゴリ名からスラッグを取得
export function getCategorySlug(categoryName) {
  if (!categoryName) return 'uncategorized';
  return categorySlugMap[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
}

// スラッグからカテゴリ名を取得
export function getCategoryName(slug) {
  return slugToCategoryMap[slug] || slug;
}