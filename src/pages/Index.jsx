import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Cliente from '../components/Cliente';
export async function loader() {

    
    try {
        const reponse = await fetch('http://localhost:3010/catalogs/client/list');
        const responsList = await reponse.json();
        let list = responsList.data

        if (list.result != null) {
            return list.result
        } else {
            console.error('Error get data clientes')
            return []
        }
    } catch (error) {
        console.error('error get clientes:',error)
    }
    
   
}

export default function Index() {

    const clientes = useLoaderData();

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900' >Clientes</h1>
            <p className='mt-3'>Adminitra tus clientes</p>

        { clientes.length ? (
             <table className='w-full bg-white shadow my-5 table-auto'> 
                <thead className='bg-blue-800 text-white'>
                    <tr>
                        <th className='p-2' >Clientes</th>
                        <th className='p-2' >Contacto</th>
                        <th className='p-2' >Nota</th>
                    </tr>
                </thead>
                <tbody>
                {clientes.map(cliente => (
                    <Cliente cliente={cliente} key={cliente.id}/>
                ))}
                </tbody>
            </table>
             ) : ( <p className='text-center mt-10'> Sin Clientes </p>)

            }
           
        </>
    )
}
