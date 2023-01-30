import React, { useState } from 'react';
import AddCategory from './addCategory';
import { getCategory } from '../../utilities/fetchApi';
import EditCategory from './editCategory';
import useSWR, { useSWRConfig } from 'swr';
import DeleteCategory from './deleteCategory';

const Category = () => {
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [dataTemp, setDataTemp] = useState([])

    const {mutate} = useSWRConfig();

    const {data, error, isLoading} = useSWR('api/category', getCategory);
    if(isLoading) return <h2>Loading Bro ...</h2>
    if(error) return <h2>Error bro ...</h2>

    const handleModalEdit = (data) => {
        setDataTemp(data)
        setEditModal(true)
    }

    const handleModalDelete = (data) => {
        setDataTemp(data)
        setDeleteModal(true)
    }

    return (
        <React.Fragment>
            {addModal && 
                <AddCategory setAddModal={setAddModal} mutate={mutate}/>
            }

            {editModal && 
                <EditCategory setEditModal={setEditModal} mutate={mutate} data={dataTemp} />
            }

            {deleteModal &&
                <DeleteCategory setDeleteModal={setDeleteModal} mutate={mutate} data={dataTemp} />
            }
            
            <div className='h-full w-full flex flex-col px-7 py-5 justify-center items-center'>
                <div className="flex self-end px-3">
                    <span onClick={() => setAddModal(true)} className='px-2.5 py-2 bg-blue-500 hover:bg-blue-400 cursor-pointer rounded-md text-sm text-gray-100 hover:text-gray-50'>Add Category</span>
                </div>
                <div className="flex flex-col lg:w-1/2">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full table-fixed">
                                    <thead className="bg-white border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Category
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((category, i) => (
                                            <tr key={i} className={i%2===0 ? `bg-gray-100 border-b` : `bg-white border-b`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {i+1}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {category.name}
                                                </td>
                                                <td className="flex gap-3 px-6 py-4">
                                                    <span onClick={() => handleModalEdit(category)} className='px-2 py-1.5 rounded-md text-sm text-gray-50 bg-green-400 hover:bg-green-500 cursor-pointer'>Edit</span>
                                                    <span onClick={() => handleModalDelete(category)} className='px-2 py-1.5 rounded-md text-sm text-gray-50 bg-red-400 hover:bg-red-500 cursor-pointer'>Delete</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Category