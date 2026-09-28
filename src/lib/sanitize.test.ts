import { describe, expect, it } from 'vitest'
import { sanitizeRichHtml } from './sanitize'

describe('sanitizeRichHtml', () => {
  it('returns an empty string for empty input', () => {
    expect(sanitizeRichHtml(null)).toBe('')
    expect(sanitizeRichHtml(undefined)).toBe('')
    expect(sanitizeRichHtml('')).toBe('')
  })

  it('keeps normal editor formatting', () => {
    const html =
      '<h2>Title</h2><p style="text-align: center">Hello <strong>bold</strong> <a href="https://uiu.ac.bd">link</a></p><ul><li>x</li></ul><img src="https://cdn.example.com/a.webp" alt="a">'
    const out = sanitizeRichHtml(html)
    expect(out).toContain('<h2>Title</h2>')
    expect(out).toContain('style="text-align:center"')
    expect(out).toContain('<strong>bold</strong>')
    expect(out).toContain('href="https://uiu.ac.bd"')
    expect(out).toContain(
      '<img src="https://cdn.example.com/a.webp" alt="a" />',
    )
  })

  it('strips scripts, event handlers and javascript: URLs', () => {
    const out = sanitizeRichHtml(
      '<p onclick="alert(1)">hi</p><script>alert(1)</script><a href="javascript:alert(1)">x</a><img src=x onerror="alert(1)">',
    )
    expect(out).not.toMatch(/script|onclick|onerror|javascript:/i)
    expect(out).toContain('<p>hi</p>')
  })

  it('drops dangerous inline styles', () => {
    const out = sanitizeRichHtml(
      '<p style="background-image: url(javascript:x); color: #333">t</p>',
    )
    expect(out).toBe('<p style="color:#333">t</p>')
  })

  it('allows iframes only from known embed hosts', () => {
    expect(
      sanitizeRichHtml(
        '<iframe src="https://www.youtube.com/embed/abc"></iframe>',
      ),
    ).toContain('youtube.com/embed/abc')
    expect(
      sanitizeRichHtml('<iframe src="https://evil.example.com/x"></iframe>'),
    ).not.toContain('evil.example.com')
  })

  it('adds rel=noopener to target=_blank links', () => {
    expect(
      sanitizeRichHtml('<a href="https://x.dev" target="_blank">x</a>'),
    ).toContain('rel="noopener noreferrer"')
  })
})
