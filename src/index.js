import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import indexRoutes from "./routes/index.jsx";
import "./assets/scss/material-dashboard-pro-react.css?v=1.4.0";
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import rootReducer from './redux/reducers'

const hist = createBrowserHistory();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />)}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
