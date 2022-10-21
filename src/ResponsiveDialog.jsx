import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@mui/material/Dialog'
import Slide from '@mui/material/Slide'
import { useTheme, useMediaQuery } from '@mui/material'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" {...props} ref={ref} />)

// const ResponsiveDialog = withMobileDialog()(Dialog)
const ResponsiveDialog = ({ children, ...other }) => {
  const theme = useTheme()
  try {
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'), { matchMedia: window.matchMedia.bind(window), noSsr: true })
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
  } catch (e) {
    console.error(e)
    throw e
  }
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
