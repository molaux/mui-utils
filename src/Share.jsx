import React from 'react'
import PieIcon from './Pie'
import Box from '@mui/material/Box'

export const ShareValue = ({ value, iconOnly, size }) => isNaN(value) 
  ? null
  : <>
    <PieIcon
      angle={(value === 1 ? 0.999999 : value) * 2 * Math.PI}
      style={{
        width: `${size || 0.8}em`,
        height: `${size || 0.8}em`,
        margin: `0 ${Math.ceil(100 * (size || 0.8) / 4) / 100}em -${Math.ceil(100 * (size || 0.8) / 4) / 100}em ${Math.ceil(100 * (size || 0.8) / 4) / 100}em`
      }}
    />
    {iconOnly ? null : value.toLocaleString('fr-FR', {style: 'percent', minimumFractionDigits: 1})}
  </>

export const Share = ({value, iconOnly, size}) => <Box component="span" style={{
    whiteSpace: 'nowrap'
  }}>
    <ShareValue value={value} iconOnly={iconOnly} size={size} />
  </Box>
