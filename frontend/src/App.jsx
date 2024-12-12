import './App.css'
import { Button, Typography, Input, Slider, Col, ConfigProvider, notification } from 'antd'
import { SearchOutlined, LeftOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'

const { Title, Paragraph, Text } = Typography

function App() {
  const [songName, setSongName] = useState('')
  const [artist, setArtist] = useState('')
  const [numSongs, setNumSongs] = useState(5)
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)

  // async function getSongInfo(song_id) {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:5000/api/get-song-info?song_id=${song_id}`
  //     )
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`)
  //     }
  //     const data = await response.json()
  //     console.log("Successfully retreieved song info:", data)
  //     return data
  //   } catch (error) {
  //     console.error("Error:", error)
  //   }
  //   return null
  // }

  const searchSongs = async () => {
    if (songName === '' && artist === '') {
      return
    }
    if (songName === 'balls') {
      try {
        const response = await fetch(
          'http://127.0.0.1:5000/api/test'
        )
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        notification.success({
          message: "API Health Check",
          description: "The API is working correctly. Hello, World!",
          placement: "bottomRight"
        })
      } catch (error) {
        console.error("Error:", error)
        notification.error({
          message: "API Health Check",
          description: "The API is not working correctly. Open the console for more information.",
          placement: "bottomRight"
        })
      }
      return
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/search-songs-csv?song_name=${songName}&artist=${artist}&num_songs=${numSongs}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Successfully retreieved songs:", data)
      setSongs(data) // Update songs state with fetched data
    } catch (error) {
      console.error("Error:", error)
      alert("Error fetching songs")
    }
  }

  function SongResult({ song }) {
    return (
      <a onClick={() => setSelectedSong(song)}>
        <div className='flex justify-between items-center py-3 px-4 rounded-md shadow-sm hover:shadow-md transition-all hover:cursor-pointer hover:border-green-500 border-2'>
          <div className='flex items-center'>
            {/* <img
              src={song.image}
              alt={`${song.alubum} cover`}
              className='w-16 h-16 mr-4 rounded-md'
            /> */}
            <div className='flex flex-col text-start'>
              <Text strong>{song.Track}</Text>
              <Text type='secondary'>{song.Artist}</Text>
              <Text type='secondary' italic>{song.Album}</Text>
            </div>
          </div>
          <div className='flex flex-col items-end text-end gap-1'>
            <Text type='secondary'>{Math.floor(song.Duration_ms / 60000)}:{('0' + Math.floor((song.Duration_ms % 60000) / 1000)).slice(-2)} min</Text>
            <a href={song.Url_spotify} target='_blank' rel='noopener noreferrer'>
              <Button size='small'>Listen</Button>
            </a>
          </div>
        </div>
      </a>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#15803d',
          borderRadius: 6,
        },
      }}
    >
      {selectedSong ? (
        <>
          <div className='flex justify-center relative items-center'>
            <Button className='absolute left-0' icon={<LeftOutlined />} iconPosition='left' onClick={() => setSelectedSong(null)}>Back</Button>
            <Title>Predict Virality</Title>
          </div>
          <div>
            <Paragraph>Danceability: {selectedSong.Danceability}</Paragraph>
            <Paragraph>Energy: {selectedSong.Energy}</Paragraph>
            <Paragraph>Loudness: {selectedSong.Loudness}</Paragraph>
            <Paragraph>Speechiness: {selectedSong.Speechiness}</Paragraph>
            <Paragraph>Acousticness: {selectedSong.Acousticness}</Paragraph>
            <Paragraph>Instrumentalness: {selectedSong.Instrumentalness}</Paragraph>
            <Paragraph>Liveness: {selectedSong.Liveness}</Paragraph>
            <Paragraph>Valence: {selectedSong.Valence}</Paragraph>
            <Paragraph>Tempo: {selectedSong.Tempo}</Paragraph>
          </div>
        </>
      ) : (
        <div>
          <Title>Search Songs</Title>
          <div className='flex px-[10vw] gap-2 mb-4 items-center'>
            <Input placeholder='Song name' onChange={(e) => setSongName(e.target.value)} />
            <Input placeholder='Artist' onChange={(e) => setArtist(e.target.value)} />
            <Button
              type='primary'
              icon={<SearchOutlined/>}
              iconPosition='start'
              onClick={searchSongs}
              disabled={songName === '' && artist === ''}
            >
              Search
            </Button>
            <Col span={5}>
              <Slider min={1} max={15} defaultValue={5} onChange={(newVal) => setNumSongs(newVal)} />
            </Col>
          </div>
          <div>

            <div>
              {songs.length > 0 ? (
                <Paragraph type='secondary' italic>Select a song to predict it's virality score!</Paragraph>
              ) : null}
            </div>
            <div className='flex flex-col gap-1'>
              {songs.map((song, index) => (
                <SongResult key={index} song={song} />
              ))}
            </div>
          </div>
        </div>
      )}
    </ConfigProvider>
  )
}

export default App
