// @ts-nocheck
import {Column} from 'react-table'
import {SelectionHeader} from './SelectionHeader'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {ColumnString} from '../../../../components/table/column/ColumnString'
import {ActionsCell} from './ActionsCell'

const usersColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Group' className='min-w-125px' />,
    id: 'group',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['group']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Key' className='min-w-125px' />,
    id: 'key',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['key']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Value' className='min-w-125px' />,
    id: 'value',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['value']} />
    },
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Long Value' className='min-w-125px' />,
    id: 'long_value',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['long_value']} />
    },
  },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
