import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { withStyles } from '@mui/styles'

const styles = {
  appBar: {
    position: 'relative'
  },
  content: {
    display: 'block',
    flex: 1,
    minWidth: '0px',
    // maxWidth: '100%',
    overflow: 'auto',
    boxSizing: 'border-box'
  },
  flex: {
    flex: 1
  }
}

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref} />)

const FullScreenDialog = ({ classes, actions, open, onClose, children, primary }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="info-dialog-title"
    aria-describedby="info-dialog-description"
    fullScreen
    // disableEnforceFocus
    // disableAutoFocus
    TransitionComponent={Transition}
  >
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {primary}
        </Typography>
        { actions || null }
        <IconButton color="inherit" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    <div className={classes.content}>
      {children}
    </div>
  </Dialog>
)

FullScreenDialog.propTypes = {
  classes: PropTypes.shape({
    appBar: PropTypes.string,
    flex: PropTypes.string,
    content: PropTypes.string
  }).isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  actions: PropTypes.arrayOf(PropTypes.element),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

FullScreenDialog.defaultProps = {
  primary: null,
  children: null,
  actions: [],
  onClose: () => null,
  open: true
}

const StyledFullScreenDialog = withStyles(styles)(FullScreenDialog)

export { StyledFullScreenDialog as FullScreenDialog }
export default StyledFullScreenDialog
