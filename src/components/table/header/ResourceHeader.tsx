// @ts-nocheck
import {FC} from 'react'
import {ColumnInstance} from 'react-table'

type Props<Type> = {
  column: ColumnInstance<Type>
}

const ResourceHeader: FC<Props> = ({column}) => {
  const {Header} = column as ColumnInstance

  return (
    <>
      {Header && typeof Header === 'string' ? (
        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
      ) : (
        column.render('Header')
      )}
    </>
  )
}

export {ResourceHeader}
