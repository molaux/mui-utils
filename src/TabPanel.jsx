import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: theme.spacing(3)
  }
}))

export const TabPanel = ({ children, value, index, ...other }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.content}
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  )
  }

TabPanel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
}

TabPanel.defaultProps = {
  children: null
}

export const PaddedTabContainer = TabPanel
