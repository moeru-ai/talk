import type { DependencyList } from 'react'

import { useAbortableEffect } from 'foxact/use-abortable-effect'
import { useState } from 'react'

/** @internal */
export const useFetchState = <T>(getData: (signal: AbortSignal) => Promise<T>, initialState: T, deps: DependencyList) => {
  const [data, setData] = useState<T>(initialState)
  const [error, setError] = useState<Error | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useAbortableEffect((signal) => {
    // eslint-disable-next-line @masknet/no-then
    getData(signal)
      .then((data) => {
        if (!signal.aborted)
          setData(data)
      })
      .catch((error: Error) => {
        if (!signal.aborted)
          setError(error)
      })
      .finally(() => {
        if (!signal.aborted)
          setIsLoading(false)
      })
  }, [getData, ...deps])

  return { data, error, isLoading }
}
