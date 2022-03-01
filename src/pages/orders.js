import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner';
import { getOrderApi } from '../api/orders';
import BasicLayout from '../Components/Layouts/BasicLayout'
import useAuth from '../Hooks/useAuth';
import GameComponent from '../Components/Games';
import Link from 'next/link';
import Seo from '../Components/Seo';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [isloading, setisLoading] = useState(true);

    const {auth, logOut} = useAuth()

    useEffect(() => {
        
        
        if(auth &&  auth.idUser){
            getOrderApi(auth.idUser, logOut).then(data => setOrders(data))
                                    .catch(console.log);
        }

        setTimeout(() => {
            setisLoading(false)
        }, 500);
                                 
      
    }, [auth]);


    
  return (
    <div className='container'>

        <BasicLayout>
            <Seo title="Mis pedidos" desciption={"Listado de todos tus pedidos"}/>
            {isloading===true ? (
               <div className='flex flex-col justify-center items-center'>
                    <p>Cargando...</p>
                    <Loader type="Puff" color="#00BFFF" height={100} width={100} className="mb-24"/>
               </div> 

               
               
            ): (
                <>
                    <h1 className='text-center'>Estas son tus ultimas ordenes</h1>
                    {
                        orders.length > 0 ? (
                            orders.map(order => {
                                const dateOrder = new Date(order.createdAt);
                                return (
                                <div className='w-full flex justify-center mt-5 '> 
                                     <Link href={`/${order.game.url}`}>
                                        <a>
                                            <GameComponent game={order.game} key={order.game.Id}/>
                                        </a>
                                     </Link>
    
                     
                                        <div>
                                            <p className=''>Direccion: {order.addressShipping.title} {order.addressShipping.city}</p>
                                            <p className=''>Comprado el dia: {dateOrder.getDay() } / {dateOrder.getUTCMonth() + 1} / {dateOrder.getFullYear()}</p>
                                            <p className='bg-green-700 mt-3 inline-block'>Total pagado: ${order.totalPayment}</p>
                                        </div>
                                        
                                        
                                </div>
                                )
    
                            })
                        ):(
                            <h1>No has comprado ningun juego</h1>
                        )
                    }
                </>
             )
            }

        </BasicLayout>
    </div>
  )
}

export default Orders