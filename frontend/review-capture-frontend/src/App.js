import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import UserContext from "./contexts/UserContext";

//page imports
import Home from "./pages/Home";
import Login from "./Auth/Login";
import Contacts from "./pages/Contacts";
import Campaigns from "./pages/Campaigns";

//header
import Header from "./components/Header";

const App = () => {
  const [user, setUser] = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading && !user) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  if (user) {
    return (
      <>
        <div className="App">
          <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <Switch>
              <Redirect exact path="/" to="/home" />
              <Redirect exact path="/login" to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/campaigns" component={Campaigns} />
            </Switch>
          </UserContext.Provider>
        </div>
      </>
    );
  }
  return (
    <div className="login">
      {isLoading ? (
        "Loading"
      ) : (
        <>
          <Switch>
            <Redirect exact path="/" to="/login" />
            <Redirect exact path="/home" to="/login" />
            <Route path="/login" component={Login} />
          </Switch>
        </>
      )}
    </div>
  );
};

export default App;
