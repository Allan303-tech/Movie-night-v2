import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import PageNotFound from './pages/PageNotFound'
import ShowOne from './pages/ShowOne'
import FavPage from './pages/FavPage'


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/show/:id" element={<ShowOne />} />
        <Route path="/favs" element={<FavPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </>

  )
}

  export default App