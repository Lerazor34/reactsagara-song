import {FC, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {create} from '../../core/_requests'
import {Model, Collection} from '../../core/_models'
import {InitialValue} from '../../../../models/sysparams'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'

export const CreatePage: FC = () => {
  const [formValues] = useState<Model>(InitialValue)
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Model>({defaultValues: formValues})
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  const onError: SubmitErrorHandler<Model> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
  }

  const onSubmit: SubmitHandler<Model> = async (data: Model, e: any) => {
    try {
      await create(`${Collection}`, data).then((response) => {
        const {data} = response
        if (data) {
          enqueueSnackbar('Master Sysparam Created', {
            variant: 'success',
          })
        }
        navigate(`/${Collection}`)
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">Create</h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-4">
              <Form.Label>Groups</Form.Label>
              <Form.Control
                type="text"
                {...register('group', {
                  required: 'Groups required',
                })}
              />
              <span className="text-danger pt-4">{errors.group?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Key</Form.Label>
              <Form.Control
                type="text"
                {...register('key', {
                  required: 'Key required',
                })}
              />
              <span className="text-danger pt-4">{errors.key?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Value</Form.Label>
              <Form.Control
                type="text"
                {...register('value', {
                  required: 'Value required',
                })}
              />
              <span className="text-danger pt-4">{errors.value?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Long Value</Form.Label>
              <Form.Control
                type="text"
                {...register('long_value', {
                  required: 'Long Value required',
                })}
              />
              <span className="text-danger pt-4">{errors.long_value?.message}</span>
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-end">
              <Button variant="secondary" onClick={backButton}>
                Back
              </Button>
              <Button variant="primary" className="ms-4" type="submit">
                Save
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}
