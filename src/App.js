import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AuthLayout from "./layouts/Auth";
import MainLayout from "./layouts/Main";
import axios from "axios";

import { AuthContext } from "./contexts/AuthContext";
import UserContextProvider from "./contexts/UserContext";

function App() {
  const { token } = useContext(AuthContext);

  if (token) {
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/auth" component={AuthLayout} />
          {!token && <Redirect from="*" to="/auth/login" />}
          <UserContextProvider>
            <Route path="/main" component={MainLayout} />
          </UserContextProvider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
