import axios from 'axios'

const search = async(query) =>{
    try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=224ce27b38a3805ecf6f6c36eb3ba9d0&language=en-US&include_adult=false&query=${query}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
}

export {search}
