import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { updateCategory } from '../../utilities/fetchApi';

const EditCategory = ({ setEditModal, mutate, data }) => {
    const clickRef = useRef(null)
    const [name, setName] = useState(data.name)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setEditModal(false)
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickRef])

    const handleEdit = async (e) => {
        e.preventDefault()

        const reqData = {
            name
        }

        updateCategory(data.id, reqData).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            });

            setTimeout(() => {
                mutate('api/category')
                setEditModal(false)
            }, [2000])
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleModal = () => {
        setEditModal(false)
    }

    return (
        <div className='fixed top-0 left-0 z-10 h-screen w-screen overscroll-y-none overflow-y-hidden bg-black bg-opacity-70 p-3 flex items-center justify-center'>
            <div ref={clickRef} className="flex flex-col gap-3 w-11/12 lg:w-1/3 md:w-1/2 bg-white rounded-md p-3">
                <div className="flex justify-between items-center px-2 pt-5">
                    <h3 className='font-bold font-ssp text-xl md:text-2xl'>Edit Category</h3>
                </div>
                <form onSubmit={handleEdit} className='flex flex-col px-5 w-full mt-5 gap-5'>
                    <div className="relative z-0 mb-6 w-full group mt-3">
                        <input minLength={3} value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    <div className="relative z-0 mb-6 w-full flex gap-4 justify-end">
                        <button type="submit" className="mt-5 text-white bg-green-400 hover:bg-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
                        <span onClick={handleModal} className="mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Close</span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div> 
    )
}

export default EditCategory