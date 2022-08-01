import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaRegBell, FaCaretDown } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { authAction } from '../../redux/slice/authSlice'
import './style.scss'
import Logo from '../../assets/images/logo.png'
import { useEffect, useState } from 'react';
import NoBody from '../../assets/images/no-body.jpg'
import { loginSelector } from '../../redux/selector'

function Header() {
    const [querySearch, setQuerySearch] = useState('')
    const navigate = useNavigate()
    const loginList = useSelector(loginSelector)
    const dispatch = useDispatch();

    const handleLogoutClick = () => {
        dispatch(authAction.logout());
    };

    useEffect(() => {
        if (querySearch.trim().length > 0) {
            navigate(`/search?q=${querySearch}`)
        }
        else {
            navigate('/')
        }
    }, [querySearch])


    const [hiddenHeader, setHiddenHeader] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 160) {
                setHiddenHeader(true);
            } else {
                setHiddenHeader(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        //cleanUp function
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="header"
            style={
                hiddenHeader ? { backgroundColor: '#111' } : { backgroundColor: 'transparent' }
            }
        >
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
                                {
                                    loginList.isLoggedIn &&
                                    <ul className='user_dropdown_list'>
                                        <li className='user_dropdown_list_item'>
                                            <img src={NoBody} alt="photo" />
                                            <p>{loginList.currentUser.user.username}</p>
                                        </li>
                                    </ul>
                                }
                                <ul className='user_control_dropdown_list'>
                                    {
                                        loginList.isLoggedIn === false &&
                                        <li className='user_control_dropdown_list_item'>
                                            <Link to='/login'>
                                                Login
                                            </Link>
                                        </li>
                                    }
                                    {
                                        loginList.isLoggedIn &&
                                        <li className='user_control_dropdown_list_item'>
                                            <Link to='/admin?page=1'>
                                                Admin
                                            </Link>
                                        </li>
                                    }
                                    <li className='user_control_dropdown_list_item'>
                                        <p>Manager Profile</p>
                                    </li>
                                    <li className='user_control_dropdown_list_item'>
                                        <p>Help Center</p>
                                    </li>
                                    {
                                        loginList.isLoggedIn &&
                                        <li className='user_control_dropdown_list_item' onClick={handleLogoutClick}>
                                            <p>Sign out of Netflix</p>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                        <i><FaCaretDown /></i>
                    </div>
                </li>
            </ul>
        </div >
    );
}

export default Header;