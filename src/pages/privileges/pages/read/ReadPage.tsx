import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import { InitialValue } from '../../../../models/priveleges'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router'
import { getOneById } from '../../core/_requests'

const ReadPage: FC = () => {
  const params = useParams();
  const { id } = params;
  const [formValues, setFormValues] = useState<Model>(InitialValue);
  useEffect(() => {
    getOneById(Collection, id).then((response) => {
      setFormValues({...formValues, ...(response.data as any)})
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
          <h3 className='card-title'>Read Privilege</h3>
        </div>
        <div className='card-body'>
          <Form>
            <Form.Group className='mb-4'>
              <Form.Label>Module</Form.Label>
              <Form.Control
                type='text'
                name='module'
                value={formValues.module}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Sub Module</Form.Label>
              <Form.Control
                type='text'
                name='submodule'
                value={formValues.submodule}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Action</Form.Label>
              <Form.Control
                type='text'
                name='action'
                value={formValues.action}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Method</Form.Label>
              <Form.Control
                type='text'
                name='method'
                value={formValues.method}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>URI</Form.Label>
              <Form.Control
                type='text'
                name='uri'
                value={formValues.uri}
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
