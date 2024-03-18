import React from 'react'

export default function Cliente(cliente) {
    const { id, name, email, company, note } = cliente.cliente
   
    return (
        <tr className='border-b' key={id}>
            <td className='p-6 space-y-2'>
                <p className='text-2xl text-gray-800'>{name}</p>
                <p>{company}</p>
            </td>

            <td className='p-6'>
                <p className='text-gray-600 '> <span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
                {name}
            </td>

            <td className='p-6 flex gap-3'>
                <p className='text-gray-600 '> <span className='text-gray-800 uppercase font-bold'></span>{note}</p>
            </td>
        </tr>
    )
    }
