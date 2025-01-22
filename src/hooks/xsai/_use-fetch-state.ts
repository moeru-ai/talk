import { useEffect, useState } from 'react'

/** @internal */
export const useFetchState = <T>(getData: () => Promise<T>, initialState: null | T = null) => {
  const [data, setData] = useState<null | T>(initialState)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const tryGetData = async () => {
      try {
        const data = await getData()
        setData(data)
      }
      catch (error) {
        setError(error as Error)
      }
      finally {
        setIsLoading(false)
      }
    }
    void tryGetData()
  }, [getData])

  return { data, error, isLoading }
}
