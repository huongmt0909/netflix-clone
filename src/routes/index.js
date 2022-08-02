import Home from "../view/Home";
import NotFound from "../view/NotFound";
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
    }
    ,
    {
        id: 2,
        path: '*',
        component: <NotFound />
    }
]
export default routeAdmin
