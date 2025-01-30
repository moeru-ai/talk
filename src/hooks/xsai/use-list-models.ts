import type { ListModelsOptions } from '@xsai/model'

import { listModels } from '@xsai/model'

import { useFetchState } from './_use-fetch-state'

export const useListModels = (options: ListModelsOptions) => {
  const { data, error, isLoading } = useFetchState(async ({ abortSignal }) => listModels({
    abortSignal,
    ...options,
  }), [])

  return { error, isLoading, models: data }
}
