import { Route, Routes } from "react-router-dom";

import PublicRoute from "../../routes/publicRoute";
import PrivateRoute from "../../routes/privateRoute";
import Login from "../Login";
import Admin from '../Admin'
import routeAdmin from '../../routes/index'

function Content() {
    return (
        <div className="content">
            <Routes>
                <Route>
                    {routeAdmin.map(item => (
                        <Route
                            key={item.id}
                            path={item.path}
                            element={item.component}
                        />
                    ))}
                </Route>
                <Route element={<PublicRoute />}>
                    <Route path='/login' element={<Login />} />
                </Route>
                <Route element={<PrivateRoute />}>
                    <Route path='/admin' element={<Admin />} />
                </Route>
            </Routes>
        </div>
    );
}

export default Content;