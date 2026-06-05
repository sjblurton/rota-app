import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import LinearProgress from '@mui/material/LinearProgress'

type DashboardStatCardProps = {
  title: string
  primaryValue: string
  secondaryValue?: string
  status?: {
    label: string
    color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  }
  progress?: number
}

export const DashboardStatCard = ({
  primaryValue,
  title,
  progress,
  secondaryValue,
  status,
}: DashboardStatCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {progress !== undefined && (
          <LinearProgress aria-label={title} variant="determinate" value={progress} />
        )}
        <Typography variant="h4">{primaryValue}</Typography>
        {secondaryValue && <Typography color="text.secondary">{secondaryValue}</Typography>}
        {status && <Chip label={status.label} color={status.color} size="small" />}
      </CardContent>
    </Card>
  )
}
