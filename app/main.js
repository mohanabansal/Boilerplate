import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Hello from "./component/hello";
import store from "./store";

render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById("main")
);
