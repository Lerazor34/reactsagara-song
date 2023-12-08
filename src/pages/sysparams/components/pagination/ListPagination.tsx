/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {useQueryResponse, useQueryResponseLoading} from '../../core/QueryResponseProvider'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {LinkPagination} from '../../../../_metronic/helpers'
import { PaginationHelpers } from '../../../../_metronic/helpers/crud-helper/PaginationHelpers'

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
  
  let paginations: Array<LinkPagination> = []

  if (response) {
    const {data} = response
    if (data) {
      const {count} = data
      paginations = PaginationHelpers({count,limit,page});
      
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
              .map((link,index) => {
                const {label, skip, limit, type} = link

                if(type === 'sparator'){
                  return (
                    <li key={index}
                    className={clsx('page-item', {
                      active: false,
                      disabled: true,
                      previous: false,
                      next: false,
                    })}
                    >{label}</li>
                  );

                }
                
                return (
                  <li
                    key={index}
                    className={clsx('page-item', {
                      active: link.active,
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
