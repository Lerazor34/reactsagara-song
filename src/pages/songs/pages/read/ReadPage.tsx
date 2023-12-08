import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import { InitialValue } from '../../../../models/songs'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router'
import { getOneById } from '../../core/_requests'
import { genres } from '../../../../models/genres'
import axios from 'axios'
import { artists } from '../../../../models/artists'
import { songs_artists } from '../../../../models/songs_artists'


const ReadPage: FC = () => {
  const params = useParams();
  const { id } = params;
  
  const [formValues, setFormValues] = useState<Model>(InitialValue);
  useEffect(() => {
    getOneById(Collection, id).then((response) => {
      setFormValues({...formValues, ...(response.data.data as any)})
    })
  }, [])
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
  },[id]);

  function getArtistsBySongsId(songsId: string): String[]{
    console.log('songsId:', songsId);
    const artistses = songsArtists
    .filter((songsArtists) => String(songsArtists.songs_id) === songsId)
    .map((songsArtists)=> Number(songsArtists.artists_id));

    // const getTheArtistses = artists
    // .filter((artisted)=>artisted.id = songsId as any)
    console.log('artists:', artistses);

    const artistsName = artistses.map((artistses)=>artists.find((artists)=>artists.id === artistses)?.Name || '');
    console.log('artistsName :', artistsName)
    return artistsName;
    
  }

  const [genres, setGenres] = useState<genres[]>([])
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/genres?!skip=0&!limit=100');
        const data = response.data.data;
        setGenres(data);
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
        const response = await axios.get('http://127.0.0.1:8000/api/v1/artists');
        const data = response.data.data;
        setArtists(data);
      }catch(error){
        console.error('error fetching genres:',error);
      }
    };
    fetchData();
  },[]);

  const navigate = useNavigate()

  const backButton = () => {
    navigate(`/${Collection}`);
  }

  
  
  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Read Songs</h3>
        </div>
        <div className='card-body'>
          <Form>
            <Form.Group className='mb-4'>
              <Form.Label>name</Form.Label>
              <Form.Control
                type='text'
                name='Name'
                value={formValues.Name}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
            <Form.Label>Genres</Form.Label>
              <Form.Control
                type='text'
                name='genres_id'
                value={genres.find(genre=>genre.id === formValues.genres_id)?.Name}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
            <Form.Label>Artists</Form.Label>
              <Form.Control
                type='text'
                name='artists'
                value={id ? getArtistsBySongsId(id).join(', '):''}
                readOnly
              />
            </Form.Group>
            <Form.Group className='mb-4'>
              <Form.Label>Published Date</Form.Label>
              <Form.Control
                type='date'
                name='publishedDate'
                value={formValues.publishedDate as any}
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
