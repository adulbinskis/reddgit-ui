import {FC, lazy} from 'react';
import './App.scss';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {observer} from "mobx-react-lite";

const Header = lazy(() => import('./components/Header/Header'));
const MainBoard = lazy(() => import('./components/MainBoard/MainBoard'));


const App: FC =()=> {

  return (
    <div className='content-div'>
      <Router>
          <Header/>
          <Routes>
            <Route  path='/' element={ <MainBoard/> }/>
            <Route path='/question/:id' element={ <MainBoard/> }/>
          </Routes> 
      </Router>
    </div>
  );
}

export default observer(App)
