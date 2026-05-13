import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES } from "./knowledge-data";

/**
 * @param {string} slug
 */
export function getKnowledgeArticleBySlug(slug) {
  return KNOWLEDGE_ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getKnowledgeCategories() {
  return KNOWLEDGE_CATEGORIES;
}

export function getPublishedKnowledgeArticles() {
  return KNOWLEDGE_ARTICLES.filter((a) => a.published);
}

export function getFeaturedKnowledgeArticles(limit = 3) {
  return KNOWLEDGE_ARTICLES.filter((a) => a.published && a.featured).slice(0, limit);
}

/**
 * @param {string} categoryId
 */
export function getKnowledgeCategoryById(categoryId) {
  return KNOWLEDGE_CATEGORIES.find((c) => c.id === categoryId) ?? null;
}

export function knowledgeAgencyStats() {
  const published = KNOWLEDGE_ARTICLES.filter((a) => a.published);
  const drafts = KNOWLEDGE_ARTICLES.filter((a) => !a.published);
  const sorted = [...KNOWLEDGE_ARTICLES].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const latest = sorted[0];
  const categoryIds = new Set(published.map((a) => a.categoryId));
  const tagKeys = new Set(published.flatMap((a) => a.tags));

  return {
    totalPublished: published.length,
    drafts: drafts.length,
    categoriesUsed: categoryIds.size,
    tagCount: tagKeys.size,
    lastUpdatedIso: latest?.updatedAt ?? null,
  };
}

/**
 * @param {import("./knowledge-data.js").KNOWLEDGE_ARTICLES[number]} article
 * @param {number} [limit]
 */
export function getRelatedKnowledgeArticles(article, limit = 4) {
  const others = KNOWLEDGE_ARTICLES.filter((a) => a.slug !== article.slug && a.published);
  const scored = others.map((a) => {
    let score = 0;
    if (a.categoryId === article.categoryId) score += 4;
    score += article.tags.filter((t) => a.tags.includes(t)).length;
    return { a, score };
  });
  scored.sort(
    (x, y) =>
      y.score - x.score ||
      y.a.updatedAt.localeCompare(x.a.updatedAt) ||
      y.a.title.localeCompare(x.a.title, "da"),
  );
  return scored.slice(0, limit).map((x) => x.a);
}

export function knowledgeContributorCounts() {
  /** @type {Record<string, number>} */
  const map = {};
  for (const a of KNOWLEDGE_ARTICLES) {
    if (!a.published) continue;
    map[a.authorId] = (map[a.authorId] ?? 0) + 1;
  }
  return Object.entries(map)
    .map(([authorId, count]) => ({ authorId, count }))
    .sort((x, y) => y.count - x.count || x.authorId.localeCompare(y.authorId));
}
