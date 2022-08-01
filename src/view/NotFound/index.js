import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss'

function NotFound() {
    return (
        <div className="not-found">
            <h2>404</h2>
            <h1>Không tìm thấy nội dung 😓</h1>
            <p>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại</p>
            <div>
                <Link to="/" className="link-home">
                    Go Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;