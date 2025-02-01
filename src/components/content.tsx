import { Blockquote, Code, Heading, Kbd, Link, Separator, Strong, Text } from '@radix-ui/themes'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export const Content = ({ content }: { content: string }) => (
  <Markdown
    components={{
      a: ({ children, href }) => <Link href={href}>{children}</Link>,
      b: ({ children }) => <Strong>{children}</Strong>,
      blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
      code: ({ children }) => <Code color="gray">{children}</Code>,
      h1: ({ children }) => <Heading size="6">{children}</Heading>,
      h2: ({ children }) => <Heading size="5">{children}</Heading>,
      h3: ({ children }) => <Heading size="4">{children}</Heading>,
      h4: ({ children }) => <Heading size="3">{children}</Heading>,
      h5: ({ children }) => <Heading size="2">{children}</Heading>,
      h6: ({ children }) => <Heading size="1">{children}</Heading>,
      hr: () => <Separator my="3" size="3" />,
      kbd: ({ children }) => <Kbd>{children}</Kbd>,
      p: ({ children }) => <Text>{children}</Text>,
    }}
    remarkPlugins={[remarkGfm]}
  >
    {content}
  </Markdown>
)
