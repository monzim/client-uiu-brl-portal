import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

// Guards against broken image paths (wrong case, spaces vs underscores,
// backslashes) that only 404 once deployed on a case-sensitive Linux host.
const ROOT = join(__dirname, '..', '..')
const SRC = join(ROOT, 'src')
const PUBLIC = join(ROOT, 'public')
const ASSET_RE =
  /['"`]((?:\/|\\|public[\\/])[^'"`\n{}$]*?\.(?:webp|png|jpe?g|gif|svg|avif|ico))['"`]/gi

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return walk(path)
    return /\.(tsx?|css)$/.test(name) && !name.endsWith('.test.ts')
      ? [path]
      : []
  })
}

/** Case-sensitive existence check, independent of the host filesystem. */
function existsExact(publicPath: string): boolean {
  let dir = PUBLIC
  for (const segment of publicPath.split('/').filter(Boolean)) {
    if (!existsSync(dir) || !readdirSync(dir).includes(segment)) return false
    dir = join(dir, segment)
  }
  return true
}

describe('static asset references', () => {
  const refs = walk(SRC).flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(ASSET_RE)].map((m) => ({
      file: relative(ROOT, file),
      path: m[1],
    })),
  )

  it('finds references to check', () => {
    expect(refs.length).toBeGreaterThan(20)
  })

  it('uses forward slashes only', () => {
    expect(refs.filter((r) => r.path.includes('\\'))).toEqual([])
  })

  it('points every /public path at a file that exists (case-sensitive)', () => {
    const missing = refs.filter(
      (r) =>
        !r.path.startsWith('//') && !existsExact(r.path.replace(/^public/, '')),
    )
    expect(missing).toEqual([])
  })
})
