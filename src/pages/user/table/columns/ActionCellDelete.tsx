import {FC, useEffect} from 'react'
import {QueryClient, useMutation, useQueryClient} from 'react-query'
import {ID} from '../../../../_metronic/helpers'
import {MenuComponent} from '../../../../_metronic/assets/ts/components'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {softDelete} from '../../core/_requests'
import {Collection} from '../../core/_models'
import {useConfirmationDialogContext} from '../../../../context/ConfirmationDialogContext'
import {useSnackbar} from 'notistack'

type Props = {
  id: ID
}

const ActionCellDelete: FC<Props> = ({id}) => {
  const {query, refetch} = useQueryResponse()
  const {enqueueSnackbar} = useSnackbar()
  const queryClient = useQueryClient()
  const {showConfirmation} = useConfirmationDialogContext()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const deleteItem = useMutation(() => softDelete(Collection, id), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${Collection}-${query}`])
      enqueueSnackbar('Data successfully deleted', {
        variant: 'success',
      })
      refetch();
    },
  })

  const clickHandler = async () => {
    const title = 'Delete Item'
    const message = 'Are you sure want to delete this data?'
    const response = await showConfirmation(title, message)
    if (response) {
      await deleteItem.mutateAsync()
    }
  }

  return (
    <>
      {/* begin::Menu item */}
      <div className='menu-item px-3'>
        <a
          className='menu-link px-3'
          data-kt-users-table-filter='delete_row'
          onClick={clickHandler}
        >
          Delete
        </a>
        {/* <a
            className='menu-link px-3'
            data-kt-users-table-filter='delete_row'
            onClick={handleDeleteModal}
          >
            Delete
          </a> */}
      </div>
      {/* end::Menu item */}
    </>
  )
}

export { ActionCellDelete }
