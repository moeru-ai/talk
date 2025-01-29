import type { ChangeEventHandler, FC, FocusEventHandler, ReactNode } from 'react'

import { TextField } from '@radix-ui/themes'
import { useCallback, useState } from 'react'

function withOnBlurValue<P extends WithOnBlurValueRequiredProps>(Component: FC<P>): FC<P & WithOnBlurValueProps>{
  return (props) => {
    const { onBlur, onBlurValueChange, onChange, value, ...rest } = props
    const [indeterminate, setIndeterminate] = useState<typeof value>(undefined)
    const [prevValue, setPrevValue] = useState(props.value)
    if (prevValue !== props.value) {
      setPrevValue(props.value)
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

interface WithOnBlurValueProps {
  onBlurValueChange?: (text: string) => undefined | void
}

interface WithOnBlurValueRequiredProps {
  children?: ReactNode
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: ChangeEventHandler<HTMLInputElement>
  value?: string | number
}

export const DebouncedTextField = withOnBlurValue(TextField.Root)
