import { useEffect, useState } from 'react'

/** @internal */
interface GetDataOptions {
  abortSignal: AbortSignal
}

/** @internal */
export const useFetchState = <T>(getData: (options: GetDataOptions) => Promise<T>, initialState: T) => {
  const [data, setData] = useState<T>(initialState)
  const [error, setError] = useState<Error | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    let isCancelled = false

    // eslint-disable-next-line @masknet/no-then
    getData({ abortSignal: controller.signal })
      .then((data) => {
        if (!isCancelled)
          setData(data)
      })
      .catch((error: Error) => {
        if (!isCancelled)
          setError(error)
      })
      .finally(() => {
        if (!isCancelled)
          setIsLoading(false)
      })

    return () => {
      isCancelled = true
      controller.abort()
      setIsLoading(false)
    }
  }, [getData])

  return { data, error, isLoading }
}
