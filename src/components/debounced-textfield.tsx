import type { ChangeEventHandler, FC, FocusEventHandler, ReactNode } from 'react'

import { TextField } from '@radix-ui/themes'
import { useCallback, useState } from 'react'

interface WithOnBlurValueProps {
  onBlurValueChange?: (text: string) => undefined | void
}

interface WithOnBlurValueRequiredProps {
  children?: ReactNode
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: number | string
}

function withOnBlurValue<P extends WithOnBlurValueRequiredProps>(Component: FC<P>): FC<P & WithOnBlurValueProps> {
  return ({ onBlur, onBlurValueChange, onChange, value, ...rest }) => {
    const [indeterminate, setIndeterminate] = useState<typeof value>(undefined)
    const [prevValue, setPrevValue] = useState(value)
    if (prevValue !== value) {
      setPrevValue(value)
      setIndeterminate(undefined)
    }
    const _onBlur = useCallback<Exclude<typeof onBlur, undefined>>((e) => {
      onBlur?.(e)
      if (indeterminate !== undefined) {
        onBlurValueChange?.(indeterminate.toString())
        setIndeterminate(undefined)
      }
    }, [onBlur, onBlurValueChange, indeterminate, setIndeterminate])
    const _onChange = useCallback<Exclude<typeof onChange, undefined>>((e) => {
      onChange?.(e)
      setIndeterminate(e.currentTarget.value)
    }, [onChange, setIndeterminate])
    const p = { onBlur: _onBlur, onChange: _onChange, value: indeterminate ?? value, ...rest }
    return <Component {...p as P} />
  }
}

export const DebouncedTextField = withOnBlurValue(TextField.Root)
