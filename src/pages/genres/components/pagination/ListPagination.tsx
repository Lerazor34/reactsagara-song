/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponse, useQueryResponseLoading} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {LinkPagination} from '../../../../_metronic/helpers'

const mappedLabel = (label: string): string => {
  if (label === '&laquo; Previous') {
    return 'Previous'
  }

  if (label === 'Next &raquo;') {
    return 'Next'
  }

  return label
}

const ListPagination = () => {
  const {response} = useQueryResponse()
  const isLoading = useQueryResponseLoading()
  const {updateState, state} = useQueryRequest()
  const updatePage = (skip: number, limit: number) => {
    updateState({skip, limit})
  }
  const {limit, skip} = state
  const page: number = Math.floor(skip / limit) + 1
  const maxLeftPagination: number = 3
  const maxRightPagination: number = 3
  const paginations: Array<LinkPagination> = []

  if (response) {
    const {data} = response
    if (data) {
      const {count} = data
      const maxPagination: number = Math.floor(count / limit) + (count % limit ? 1 : 0)
      const minPageNumber = page <= maxLeftPagination ? 1 : page - maxLeftPagination
      const maxPageNumber = page + maxRightPagination > maxPagination ? maxPagination : page 
      let pageNumber = minPageNumber
      do {
        const pageSkipStart = (pageNumber - 1) * limit
        const active = page === pageNumber
        const label = pageNumber.toString()
        const entry: LinkPagination = {
          active,
          label,
          page: pageNumber,
          skip: pageSkipStart,
          limit,
        }
        paginations.push(entry)
        pageNumber++
      } while (pageNumber <= maxPageNumber)
    }
  }

  return (
    <div className='row'>
      <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
      <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
        <div id='kt_table_users_paginate'>
          <ul className='pagination'>
            {paginations
              .map((link) => {
                return {...link, label: mappedLabel(link.label)}
              })
              .map((link) => {
                const {label, skip, limit} = link
                return (
                  <li
                    key={label}
                    className={clsx('page-item', {
                      active: page === link.page,
                      disabled: isLoading,
                      previous: label === 'Previous',
                      next: label === 'Next',
                    })}
                    onClick={() => {
                      updatePage(skip, limit)
                    }}
                    style={{cursor: 'pointer'}}
                  >
                    <a
                      className={clsx('page-link', {
                        'page-text': label === 'Previous' || label === 'Next',
                        'me-5': label === 'Previous',
                      })}
                    >
                      {mappedLabel(label)}
                    </a>
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export {ListPagination}
