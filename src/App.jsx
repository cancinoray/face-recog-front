import ParticlesBg from 'particles-bg'
// import Clarifai from 'clarifai'
import Navigation from './components/Navigation/Navigation'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css'
import { useEffect, useState, useReducer } from 'react'

//You must add your own API key here from Clarifai.
// const app = new Clarifai.App({
//   apiKey: '62230478be5c4f76a800730b86e5f433'
// });

// const returnClarifaiJSONRequestOptions = (imageUrl) => {
//   // Your PAT (Personal Access Token) can be found in the portal under Authentification
//   const PAT = '159396279dbd41e19b3cc8ed467839ea';
//   // Specify the correct user_id/app_id pairings
//   // Since you're making inferences outside your app's scope
//   const USER_ID = 'sy1pzx55u3oe';       
//   const APP_ID = 'face-recog-v2';
//   // Change these to whatever model and image URL you want to use
//   const MODEL_ID = 'face-detection';  
//   const IMAGE_URL = imageUrl;

//   const  raw = JSON.stringify({
//       "user_app_id": {
//           "user_id": USER_ID,
//           "app_id": APP_ID
//       },
//       "inputs": [
//           {
//               "data": {
//                   "image": {
//                       "url": IMAGE_URL
//                   }
//               }
//           }
//       ]
//   });

//   const requestOptions = {
//       method: 'POST',
//       headers: {
//           'Accept': 'application/json',
//           'Authorization': 'Key ' + PAT
//       },
//       body: raw
//   };

//   return requestOptions;
// }




const App = () =>  {
  const [input, setInput] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [box, setBox] = useState({})
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

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
    console.log(box)
  }

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const handleSubmit = () => {
    setImageUrl(input);
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input
        })
      })
      .then(response => response.json())  
      .then(response => {
        // console.log(response, 'response')
        if (response) {
          console.log(response, 'response')
          console.log(users.id, 'id')
          fetch('http://localhost:3000/image', {
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
        displayFaceBox(calculateFaceLocation(response))
      }) 
      .catch(err => console.log(err))
  }

  const handleRoute = (route) => {
    if( route === 'signout') {
      setInput('');
      setImageUrl('');
      setBox({});
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
            <FaceRecognition imageUrl={imageUrl} box={box} />
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
