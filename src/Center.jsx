import React from 'react'
import PropTypes from 'prop-types'

import Grid from '@mui/material/Grid'

import { withStyles } from 'tss-react/mui'

const Center = ({ height, classes, className, style, children }) => (
  <Grid
    className={className}
    classes={{ root: classes.root }}
    container
    alignItems="center"
    justifyContent="center"
    style={{ height, margin: 0, ...style }}
  >
    <Grid className={classes.paper} item>
      {children}
    </Grid>
  </Grid>
)

Center.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  classes: PropTypes.shape({
    root: PropTypes.string,
    paper: PropTypes.string
  }).isRequired,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

Center.defaultProps = {
  height: undefined,
  className: '',
  style: {},
  children: null
}

const styles = (theme) => ({
  root: {
    overflow: 'hidden'
  },
  paper: {
  }
})

const StyledCenter = withStyles(Center, styles)

export { StyledCenter as Center }
export default StyledCenter
