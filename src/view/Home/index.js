import Navigation from "../components/Navigation";
import { topRate } from '../../services/movieServices'
import { useEffect, useState } from "react";

import './style.scss'
import MovieRow from '../components/MovieRow'
import Modal from "../components/Modal";

function Home() {

    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [dataSelect, setDataSelect] = useState()

    const handleSetModal = (item) => {
        setDataSelect(item)
        setShowModal(!showModal)
    }

    const handleHiddenModal = () => {
        setShowModal(!showModal)
    }

    useEffect(() => {
        const api = async () => {
            const res = await topRate()
            setData(res.data)
        }
        api()
    }, [])

    return (
        <div className="home">
            <Navigation />
            <MovieRow
                title="Trending"
                movies={data}
                handleSelectMovie={handleSetModal}
            />
            <MovieRow
                title="Top Rated"
                movies={data}
                handleSelectMovie={handleSetModal}
            />
            <MovieRow
                title="Action Movies"
                movies={data}
                handleSelectMovie={handleSetModal}
            />
            <MovieRow
                title="Comedy"
                movies={data}
                handleSelectMovie={handleSetModal}
            />
            <Modal
                hidden={handleHiddenModal}
                data={dataSelect}
                showModal={showModal}
            />
        </div>
    );
}

export default Home;