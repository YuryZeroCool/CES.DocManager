import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

// import App from "./layout/App/App";
import { store } from "./redux/store/configureStore";
import App from "./layout/App/App";
import { Login } from "./components/Users/Login";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
