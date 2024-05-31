import {FC} from 'react';
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {observer} from "mobx-react-lite";

import Header from "./components/Header/Header";


const App: FC =()=> {

  return (
    <div className='content-div'>
      <Router>
          <Header/>
          <Routes>
            <Route  path='/' element={
              <div>
                MainBoard <br/>
              </div>}/>
          </Routes> 
      </Router>
    </div>
  );
}

export default observer(App)
