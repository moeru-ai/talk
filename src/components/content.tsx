import { Blockquote, Code, Kbd, Link, Separator, Strong, Text } from '@radix-ui/themes'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Content = ({ content }: { content: string }) => (
  <Markdown
    components={{
      a: ({ children, href }) => <Link href={href}>{children}</Link>,
      b: ({ children }) => <Strong>{children}</Strong>,
      blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
      code: ({ children }) => <Code color="gray">{children}</Code>,
      hr: () => <Separator />,
      kbd: ({ children }) => <Kbd>{children}</Kbd>,
      p: ({ children }) => <Text>{children}</Text>,
    }}
    remarkPlugins={[remarkGfm]}
  >
    {content}
  </Markdown>
)
