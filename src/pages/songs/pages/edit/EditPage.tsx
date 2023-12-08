import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import {Button, Form} from 'react-bootstrap'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {InitialValue} from '../../../../models/songs'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import {update} from '../../core/_requests'
import { genres } from '../../../../models/genres'
import { artists } from '../../../../models/artists'
import axios from 'axios'

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

  const [genres, setGenres] = useState<genres[]>([])
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/genres');
        const data = response.data.data;
        setGenres(data);
      }catch(error){
        console.error('error fetching genres:',error);
      }
    };
    fetchData();
  },[]);

  const onError: SubmitErrorHandler<Model> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
  }

  const onSubmit: SubmitHandler<Model> = async (data: Model, e: any) => {
    try {
      await update(`${Collection}`, data.id, data).then((response) => {
        const {data} = response
        if (data) {
          enqueueSnackbar('Songs Updated', {
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
          <h3 className='card-title'>Edit Songs</h3>
        </div>
        <div className='card-body'>
          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <Form.Group className='mb-4'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' {...register('Name', {required: 'This is required'})} />
              <span className='text-danger pt-4'>{errors.Name?.message}</span>
            </Form.Group>

            <Form.Group className='mb-4'>
              <Form.Label>Genres</Form.Label>
              <Form.Control  as='select'
                {...register('genres_id', {
                  required: 'this is required too',
                  minLength: {
                    value: 4,
                    message: 'submodule min 4 characters',
                  },
                })}>
                  <option value="">select genres</option>
                    {genres.map(genres => (
                  <option key={genres.id} value={genres.id as unknown as string}>{genres.Name}</option>
                  ))}
              </Form.Control>
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
