import { useRef, useState } from 'react'
import { useEventCallback } from '@mui/material/utils'
import {
  TruncatedTextPresentation,
  type TruncatedTextPresentationProps,
} from './TruncatedText.presentation'

type Props = Pick<TruncatedTextPresentationProps, 'text' | 'maxWidth' | 'variant' | 'component'>

export const TruncatedText = ({ text, maxWidth = '100%', variant, component, ...props }: Props) => {
  const ref = useRef<HTMLElement | null>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  const handleMouseEnter = useEventCallback(() => {
    if (ref.current) {
      const { scrollWidth, clientWidth } = ref.current
      setIsTruncated(scrollWidth > clientWidth)
    }
  })

  return (
    <TruncatedTextPresentation
      ref={ref}
      component={component}
      text={text}
      maxWidth={maxWidth}
      variant={variant}
      handleMouseEnter={handleMouseEnter}
      isTruncated={isTruncated}
      {...props}
    />
  )
}
