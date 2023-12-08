import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {InitialValue} from '../../../../models/genres'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import {update} from '../../core/_requests'

type props = {
  data: Model
}

const EditPage: FC<props> = ({data}) => {
  const [formValues, setFormValues] = useState<Model>(InitialValue)
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<Model>({defaultValues: data})

  useEffect(() => {
    Object.entries(data).map(([name, value]) => setValue(name as keyof Model, value))
  }, [data])


  const onError: SubmitErrorHandler<Model> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
  }

  const onSubmit: SubmitHandler<Model> = async (data: Model, e: any) => {
    try {
      await update(`${Collection}`, data.id, data).then((response) => {
        const {data} = response
        if (data) {
          enqueueSnackbar('Privilege Updated', {
            variant: 'success',
          })
        }
        navigate(`/${Collection}`)
      })
    } catch (e) {
      console.log(e)
    }
  }

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Edit Privilege</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className='mb-4'>
              <Form.Label>Genres</Form.Label>
              <Form.Control type='text' {...register('Name', {required: 'This is required'})} />
              <span className='text-danger pt-4'>{errors.Name?.message}</span>
            </Form.Group>
            
            <Form.Group className='mb-4 d-flex justify-content-end'>
              <Button variant='secondary' onClick={backButton}>
                Back
              </Button>
              <Button variant='primary' className='ms-4' type='submit'>
                Update
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditPage
