export default async () => {
  try {
    const { ensureBucket } = await import('#/lib/storage')
    await ensureBucket()
    console.log('[startup] MinIO bucket ready')
  } catch (e) {
    console.warn('[startup] MinIO not available:', e)
  }
}
