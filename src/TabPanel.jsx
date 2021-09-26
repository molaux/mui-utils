import React from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'

export const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...other}
  >
    {children}
  </div>
)

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

export const PaddedTabContainer = styled(TabPanel)(({ theme }) => ({
  paddingTop: theme.spacing(3)
}))
