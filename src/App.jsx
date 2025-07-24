import React from 'react'
import Main from './components/Main/Main'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Header from './components/Header/Header'
import MenuHeader from './components/Header/MenuHeader'
import Footer from './components/Footer/Footer'
import Menu from './components/Main/Menu'

function Layout() {
  const location = useLocation();
  const isMenuPage = location.pathname === '/menu';

  return (
    <>
      {isMenuPage ? <MenuHeader /> : <Header />}

     <Routes>
          <Route path="/" element={<Main />} />  
          <Route path="/menu" element={<Menu />} />
     </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
