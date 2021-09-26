import React from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@mui/material'
import Zoom from '@mui/material/Zoom'

import { makeStyles } from '@mui/styles'

import { StatusTypography } from './StatusTypography'

const useStyles = makeStyles((theme) => ({
  arrow: ({
    error,
    warning,
    success
  }) => ({
    color: theme.palette[error ? 'error' : warning ? 'warning' : success ? 'success' : 'info'].main
  }),
  tooltip: ({
    error,
    warning,
    success
  }) => ({
    backgroundColor: theme.palette[error ? 'error' : warning ? 'warning' : success ? 'success' : 'info'].main
  })
}))

export const StatusTooltip = ({
  error,
  warning,
  success,
  info,
  onClose,
  open,
  content,
  title,
  children
}) => {
  const classes = useStyles({
    error,
    warning,
    success
  })

  return (
    <Tooltip
      arrow
      classes={classes}
      PopperProps={{
        disablePortal: true
      }}
      open={open}
      TransitionComponent={Zoom}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title={(
        <StatusTypography
          onClose={onClose}
          variant="filled"
          error={error}
          warning={warning}
          success={success}
          info={info}
          title={title}
        >
          {content}
        </StatusTypography>
        )}
    >
      {children}
    </Tooltip>
  )
}

StatusTooltip.propTypes = {
  error: PropTypes.bool,
  warning: PropTypes.bool,
  success: PropTypes.bool,
  info: PropTypes.bool,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  content: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

StatusTooltip.defaultProps = {
  error: false,
  warning: false,
  success: false,
  info: true,
  onClose: null,
  open: false,
  content: '',
  children: null,
  title: null
}

export default StatusTooltip
