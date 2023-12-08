// @ts-nocheck
import {Column} from 'react-table'
import { useState, useEffect } from 'react'
import {SelectionHeader} from './SelectionHeader'
import {SelectionCell} from './SelectionCell'
import {CustomHeader} from './CustomHeader'
import {ColumnString} from '../../../../components/table/column/ColumnString'
import {ActionsCell} from './ActionsCell'
import ReadPage from '../../pages/read/ReadPage'
import { genres } from '../../../../models/genres'
import axios from 'axios'

const usersColumns: ReadonlyArray<Column<any>> = [
  {
    Header: (props) => <SelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <SelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <CustomHeader tableProps={props} title='Name' className='min-w-125px' />,
    id: 'Name',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      return <ColumnString value={entry['Name']} />
    },
  },
  
  {
    Header: (props) => <CustomHeader tableProps={props} title='Genres' className='min-w-125px' />,
    id: 'genres_id',
    Cell: ({...props}) => {
      const entry = props.data[props.row.index]
      const [genres, setGenres] = useState<genres[]>([])

      useEffect(()=>{
        const fetchData = async()=>{
          try{
            const response = await axios.get('http://127.0.0.1:8000/api/v1/genres');
            const dataGenre = response.data.data as genres[];
            setGenres(dataGenre);
          }catch(error){
            console.error('error fetching genres:',error);
          }
        };
        fetchData();
      },[]);
      const genreses = genres.find((gen) => gen.id === entry['genres_id']);
      return <span>{genreses ? genreses.Name : '...'}</span>
    },
  },
  
  
  // {
  //   Header: (props) => <CustomHeader tableProps={props} title='Action' className='min-w-125px' />,
  //   id: 'action',
  //   Cell: ({...props}) => {
  //     const entry = props.data[props.row.index]
  //     return <ColumnString value={entry['action']} />
  //   },
  // },
  {
    Header: (props) => (
      <CustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <ActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
