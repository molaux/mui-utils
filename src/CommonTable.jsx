import React, { useCallback, useState, memo, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import Color from 'color'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import TablePagination from '@mui/material/TablePagination'
import Table from '@mui/material/Table'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'

import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import SortDescIcon from '@mui/icons-material/ArrowDownward'
import SortAscIcon from '@mui/icons-material/ArrowUpward'


import { makeStyles } from 'tss-react/mui'
import isEqual from 'fast-deep-equal/es6/react'

const useStyles = makeStyles()((theme) => ({
  table: {
    // marginBottom: theme.spacing(3),
    // maxWidth: '100%'
  },
  noWrap: {
    '& td': {
      whiteSpace: 'nowrap'
    }
  },
  virtualRow: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
}))

const Collapsable = ({ open, children }) => open !== undefined
  ? (
  <Collapse in={open} timeout="auto" unmountOnExit sx={{ paddingTop: (theme) => theme.spacing(2), paddingBottom: (theme) => theme.spacing(2) }}>
    {children}
  </Collapse>
  )
  : children ?? null

const Row = memo(({
  backgroundColor,
  background,
  color,
  headers,
  rowHeaders,
  row,
  alignCell,
  verticalAlignCell,
  virtualRowClass,
  borderLeftStyle,
  expandable,
  collapsable,
  controlledOpen,
  nesting
}) => {
  const [open, setOpen] = React.useState(false)
  // console.log('row')
  // useEffect(() => { console.log('backgroundColor') }, [backgroundColor])
  // useEffect(() => { console.log('headers') }, [headers])
  // useEffect(() => { console.log('rowHeaders') }, [rowHeaders])
  // useEffect(() => { console.log('row') }, [row])
  // useEffect(() => { console.log('alignCell') }, [alignCell])
  // useEffect(() => { console.log('verticalAlignCell') }, [verticalAlignCell])
  // useEffect(() => { console.log('virtualRowClass') }, [virtualRowClass])
  // useEffect(() => { console.log('borderLeftStyle') }, [borderLeftStyle])
  // useEffect(() => { console.log('expandable') }, [expandable])
  // useEffect(() => { console.log('collapsable') }, [collapsable])
  // useEffect(() => { console.log('controlledOpen') }, [controlledOpen])
  // useEffect(() => { console.log('nesting') }, [nesting])
  return (
    <>
      {Object.keys(headers)
        .sort()
        .map((line) => [
            <TableRow
              key={line}
              sx={{
                ...(borderLeftStyle(row) !== null
                  ? { borderLeft: borderLeftStyle(row) }
                  : {}),
                ...(background(row) !== null
                  ? { background: background(row) }
                  : {}),
                ...(backgroundColor(row) !== null
                  ? { backgroundColor: backgroundColor(row) }
                  : { backgroundColor: (theme) => Color(theme.palette.background.paper).darken((nesting ?? 0)/20).hex() }),
                ...(color(row) !== null
                  ? { color: color(row) }
                  : {})
              }}
              className={(parseInt(line, 10) + 1) >= Object.keys(headers).length
                ? null
                : virtualRowClass}
            >
              {expandable ? (
                <TableCell style={controlledOpen !== undefined ? { paddingBottom: 0, paddingTop: 0, ...(controlledOpen !== true ? { borderBottom: 'unset' } : {}) } : {}}>
                  <Collapsable open={controlledOpen}>
                    {row.expand ? (
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                      >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    ) : null}
                  </Collapsable>
                </TableCell>
              ) : null}
              {Object.keys(headers[line]).map((header, index) => (
                <TableCell
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  align={alignCell(header)}
                  sx={{
                    verticalAlign: verticalAlignCell(header),
                    ...(controlledOpen !== undefined
                      ? { paddingBottom: 0, paddingTop: 0, ...(controlledOpen !== true
                        ? { borderBottom: 'unset' }
                        : {}) }
                      : {}),
                    ...(headers[line][header].rowSpan || 1 > 2 && background(row) !== null
                        ? { background: background(row) }
                        : {}),
                    ...(background(row, header) !== null
                      ? { background: background(row, header) }
                      : {}),
                    ...(backgroundColor(row, header) !== null
                      ? { backgroundColor: backgroundColor(row, header) }
                      : { }),
                    ...(color(row, header) !== null
                      ? { color: color(row, header) }
                      : { })
                  }}
                  component={rowHeaders.includes(header) ? 'th' : 'td'}
                  {...headers[line][header]}
                  {...(index === Object.keys(headers[line]).length - 1 ? { colSpan: 5000 } : {})}
                >
                  <Collapsable open={controlledOpen}>
                    {row[header]}
                  </Collapsable>
                </TableCell>
              ))}
            </TableRow>,
            expandable && row.expand
              ? (
                expandable === 'custom'
                  ? (
                    <TableRow key={`${line}-expansion`}>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5000}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          {row.expand} 
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )
                  : row.expand.map((row, i) => (
                    <Row
                      key={i}
                      backgroundColor={backgroundColor}
                      color={color}
                      background={background}
                      headers={headers}
                      rowHeaders={rowHeaders}
                      row={row}
                      alignCell={alignCell}
                      verticalAlignCell={verticalAlignCell}
                      virtualRowClass={virtualRowClass}
                      borderLeftStyle={borderLeftStyle}
                      expandable={expandable}
                      controlledOpen={(controlledOpen !== undefined ? controlledOpen : true) && open}
                      nesting={(nesting ?? 0) + 1}
                    />
                  ))
              )
              : null
      ])}
    </>
    )
  })

