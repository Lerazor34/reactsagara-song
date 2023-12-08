import {FC, useEffect, useState} from 'react'
import {useParams} from 'react-router'
import EditPage from './EditPage'
import {Model, Collection} from '../../core/_models'
import {InitialValue, UserResponse} from '../../../../models/user'
import {getOneById} from '../../core/_requests'

const EditWrapper: FC = () => {
  const params = useParams()
  const {id} = params

  const [form, setForm] = useState<Model>(InitialValue)

  useEffect(() => {
    getOneById(Collection, id).then((response) => {
      const data = response.data as unknown as UserResponse;
      if (data) {
        const user: Model = {
          id: data.id,
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          role: data.role?.join(",")
        } 
        setForm({...form, ...user})

      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  return <EditPage data={form} />
}

export default EditWrapper
