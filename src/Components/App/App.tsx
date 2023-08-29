import { Provider } from 'react-redux';
import Store from "../../Redux/Store";

import Menu from '../Menu/Menu';

import styles from "./App.module.scss";

function App() {
  return (
    <div className={`
      grid grid-cols-1 text-slate-300 h-screen ${styles.container}
      md:grid-cols-7  lg:grid-cols-3  xl:grid-cols-4
    `}>
      <Provider store={Store}>
        <Menu />
      </Provider>
    </div >
  );
}

export default App;

