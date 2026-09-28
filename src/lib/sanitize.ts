import sanitizeHtml from 'sanitize-html'

// Server-only: sanitizes CMS rich text (TinyMCE output) before it reaches the
// client. Pure JS (no jsdom), so it works inside the Nitro SSR bundle.

const EMBED_HOSTS = [
  'www.youtube.com',
  'youtube.com',
  'www.youtube-nocookie.com',
  'player.vimeo.com',
  'www.google.com',
  'docs.google.com',
  'drive.google.com',
]

const SAFE_STYLE = {
  'text-align': [/^(left|right|center|justify)$/],
  color: [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i],
  'background-color': [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i],
  'font-weight': [/^(normal|bold|[1-9]00)$/],
  'font-style': [/^(normal|italic)$/],
  'text-decoration': [/^(none|underline|line-through)$/],
  width: [/^\d+(\.\d+)?(px|%|em|rem)?$/],
  height: [/^\d+(\.\d+)?(px|%|em|rem)?$/],
  'padding-left': [/^\d+(\.\d+)?(px|em|rem)$/],
}

const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    'img',
    'iframe',
    'figure',
    'figcaption',
    'span',
    'u',
    's',
    'sub',
    'sup',
  ],
  allowedAttributes: {
    '*': ['class', 'style', 'id'],
    a: ['href', 'name', 'target', 'rel', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
    iframe: [
      'src',
      'width',
      'height',
      'allow',
      'allowfullscreen',
      'frameborder',
      'title',
    ],
    td: ['colspan', 'rowspan'],
    th: ['colspan', 'rowspan', 'scope'],
    ol: ['start', 'type'],
  },
  allowedStyles: { '*': SAFE_STYLE },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: ['http', 'https', 'data'] },
  allowedIframeHostnames: EMBED_HOSTS,
  allowProtocolRelative: false,
  transformTags: {
    a: (tagName, attribs) => ({
      tagName,
      attribs:
        attribs.target === '_blank'
          ? { ...attribs, rel: 'noopener noreferrer' }
          : attribs,
    }),
  },
}

export function sanitizeRichHtml(html: string | null | undefined): string {
  return html ? sanitizeHtml(html, OPTIONS) : ''
}
