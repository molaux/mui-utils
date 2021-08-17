import React from 'react'
import PropTypes from 'prop-types'
import Yes from '@material-ui/icons/CheckCircle'
import No from '@material-ui/icons/Cancel'

const BooleanIcon = ({ state }) => (
  state
    ? <Yes style={{ color: 'green' }} />
    : <No style={{ color: 'red' }} />
)

BooleanIcon.propTypes = {
  state: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired
}
export { BooleanIcon }
export default BooleanIcon
