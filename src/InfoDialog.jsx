import React from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

class InfoDialog extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleClickOpen () {
    this.setState({ open: true })
  }

  handleClose () {
    this.setState({ open: false })
  }

  render () {
    const { primary, children } = this.props
    const { open } = this.state

    return (
      <div>
        <Button color="primary" onClick={() => this.handleClickOpen()}>{primary}</Button>
        <Dialog
          open={open}
          onClose={() => this.handleClose()}
          aria-labelledby="info-dialog-title"
          aria-describedby="info-dialog-description"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle id="info-dialog-title">{primary}</DialogTitle>
          <DialogContent>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleClose()} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

InfoDialog.propTypes = {
  primary: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

InfoDialog.defaultProps = {
  primary: null,
  children: null
}

export { InfoDialog }
export default InfoDialog
