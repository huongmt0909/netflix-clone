import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaRegBell, FaCaretDown } from "react-icons/fa";

import './style.scss'
import Logo from '../../assets/images/logo.png'
import { useEffect, useState } from 'react';

function Header() {
    const [querySearch, setQuerySearch] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (querySearch.trim().length > 0) {
            navigate(`/search?q=${querySearch}`)
        }
        else{
            navigate('/')
        }
    }, [querySearch])

    return (
        <div className="header">
            <ul className='header_left'>
                <li>
                    <Link to='/'>
                        <img src={Logo} alt='logo'
                            className='header_logo'
                        />
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        TV Shows
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        Movies
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        Recently Added
                    </Link>
                </li>
                <li>
                    <Link to='/'>
                        My List
                    </Link>
                </li>
            </ul>
            <ul className='header_right'>
                <li>
                    <i className='header_search_icon'><FaSearch /></i>
                    <input className='header_search' placeholder='Title, genres, people'
                        value={querySearch}
                        onChange={e => setQuerySearch(e.target.value)}
                    />
                </li>
                <li>
                    <Link to='/'>KIDS</Link>
                </li>
                <li>
                    <Link to='/'>DVD</Link>
                </li>
                <li>
                    <span className='header_notify'>
                        <i><FaRegBell /></i>
                    </span>

                </li>
                <li>
                    <div className='header_user'>
                        <div className='header_user_logo'>
                            <div className="header_user_dropdown">
                                <ul className='user_dropdown_list'>
                                    <li className='user_dropdown_list_item'>
                                        <div></div>
                                        <p> Andres</p>
                                    </li>
                                    <li className='user_dropdown_list_item'>
                                        <div></div>
                                        <p> Tony</p>
                                    </li>
                                    <li className='user_dropdown_list_item'>
                                        <div></div>
                                        <p> Luis</p>
                                    </li>
                                </ul>
                                <ul className='user_control_dropdown_list'>
                                    <li className='user_control_dropdown_list_item'>
                                        <p>Account</p>
                                    </li>
                                    <li className='user_control_dropdown_list_item'>
                                        <p>Manager Profile</p>
                                    </li>
                                    <li className='user_control_dropdown_list_item'>
                                        <p>Help Center</p>
                                    </li>
                                    <li className='user_control_dropdown_list_item'>
                                        <p>Sign out of Netflix</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <i><FaCaretDown /></i>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Header;