import Head from 'next/head'
import React from 'react'

const Seo = ({title, desciption}) => {
    
  return (
    <Head>
        <title>{title}</title>
        <meta property='description' content={desciption}/>


    </Head>
  )
}


Seo.defaultProps = {
    title: "GameStore - Tienda de juegos",
    desciption: "Tus juegos favoritos para Steam, PlayStation, Xbox, Switch al mejor precio"
}
export default Seo;