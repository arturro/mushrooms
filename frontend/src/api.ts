export type Organismus = {
  id: number
  name: string
  latin_name?: string | null
  description?: string | null
  image?: string | null
}

function getApiBase(): string {
  const env = (import.meta as any).env as Record<string, string | undefined>
  const fromEnv = env?.VITE_BACKEND_URL
  if (fromEnv) return fromEnv.replace(/\/$/, '')
  const host = window.location.hostname
  const protocol = window.location.protocol
  return `${protocol}//${host}:8000`
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${getApiBase()}${path}`, {
    headers: { 'Accept': 'application/json' },
    credentials: 'omit',
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GET ${path} ${res.status}: ${text}`)
  }
  return res.json() as Promise<T>
}

// Ninja pagination can return either an array or an object with items/count/page/pages
export type Paginated<T> = T[] | { items: T[]; count: number; page?: number; pages?: number; page_size?: number; next?: string | null; previous?: string | null }

export async function fetchOrganismusList(query: string): Promise<Paginated<Organismus>> {
  return apiGet<Paginated<Organismus>>(`/api/organismus/${query}`)
}

export async function fetchOrganismusDetail(id: string | number): Promise<Organismus> {
  return apiGet<Organismus>(`/api/organismus/${id}`)
}

// Articles
export type Article = {
  id: number
  title: string
  slug: string
  description?: string | null
  content?: string | null
  image?: string | null
  author?: string | null
  created_at: string
  updated_at: string
}

export async function fetchArticleBySlug(slug: string): Promise<Article> {
  return apiGet<Article>(`/api/article/${encodeURIComponent(slug)}`)
}
