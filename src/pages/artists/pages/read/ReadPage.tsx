import {FC, useState, useEffect} from 'react'
import {Model, Collection} from '../../core/_models'
import { InitialValue } from '../../../../models/artists'
import {Button, Form} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router'
import { getOneById } from '../../core/_requests'
import { songs_artists } from '../../../../models/songs_artists'
import axios from 'axios'
import { songs } from '../../../../models/songs'

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

  const [songs, setSongs] = useState<songs[]>([])
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://127.0.0.1:8000/api/v1/songs');
        const data = response.data.data;
        setSongs(data);
      }catch(error){
        console.error('error fetching genres:',error);
      }
    };
    fetchData();
  },[]);

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
  function getSongsByArtistsId(artistsId: string): String[]{
    console.log('artistsId:', artistsId);
    const songes = songsArtists
    .filter((songsArtists) => String(songsArtists.artists_id) === artistsId)
    .map((songsArtists)=> Number(songsArtists.songs_id));

    // const getThesonges = artists
    // .filter((artisted)=>artisted.id = artistsId as any)
    console.log('artists:', songes);

    const songsName = songes.map((songes)=>songs.find((songs)=>songs.id === songes)?.Name || '');
    console.log('songsName :', songsName)
    return songsName;
    
  }

  return (
    <>
      <div className='card card-custom'>
        <div className='card-header'>
          <h3 className='card-title'>Read Artists</h3>
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
            <Form.Group className='mb-4'>
            <Form.Label>Songs</Form.Label>
              <Form.Control
                type='text'
                name='artists'
                value={id ? getSongsByArtistsId(id).join(', '):''}
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
