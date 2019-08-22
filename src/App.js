import React from 'react';
import Login from './components/LoginPage';
import Home from './components/Home';
import Class_1 from './components/class_1';
import Class_2 from './components/class_2';
import Class_3 from './components/class_3';
import Class_4 from './components/class_4';
import DetailList from './components/class_3/components/DetailList.js';
import ProblemDetail from './components/class_4/components/ProblemDetail.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

/* App Component serves as pure Router Component */
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact={true} component={Home} />
          <Route path="/class-1" component={Class_1} />
          <Route path="/class-2" component={Class_2} />
          <Route path="/class-3/:login" component={DetailList} />
          <Route path="/class-3" component={Class_3} />
          <Route path="/class-4/:id" component={ProblemDetail} />
          <Route path="/class-4" component={Class_4} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
