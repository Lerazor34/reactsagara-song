import { useListView } from '../../core/ListViewProvider'
import { ListToolbar } from './ListToolbar'
import { ListGrouping } from './ListGrouping'
import { useResourceContext } from '../../../../context/ResourceContext'
import { useFormatter } from '../../../../hooks/useFormatter'
// import { ListSearchComponent } from './ListSearchComponent'

const ListHeader = () => {
  const { selected } = useListView()
  const { collection } = useResourceContext()
  const { capitalizeFormatUndescoreString } = useFormatter()

  return (
    <div className='card-header border-0 pt-6 d-flex align-items-center'>
      <h3>List {capitalizeFormatUndescoreString(collection)}</h3>

      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <ListGrouping /> : <ListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}

      {/* <ListSearchComponent /> */}



    </div>
  )
}

export { ListHeader }
