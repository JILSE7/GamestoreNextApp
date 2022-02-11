import React, { useEffect, useState } from 'react';
import { getAdress } from '../../../../api/address';

const ListAddress = ({user, logOut, reload, setReload}) => {

    console.log(reload);
    console.log(user);
    
    const [address, setAddress] = useState(null);
    console.log(address);
    useEffect(() => {
       (async() => {
           if((user && !address) || reload){
               const response =  await getAdress(user._id, logOut);
               setAddress([...response]);
               setReload(false);
           }
       })()
    }, [user, reload]);
 
    console.log(typeof address);
  return (
    <>
        
        {
            address?.map(addres => {
                return(
                    <div className="address_container">
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
