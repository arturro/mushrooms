import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Organismus, fetchOrganismusDetail } from '../api'

export default function OrganismusDetailPage() {
  const { id = '' } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [item, setItem] = useState<Organismus | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchOrganismusDetail(id)
      .then((data) => !cancelled && setItem(data))
      .catch((e) => !cancelled && setError(e.message || String(e)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) return <div>Loading…</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!item) return <div>Not found</div>

  const imageUrl = item.image ? (item.image.startsWith('http') ? item.image : `${window.location.protocol}//${window.location.hostname}:8000${item.image}`) : null

  return (
    <div>
      <p><Link to="/organismus">← Back to list</Link></p>
      <h1>{item.name}</h1>
      {item.latin_name && <p style={{ color: '#6b7280' }}><em>{item.latin_name}</em></p>}
      {imageUrl && (
        <p><img src={imageUrl} alt={item.name} style={{ maxWidth: '100%', height: 'auto' }} /></p>
      )}
      {item.description && <p>{item.description}</p>}
    </div>
  )
}
