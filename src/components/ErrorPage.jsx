import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {

    const error = useRouteError()
  return (
    <div>
        <h1 className='font-black text-4xl text-blue-900' >CRM Clientes</h1>
        <p className=' text-center '>Hubo un error</p>
        <p className=' text-center '>Hubo un error</p>
    </div>
  )
}
