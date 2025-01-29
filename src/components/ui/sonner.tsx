import { Icon } from '@iconify/react'
import { Toaster as SonnerToaster } from 'sonner'

import { useThemeAppearance } from '../../hooks/use-theme'

type ToasterProps = React.ComponentProps<typeof SonnerToaster>

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme] = useThemeAppearance()

  /** @see {@link https://sonner.emilkowal.ski/styling} */
  return (
    <SonnerToaster
      icons={{
        error: <Icon icon="heroicons:exclamation-circle" inline />,
        info: <Icon icon="heroicons:information-circle" inline />,
        success: <Icon icon="heroicons:check-circle" inline />,
        warning: <Icon icon="heroicons:exclamation-circle" inline />,
        // loading
      }}
      theme={theme}
      toastOptions={{
        classNames: {
          actionButton: 'rt-reset rt-BaseButton rt-r-size-2 rt-variant-solid rt-Button',
          cancelButton: 'rt-reset rt-BaseButton rt-r-size-2 rt-variant-soft rt-Button',
          description: 'rt-Text rt-r-size-2 rt-r-mt-2',
          title: 'rt-Text rt-r-size-2 rt-r-lt-start',
          toast: 'rt-BaseDialogContent rt-AlertDialogContent rt-Flex rt-r-ai-center rt-r-gap-2 rt-r-size-2 rt-r-max-w',
        },
        style: { overflow: 'hidden' },
        unstyled: true,
      }}
      {...props}
    />
  )
}

export { Toaster }
