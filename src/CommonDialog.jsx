import React from 'react'
import PropTypes from 'prop-types'

import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'
import { withStyles } from '@material-ui/core/styles'
import { useTheme, useMediaQuery } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref} />)

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    marginRight: theme.spacing(5)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose
        ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          )
        : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions)

// const ResponsiveDialog = withMobileDialog()(Dialog)
const CommonDialog = ({ open, title, onClose, children, classes }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Dialog
      maxWidth="xl"
      TransitionComponent={Transition}
      open={open}
      fullScreen={fullScreen}
      onClose={onClose}
    // disableEnforceFocus
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={classes}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
        {title}
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

CommonDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  classes: PropTypes.shape({
  })
}

CommonDialog.defaultProps = {
  onClose: null,
  children: null,
  classes: {}
}

export { CommonDialog }
export default CommonDialog
