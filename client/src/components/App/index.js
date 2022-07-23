import React from 'react';
import {Switch, Route} from "react-router-dom";
import {BrowserRouter as Router} from 'react-router-dom';
import Landing from '../Landing';
// import Search from '../Search';
// import Reviews from '../Reviews'
// import MyPage from '../MyPage';
// import history from './history';
import PrivateRoute from '../Navigation/PrivateRoute.js';


const App = () => {

  return (
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Landing} />
      </div>
    </Router>
  );
}

export default App;

/*export default function PrivateRoute({

}){
  return (
    <Router history = {history}>
      <Switch>
        <Route path = "/search" exact component = {Search}/>
        <Route path = "/reviews" exact component = {Reviews}/>
        <Route path = "/myPage" exact component = {MyPage}/>
        <Route path = "/" exact component = {Landing}/>
      </Switch>
    </Router>
  )
}*/