import MovieRow from "../components/MovieRow";
import Navigation from "../components/Navigation";

import './style.scss'

function Home() {
    
    return (
        <div className="home">
            <Navigation/>
            <MovieRow/>
        </div>
    );
}

export default Home;