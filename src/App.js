
import './App.css';
import Header from './view/Header';
import Footer from "./view/Footer";

import Content from "./view/Content";

function App() {
  document.title = 'Netflix Clone'
  return (
    <div className="App">
      <Header />
      <Content/>
      <Footer />
    </div>
  );
}

export default App;
