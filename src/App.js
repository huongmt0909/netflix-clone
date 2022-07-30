import { Route, Routes } from "react-router-dom";

import './App.css';
import Header from './view/Header';
import routeAdmin from './routes/index'
import Footer from "./view/Footer";
import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";
import Login from "./view/Login";
import Admin from './view/Admin'

function App() {
  document.title = 'Netflix Clone'
  return (
    <div className="App">
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
