import React, { useEffect, useState } from 'react';
import { getAdress } from '../../../../api/address';

const ListAddress = ({user, logOut, reload, setReload, click,addselect}) => {


    
    const [address, setAddress] = useState(null);

    useEffect(() => {
       (async() => {
           if((user && !address) || reload){
               const response =  await getAdress(user._id, logOut);
               setAddress([...response]);
               setReload(false);
           }
       })()
    }, [user, reload]);

  return (
    <>
        
        {
            address?.map(addres => {
                return(
                    <div className={(addres._id === addselect?._id) ? "address_container address_container_select": "address_container"} onClick={()=> click(addres)}>    
                        <h5>{addres.title}</h5>
                        <p>{addres.address}</p>
                        <p>{addres.postalCode}</p>
                        <p>{addres.state}</p>
                    </div>

                ) 
            })
            
        }

    </>
  )
};

export default ListAddress;
