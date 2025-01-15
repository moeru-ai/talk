import type { ListModelsOptions, Model } from '@xsai/model'

import { listModels } from '@xsai/model'
import { useEffect, useState } from 'react'

export const useListModels = (options: ListModelsOptions) => {
  const [models, setModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const models = await listModels(options)
        setModels(models)
      }
      catch (error) {
        setError(error as Error)
      }
      finally {
        setIsLoading(false)
      }
    }
    void fetchData()
  }, [options])

  return { error, isLoading, models }
}
