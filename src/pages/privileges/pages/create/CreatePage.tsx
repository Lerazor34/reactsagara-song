import {FC, useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {create} from '../../core/_requests'
import {Model, Collection} from '../../core/_models'
import {InitialValue} from '../../../../models/priveleges'
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
          enqueueSnackbar('Privilege Created', {
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
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Create</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className='mb-4'>
              <Form.Label>Module</Form.Label>
              <Form.Control type='text' {...register('module', {required: 'This is required'})} />
              <span className='text-danger pt-4'>{errors.module?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Sub Module</Form.Label>
              <Form.Control
                type='text'
                {...register('submodule', {
                  required: 'This is required too',
                  minLength: {value: 4, message: `submodule min 4 characters`},
                })}
              />
              <span className='text-danger'>{errors.submodule?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Ordering</Form.Label>
              <Form.Control type='text' {...register('ordering')} />
              <span className='text-danger pt-4'>{errors.ordering?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Action</Form.Label>
              <Form.Control type='text' {...register('action', {required: 'Action required'})} />
              <span className='text-danger pt-4'>{errors.action?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Method</Form.Label>
              <Form.Control type='text' {...register('method', {required: 'Method required'})} />
              <span className='text-danger pt-4'>{errors.method?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>URI</Form.Label>
              <Form.Control type='text' {...register('uri', {required: 'URI required'})} />
              <span className='text-danger pt-4'>{errors.uri?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4 d-flex justify-content-end'>
              <Button variant='secondary' onClick={backButton}>
                Back
              </Button>
              <Button variant='primary' className='ms-4' type='submit'>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}
