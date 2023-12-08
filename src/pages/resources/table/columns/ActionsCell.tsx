/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../_metronic/helpers'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {softDelete} from '../../core/_requests'
import {useResourceContext} from '../../context/ResourceContext'
import {Link} from 'react-router-dom'

type Props = {
  id: ID
}

const ActionsCell: FC<Props> = ({id}) => {
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()
  const {collection} = useResourceContext()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation(() => softDelete(collection, id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
    },
  })

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Actions
        <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <Link className='menu-link px3' to={`${id}/edit`}>
            Edit
          </Link>

          {/* <a className='menu-link px-3' onClick={openEditModal}>
            Edit
          </a> */}
        </div>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <div className='menu-item px-3'>
          <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={async () => await deleteItem.mutateAsync()}
          >
            Delete
          </a>
        </div>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {ActionsCell}
