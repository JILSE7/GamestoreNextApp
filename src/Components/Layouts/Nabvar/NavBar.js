import { useEffect, useMemo, useState } from 'react';

import {consolesIcon} from '../../../Helpers/consoleIcons';
import Link from 'next/link';

import {IconContext} from 'react-icons';
import { getPlatformsApi } from '../../../api/platform';

const NavBar = () => {

    

    const [platforms, setPlatforms] = useState([]);


    useEffect(() => {
        
        const platformsLocal = JSON.parse(localStorage.getItem('platforms')) || [];

        if(platformsLocal.length <= 0){
            
            getPlatformsApi()
                            .then((data) => {
                                    setPlatforms([...data]);
                                    localStorage.setItem("platforms", JSON.stringify(data));
                            })
                            .catch(console.log)
        }else{
            setPlatforms(platformsLocal);
        }

    }, []);


    return (
        <div className="layout_container_nabvar">
                <nav className="w-full">
                    <ul className="flex  justify-around">
                        {
                            platforms.map((platform,i) => {
                                const consoles = Object.values(platform.consoles||[]);
                                
                                return(
                                    <li className="layout_container_nabvar_listitem" key={Date.now() + (i*2)}>
                                        <img src={`/${platform.image}`} className="layout_container_nabvar_logoconsole" /> 
                                              
                                        {(platform.title === "Xbox") ? generateImage(consoles) : generateList(consoles)}
                                    </li>
                                )
                            })
                        }

                    </ul>
                    </nav>
        </div>
    )
}

export default NavBar



const generateList = (consoles = []) => {
    
    return(

        <ul className={consoles.includes('ps2') ? "layout_container_nabvar_listitem_drop dropPs" : "layout_container_nabvar_listitem_drop"}>
            {consoles.map((con,i) => {
                
                if(consolesIcon[con]){
                    
                    return (
                        <li key={i + Date.now()}>
                            <Link href={`/games/${con}`}>
                                <a>
                                    <IconContext.Provider value={{size:"2.5em"}}>   
                                        {Icon(consolesIcon[con])}
                                    </IconContext.Provider>
                                </a>
                            </Link>
                        </li>
                        )
                }
                
            }
            )}
        </ul>
    )
}



const generateImage = (consoles=[]) => {
    
    return(
        <ul className="layout_container_nabvar_listitem_drop dropImage">
        
            {
                consoles.map((image,i) => {
                    return  <li key={i + Date.now()}><Link href={`/games/${image}`}><a><img src={`/${image}.png`} className="layout_container_nabvar_logoconsole"/></a></Link></li>
                })
            }
        </ul>
    )

}





const Icon = (icon) => {
    
    const IconName = icon.icon;
    return (
      <IconName  className="iconConsole"/>
    )
}