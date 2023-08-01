import axios from "axios";
import {createContext, useEffect, useReducer} from "react";

export const UserContext = createContext();
export const Context = (props) => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "RELOAD":
                axios
                    .get("/api/v1/users/info")
                    .then((res) => {
                        dispatch({
                            type: "LOAD",
                            payload: res.data,
                        });
                    })
                    .catch((e) => {
                        console.log(e);
                    });
                return state;
            case "LOAD":
                return action.payload;
            default:
                return state;
        }
    };

    useEffect(() => {
        axios
            .get("/api/v1/users/info")
            .then((res) => {
                console.log(res);
                dispatch({
                    type: "LOAD",
                    payload: res.data,
                });
            })
            .catch((e) => console.log(e));
    }, []);

    const [state, dispatch] = useReducer(reducer, undefined);
    const info = {state, dispatch};
    return (
        <UserContext.Provider value={info}>{props.children}</UserContext.Provider>
    );
};
