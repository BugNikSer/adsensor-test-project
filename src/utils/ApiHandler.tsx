import { ReactNode } from "react";
import { Alert, CircularProgress, Button } from '@mui/material';

const ApiHandler = ({
  loading,
  error,
  children,
  refresh,
}: {
  loading: boolean
  error: Error | null
  children?: ReactNode
  refresh?: () => void
}) => {
  if (loading) return <CircularProgress sx={{ margin: 'auto' }} />
  else if (error) return (
    <Alert
      severity="warning"
      variant="outlined"
      action={
        refresh && <Button onClick={refresh} size="small" color="inherit">Обновить</Button>
      }
      sx={{ margin: 'auto' }}
    >
      Произошла ошибка
    </Alert>
  )
  return children
}

export default ApiHandler
