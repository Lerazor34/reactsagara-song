import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import EditPage from './EditPage'
import { Model, Collection } from '../../core/_models'
import { InitialValue } from '../../../../models/artists'
import { getOneById } from '../../core/_requests'

const EditWrapper: FC = () => {
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState<Model>(InitialValue)

  useEffect(() => {
    getOneById(Collection, id).then((response) => {
      const {data}  = response;
      setForm({...form, ...(data.data as any)})
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return <EditPage data={form} />
}

export default EditWrapper
