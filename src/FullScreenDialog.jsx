import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/styles'

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
