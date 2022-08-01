import { useState } from "react";
import { FaPlay, FaPlus, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import ReactPlayer from 'react-player'

import './style.scss'

function Navigation() {
    const [sound, setSound] = useState(true)

    const handleSetSoundVideo = () => {
        setSound(sound ? false : true)
    }

    return (
        <div className="home_navigation">
            <div className='home_navigation_main'>
                <ReactPlayer
                    playing={true}
                    loop={true}
                    width='100%'
                    height='100%'
                    volume={1}
                    muted={sound}
                    className='header__video'
                    url='https://vimeo.com/384025132'
                />
                <h1 className='home_navigation_title'>Narcos</h1>
                <p className='home_navigation_about'>A gritty chronicle of the war against Colombia's infamously violent and powerful drug cartels.</p>
                <div className='home_navigation_control'>
                    <button>
                        <i><FaPlay /></i> Play
                    </button>
                    <button>
                        <i><FaPlus /></i> My List
                    </button>
                </div>
                <button className="home_navigation_control_sound" onClick={handleSetSoundVideo}>
                    {
                        sound &&
                        <i><FaVolumeMute /></i>
                    }
                    {
                        sound === false &&
                        <i><FaVolumeUp /></i>
                    }
                </button>
            </div>
        </div>
    );
}

export default Navigation;
