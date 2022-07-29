import Navigation from "../components/Navigation";
import { topRate } from '../../services/movieServices'

import './style.scss'
import { useEffect, useState } from "react";

function Home() {
    

    return (
        <div className="home">
            <Navigation />
            
        </div>
    );
}

export default Home;