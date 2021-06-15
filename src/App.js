import './App.css';
import ListUserComponent from './components/ListUserComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from 'react';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListUserComponent}></Route>
            <Route path="/users" component={ListUserComponent}></Route>
            <Route path="/add-user" component={CreateUserComponent}></Route>
            <Route path="/make-payment/:id" component={UpdateUserComponent}></Route>
            <ListUserComponent />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
