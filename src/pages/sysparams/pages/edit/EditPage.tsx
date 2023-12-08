import {FC, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import {update} from '../../core/_requests'

type props = {
  data: Model
}

const EditPage: FC<props> = ({data}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          enqueueSnackbar('Sysparam Updated', {
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
      <div className="card card-custom">
        <div className="card-header">
          <h3 className="card-title">Edit Master Album</h3>
        </div>
        <div className="card-body">
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className="mb-4">
              <Form.Label>Group</Form.Label>
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
                {...register('long_value', {})}
              />
            </Form.Group>
            <Form.Group className="mb-4 d-flex justify-content-end">
              <Button variant="secondary" onClick={backButton}>
                Back
              </Button>
              <Button variant="primary" className="ms-4" type="submit">
                Update
              </Button>
            </Form.Group>
            <Form.Group></Form.Group>
          </Form>
        </div>
      </div>
    </>
  )
}

export default EditPage
