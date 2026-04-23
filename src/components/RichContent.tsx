import { cn } from '@/lib/utils'

interface RichContentProps {
  html: string
  className?: string
}

export function RichContent({ html, className }: RichContentProps) {
  return (
    <>
      <style>{richContentStyles}</style>
      <div
        className={cn('rich-content', className)}
        dangerouslySetInnerHTML={{ __html: html || '' }}
      />
    </>
  )
}

const richContentStyles = `
  .rich-content {
    font-family: "Plus Jakarta Sans", Inter, sans-serif;
    font-size: 1rem;
    line-height: 1.8;
    color: inherit;
    max-width: 100%;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .rich-content > * + * {
    margin-top: 1.25em;
  }

  .rich-content p {
    margin: 0 0 1.25em;
  }

  .rich-content h1,
  .rich-content h2,
  .rich-content h3,
  .rich-content h4,
  .rich-content h5,
  .rich-content h6 {
    font-weight: 700;
    line-height: 1.25;
    margin: 2em 0 0.75em;
    color: #0e1f1a;
    letter-spacing: -0.02em;
  }

  .rich-content h1 { font-size: 2em; }
  .rich-content h2 { font-size: 1.6em; }
  .rich-content h3 { font-size: 1.35em; }
  .rich-content h4 { font-size: 1.15em; }
  .rich-content h5,
  .rich-content h6 { font-size: 1em; }

  .rich-content a {
    color: #2a4d3f;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-weight: 600;
    transition: opacity 0.15s;
  }
  .rich-content a:hover { opacity: 0.7; }

  .rich-content ul,
  .rich-content ol {
    padding-left: 1.75em;
    margin: 0 0 1.25em;
  }
  .rich-content ul { list-style-type: disc; }
  .rich-content ol { list-style-type: decimal; }
  .rich-content li { margin: 0.4em 0; }
  .rich-content li > ul,
  .rich-content li > ol { margin-top: 0.4em; margin-bottom: 0; }

  .rich-content blockquote {
    border-left: 4px solid #d1d9d1;
    padding: 0.75em 1.5em;
    margin: 1.5em 0;
    font-style: italic;
    color: #4a5d57;
    background: #f8faf8;
    border-radius: 0 6px 6px 0;
  }

  .rich-content hr {
    border: none;
    border-top: 1px solid #d1d9d1;
    margin: 2em 0;
  }

  .rich-content img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    display: block;
    margin: 1.5em auto;
  }

  .rich-content figure {
    margin: 1.5em 0;
  }
  .rich-content figcaption {
    text-align: center;
    font-size: 0.85em;
    color: #4a5d57;
    margin-top: 0.5em;
  }

  /* Tables */
  .rich-content table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9em;
    margin: 1.5em 0;
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .rich-content th,
  .rich-content td {
    border: 1px solid #d1d9d1;
    padding: 0.6em 1em;
    text-align: left;
    vertical-align: top;
  }
  .rich-content th {
    background: #f2f5f2;
    font-weight: 700;
    font-size: 0.8em;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .rich-content tr:nth-child(even) td {
    background: #fafbfa;
  }

  /* Inline code */
  .rich-content code:not(pre code) {
    font-family: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
    font-size: 0.875em;
    background: #eef1ee;
    color: #2a4d3f;
    padding: 0.15em 0.45em;
    border-radius: 4px;
    border: 1px solid #d1d9d1;
  }

  /* Code blocks (codesample plugin) */
  .rich-content pre {
    background: #1a2820;
    color: #e8f0ec;
    padding: 1.25em 1.5em;
    border-radius: 10px;
    overflow-x: auto;
    font-size: 0.875em;
    line-height: 1.6;
    margin: 1.5em 0;
    -webkit-overflow-scrolling: touch;
  }
  .rich-content pre code {
    font-family: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace;
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
  }

  /* Media */
  .rich-content iframe,
  .rich-content video {
    max-width: 100%;
    border-radius: 8px;
    display: block;
    margin: 1.5em auto;
  }
`
