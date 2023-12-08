import { KTSVG } from '../../../../_metronic/helpers'
import { useFormatter } from '../../../../hooks/useFormatter'
import { useResourceContext } from '../../../../context/ResourceContext'
import { ListFilter } from './ListFilter'
import { Link } from 'react-router-dom'

const ListToolbar = () => {
  const { collection } = useResourceContext()
  const { capitalizeFormatUndescoreString } = useFormatter()

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <ListFilter /> */}

      <Link className='btn btn-primary' to={`create`}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add {capitalizeFormatUndescoreString(collection)}
      </Link>

      {/* <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
      </button> */}
    </div>
  )
}

export { ListToolbar }
