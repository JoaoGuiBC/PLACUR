import { useEffect, DependencyList, useRef } from 'react'

export const useNonInitialEffect = (
  effect: () => void | undefined,
  deps?: DependencyList
) => {
  const initialRender = useRef(true)

  useEffect(() => {
    let effectReturns: void | (() => void | undefined) = () => {}

    if (initialRender.current) {
      initialRender.current = false
    } else {
      effectReturns = effect()
    }

    if (effectReturns && typeof effectReturns === 'function') {
      console.log('aaacuuacuacsucasd')
      return effectReturns
    }
  }, deps)
}
