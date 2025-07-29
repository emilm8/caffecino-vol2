import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Main from "./components/Main/Main";
import Menu from "./components/Main/Menu";
import Header from "./components/Header/Header";
import MenuHeader from "./components/Header/MenuHeader";
import Footer from "./components/Footer/Footer";

function Layout() {
  const location = useLocation();
  const isMenuPage = location.pathname.startsWith("/menu");
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {isMenuPage
        ? <MenuHeader onSearchToggle={() => setSearchOpen(open => !open)} />
        : <Header />
      }
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/menu/:categoryId"
          element={<Menu searchOpen={searchOpen} onCloseSearch={() => setSearchOpen(false)} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
