import { createContextState } from 'foxact/context-state'
import { useCallback } from 'react'

const [SidebarActiveProvider, useSidebarActive, useSetSidebarActive] = createContextState(false)

// eslint-disable-next-line react-refresh/only-export-components
export { SidebarActiveProvider, useSetSidebarActive, useSidebarActive }

// eslint-disable-next-line react-refresh/only-export-components
export const useToggleSidebarActive = () => {
  const setSidebarActive = useSetSidebarActive()

  return useCallback(() => setSidebarActive(prevSidebarActive => !prevSidebarActive), [setSidebarActive])
}
