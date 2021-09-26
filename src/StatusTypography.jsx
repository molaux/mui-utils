import React from 'react'
import PropTypes from 'prop-types'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
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
  ...props
}) => {
  const localClasses = useStyles()
  const classNames = `${gutterTop ? localClasses.gutterTop : ''} ${gutterBottom ? localClasses.gutterBottom : ''}`
  return (
    <Alert
      severity={error ? 'error' : warning ? 'warning' : success ? 'success' : 'info'}
      {...props}
      className={classNames}
    >
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {children}
    </Alert>
  )
}

StatusTypography.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
  success: PropTypes.bool,
  info: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  gutterBottom: PropTypes.bool,
  gutterTop: PropTypes.bool
}

StatusTypography.defaultProps = {
  error: false,
  warning: false,
  success: false,
  info: true,
  title: null,
  children: null,
  gutterBottom: false,
  gutterTop: false
}

export default StatusTypography
