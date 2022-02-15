import React, { useEffect, useState } from 'react'
import  ImageGallery  from 'react-image-gallery';

const Carousel = ({images}) => {
    
    const [imagesState, setImagesState] = useState([]);
    useEffect(() => {
        if(images){
            setImagesState(images.map(image => { return {original: image.url, thumbnail: image.url}}))
        }
    }, [images]);

    console.log(imagesState);
    
  return (
      <>
        {
            imagesState.length > 0 && <ImageGallery items={imagesState} thumbnailHeight={"50"} originalWidth={50} />
        }
      </>
  )
}

export default Carousel