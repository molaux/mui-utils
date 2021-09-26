import React from 'react'
import PropTypes from 'prop-types'

import ImageIcon from '@mui/icons-material/Image'

const NoPic = ({ className }) => (
  <div className={className}>
    <ImageIcon style={{ color: 'grey', width: 100, height: 100, margin: 20 }} />
  </div>
)

NoPic.propTypes = {
  className: PropTypes.string
}

NoPic.defaultProps = {
  className: null
}

export { NoPic }
export default NoPic
