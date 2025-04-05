import React from "react";
import Header from "./Components/Header/Header";
import PageContent from "./Components/Pagecontent/PageContent";
import Footer from "./Components/Footer/Footer";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <PageContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
