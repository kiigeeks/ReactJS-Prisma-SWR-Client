import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { addPet, getCategory } from '../../utilities/fetchApi';

const AddPets = ({ setAddModal, mutate }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState([]);
    const clickRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (clickRef.current && !clickRef.current.contains(event.target)) {
                setAddModal(false)
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

    useEffect(() => {
        const fetchCategories = async () => {
            getCategory().then((res) => {
                setCategories(res)
            }).catch((error) => {
                toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000
                });
            })
        }
        fetchCategories()
    }, [])

    const loadPhotos = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const handleAdd = async (e) => {
        e.preventDefault();

        const reqData = new FormData();
        reqData.append("title", title);
        reqData.append("desc", desc);
        reqData.append("categoryId", categoryId);
        reqData.append("file", file);

        addPet(reqData).then((res) => {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1000
            });

            setTimeout(() => {
                mutate('api/pet')
                setAddModal(false)
            }, [2000])
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000
            });
        })
    }

    const handleModal = () => {
        setAddModal(false)
    }

    return (
        <div className='fixed top-0 left-0 z-10 h-full lg:min-h-full w-screen overflow-auto bg-black bg-opacity-70 p-3 flex items-center justify-center'>
            <div ref={clickRef} className="max-h-full flex flex-col gap-3 w-11/12 lg:w-1/3 md:w-1/2 bg-white rounded-md p-3 overflow-auto">
                <div className="flex justify-between items-center px-2 pt-3">
                    <h3 className='font-bold font-ssp text-xl md:text-2xl'>Add Pets</h3>
                </div>
                <form onSubmit={handleAdd} className='flex flex-col px-5 w-full mt-5 gap-5'>
                    <div className="relative z-0 mb-3 w-full group">
                        <input minLength={3} value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="title" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
                    </div>
                    <div className="relative z-0 mb-3 w-full group">
                        <select required value={categoryId} onChange={(e) => setCategoryId(e.target.value)} id="underline_select" className="block py-2.5 px-2 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                            <option value="">Choose a Category</option>
                            {categories.map((option, i) => (
                                <option key={i} value={option.id} >{option.name} </option>
                            ))}
                        </select>
                        <label htmlFor="underline_select" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Category</label>
                    </div>
                    <div className="relative z-0 mb-2 w-full group">
                        <textarea rows={3} minLength={15} value={desc} onChange={(e) => setDesc(e.target.value)} type="text" name="desc" id="desc" className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required ></textarea>
                        <label htmlFor="desc" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                    </div>
                    <div className="relative z-0 mb-3 w-full group">
                        <label className="block text-gray-500 text-sm font-medium mb-3" htmlFor="photos">
                            Photos
                        </label>
                            <input 
                                className="block mb-3 w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-slate-200 file:text-gray-darker
                                    hover:file:bg-gray-300" 
                                id="photos" 
                                type="file"
                                onChange={loadPhotos}
                            />
                                {preview ? (
                                    <img src={preview} alt='Preview Images' width='215'></img>
                                ):("")}
                    </div>
                    <div className="relative z-0 mb-6 w-full flex gap-4 justify-end">
                        <button type="submit" className="mt-5 text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
                        <span onClick={handleModal} className="mt-5 text-white bg-red-400 hover:bg-red-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer">Close</span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div> 
    )
}

export default AddPets