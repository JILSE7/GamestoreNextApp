import React, { useEffect, useState } from 'react'
import  ImageGallery  from 'react-image-gallery';

const Carousel = ({images}) => {
    
    const [imagesState, setImagesState] = useState([]);
    useEffect(() => {
        if(images){
            setImagesState(images.map(image => { return {original: image.url, thumbnail: image.url}}))
        }
    }, [images]);
    
  return (
      <>
        {
            imagesState.length > 0 && <ImageGallery items={imagesState} lazyLoad={true} />
        }
      </>
  )
}

export default Carousel