import axios from 'axios';

export const addCategory = async (reqData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/category/`, reqData)
    return data;
}

export const getCategory = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/category/`)
    return data.payload;
}

export const updateCategory = async (paramsId, reqData) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/category/${paramsId}`, reqData)
    return data;
}

export const deleteCategory = async (paramsId) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/category/${paramsId}`)
    return data;
}

export const getPets = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/pet/`)
    return data.payload;
}

export const addPet = async (reqData) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/pet/`, reqData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
    return data;
}

export const deletePet = async (paramsSlug) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/pet/${paramsSlug}`)
    return data;
}

export const updatePet = async (paramsSlug, reqData) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_URL}/pet/${paramsSlug}`, reqData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    return data;
}
