import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GlobalStyles from "./components/GlobalStyles";
import 'bootstrap-icons/font/bootstrap-icons.css';
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="96615940146-a6npdnvt227aiaou542u02q3q38v788t.apps.googleusercontent.com">
    <React.StrictMode>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
