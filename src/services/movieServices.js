import request from '../config/request'
import requestJWT from '../config/requestJWT'

const topRate = async () => {
    try {
        const res = await request.get('/movie/get-all')
        return res.data
    } catch (error) {
        console.log(error);
    }
}
const getAll = async (page) => {
    return await requestJWT.get(`/movie/get-movie?page=${page}&iteminpage=5`)
}

const create = async (formData) => {
    return await requestJWT.post('/movie/create', formData)
}

const update = async (id, formData) => {
    return await requestJWT.put(`movie/${id}/update`, formData)
}

const remove = async (id) => {
    return await requestJWT.delete(`movie/${id}/remove`)
}

export { topRate, getAll, create, update, remove }