Row.propTypes = {
  backgroundColor: PropTypes.func,
  color: PropTypes.func,
  background: PropTypes.func,
  borderLeftStyle: PropTypes.func,
  headers: PropTypes.shape({}).isRequired,
  rowHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
  row: PropTypes.shape({}).isRequired,
  alignCell: PropTypes.func.isRequired,
  verticalAlignCell: PropTypes.func.isRequired,
  virtualRowClass: PropTypes.string
}

Row.defaultProps = {
  backgroundColor: null,
  color: null,
  background: null,
  borderLeftStyle: null,
  virtualRowClass: ''
}

const buildVirtualRowsMap = (headers, map) => {
  const result = { ...map }
  result[0] = {
    ...result[0],
    ...headers
      .filter((header) => !Object.values(map)
        .reduce((found, rowMap) => found || Object.keys(rowMap).includes(header), false))
      .reduce((rowMap, h) => ({ ...rowMap, [h]: { colSpan: 1 } }), {})
  }

  return result
}

const TablePaginationCell = ({
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onChangePage,
  onChangeRowsPerPage,
  ...props
}) => (
  <TablePagination
    component="div"
    rowsPerPageOptions={rowsPerPageOptions}
    count={count}
    rowsPerPage={rowsPerPage}
    page={page}
    onPageChange={onChangePage}
    onRowsPerPageChange={onChangeRowsPerPage}
    labelRowsPerPage="Lignes :"
    labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `plus de ${to}`}`}
    {...props}
  />
)

TablePaginationCell.propTypes = {
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.any),
  count: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

TablePaginationCell.defaultProps = {
  rowsPerPageOptions: null,
  rowsPerPage: null
}

const CommonTable = ({
  rows,
  rowHeaders,
  noWrap,
  align,
  size,
  verticalAlign,
  backgroundColor,
  color,
  background,
  borderLeftStyle,
  hide,
  keys,
  virtualRowsMap,
  pagination,
  onSortHeader,
  sortableHeaders,
  controlledPage,
  onControlledPageChange,
  controlledRowsPerPage,
  controlledRowsPerPageOptions,
  controlledTotal,
  loading,
  expandable,
  headers: colHeaders,
  stickyHeader,
  sx,
  maxHeight
}) => {
  const { classes } = useStyles()
  align = useMemo(() => align, [])
  backgroundColor = backgroundColor || (() => null)
  color = color || (() => null)
  background = background || (() => null)
  const [statedHide] = useState(hide || [])
  const [statedRowHeaders] = useState(rowHeaders || [])
  const [statedVirtualRowsMapProp] = useState(virtualRowsMap || {})
  const alignCell = useCallback((key) => (align !== undefined && align[key] !== undefined ? align[key] : 'right'), [align])
  const verticalAlignCell = useCallback((key) => (verticalAlign !== undefined && verticalAlign[key] !== undefined ? verticalAlign[key] : 'middle'), [verticalAlign])
  const [headers, setHeaders] = useState(rows.length
    ? buildVirtualRowsMap(Object.keys(rows[0])
      .filter((h) => !statedHide.includes(h) && (!expandable || h !== 'expand')), statedVirtualRowsMapProp)
    : [])
  const [page, setPage] = React.useState(0)
  const rowsPerPageOptions = controlledRowsPerPageOptions || [25, 50, 100, { value: -1, label: 'Tout' }]
  const [rowsPerPage, _setRowsPerPage] = React.useState(
    parseInt(window.localStorage.getItem('common-table-rows-per-page'), 10) || rowsPerPageOptions[0]
  )

  useEffect(() => {
    if (page * rowsPerPage > rows.length) {
      setPage(Math.floor(Math.abs((rows.length - 1) / rowsPerPage)))
    }
  }, [rows, rowsPerPage, page, setPage])
  const setRowsPerPage = (rpp) => {
    window.localStorage.setItem('common-table-rows-per-page', rpp)
    _setRowsPerPage(rpp)
  }

  const handleChangePage = (event, newPage) => {
    if (onControlledPageChange) {
      onControlledPageChange(newPage, controlledRowsPerPage)
    } else {
      setPage(newPage)
    }
  }

  const handleChangeRowsPerPage = (event) => {
    if (onControlledPageChange) {
      onControlledPageChange(0, parseInt(event.target.value, 10))
    } else {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    }
  }

  useEffect(() => {
    const newHeaders = rows.length
      ? Object.keys(rows[0]).filter((h) => !statedHide.includes(h) && (!expandable || h !== 'expand'))
      : []

    const newVirtualRowsMap = buildVirtualRowsMap(newHeaders, statedVirtualRowsMapProp)
    if (!isEqual(headers, newVirtualRowsMap)) {
      setHeaders(newVirtualRowsMap)
    }
    return () => null
  }, [setHeaders, headers, rows, statedHide, statedVirtualRowsMapProp, colHeaders])

  const [sorts, setSorts] = useState(
    Object.values(sortableHeaders).reduce((o, key) => ({ ...o, [key]: null }), {})
  )

  const handleSort = useCallback((headerKey) => {
    if (sorts[headerKey] === null) {
      setSorts((sorts) => ({
        ...Object
          .keys(sorts)
          .reduce((s, h) => ({ ...s, [h]: null }), {}),
        [headerKey]: false
      }))
      onSortHeader(headerKey, false)
    } else if (sorts[headerKey] === false) {
      setSorts((sorts) => ({
        ...Object
          .keys(sorts)
          .reduce((s, h) => ({ ...s, [h]: null }), {}),
        [headerKey]: true
      }))
      onSortHeader(headerKey, true)
    } else {
      setSorts((sorts) => ({
        ...Object
          .keys(sorts)
          .reduce((s, h) => ({ ...s, [h]: null }), {}),
        [headerKey]: null
      }))
      onSortHeader(headerKey, null)
    }
  }, [sorts, setSorts, onSortHeader])

  return (
    loading
      ? <Box sx={{ width: '100%' }}><LinearProgress /></Box>
      : (
        <>
          {rows?.length
            ? (
              <Paper elevation={0} sx={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', ...sx }}>
                <TableContainer sx={{ ...maxHeight ? { maxHeight } : {}}}>
                  <Table stickyHeader={stickyHeader} {...size ? { size } : {}} className={classes.table + (noWrap ? ` ${classes.noWrap}` : '')}>
                    <TableHead>
                      <TableRow>
                        {expandable ? <TableCell /> : null}
                        {Object.keys(headers[0])
                          .map((header, index) => (
                            <TableCell
                              // eslint-disable-next-line react/no-array-index-key
                              key={index}
                              align={alignCell(header)}
                              sx={{ verticalAlign: verticalAlignCell(header) }}
                            >
                              {header in sortableHeaders
                                ? (
                                  <Button
                                    onClick={() => handleSort(sortableHeaders[header])}
                                    sx={{ textTransform: 'none', color: 'inherit' }}
                                  >
                                    {header}
                                    {sorts[sortableHeaders[header]] !== null
                                      ? (
                                          sorts[sortableHeaders[header]] === true
                                            ? <SortAscIcon />
                                            : <SortDescIcon />
                                        )
                                      : null}
                                  </Button>
                                  )
                                : header in colHeaders
                                  ? colHeaders[header]
                                  : header}
                            </TableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(controlledRowsPerPage === undefined && rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                      ).map((row, index) => (
                        <Row
                          key={keys ? keys(row) : index}
                          backgroundColor={backgroundColor}
                          color={color}
                          background={background}
                          borderLeftStyle={borderLeftStyle}
                          headers={headers}
                          rowHeaders={statedRowHeaders}
                          row={row}
                          alignCell={alignCell}
                          verticalAlignCell={verticalAlignCell}
                          virtualRowClass={classes.virtualRow}
                          expandable={expandable}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                { (pagination === undefined &&
                  (controlledTotal !== undefined
                    ? controlledTotal
                    : rows.length) > rowsPerPageOptions[0]) ||
                  pagination
                  ? (
                    <TablePaginationCell
                      sx={{ flex: '0 0 auto' }}
                      rowsPerPageOptions={rowsPerPageOptions}
                      count={controlledTotal !== undefined ? controlledTotal : rows.length}
                      rowsPerPage={controlledRowsPerPage !== undefined
                        ? controlledRowsPerPage
                        : rowsPerPage}
                      page={controlledPage !== undefined ? controlledPage : page}
                      onChangePage={handleChangePage}
                      onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    )
                  : null }
              </Paper>
              )
            : controlledTotal !== undefined && controlledTotal
              ? <Box sx={{ width: '100%' }}><LinearProgress /></Box>
              : <Box sx={{ width: '100%' }}>Aucune donnée.</Box>}
        </>
        )
  )
}

CommonTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rowHeaders: PropTypes.arrayOf(PropTypes.string),
  noWrap: PropTypes.bool,
  size: PropTypes.string,
  maxHeight: PropTypes.string,
  align: PropTypes.shape({}),
  verticalAlign: PropTypes.shape({}),
  backgroundColor: PropTypes.func,
  background: PropTypes.func,
  color: PropTypes.func,
  stickyHeader: PropTypes.bool,
  borderLeftStyle: PropTypes.func,
  hide: PropTypes.arrayOf(PropTypes.string),
  keys: PropTypes.func,
  virtualRowsMap: PropTypes.shape({}),
  pagination: PropTypes.bool,
  loading: PropTypes.bool,
  onSortHeader: PropTypes.func,
  sortableHeaders: PropTypes.shape({}),
  controlledPage: PropTypes.number,
  onControlledPageChange: PropTypes.func,
  controlledRowsPerPage: PropTypes.number,
  controlledRowsPerPageOptions: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({})
  ])),
  controlledTotal: PropTypes.number,
  headers: PropTypes.shape({}),
  sx: PropTypes.shape({})
}

CommonTable.defaultProps = {
  stickyHeader: false,
  rowHeaders: [],
  noWrap: false,
  loading: false,
  align: undefined,
  size: undefined,
  verticalAlign: undefined,
  backgroundColor: () => null,
  color: () => null,
  background: () => null,
  borderLeftStyle: () => null,
  hide: [],
  keys: null,
  maxHeight: null,
  virtualRowsMap: {},
  pagination: undefined,
  onSortHeader: null,
  sortableHeaders: {},
  controlledPage: undefined,
  onControlledPageChange: undefined,
  controlledRowsPerPage: undefined,
  controlledRowsPerPageOptions: undefined,
  controlledTotal: undefined,
  headers: {},
  sx: {}
}

export { CommonTable }
export default CommonTable
