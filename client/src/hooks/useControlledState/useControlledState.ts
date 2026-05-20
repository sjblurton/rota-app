import { useState } from 'react'
import { useEventCallback } from '@mui/material/utils'

export type UseControlledStateOptions<T> = {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}

export const useControlledState = <T>({
  value,
  defaultValue,
  onChange,
}: UseControlledStateOptions<T>) => {
  const [internalValue, setInternalValue] = useState(defaultValue)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const setValue = useEventCallback((nextValue: React.SetStateAction<T>) => {
    const resolvedValue =
      typeof nextValue === 'function'
        ? (nextValue as (previousValue: T) => T)(currentValue)
        : nextValue

    if (!isControlled) {
      setInternalValue(resolvedValue)
    }

    onChange?.(resolvedValue)
  })

  return [currentValue, setValue, isControlled] as const
}
