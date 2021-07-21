import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";

//page imports
import Home from "./pages/Home";
import Login from "./Auth/Login";

function App() {
  const [user, setUser] = useAuth();

  if (user) {
    return (
      <>
        <div className="App">
          <Switch>
            <Redirect exact path="/" to="/home" />
            <Redirect exact path="/login" to="/home" />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </>
    );
  }
  return (
    <div className="login">
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Redirect exact path="/home" to="/login" />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
