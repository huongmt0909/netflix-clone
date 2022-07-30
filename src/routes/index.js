import Home from "../view/Home";
import Search from "../view/Search";

const routeAdmin = [
    {
        id: 0,
        path: '/',
        component: <Home />
    },
    {
        id: 1,
        path: '/search',
        component: <Search />
    },
    
]
export default routeAdmin
