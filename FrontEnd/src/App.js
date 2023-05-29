import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { publicRoutes } from "~/routes";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("/api/v1/users/info")
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Router>
      <UserContext.Provider value={user}>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
