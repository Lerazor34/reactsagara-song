import {FC, useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {create} from '../../core/_requests'
import {Model, Collection} from '../../core/_models'
import {InitialValue} from '../../../../models/songs'
import {useNavigate} from 'react-router'
import {useSnackbar} from 'notistack'
import {SubmitHandler, useForm, SubmitErrorHandler} from 'react-hook-form'
import axios from 'axios'
import { genres } from '../../../../models/genres'
import { artists } from '../../../../models/artists'
import { songs_artists } from '../../../../models/songs_artists'
import { addsongsmodel } from '../../../../models/addsongsmodel'
import { InitialValue as addInitialValue } from '../../../../models/addsongsmodel'


export const CreatePage: FC = () => {
  const [formValues] = useState<addsongsmodel>(addInitialValue)
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<addsongsmodel>({defaultValues: formValues})
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()

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

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const [songsArtists, setSongsArtists] = useState<songs_artists[]>([])
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/songs_artists?!skip=0&!limit=100');
        const data = response.data.data;
        console.log('response api',response.data);
        setSongsArtists(data);
      }catch(error){
        console.error('error fetching genres:',error);
      }
    };
    fetchData();
  },[]);
  const [artists, setArtists] = useState<artists[]>([])
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/artists?!skip=0&!limit=100');
        const data = response.data.data;
        setArtists(data);
      }catch(error){
        console.error('error fetching genres:',error);
      }
    };
    fetchData();
  },[]);

  const backButton = () => {
    navigate(`/${Collection}`)
  }

  const onError: SubmitErrorHandler<Model> = (errors) => {
    // collection of form error
    // example: console.log('ERROR:', errors.submodule)
  }

 
  const onSubmit: SubmitHandler<addsongsmodel> = async (data: addsongsmodel, e: any) => {
    try {
      console.log('console data :', data);  

      await create(`addSongs`, data).then((response) => {
        const {data} = response              
        if (data) {
          enqueueSnackbar('songs Created', {
            variant: 'success',
          })
        }
        navigate(`/${Collection}`)
      })
    } catch (e) {
      console.log(e)
    }
};

  
  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Create</h3>
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
              <Form.Control as="select"{...register('genres_id', {required: 'This is required too',})}>
              <option value="">select genres</option>
              {genres.map(genres => (
              <option key={genres.id} value={genres.Name}>{genres.Name}</option>
              ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Artists</Form.Label>
              <Form.Control
                as="select"
                multiple
                {...register('artists_id', { required: 'At least one artist is required' })}
              >
                {artists.map((artist) => (
                  <option key={artist.Name} value={artist.Name}>
                    {artist.Name}
                  </option>
                ))}
              </Form.Control>
              <span className='text-danger pt-4'>{errors.artists_id?.message}</span>
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Published Date</Form.Label>
              <Form.Control type='date' {...register('publishedDate', {required: 'This is required'})} />
              <span className='text-danger pt-4'>{errors.publishedDate?.message}</span>
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
