import{ SiPlaystation2 as ps2,
SiPlaystation3 as ps3,
SiPlaystation4 as ps4,
SiPlaystation5 as ps5,
SiPlaystationvita as psv,
SiNintendo3Ds as n3d,
SiNintendogamecube as ngc,
SiNintendoswitch as nsw
} from 'react-icons/si';


const consolesIcon = {
    ps2: {name: 'ps2', icon: ps2},
    ps3: {name: 'ps3', icon: ps3},
    ps4: {name: 'ps4', icon: ps4},
    ps5: {name: 'ps5', icon: ps5},
    psv: {name: 'psv', icon: psv},
    n3d: {name: 'n3d', icon: n3d},
    ngc: {name: 'ngc', icon: ngc},
    nsw: {name: 'nsw', icon: nsw},
}


export {
  consolesIcon
}