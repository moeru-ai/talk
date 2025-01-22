import type { ListModelsOptions } from '@xsai/model'

import { listModels } from '@xsai/model'
import { useFetchState } from './_use-fetch-state'

export const useListModels = (options: ListModelsOptions) => {
  const { data, error, isLoading } = useFetchState(async () => await listModels(options), [])

  return { error, isLoading, models: data }
}
