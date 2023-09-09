import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Store from "../../Redux/Store";

import Menu from '../Menu/Menu';
import MovieGallery from '../Pages/MovieGallery/MovieGallery';
import Movie from '../Pages/Movie/Movie';
import NotFound from '../Pages/NotFound/NotFound';

import styles from "./App.module.scss";

function App() {

  return (
    <div className={`h-screen lg:h-screen lg:overflow-hidden
      grid grid-cols-1 text-slate-300  ${styles.container}
      md:grid-cols-7  lg:grid-cols-3  xl:grid-cols-4
    `}>
      <Provider store={Store}>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path='/' element={<MovieGallery text={`Trending`} />} />
            <Route path='/popular' element={<MovieGallery text={`Popular`} />} />
            <Route path='/toprated' element={<MovieGallery text={`Top Rated`} />} />
            <Route path='/upcoming' element={<MovieGallery text={`Upcoming`} />} />
            <Route path='/movie/:id' element={<Movie />} />
            <Route path='/' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div >
  );
}

export default App;

