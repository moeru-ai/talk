import type { ComponentProps } from 'react'

import { TextField } from '@radix-ui/themes'
import { useCallback, useState } from 'react'

export type DebouncedTextFieldProps = ComponentProps<typeof TextField.Root> & { onValueChange?: (s: string) => void }
export const DebouncedTextField = ({ onBlur, onChange, onValueChange, ref, ...props }: DebouncedTextFieldProps) => {
  const [indeterminate, setIndeterminate] = useState<string | undefined>(undefined)
  const [prevValue, setPrevValue] = useState(props.value)
  if (prevValue !== props.value) {
    setPrevValue(props.value)
    setIndeterminate(undefined)
  }
  const _onBlur = useCallback<Exclude<TextField.RootProps['onBlur'], undefined>>((e) => {
    onBlur?.(e)
    if (indeterminate !== undefined) {
      onValueChange?.(indeterminate)
      setIndeterminate(undefined)
    }
  }, [onValueChange, onBlur, indeterminate])
  const _onChange = useCallback<Exclude<TextField.RootProps['onChange'], undefined>>((e) => {
    onChange?.(e)
    setIndeterminate(e.currentTarget.value)
  }, [setIndeterminate, onChange])
  // eslint-disable-next-line @masknet/jsx-prefer-test-id
  return <TextField.Root ref={ref} {...props} onBlur={_onBlur} onChange={_onChange} value={indeterminate ?? props.value} />
}
