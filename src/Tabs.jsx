import React from 'react'
import { withStyles } from 'tss-react/mui'
import UpstreamTabs from '@mui/material/Tabs'
import UpstreamTab from '@mui/material/Tab'

export const Tabs = withStyles(UpstreamTabs, (theme) => ({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: theme.palette.primary
  }
}))

export const Tab = withStyles((props) => <UpstreamTab disableRipple {...props} />, (theme) => ({
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
}))
