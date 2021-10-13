import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import indexRoutes from "./routes/index.jsx";

import "./assets/scss/material-dashboard-pro-react.css?v=1.4.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <BrowserRouter history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />)}
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
