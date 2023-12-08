/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { initialQueryState, KTSVG, useDebounce } from '../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { useResourceContext } from '../../../../context/ResourceContext'

const ListSearchComponent = () => {
  const { updateState } = useQueryRequest()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const debouncedSearchTerm = useDebounce(searchTerm, 150)
  const { collection } = useResourceContext()

  useEffect(() => {
    if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
      updateState({ search: debouncedSearchTerm, ...initialQueryState })
    }
  }, [debouncedSearchTerm])

  return (
    <div className='card-title mb-0'>

      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1 '>
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control w-250px ps-14'
          placeholder={`Seach ${collection}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export { ListSearchComponent }
