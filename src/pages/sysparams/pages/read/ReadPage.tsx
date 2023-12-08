import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import {InitialValue} from '../../../../models/sysparams'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router'
import {getOneById} from '../../core/_requests'

const ReadPage: FC = () => {
  const params = useParams()
  const {id} = params
  const [formValues, setFormValues] = useState<Model>(InitialValue)
  useEffect(() => {
    getOneById(Collection, id as string).then((response) => {
      setFormValues({...formValues, ...(response.data as any)})
    })
  }, [])
  const navigate = useNavigate()

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">Read Master Album</h3>
        </div>
        <div className="card-body">
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Groups</Form.Label>
              <Form.Control type="text" name="code" value={formValues.group} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Key</Form.Label>
              <Form.Control type="text" name="name" value={formValues.key} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Value</Form.Label>
              <Form.Control type="text" name="name" value={formValues.value} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Long Value</Form.Label>
              <Form.Control type="text" name="name" value={formValues.long_value} readOnly />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Long Value</Form.Label>
              <Form.Control type="text" name="name" value={formValues.long_value} readOnly />
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-end">
              <Button variant="secondary" onClick={backButton}>
                Back
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ReadPage
