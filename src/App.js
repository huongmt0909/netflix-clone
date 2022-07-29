import { Route, Routes } from "react-router-dom";

import './App.css';
import Header from './view/Header';
import routeAdmin from './routes/index'
import Footer from "./view/Footer";
import PublicRoute from "./routes/publicRoute";
import Login from "./view/Login";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
