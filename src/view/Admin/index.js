import { FaPlus, FaRegEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import './style.scss'
import { movieActions } from '../../redux/slice/movieSlice'
import { loginSelector, movieSelector, totalPage , currentPageSelector} from '../../redux/selector'
import ModalEditMovie from '../components/ModalEditMovie'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Admin() {
    const dispatch = useDispatch()
    const userSelector = useSelector(loginSelector)
    const movieList = useSelector(movieSelector)
    const totalPageSelector = useSelector(totalPage)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSelector = useSelector(currentPageSelector)


    const [isShowModal, setShowModal] = useState(false)
    const [movieSelect, setMovieSelect] = useState(null)
    const [typeModal, setTypeModal] = useState('get')
    const [modalTitle, setModalTitle] = useState()

    const handleShowModalForm = () => {
        setShowModal(!isShowModal)
    }
    const handleShowMovieClick = (id) => {
        setMovieSelect(id)

        setTypeModal('get')
        setModalTitle("Movie Details")
        handleShowModalForm()

    }
    const handleAddTodoClick = () => {
        setMovieSelect(null)
        setModalTitle("Create New Movie")
        setTypeModal('create')
        handleShowModalForm()

    }

    const handleUpdateTodoClick = (id) => {
        setModalTitle("Update Movie")
        handleShowModalForm()
        setTypeModal('update')
        setMovieSelect(id)
    }

    const handleDeleteTodoClick = (id) => {
        setModalTitle("Remove Movie")
        handleShowModalForm()
        setMovieSelect(id)
        setTypeModal('remove')
    }


    const handleChangePaginate = (event, pageNumber) => {
        setCurrentPage(pageNumber)
        const formData = {
            page: pageNumber,
        }
        dispatch(movieActions.getMovie(formData));
    }

    useEffect(() => {
        const formData = {
            page: currentPage,
        }

        dispatch(movieActions.getMovie(formData));
    }, [userSelector.isLoggedIn]);

    useEffect(() => {
        setCurrentPage(parseInt(pageSelector))
    }, [pageSelector])

    return (
        <div className='admin'>
            <div className='admin_container'>
                <div className='admin_header'>
                    <h1>Movies List</h1>
                    <button onClick={handleAddTodoClick}>
                        <i><FaPlus /></i>
                        Add
                    </button>
                </div>
                <div className="movie_body">
                    <ul className="movie_table">

                        <li className="movie_table_row movie_table_header">
                            <div className="movie_table_col">
                                <h2>Title</h2>
                            </div>
                            <div className="movie_table_col">
                                <h2>Premiere date</h2>
                            </div>
                            <div className="movie_table_col">
                                <h2>Thumbnail</h2>
                            </div>
                            <div className="movie_table_col">
                                <h2>Action</h2>
                            </div>
                        </li>
                        {
                            movieList.map(item => (
                                <li className="movie_table_row movie_table_body" key={item.id}>
                                    <div className="movie_table_col">
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="movie_table_col">
                                        <p>{item.date}</p>
                                    </div>
                                    <div className="movie_table_col">
                                        <div className="movie_table_col_img">
                                            <img src={item.image} alt="photo" />
                                        </div>
                                    </div>
                                    <div className="movie_table_col">
                                        <div className="table_control">
                                            <button className="btn-show" onClick={() => handleShowMovieClick(item.id)}>
                                                <FaRegEye />
                                            </button>
                                            <button className="btn-update" onClick={() => handleUpdateTodoClick(item.id)}>
                                                <FaEdit />
                                            </button>
                                            <button className="btn-remove" onClick={() => handleDeleteTodoClick(item.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="movie_footer">
                    <Pagination count={totalPageSelector} color="primary"
                        size="medium"
                        onChange={(event, pageNumber) => handleChangePaginate(event, pageNumber)}
                        page={parseInt(pageSelector) !== currentPage ? currentPage : parseInt(pageSelector)}
                    />
                </div>
            </div>
            {
                isShowModal &&
                <ModalEditMovie
                    title={modalTitle}
                    hiddenForm={handleShowModalForm}
                    movieSelect={movieSelect}
                    typeModal={typeModal}
                />
            }
            <ToastContainer />

        </div>
    );
}

export default Admin;
