import React, { useCallback, useState, memo, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import TablePagination from '@material-ui/core/TablePagination'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

import {
  ArrowDownward as SortDescIcon,
  ArrowUpward as SortAscIcon
} from '@material-ui/icons'

import { makeStyles } from '@material-ui/styles'
import isEqual from 'fast-deep-equal/es6/react'
import Table from './TableResponsive'

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: theme.spacing(3),
    maxWidth: '100%'
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

const Row = memo(({
  backgroundColor,
  headers,
  rowHeaders,
  row,
  alignCell,
  verticalAlignCell,
  virtualRowClass,
  borderLeftStyle
}) => (
  <>
    {Object.keys(headers)
      .sort()
      .map((line) => (
        <TableRow
          key={line}
          style={{
            ...(borderLeftStyle(row) !== null
              ? { borderLeft: borderLeftStyle(row) }
              : {}),
            ...(backgroundColor(row) !== null
              ? { backgroundColor: backgroundColor(row) }
              : {})
          }}
          className={(parseInt(line, 10) + 1) >= Object.keys(headers).length
            ? null
            : virtualRowClass}
        >
          {Object.keys(headers[line]).map((header, index) => (
            <TableCell
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              align={alignCell(header)}
              sx={{ verticalAlign: verticalAlignCell(header) }}
              component={rowHeaders.includes(header) ? 'th' : 'td'}
              {...headers[line][header]}
              {...(index === Object.keys(headers[line]).length - 1 ? { colSpan: 5000 } : {})}
            >
              {row[header]}
            </TableCell>
          ))}
        </TableRow>
      ))}
  </>
), isEqual)

Row.propTypes = {
  backgroundColor: PropTypes.func,
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
  onChangeRowsPerPage
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
  verticalAlign,
  backgroundColor,
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
  loading
}) => {
  const classes = useStyles()
  align = useMemo(() => align, [])
  backgroundColor = backgroundColor || (() => null)
  const [statedHide] = useState(hide || [])
  const [statedRowHeaders] = useState(rowHeaders || [])
  const [statedVirtualRowsMapProp] = useState(virtualRowsMap || {})
  const alignCell = useCallback((key) => (align !== undefined && align[key] !== undefined ? align[key] : 'right'), [align])
  const verticalAlignCell = useCallback((key) => (verticalAlign !== undefined && verticalAlign[key] !== undefined ? verticalAlign[key] : 'middle'), [verticalAlign])
  const [headers, setHeaders] = useState(rows.length
    ? buildVirtualRowsMap(Object.keys(rows[0])
      .filter((h) => !statedHide.includes(h)), statedVirtualRowsMapProp)
    : {})
  const [page, setPage] = React.useState(0)
  const rowsPerPageOptions = controlledRowsPerPageOptions || [25, 50, 100, { value: -1, label: 'Tout' }]
  const [rowsPerPage, _setRowsPerPage] = React.useState(
    parseInt(window.localStorage.getItem('common-table-rows-per-page'), 10) || rowsPerPageOptions[0]
  )
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
      ? Object.keys(rows[0]).filter((h) => !statedHide.includes(h))
      : []

    const newVirtualRowsMap = buildVirtualRowsMap(newHeaders, statedVirtualRowsMapProp)
    if (!isEqual(headers, newVirtualRowsMap)) {
      setHeaders(newVirtualRowsMap)
    }
  }, [setHeaders, headers, rows, statedHide, statedVirtualRowsMapProp])

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
          { (pagination === undefined &&
            (controlledTotal !== undefined
              ? controlledTotal
              : rows.length) > rowsPerPageOptions[0]) ||
            pagination
            ? (
              <TablePaginationCell
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
          {rows?.length
            ? (
              <Table className={classes.table + (noWrap ? ` ${classes.noWrap}` : '')} aria-label="simple table">
                <TableHead>
                  <TableRow>
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
                      borderLeftStyle={borderLeftStyle}
                      headers={headers}
                      rowHeaders={statedRowHeaders}
                      row={row}
                      alignCell={alignCell}
                      verticalAlignCell={verticalAlignCell}
                      virtualRowClass={classes.virtualRow}
                    />
                  ))}
                </TableBody>
              </Table>
              )
            : controlledTotal !== undefined && controlledTotal
              ? <Box sx={{ width: '100%' }}><LinearProgress /></Box>
              : <Box sx={{ width: '100%' }}>Aucune donnée.</Box>}
          { (pagination === undefined &&
            (controlledTotal !== undefined
              ? controlledTotal
              : rows.length) > rowsPerPageOptions[0]) ||
            pagination
            ? (
              <TablePaginationCell
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
        </>
        )
  )
}

CommonTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  rowHeaders: PropTypes.arrayOf(PropTypes.string),
  noWrap: PropTypes.bool,
  align: PropTypes.shape({}),
  verticalAlign: PropTypes.shape({}),
  backgroundColor: PropTypes.func,
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
  controlledTotal: PropTypes.number
}

CommonTable.defaultProps = {
  rowHeaders: [],
  noWrap: false,
  loading: false,
  align: undefined,
  verticalAlign: undefined,
  backgroundColor: () => null,
  borderLeftStyle: () => null,
  hide: [],
  keys: null,
  virtualRowsMap: {},
  pagination: undefined,
  onSortHeader: null,
  sortableHeaders: {},
  controlledPage: undefined,
  onControlledPageChange: undefined,
  controlledRowsPerPage: undefined,
  controlledRowsPerPageOptions: undefined,
  controlledTotal: undefined
}

export { CommonTable }
export default CommonTable
