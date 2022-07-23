import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import history from './history';
import Landing from '../Landing';
import Search from '../Search';
import Reviews from '../Reviews'
import MyPage from '../MyPage';
export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path = "/search" exact component = {Search}/>
        <Route path = "/reviews" exact component = {Reviews}/>
        <Route path = "/myPage" exact component = {MyPage}/>
        <Route path = "/" exact component = {Landing}/>
      </Switch>
    </Router>
  );
}