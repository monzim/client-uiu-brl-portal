export const SITE_NAME = 'UIU BME Lab'
export const SITE_DESCRIPTION =
  'Biomedical Research Laboratory (BRL) at United International University — research in gene polymorphism, antimicrobial resistance, drug discovery and smart biomaterials.'
export const DEFAULT_OG_IMAGE = '/images/lab.webp'

interface PageMetaInput {
  title: string
  description?: string | null
  image?: string | null
  type?: 'website' | 'article' | 'profile'
}

/** Standard title/description/Open Graph/Twitter tags for a route's `head()`. */
export function pageMeta({
  title,
  description,
  image,
  type = 'website',
}: PageMetaInput) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const desc = description || SITE_DESCRIPTION
  const img = image || DEFAULT_OG_IMAGE
  return [
    { title: fullTitle },
    { name: 'description', content: desc },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: desc },
    { property: 'og:image', content: img },
    { property: 'og:type', content: type },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: desc },
    { name: 'twitter:image', content: img },
  ]
}
