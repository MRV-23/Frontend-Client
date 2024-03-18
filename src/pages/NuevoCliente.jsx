import React from 'react'
import {useNavigate,Form, useActionData, redirect} from 'react-router-dom'
import Formulario from '../components/Formulario'
import Errorr from '../components/Errorr'


export async function action({request}) {
    try {
        const formdta = await request.formData()
        const datos = Object.fromEntries(formdta)
        const email = formdta.get('email')
        const errores = []

        let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
        
        if (!regex.test(email)) {
            errores.push('Elemailno es valido')
        }
        if (Object.values(datos).includes('')) {
            errores.push('Todos los campos son Obligatorios')
        }
        if (Object.keys(errores).length) { 
            return errores
        }
    
        const reponse = await fetch('http://localhost:3010/catalogs/client/add',{
            method: 'POST',
            body: JSON.stringify(datos),
            headers:{
                'Content-Type':'application/json',
            }
        })
        const responsInsert = await reponse.json();

        if (responsInsert.http != 200) {
            let error = responsInsert.errors
            for (let i = 0; i < error.length; i++) {
                errores.push(error[i].code)
              } 
              return errores

        }else{
            return redirect('/')
        }
        
    } catch (error) {
        console.error('error insert cliente')
        console.error(error)
    }

    
}

export default function NuevoCliente() {

    const errores = useActionData()
    const navigate = useNavigate()
    
  return (
    <>
        <h1 className='font-black text-4xl text-blue-900' >Nuevos Clientes</h1>
        <p className='mt-3'>llena los campos para registrar un nuevo cliente</p>

        <div className='flex justify-end'>
            <button className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'
            onClick={() =>navigate(-1)} >Volver</button>

        </div >

        <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
            <Form noValidate method="POST">
        {errores?.length && errores.map((error,i) => <Errorr key={i}>{error}</Errorr>)}
             <Formulario/>
             <input type="submit" 
             className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
             value="Registrar Cliente"/>
            </Form>
            
        </div>

    </>
  )
}
