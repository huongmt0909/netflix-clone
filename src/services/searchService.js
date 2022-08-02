import request from '../config/request'

const search = async (query) => {
    try {
        const res = await request.get(`/movie/search?q=${query}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export { search }
