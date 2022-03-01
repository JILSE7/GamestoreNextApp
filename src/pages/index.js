
import Link from "next/link";
import { useEffect, useState } from "react";
import { getLastGamesApi } from "../api/game"
import BasicLayout from "../Components/Layouts/BasicLayout/"
import GameComponent from '../Components/Games'
import Seo from "../Components/Seo";
import { useRouter } from "next/router";





const Home = () => {

  const router = useRouter()

  const [lastGames, setlastGames] = useState([]);

  useEffect(() => {

    getLastGamesApi().then((data) => setlastGames(data))
                      .catch(console.log);

  }, [])
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container ">
            <BasicLayout>
              <Seo/>
              <h1 className="text-center">Ultimas Lanzamientos</h1>
              <main className="container_lastgames">
                  {

                    lastGames.length > 0 &&
                    lastGames.map(game => {
                      return(
                        <Link href={`/${game.url}`}>
                          <a>
                            <GameComponent game={game} key={game.Id}/>
                          </a>
                        </Link>
                      )
                    })
                  }
              </main>
            </BasicLayout>
        </div>
  )
}

export default Home;
