import React from 'react'
import PropTypes from 'prop-types'
import Table from '@mui/material/Table'
import { withStyles } from '@mui/styles'

const styles = (theme) => ({
  root: {
    // maxWidth: '100%',
    marginTop: theme.spacing(1),
    overflowX: 'auto',
    boxSizing: 'border-box'
  }
})

const TableResponsive = ({ classes, children, ...otherProps }) => (
  <div className={classes.root}>
    <Table {...otherProps}>
      {children}
    </Table>
  </div>
)

TableResponsive.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  classes: PropTypes.shape({
    root: PropTypes.string
  }).isRequired
}

TableResponsive.defaultProps = {
  children: null
}

const StyledTableResponsive = withStyles(styles)(TableResponsive)

export { StyledTableResponsive as TableResponsive }
export default StyledTableResponsive
