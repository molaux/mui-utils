import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => ({
  gutterTop: {
    marginTop: theme.spacing(1)
  },
  gutterBottom: {
    marginBottom: theme.spacing(1)
  }
}))

export const StatusTypography = ({
  error,
  warning,
  success,
  info,
  title,
  children,
  gutterBottom,
  gutterTop,
  persistent,
  timeout,
  ...props
}) => {
  const { classes: localClasses } = useStyles()
  const [open, setOpen] = React.useState(true)
  useEffect(() => {
    setOpen(true)
    if (timeout !== null) {
      const id = setTimeout(() => setOpen(false), timeout)
      return () => clearTimeout(id)
    }
    return () => null
  }, [setOpen, timeout, children, title, error, warning, success, info])

  const classNames = `${gutterTop ? localClasses.gutterTop : ''} ${gutterBottom ? localClasses.gutterBottom : ''}`
  return (
    <Collapse in={open}>
      <Alert
        severity={error ? 'error' : warning ? 'warning' : success ? 'success' : 'info'}
        {...props}
        className={classNames}
        action={
          <>
            {!persistent
              ? <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false)
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
              : null}
            {props?.action}
          </>
        }
      >
        {title ? <AlertTitle>{title}</AlertTitle> : null}
        {children}
      </Alert>
    </Collapse>
  )
}

StatusTypography.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
  success: PropTypes.bool,
  info: PropTypes.bool,
  persistent: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  gutterBottom: PropTypes.bool,
  gutterTop: PropTypes.bool,
  timeout: PropTypes.number
}

StatusTypography.defaultProps = {
  error: false,
  warning: false,
  success: false,
  info: true,
  title: null,
  children: null,
  gutterBottom: false,
  gutterTop: false,
  persistent: true,
  timeout: null
}

export default StatusTypography
