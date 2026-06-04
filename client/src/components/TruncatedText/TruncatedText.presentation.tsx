import { forwardRef } from 'react'
import Tooltip from '@mui/material/Tooltip'
import Typography, { type TypographyProps } from '@mui/material/Typography'

export type TruncatedTextPresentationProps = {
  text: string
  maxWidth?: string | number
  isTruncated: boolean
  handleMouseEnter: () => void
} & Pick<TypographyProps, 'variant' | 'component'> &
  Omit<React.HTMLAttributes<HTMLElement>, 'onMouseEnter'>

export const TruncatedTextPresentation = forwardRef<HTMLElement, TruncatedTextPresentationProps>(
  (
    { text, maxWidth = '100%', variant, component, handleMouseEnter, isTruncated, ...props },
    ref,
  ) => {
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
          {...props}
        >
          {text}
        </Typography>
      </Tooltip>
    )
  },
)

TruncatedTextPresentation.displayName = 'TruncatedTextPresentation'
