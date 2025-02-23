import type { ListModelsOptions } from '@xsai/model'
import type { DependencyList } from 'react'

import { listModels } from '@xsai/model'

import { useFetchState } from './_use-fetch-state'

export const useListModels = (options: ListModelsOptions, deps: DependencyList) => {
  const { data, error, isLoading } = useFetchState(async abortSignal => listModels({
    abortSignal,
    ...options,
  }), [], deps)

  return { error, isLoading, models: data }
}
