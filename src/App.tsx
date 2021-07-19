import './App.css';
import React from "react";
import Header from "./components/Header";
import MentorsPage from './components/MentorsPage';

import {
  //BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
  //Link
} from "react-router-dom";

interface IAppState {
}

class App extends React.Component<{}, IAppState> {


  constructor(props: {}) {
    super(props);

  }

  public componentDidMount(): void {}

  public render(): React.ReactNode {
    return (
      <HashRouter>
        <div className="headerDiv">
          <Header/>
        </div>
        <Switch>
          <Route path="/prizes">
            
          </Route>
          <Route path="/mentors">
            <MentorsPage/>
          </Route>
          <Route path="/schedule">
            
          </Route>
          <Route path="/">
            
          </Route>
        </Switch>
      </HashRouter>
    );
  }

}

export default App;
