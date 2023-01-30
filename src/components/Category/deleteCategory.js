import React, { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { deleteCategory } from '../../utilities/fetchApi';

const DeleteCategory = ({ setDeleteModal, mutate, data }) => {
    const clickRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setDeleteModal(false)
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

    const handleModal = () => {
        setDeleteModal(false)
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        deleteCategory(data.id).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            });
            
            setTimeout(() => {
                mutate('api/category')
                setDeleteModal(false)
            }, [2000])
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    return (
        <div className='fixed top-0 left-0 z-10 h-screen w-screen overscroll-y-none overflow-y-hidden bg-black bg-opacity-70 p-3 flex items-center justify-center'>
            <div ref={clickRef} className="flex flex-col gap-3 w-11/12 lg:w-1/3 md:w-1/2 bg-white rounded-md p-3">
                <div className="flex justify-between items-center px-2 pt-5">
                    <h3 className='font-bold font-ssp text-xl md:text-2xl'>Delete Category</h3>
                </div>
                <div className='flex flex-col px-5 w-full mt-5 gap-5'>
                    <span>Do you really want to delete <b>{data.name}</b> category ?</span>
                    <div className="relative z-0 mb-6 w-full flex gap-4 justify-end">
                        <span onClick={handleDelete} className="mt-5 text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Delete</span>
                        <span onClick={handleModal} className="mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Close</span>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div> 
    )
}

export default DeleteCategory