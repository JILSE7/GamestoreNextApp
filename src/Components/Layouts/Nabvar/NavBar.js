import { useMemo } from 'react';

import {consoles} from '../../../Helpers/consoleIcons';
import Link from 'next/link';

import {IconContext} from 'react-icons';

const images = ['xbox', '360','one'];

const NavBar = () => {
    const {ps2, ps3,ps4, ps5 , psv,n3d, ngc, nsw} = consoles;
    return (
        <div className="layout_container_nabvar">
                <nav className="w-full">
                    <ul className="flex  justify-around">
                        <li className="layout_container_nabvar_listitem">
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
                        </li>
                    </ul>
                </nav>
        </div>
    )
}

export default NavBar
//IoLogoPlaystation
//IoLogoXbox
//SiNintendo
//IoLogoWindows


const generateList = (...consoles) => (
        <ul className={consoles[0].name.includes('ps2') ? " layout_container_nabvar_listitem_drop dropPs" : "layout_container_nabvar_listitem_drop"}>
            {consoles.map(console => (
                <li >
                    <Link href={`./${console.name}`}>
                            <a>
                        <IconContext.Provider value={{size:"2.5em"}}>   
                                    <Icon icon={console.icon} />
                        </IconContext.Provider>
                            </a>
                    </Link>
                </li>
            ))}
        </ul>
)


const generateImage = () => {
    return(
        <ul className="layout_container_nabvar_listitem_drop dropImage">
        
            {
                images.map(image => {
                    return  <li><Link href={`./${image}`}><a><img src={`/${image}.png`} className="layout_container_nabvar_logoconsole"/></a></Link></li>
                })
            }
        </ul>
    )

}



const Icon = ({icon}) => {
    const IconName = icon;
    return (
      <IconName  className="iconConsole"/>
    )
}