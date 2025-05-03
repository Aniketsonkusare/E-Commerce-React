import React from "react";
import Header from "../src/Components/Header/Header";
import Footer from "../src/Components/Footer/Footer";
import PageContent from "../src/Components/Pagecontent/PageContent";
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
