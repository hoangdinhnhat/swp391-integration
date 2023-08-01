import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const Cartcontext = createContext();
export const Context = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        axios
          .post(
            "/api/v1/users/cart/" +
              action.payload.pId +
              "?quantity=" +
              action.payload.quantity
          )
          .then((res) => {
            console.log(res);
            axios
              .get("/api/v1/users/cart")
              .then((res) => {
                console.log(res);
                dispatch({
                  type: "LOAD",
                  payload: res.data,
                });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => {
            console.log(e);
          });
        return state;
      case "INCREASE":
        axios
          .post("/api/v1/users/cart/" + action.payload)
          .then((res) => {
            console.log(res);
            axios
              .get("/api/v1/users/cart")
              .then((res) => {
                console.log(res);
                dispatch({
                  type: "LOAD",
                  payload: res.data,
                });
              })
              .catch((e) => {
                console.log(e);
                if (e.response) {
                  action.setMsg(e.response.data);
                }
              });
          })
          .catch((e) => {
            console.log(e);
          });
        return state;
      case "DECREASE":
        axios
          .post("/api/v1/users/cart/" + action.payload + "?quantity=-1")
          .then((res) => {
            console.log(res);
            axios
              .get("/api/v1/users/cart")
              .then((res) => {
                console.log(res);
                dispatch({
                  type: "LOAD",
                  payload: res.data,
                });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => {
            console.log(e);
          });
        return state;
      case "REMOVE":
        axios
          .delete("/api/v1/users/cart/" + action.payload)
          .then((res) => {
            console.log(res);
            axios
              .get("/api/v1/users/cart")
              .then((res) => {
                console.log(res);
                dispatch({
                  type: "LOAD",
                  payload: res.data,
                });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => {
            console.log(e);
          });
        return state;
      case "REMOVE_ALL":
        return state;
      case "LOAD":
        return action.payload;

      default:
        return state;
    }
  };

  useEffect(() => {
    axios
      .get("/api/v1/users/cart")
      .then((res) => {
        console.log(res);
        dispatch({
          type: "LOAD",
          payload: res.data,
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const [state, dispatch] = useReducer(reducer, []);
  const info = { state, dispatch };
  return (
    <Cartcontext.Provider value={info}>{props.children}</Cartcontext.Provider>
  );
};
