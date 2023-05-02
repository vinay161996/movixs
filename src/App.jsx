import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"
import { useSelector, useDispatch } from 'react-redux'
import { getApiConf, getGenre } from "./store/homeSlice"
import { BrowserRouter, Routes, Route } from "react-router-dom"


import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import Home from './pages/home/Home'
import SearchResult from './pages/searchResult/SearchResult'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import PageNtFd from './pages/404/PageNtFd'

function App() {
  const url = useSelector(state => state.home.url)
  const dispatch = useDispatch()
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration")
      .then(res => {
        const url = {
          backdrop: res.images.secure_base_url + "original",
          poster: res.images.secure_base_url + "original",
          profile: res.images.secure_base_url + "original",
        }
        dispatch(getApiConf(url))
      })
  }

  useEffect(() => {
    fetchApiConfig()
    genresCall()
  }, [])

  const genresCall = async () => {
    let promises = [];
    let endPoints = ['tv', 'movie'];
    let allGenres = {};

    endPoints.forEach(url => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises)
    data.forEach(items => {
      items.genres.forEach(item => (
        allGenres[item.id] = item
      ));
    })
    dispatch(getGenre(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNtFd />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App

