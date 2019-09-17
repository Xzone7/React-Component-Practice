import React from 'react';
import Login from './components/LoginPage';
import Home from './components/Home';
import Class_1 from './components/class_1';
import Class_2 from './components/class_2';
import Class_3 from './components/class_3';
import Class_4 from './components/class_4';
import Class_5 from './components/class_5';
import Project_1 from './components/Project-1';
import NewUserPage from './components/Project-1/components/NewUserPage';
import EditUserPage from './components/Project-1/components/EditUserPage';
import Project_2 from './components/Project-2';
import DetailList from './components/class_3/components/DetailList.js';
import ProblemDetail from './components/class_4/components/ProblemDetail.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import NewSoldierPage from './components/Project-2/components/NewSoldierPage';
import EditSoldierPage from './components/Project-2/components/EditSoldierPage';

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
          <Route path="/class-5" component={Class_5} />
          <Route path="/project-1/edit/:userId" component={EditUserPage} />
          <Route path="/project-1/create" component={NewUserPage} />
          <Route path="/project-1" component={Project_1} />
          <Route path="/project-2/edit/:userId" component={EditSoldierPage} />
          <Route path="/project-2/create" component={NewSoldierPage} />
          <Route path="/project-2" component={Project_2} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
