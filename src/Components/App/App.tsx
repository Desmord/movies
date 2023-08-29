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
    <div className={`
      grid grid-cols-1 text-slate-300 h-screen ${styles.container}
      md:grid-cols-7  lg:grid-cols-3  xl:grid-cols-4
    `}>
      <Provider store={Store}>
        <Menu />
        <BrowserRouter>
          <Routes>
            <Route path='/trending' element={<MovieGallery text={`trending`} />} />
            <Route path='/popular' element={<MovieGallery text={`popular`} />} />
            <Route path='/toprated' element={<MovieGallery text={`toprated`} />} />
            <Route path='/upcoming' element={<MovieGallery text={`upcoming`} />} />
            <Route path='/movie/:name' element={<Movie />} />
            <Route path='/' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div >
  );
}

export default App;

