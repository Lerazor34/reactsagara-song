import {useQueryClient, useMutation} from 'react-query'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {bulkSoftDelete} from '../../core/_requests'
import {useResourceContext} from '../../context/ResourceContext'

const ListGrouping = () => {
  const {selected, clearSelected} = useListView()
  const queryClient = useQueryClient()
  const {query} = useQueryResponse()
  const {collection} = useResourceContext()

  const deleteSelectedItems = useMutation(() => bulkSoftDelete(collection, selected), {
    onSuccess: () => {
      queryClient.invalidateQueries([`${query}`])
      clearSelected()
    },
  })

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span> Selected
      </div>

      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => await deleteSelectedItems.mutateAsync()}
      >
        Delete Selected
      </button>
    </div>
  )
}

export {ListGrouping}
