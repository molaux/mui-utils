import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import { useTheme, useMediaQuery } from '@material-ui/core'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref} />)

// const ResponsiveDialog = withMobileDialog()(Dialog)
const ResponsiveDialog = ({ children, ...other }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Dialog
      maxWidth="xl"
      TransitionComponent={Transition}
      fullScreen={fullScreen}
      {...other}
    >
      {children}
    </Dialog>
  )
}

ResponsiveDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

ResponsiveDialog.defaultProps = {
  children: null
}

export { ResponsiveDialog }
export default ResponsiveDialog
