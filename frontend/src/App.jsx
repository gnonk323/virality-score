import './App.css'
import { Button, Typography, Input, ConfigProvider } from 'antd'
import { SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Paragraph, Text, Link } = Typography;

function App() {
  const [songName, setSongName] = useState('')
  const [artist, setArtist] = useState('')

  const searchSongs = () => {
    if (songName === '' && artist === '') {
      alert('Please enter song name or artist')
      return
    } else {
      console.log('Song Name:', songName)
      console.log('Artist:', artist)
    }
  }

  function SongResult({ song }) {
    return (
      <div className='flex justify-between pr-8 p-2 rounded-md shadow-sm hover:shadow-md transition-all hover:cursor-pointer hover:border-green-500 border-2'>
        <div className='flex items-center'>
          <img src={song.album.cover_medium} alt='Album Cover' className='w-16 h-16 mr-4 rounded-md' />
          <div className='flex flex-col'>
            <Title level={5}>{song.title}</Title>
            <Text type='secondary'>{song.artist.name}</Text>
          </div>
        </div>
        <div className='flex items-center'>
          <Text type='secondary'>{song.album.title}</Text>
        </div>
        <div className='flex items-center'>
          <Text type='secondary'>{song.duration}</Text>
        </div>
      </div>
    )
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#16a34a',
            borderRadius: 6,
          },
        }}
      >
        <div>
          <Title>Search Songs</Title>
          <div className='flex px-[15vw] gap-2 mb-4'>
            <Input placeholder='Song name' onChange={(e) => setSongName(e.target.value)} />
            <Input placeholder='Artist' onChange={(e) => setArtist(e.target.value)} />
            <Button
              type='primary'
              icon={<SearchOutlined/>}
              iconPosition='start'
              onClick={searchSongs}
            >
              Search
            </Button>
          </div>
          <div className='flex flex-col gap-1'>
            <SongResult song={{
              title: 'Song Title',
              artist: { name: 'Artist Name' },
              album: { title: 'Album Title', cover_medium: 'https://via.placeholder.com/150' },
              duration: '3:30'
            }} />
          </div>
        </div>
      </ConfigProvider>
    </>
  )
}

export default App
