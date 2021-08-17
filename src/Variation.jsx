import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat'

const VariationValue = ({ value }) => (
  <>
    {value > 0
      ? <TrendingUpIcon style={{ margin: '0 0.3em -0.3em 0.1em' }} size="small" />
      : value < 0
        ? <TrendingDownIcon style={{ margin: '0 0.3em -0.3em 0.1em' }} size="small" />
        : <TrendingFlatIcon style={{ margin: '0 0.2em -0.3em 0.2em' }} size="small" /> }
    {Math.abs(value).toLocaleString('fr-FR', { style: 'percent', minimumFractionDigits: 1 })}
  </>
)

VariationValue.propTypes = {
  value: PropTypes.number.isRequired
}

const Variation = ({ value }) => {
  const theme = useTheme()
  return (
    <Box
      component="span"
      style={{
        whiteSpace: 'nowrap',
        color: value !== null
          ? value > 0
            ? theme.palette.success.main
            : value < 0
              ? theme.palette.error.main
              : 'inherit'
          : 'inherit'
      }}
    >
      <VariationValue value={value} />
    </Box>
  )
}

Variation.propTypes = {
  value: PropTypes.number.isRequired
}

export { Variation }
export default Variation
