import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '../../lib/format'
import { Prose } from './Prose'

/** Renders release notes / legal markdown with GFM (tables, task lists). */
export function Markdown({ content, className }: { content: string; className?: string }) {
  return (
    <Prose className={cn(className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children, ...rest }) => {
            const external = !!href && /^https?:\/\//i.test(href)
            return (
              <a href={href} {...rest} {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}>
                {children}
              </a>
            )
          },
          img: ({ src, alt }) => <img src={src} alt={alt ?? ''} loading="lazy" decoding="async" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </Prose>
  )
}