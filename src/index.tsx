import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Store from './store/store';


interface State {
  store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
  store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
