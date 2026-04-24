import '#/lib/env'
import { Client as MinioClient } from 'minio'
import { randomBytes } from 'crypto'

const globalForMinio = globalThis as unknown as { minio?: MinioClient }

export const minio =
  globalForMinio.minio ??
  new MinioClient({
    endPoint: process.env.MINIO_ENDPOINT!,
    port: parseInt(process.env.MINIO_PORT ?? '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY!,
    secretKey: process.env.MINIO_SECRET_KEY!,
  })

globalForMinio.minio = minio

const BUCKET = () => process.env.MINIO_BUCKET ?? 'brl-media'

export async function ensureBucket() {
  const bucket = BUCKET()
  const exists = await minio.bucketExists(bucket)
  if (!exists) {
    await minio.makeBucket(bucket)
    const policy = JSON.stringify({
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: { AWS: ['*'] },
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucket}/*`],
        },
      ],
    })
    await minio.setBucketPolicy(bucket, policy)
  }
}

export async function uploadFile(
  buffer: Buffer,
  fileName: string,
  contentType: string,
): Promise<string> {
  const bucket = BUCKET()
  const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
  const key = `${randomBytes(16).toString('hex')}-${sanitized}`
  await minio.putObject(bucket, key, buffer, buffer.length, {
    'Content-Type': contentType,
  })
  return `${process.env.MINIO_PUBLIC_URL}/${key}`
}

export async function deleteFile(url: string) {
  const base = process.env.MINIO_PUBLIC_URL ?? ''
  const key = url.replace(`${base}/`, '')
  if (!key || key === url) return
  await minio.removeObject(BUCKET(), key)
}
