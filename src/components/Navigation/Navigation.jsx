const Navigation = ({handleRoute, isSignedIn}) => {
  if (isSignedIn) {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => handleRoute('signout')} className='f3 link dim black underline pa3 pointer near-white'> Sign Out </p>
      </nav>
      );
  } else {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => handleRoute('signin')} className='f3 link dim black underline pa3 pointer near-white'> Sign In </p>
        <p onClick={() => handleRoute('register')} className='f3 link dim black underline pa3 pointer near-white'> Register </p> 
      </nav>
      );
}
    
}

export default Navigation
