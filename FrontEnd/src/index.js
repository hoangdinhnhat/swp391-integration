import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App";
import {GoogleOAuthProvider} from "@react-oauth/google";
import GlobalStyles from "./components/GlobalStyles";
import "bootstrap-icons/font/bootstrap-icons.css";
import reportWebVitals from "./reportWebVitals";
import {Context} from "./context/Context";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId="958122686048-nq8dv8psh8dqigiia4cib3u50sbb8mva.apps.googleusercontent.com">
        <GlobalStyles>
            <Context>
                <App/>
            </Context>
        </GlobalStyles>
    </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
