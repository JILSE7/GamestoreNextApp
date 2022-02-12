import { useRouter } from 'next/router'
import React from 'react'
import BasicLayout from "../../Components/Layouts/BasicLayout/"

const Platform = () => {
  const {query:{platform}} = useRouter()
  console.log(platform);
  return (
    <div className='container'>
      <BasicLayout>
          <h1 className="text-center">{platform}</h1>
      </BasicLayout>
    </div>
  )
}

export default Platform