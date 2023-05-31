import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        { imageUrl && <img id='inputimage' src={imageUrl} alt='image' width={'500px'} height={'auto'} />}

        {boxes.map(box => {
            return <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        })
        }
      </div>
    </div>
  )
}

export default FaceRecognition
