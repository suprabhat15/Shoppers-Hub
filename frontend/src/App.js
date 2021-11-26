import './App.css';
import { useEffect } from "react";
import Header from './component/layout/Header';
import Footer from './component/layout/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from "webfontloader";
import Home from './component/Home';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" component={Home} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
