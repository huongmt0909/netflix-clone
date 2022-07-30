import { FaPlay, FaPlus } from "react-icons/fa";

import './style.scss'

function Modal({
    hidden,
    data,
    showModal
}) {
    return (
        <>

            <div className='overlay' onClick={hidden}

                style={
                    showModal ? {
                        top: '0%',
                        opacity: '1'
                    } : {
                        top: '-100%',
                        opacity: '0'
                    }
                }
            ></div>
            <div className="modal"
                style={
                    showModal ? {
                        backgroundSize: 'cover',
                        backgroundImage: `url('${data ? data.image : ''}')`,
                        top: '25%'
                    } : {
                        backgroundSize: 'cover',
                        backgroundImage: `url('${data ? data.image : ''}')`,
                        top: '-100%',
                        opacity: '0'

                    }
                }>
                {
                    data &&
                    <div className='modal_container'>
                        <h1 className="modal_title">{data.title}</h1>
                        {/* <p className="modal_info">
                            <span>Rating: {data.vote_average * 10}% </span>
                            Release date: {data.first_air_date} Runtime: {data.runtime || data.episode_run_time}
                        </p>
                        <p className="modal_episode">
                            {data.number_of_episodes ? ' Episodes: ' + data.number_of_episodes : ''}
                            {data.number_of_seasons ? ' Seasons: ' + data.number_of_seasons : ''}
                        </p> */}
                        <p className="modal_overview">{data.description}</p>
                        <div className='modal_control'>
                            <button>
                                <i><FaPlay /></i> Play
                            </button>
                            <button>
                                <i><FaPlus /></i> My List
                            </button>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default Modal;
