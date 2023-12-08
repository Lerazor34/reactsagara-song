import {Dispatch, SetStateAction} from 'react'

export type ID = undefined | null | number

export interface LinkPagination {
  label: string
  active: boolean
  page: number | null
  skip: number
  limit: number
  type?: string
}

export type PaginationState = {
  skip: number
  limit: number
}

export type SortState = {
  sort?: {
    [key: string]: 1 | -1
  }
}

export type FilterState = {
  filter?: unknown
}

export type SearchState = {
  search?: string
}

export type ResponseModel<T> = {
  data: {
    data: Array<T>
    count: number
  }
  payload?: {
    message?: string
    errors?: {
      [key: string]: Array<string>
    }
    pagination?: PaginationState
  }
}

export type QueryState = PaginationState & SortState & FilterState & SearchState

export type QueryRequestContextProps = {
  state: QueryState
  updateState: (updates: Partial<QueryState>) => void
}

export const initialQueryState: QueryState = {
  skip: 0,
  limit: parseInt(process.env.REACT_APP_LIMIT_PAGE || '10'),
}

export const initialQueryRequest: QueryRequestContextProps = {
  state: initialQueryState,
  updateState: () => {},
}

export type QueryResponseContextProps<T> = {
  response?: ResponseModel<Array<T>>
  refetch: () => void
  isLoading: boolean
  query: string
}

export const initialQueryResponse = {refetch: () => {}, isLoading: false, query: ''}

export type ListViewContextProps = {
  selected: Array<ID>
  onSelect: (selectedId: ID) => void
  onSelectAll: () => void
  clearSelected: () => void
  // NULL => (CREATION MODE) | MODAL IS OPENED
  // NUMBER => (EDIT MODE) | MODAL IS OPENED
  // UNDEFINED => MODAL IS CLOSED
  itemIdForUpdate?: ID
  setItemIdForUpdate: Dispatch<SetStateAction<ID>>
  isAllSelected: boolean
  disabled: boolean
}

export const initialListView: ListViewContextProps = {
  selected: [],
  onSelect: () => {},
  onSelectAll: () => {},
  clearSelected: () => {},
  setItemIdForUpdate: () => {},
  isAllSelected: false,
  disabled: false,
}
