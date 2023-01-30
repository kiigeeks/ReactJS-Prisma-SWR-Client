import React, { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { getPets } from '../../utilities/fetchApi';
import DeletePets from './deletePets';
import EditPets from './editPets';

const Collection = () => {
    const [dataTemp, setDataTemp] = useState([])
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const {mutate} = useSWRConfig();

    const {data, error, isLoading} = useSWR('api/pet', getPets);
    if(isLoading) return <h2>Loading Bro ...</h2>
    if(error) return <h2>Error bro ...</h2>

    const handleModalEdit = (dataPet) => {
        setDataTemp(dataPet)
        setEditModal(true)
    }

    const handleModalDelete = (dataPet) => {
        setDataTemp(dataPet)
        setDeleteModal(true)
    }

    return (
        <React.Fragment>
            {editModal &&
                <EditPets data={dataTemp} setEditModal={setEditModal} mutate={mutate} />
            }

            {deleteModal &&
                <DeletePets data={dataTemp} setDeleteModal={setDeleteModal} mutate={mutate} />
            }

            <div className="container mx-auto bg-white p-4 lg:p-12">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-2">
                    {data.map((pet) => (
                        <div className="overflow-hidden rounded-lg bg-gray-100 p-4 md:px-10 md:py-5" key={pet.id}>
                            <h2 className="mt-3 text-2xl lg:text-3xl font-semibold text-gray-800">{pet.title}</h2>
                            <h5 className="mt-1.5 text-lg lg:text-xl font-medium text-gray-700">{pet.category.name}</h5>
                            <p className="mt-3 text-sm text-gray-600">{pet.desc}</p>
                            <div className="mt-12 flex transform items-center justify-center transition-transform duration-150 ease-in-out hover:scale-105 lg:hover:scale-110">
                                <img alt={pet.title} className="block h-full w-full object-cover object-center cursor-pointer" src={`${process.env.REACT_APP_PUBLIC_FOLDER}/${pet.photos}`} />
                            </div>
                            <div className='mt-3 flex flex-row items-center justify-center gap-3'>
                                <button onClick={() => handleModalEdit(pet)} className='rounded-lg bg-blue-500 hover:bg-blue-300 px-3 py-2 text-white font-bold border border-slate-200'>Edit</button >
                                <button onClick={() => handleModalDelete(pet)} className='rounded-lg bg-red-500 hover:bg-red-300 px-3 py-2 text-white font-bold border border-slate-200'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Collection