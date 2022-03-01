import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { memo, useEffect, useState } from 'react'
import { getGamePLatfomApi } from '../../api/game';
import BasicLayout from "../../Components/Layouts/BasicLayout/";
import GameComponent from '../../Components/Games'

const Platform = memo(() => {
  const {query:{platform}} = useRouter();

  const [games, setGames] = useState([]);
  
  useEffect(() => {
      if(platform){
        getGamePLatfomApi(platform, 10,0).then(data => setGames([...data]))
                                        .catch(console.log)
      }
  }, [platform]);
  


  return (
    <div className='container'>
      <BasicLayout>
          {/* <h1 className="text-center">{platform}</h1> */}

          <div className='container_lastgames mt-12'>
              {
                (games.length <= 0) ? (
                  <>
                  <div class="border border-green-200 shadow rounded-md p-4 max-w-sm w-56 h-fit mr-5 mb-8">
                    <div class="animate-pulse flex space-x-4">
                      <div class=" bg-yellow-100 h-10 w-full h-64"></div>
                    </div>
                  </div>
                  <div class="border border-lime shadow rounded-md p-4 max-w-sm w-56 h-fit mr-5 mb-8">
                    <div class="animate-pulse flex space-x-4">
                      <div class=" bg-green-200 h-10 w-full h-64"></div>
                    </div>
                  </div>
                  <div class="border border-white shadow rounded-md p-4 max-w-sm w-56 h-fit mr-5 mb-8">
                    <div class="animate-pulse flex space-x-4">
                      <div class=" bg-blue-400 h-10 w-full h-64"></div>
                    </div>
                  </div>
                  <div class="border border-white shadow rounded-md p-4 max-w-sm w-56 h-fit mr-5 mb-8">
                    <div class="animate-pulse flex space-x-4">
                      <div class=" bg-red-400  h-10 w-full h-64"></div>
                    </div>
                  </div>
                  <div class="border border-white shadow rounded-md p-4 max-w-sm w-56 h-fit mr-5 mb-8">
                    <div class="animate-pulse flex space-x-4">
                      <div class=" bg-purple-400 h-10 w-full h-64"></div>
                    </div>
                  </div>
                  </>
                  
                ) : (
                  games.map(game => {
                    //console.log(game.poster.url);
                    return(
                      <div>

                      <Link href={`/${game.url}`}>
                        <a>
                          <GameComponent game={game} key={game.Id}/>
                        </a>
                      </Link>
                      </div>
                    )
                  })
                )
              }

          </div>

          
      </BasicLayout>
    </div>
  )
})

export default Platform