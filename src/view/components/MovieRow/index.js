import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import './style.scss'

function MovieRow() {
    return (
        <div className='movie_row'>
            <div className='movie_row_header'>
                <h1>Trending</h1>
            </div>
            <ul className='movie_list'>
                <li className='movie_item'>
                    <img src='https://image.tmdb.org/t/p/w500//mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' alt='photo' />
                </li>
                <li className='movie_item'>
                    <img src='https://image.tmdb.org/t/p/w500//mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' alt='photo' />
                </li>
                <li className='movie_item'>
                    <img src='https://image.tmdb.org/t/p/w500//mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' alt='photo' />
                </li>
                <li className='movie_item'>
                    <img src='https://image.tmdb.org/t/p/w500//mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' alt='photo' />
                </li>
                <li className='movie_item'>
                    <img src='https://image.tmdb.org/t/p/w500//mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' alt='photo' />
                </li>
                <li className='movie_item'>
                    <img src='https://image.tmdb.org/t/p/w500//mGVrXeIjyecj6TKmwPVpHlscEmw.jpg' alt='photo' />
                </li>
            </ul>
            <button className='movie_row_prev'>
                <i><FaAngleLeft/></i>
            </button>
            <button className='movie_row_next'>
                <i><FaAngleRight/></i>
            </button>
        </div>
    );
}

export default MovieRow;