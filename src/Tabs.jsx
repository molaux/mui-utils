import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import UpstreamTabs from '@material-ui/core/Tabs'
import UpstreamTab from '@material-ui/core/Tab'

export const Tabs = withStyles((theme) => ({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: theme.palette.primary
  }
}))(UpstreamTabs)

export const Tab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    '&:hover': {
      color: theme.palette.primary,
      opacity: 1
    },
    '&$selected': {
      color: theme.palette.primary,
      fontWeight: theme.typography.fontWeightMedium
    },
    '&:focus': {
      color: theme.palette.primary
    }
  },
  selected: {}
}))((props) => <UpstreamTab disableRipple {...props} />)
