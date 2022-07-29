import {Link} from 'react-router-dom'

import './style.scss'

function Header() {
    return (
        <div className="header">
            <div className='header_left'>
                <ul>
                    <li>
                        <Link>a</Link>
                    </li>
                </ul>
            </div>
            <div className='header_right'>

            </div>
        </div>
    );
}

export default Header;