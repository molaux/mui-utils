import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'

import { withStyles } from '@mui/styles'

class ExpandableListItem extends Component {
  state = {
    expanded: false
  }

  handleExpandClick () {
    this.setState((state) => ({ expanded: !state.expanded }))
  }

  render () {
    const { classes, title, subTitle, children, noBorder, icons, states } = this.props
    const { expanded } = this.state
    return (
      <Paper square className={noBorder ? classes.panelBorder : null}>
        <List className={classes.headerPadding}>
          <ListItem onClick={() => this.handleExpandClick()} button>
            {icons}
            <ListItemText
              primary={title}
              secondary={subTitle}
              className={classes.headerText}
            />
            {states}
            <div
              className={`${classes.expand} ${classes.expandIcon} ${expanded ? classes.expandOpen : null}`}
            >
              <span className={classes.expandLabel}>
                <ExpandMoreIcon />
              </span>
            </div>
          </ListItem>
        </List>
        <Collapse in={expanded} unmountOnExit>
          {children}
        </Collapse>
      </Paper>
    )
  }
}

ExpandableListItem.propTypes = {
  classes: PropTypes.shape({
    panelBorder: PropTypes.string,
    headerPadding: PropTypes.string,
    headerText: PropTypes.string,
    expand: PropTypes.string,
    expandIcon: PropTypes.string,
    expandLabel: PropTypes.string,
    expandOpen: PropTypes.string
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  title: PropTypes.node.isRequired,
  subTitle: PropTypes.string,
  noBorder: PropTypes.bool,
  icons: PropTypes.arrayOf(PropTypes.element),
  states: PropTypes.element
}

ExpandableListItem.defaultProps = {
  children: null,
  noBorder: false,
  subTitle: undefined,
  icons: [],
  states: null
}

const styles = (theme) => ({
  expandIcon: {
    flex: '0 0 auto',
    color: 'rgba(0, 0, 0, 0.54)',
    width: '24px',
    height: '24px',
    zIndex: 1,
    padding: 0,
    display: 'inline-flex',
    fontSize: '24px',
    textAlign: 'center',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    alignItems: 'center',
    borderRadius: '50%',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  expandLabel: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit'
  },
  expand: {
    transform: 'rotate(-0deg)'
  },
  expandOpen: {
    transform: 'rotate(-180deg)'
  },
  panelBorder: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.17)'
  },
  headerPadding: {
    padding: '0 !important'
  },
  headerText: {
    fontSize: '15px',
    fontWeight: 400
  }
})

const StyledExpandableListItem = withStyles(styles, { withTheme: true })(ExpandableListItem)

export { StyledExpandableListItem as ExpandableListItem }
export default StyledExpandableListItem
