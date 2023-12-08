import {useMemo} from 'react'
import {useTable, ColumnInstance, Row} from 'react-table'
import {useQueryResponseData, useQueryResponseLoading} from '../core/QueryResponseProvider'
import {usersColumns} from './columns/_columns'
import {ListLoading} from '../components/loading/ListLoading'
import {ListPagination} from '../components/pagination/ListPagination'
import {KTCardBody} from '../../../_metronic/helpers'
import {ResourceHeader} from '../../../components/table/header/ResourceHeader'
import {ResourceRow} from '../../../components/table/row/ResourceRow'

import { ListSearchComponent } from '../components/header/ListSearchComponent'
import { ListFilter } from '../components/header/ListFilter'

const Table = () => {
  const response = useQueryResponseData()
  const isLoading = useQueryResponseLoading()
  const data = useMemo(() => response, [response])
  const columns = useMemo(() => usersColumns, [])
  const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
    columns,
    data,
  })

  return (
    <KTCardBody className='py-4'>

      <div className="d-flex align-items-center mb-5">
        <ListSearchComponent/>
        <ListFilter />
        <div className="d-flex align-items-center">
          <label htmlFor="" className="text-nowrap me-5" >Show data status</label>
          <select className="form-select form-select-solid" aria-label="Select example">
            <option>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

      </div>

      <div className='table-responsive'>
        <table
          id='kt_table_users'
          className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
          {...getTableProps()}
        >
          <thead>
            <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
              {headers.map((column: ColumnInstance) => (
                <ResourceHeader key={column.id} column={column} />
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
            {rows.length > 0 ? (
              rows.map((row: Row, i) => {
                prepareRow(row)
                return <ResourceRow row={row} key={`row-${i}-${row.id}`} />
              })
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                    No matching records found
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ListPagination />
      {isLoading && <ListLoading />}
    </KTCardBody>
  )
}

export {Table}
