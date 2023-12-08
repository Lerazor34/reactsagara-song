import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import { InitialValue } from '../../../../models/genres'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router'
import { getOneById } from '../../core/_requests'

const ReadPage: FC = () => {
  const params = useParams();
  const { id } = params;
  const [formValues, setFormValues] = useState<Model>(InitialValue);
  useEffect(() => {
    getOneById(Collection, id).then((response) => {
      setFormValues({...formValues, ...(response.data.data as any)})
    })
  }, [])
  const navigate = useNavigate()

  const backButton = () => {
    navigate(`/${Collection}`);
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Read Genres</h3>
        </div>
        <div className='card-body'>
          <Form>
            <Form.Group className='mb-4'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='Name'
                value={formValues.Name}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4 d-flex justify-content-end'>
              <Button variant='secondary' onClick={backButton}>Back</Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ReadPage
