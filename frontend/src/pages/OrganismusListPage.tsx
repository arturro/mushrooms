import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Paginated, fetchOrganismusList, Organismus } from '../api'

function useQueryString(params: URLSearchParams) {
  return useMemo(() => {
    const p = new URLSearchParams()
    const page = params.get('page') || '1'
    const pageSize = params.get('page_size') || '20'
    const name = params.get('name') || ''
    const latinName = params.get('latin_name') || ''
    if (page) p.set('page', page)
    if (pageSize) p.set('page_size', pageSize)
    if (name) p.set('name', name)
    if (latinName) p.set('latin_name', latinName)
    const q = p.toString()
    return q ? `?${q}` : ''
  }, [params])
}

export default function OrganismusListPage() {
  const [sp, setSp] = useSearchParams()
  const query = useQueryString(sp)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<Organismus[]>([])
  const [count, setCount] = useState<number | undefined>()
  const [page, setPage] = useState<number>(Number(sp.get('page') || '1'))
  const [pages, setPages] = useState<number | undefined>()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    fetchOrganismusList(query)
      .then((data) => {
        if (cancelled) return
        if (Array.isArray(data)) {
          setItems(data)
          setCount(undefined)
          setPages(undefined)
        } else {
          setItems(data.items)
          setCount(data.count)
          setPages(data.pages)
          if (typeof data.page === 'number') setPage(data.page)
        }
      })
      .catch((e) => !cancelled && setError(e.message || String(e)))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [query])

  function submitFilters(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const p = new URLSearchParams(sp)
    p.set('page', '1')
    const name = String(fd.get('name') || '')
    const latinName = String(fd.get('latin_name') || '')
    if (name) p.set('name', name); else p.delete('name')
    if (latinName) p.set('latin_name', latinName); else p.delete('latin_name')
    setSp(p, { replace: true })
  }

  function changePage(delta: number) {
    const next = Math.max(1, (Number(sp.get('page') || '1') + delta))
    const p = new URLSearchParams(sp)
    p.set('page', String(next))
    setSp(p, { replace: true })
  }

  return (
    <div>
      <h1>Organismus</h1>

      <form onSubmit={submitFilters} style={{ display: 'flex', gap: 8, margin: '12px 0', flexWrap: 'wrap' }}>
        <input name="name" placeholder="Filter by name" defaultValue={sp.get('name') || ''} />
        <input name="latin_name" placeholder="Filter by latin name" defaultValue={sp.get('latin_name') || ''} />
        <button type="submit">Apply</button>
      </form>

      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {!loading && !error && (
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {items.map((o) => (
            <li key={o.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <Link to={`/organismus/${o.id}`}>{o.name}</Link>
              {o.latin_name && <span style={{ color: '#6b7280', marginLeft: 8 }}>({o.latin_name})</span>}
            </li>
          ))}
        </ul>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button onClick={() => changePage(-1)} disabled={(page || 1) <= 1}>Prev</button>
        <span>Page {page}{pages ? ` / ${pages}` : ''}{typeof count === 'number' ? ` • ${count} total` : ''}</span>
        <button onClick={() => changePage(1)} disabled={pages ? (page >= (pages || 1)) : false}>Next</button>
      </div>
    </div>
  )
}
