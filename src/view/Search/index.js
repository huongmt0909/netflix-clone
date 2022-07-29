import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import './style.scss'
import useDebounce from '../../hooks/useDebounce'
import { search } from '../../services/searchService'
import Modal from '../components/Modal'

function Search() {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const qSearch = query.get("q")
    const q = useDebounce(qSearch, 400)
    const [searchData, setSearchData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [dataSelect, setDataSelect] = useState()

    const handleSetModal = (item) => {
        console.log(item);
        setDataSelect(item)
        setShowModal(!showModal)
    }

    useEffect(() => {
        if (q.trim().length > 0) {
            const api = async () => {
                const res = await search(q)
                setSearchData(res.results);
            }
            api()
        }
    }, [q])

    return (
        <div className="search">
            <ul className='search_list'>
                {
                    searchData.map(item => (
                        <li key={item.id} onClick={() => handleSetModal(item)}>
                            <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt="photo" />
                        </li>
                    ))
                }
            </ul>
            {
                searchData.length === 0 &&
                <div className='search_empty'>
                    <div>
                        <p>Your search for "{q}" did not have any matches.</p><br />
                        <p>Suggestions:</p>
                    </div>
                    <div>
                        <ul>
                            <li>
                                Try different keywords
                            </li>
                            <li>
                                Looking for a movie or TV show?
                            </li>
                            <li>
                                Try using a movie, TV show title, an actor or director
                            </li>
                            <li>
                                Try a genre, like comedy, romance, sports, or drama
                            </li>
                        </ul>
                    </div>
                </div>
            }
            <Modal
                hidden={handleSetModal}
                data={dataSelect}
                showModal={showModal}
            />
        </div>
    );
}

export default Search;