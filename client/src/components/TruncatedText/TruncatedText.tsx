import { useEventCallback } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import { useRef, useState } from 'react'

type Props = {
  text: string
  maxWidth?: string | number
} & Pick<TypographyProps, 'variant' | 'component'>

export const TruncatedText = ({ text, maxWidth = '100%', variant, component }: Props) => {
  const ref = useRef<HTMLElement>(null)
  const [isTruncated, setIsTruncated] = useState(false)

  const handleMouseEnter = useEventCallback(() => {
    if (ref.current) {
      setIsTruncated(ref.current.scrollWidth > ref.current.clientWidth)
    }
  })

  return (
    <Tooltip title={isTruncated ? text : ''} placement="top">
      <Typography
        ref={ref}
        variant={variant}
        component={component ?? 'span'}
        onMouseEnter={handleMouseEnter}
        sx={{
          display: 'block',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          maxWidth,
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  )
}
