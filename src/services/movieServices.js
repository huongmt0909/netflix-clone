import request from '../config/request'

const topRate = async () => {
    try {
        const res = await request.get('https://api.themoviedb.org/3/movie/top_rated?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&language=en-US')
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export { topRate }
