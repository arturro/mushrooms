import { useEffect, useState } from 'react'
import { fetchArticleBySlug, Article } from '../api'

export default function AboutPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchArticleBySlug('about')
      .then((data) => !cancelled && setArticle(data))
      .catch((e) => !cancelled && setError(e.message || String(e)))
      .finally(() => !cancelled && setLoading(false))
    return () => { cancelled = true }
  }, [])

  if (loading) return <div>Loading…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!article) return (
    <div>
      <h1>About</h1>
      <p>Content not found. Create an Article with slug "about" in the Django admin.</p>
    </div>
  )

  const imageUrl = article.image ? (article.image.startsWith('http') ? article.image : `${window.location.protocol}//${window.location.hostname}:8000${article.image}`) : null

  return (
    <div>
      <h1>{article.title}</h1>
      {article.author && <p style={{ color: '#6b7280' }}>By {article.author}</p>}
      {imageUrl && (
        <p><img src={imageUrl} alt={article.title} style={{ maxWidth: '100%', height: 'auto' }} /></p>
      )}
      {article.description && <p style={{ fontWeight: 500 }}>{article.description}</p>}
      {article.content && (
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{article.content}</div>
      )}
    </div>
  )}
