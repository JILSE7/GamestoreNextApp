import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getGame } from '../api/game';
import BasicLayout from '../Components/Layouts/BasicLayout'
import { showCheckError, showCheckToast, showErrorToast } from '../Helpers/toast';
import GameComponent from '../Components/Games';
import Link from 'next/link';
import Seo from '../Components/Seo';


const Search = () => {

        const {query} = useRouter();
        const [games, setGames] = useState([])
        

    useEffect(() => document.querySelector("#inputSearch").focus(), []);


    useEffect(() => {
      if(query.query){
          getGame(query.query).then((data) => {
              if(data.length > 0){
                  setGames(data)
                showCheckToast(`encontramos ${data.length} coincidencias`)
              }else{
                  showCheckError("No encontramos ningun resultado :C")
              }
            })
            .catch(console.log())
      }
    }, [query.query])
    
    


  return (
    <div className="container ">
    <BasicLayout >
      <Seo title={`Buscando: ${query.query}`}/>
    <h2 className='text-center'>Estamos buscando: {query.query}</h2>
    
    <div className='flex flex-wrap w-full item-center justify-center'>
       {
           games.map(item => <Link href={`/${item.url}`}><a><GameComponent game={item} key={item.Id}/></a></Link>)
       }

    </div>
    
    </BasicLayout>
    </div>
  )
}

export default Search