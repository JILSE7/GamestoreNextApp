import Link from "next/link";
import { useEffect, useState } from "react/cjs/react.development"
import { getLastGamesApi } from "../api/game"
import BasicLayout from "../Components/Layouts/BasicLayout/"
import GameComponent from '../Components/Games'




const Home = () => {

  const [lastGames, setlastGames] = useState([]);

  useEffect(() => {

    getLastGamesApi().then((data) => setlastGames([...data]))
                      .catch(console.log());

  }, [])

console.log(lastGames);

  return (
    <div className="container ">
            <BasicLayout>
              <h1 className="text-center">Ultimas Lanzamientos</h1>
              <main className="container_lastgames">
                  {

                    lastGames.length > 0 &&
                    lastGames.map(game => {
                      //console.log(game.poster.url);
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

export default Home
