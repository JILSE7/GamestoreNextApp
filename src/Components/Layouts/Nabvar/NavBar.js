import { useEffect, useMemo, useState } from 'react';

import {consolesIcon} from '../../../Helpers/consoleIcons';
import Link from 'next/link';

import {IconContext} from 'react-icons';
import { getPlatformsApi } from '../../../api/platform';

const images = ['xbox', '360','one'];

const NavBar = () => {

    

    const [platforms, setPlatforms] = useState([]);


    useEffect(() => {
        
        const platformsLocal = JSON.parse(localStorage.getItem('platforms')) || [];

        if(platformsLocal.length <= 0){
            
            getPlatformsApi()
                            .then((data) => {
                                    setPlatforms(data);
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
                            platforms.map(platform => {
                                const consoles = Object.values(platform.consoles||[]);
                                
                                return(
                                    <li className="layout_container_nabvar_listitem">
                                        <img src={`/${platform.image}`} className="layout_container_nabvar_logoconsole" /> 
                                              
                                        {(platform.title === "Xbox") ? generateImage(consoles) : generateList(consoles)}
                                    </li>
                                )
                            })
                        }
                       {/*  <li className="layout_container_nabvar_listitem">
                            <img src="/playstation-logo.png" className="layout_container_nabvar_logoconsole" />
                            {generateList(ps2, ps3,ps4, ps5 , psv)}
                        </li>
                        <li className="layout_container_nabvar_listitem">
                        <img src="/xbox-logo.png" className="layout_container_nabvar_logoconsole" />
                            {generateImage()}
                        </li>
                        <li className="layout_container_nabvar_listitem">
                        <img src="/nintendo-logo.png" className="layout_container_nabvar_logoconsoleN" />
                            {generateList(n3d, ngc, nsw)}
                        </li>
                        <li className="layout_container_nabvar_listitem">
                        <img src="/windows-logo.png" className="layout_container_nabvar_logoconsoleN"  />
                        </li> */}
                    </ul>
                </nav>
        </div>
    )
}

export default NavBar



const generateList = (consoles = []) => {
    
    return(

        <ul className={consoles.includes('ps2') ? "layout_container_nabvar_listitem_drop dropPs" : "layout_container_nabvar_listitem_drop"}>
            {consoles.map(con => {
                
                if(consolesIcon[con]){
                    
                    return (
                        <li>
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
                consoles.map(image => {
                    return  <li><Link href={`/games/${image}`}><a><img src={`/${image}.png`} className="layout_container_nabvar_logoconsole"/></a></Link></li>
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