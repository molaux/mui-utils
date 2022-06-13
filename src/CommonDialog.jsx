import React from 'react'
import PropTypes from 'prop-types'

import MuiDialogActions from '@mui/material/DialogActions'
import MuiDialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import MuiDialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Slide from '@mui/material/Slide'
import { withStyles } from 'tss-react/mui'
import { useTheme, useMediaQuery } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'

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

const DialogTitle = withStyles((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle className={classes.root} {...other}>
      <Typography variant="span">{children}</Typography>
      {onClose
        ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
          )
        : null}
    </MuiDialogTitle>
  )
}, styles)

const DialogContent = withStyles(MuiDialogContent, (theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))

const DialogActions = withStyles(MuiDialogActions, (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))

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
