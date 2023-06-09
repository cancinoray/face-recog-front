import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css'
import { useState } from 'react'

const App = () =>  {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [boxes, setBoxes] = useState([])
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setSignedIn] = useState(false)
  const [users, setUsers] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date()
  })

  const loadUser = (data) => {
    setUsers({
      ...users,
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
      })
  }

  const calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    })
  }

  const displayFaceBoxes = (boxes) => {
    setBoxes(boxes)
  }

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = () => {
    setImageUrl(input);
      fetch('https://face-recog-api.onrender.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input
        })
      })
      .then(response => response.json())  
      .then(response => {
        if (response) {
          console.log(response, 'response')
          console.log(users.id, 'id')
          fetch('https://face-recog-api.onrender.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: users.id
            })
          })
          .then(response => response.json())
          .then(count => {
            setUsers({
              ...users, 
              entries: count 
            })
          })
          .catch(console.error)
        }
        console.log(response, 'response')
        displayFaceBoxes(calculateFaceLocations(response))
      }) 
      .catch(err => console.log(err))
  }

  const handleRoute = (route) => {
    if( route === 'signout') {
      setInput('');
      setImageUrl('');
      setBoxes([]);
      setRoute('signin');
      setSignedIn(false);
      setUsers({
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: new Date()
      })
    } else if (route === 'home') {
    setSignedIn(true)
    }
    setRoute(route)
  }

  return (
    <div>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation handleRoute={handleRoute} isSignedIn={isSignedIn}/>
    { route === 'home'
        ? <div>
            <Logo />
            <Rank entries={users.entries} name={users.name} />
            <ImageLinkForm handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
            <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
          </div>
        : (
            route === 'signin'
            ? <Signin handleRoute={handleRoute} loadUser={loadUser} />
            : <Register handleRoute={handleRoute} loadUser={loadUser} />
            
        )
    }
    </div>
  )
}

export default App
