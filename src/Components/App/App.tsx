import { Provider } from 'react-redux';
import Store from "../../Redux/Store";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={`flex h-screen ${styles.container}`}>
      <Provider store={Store}>


      </Provider>
    </div >
  );
}

export default App;

