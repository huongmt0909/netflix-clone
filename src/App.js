import { Route, Routes } from "react-router-dom";

import './App.css';
import Header from './view/Header';
import routeAdmin from './routes/index'
import Footer from "./view/Footer";

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
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
