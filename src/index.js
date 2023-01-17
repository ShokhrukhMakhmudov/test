import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

let defaultState = [];

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LIKED":
            state.map((item) => {
                if (item.id === action.payload) {
                    item.liked_by_user = item.liked_by_user ? false : true;
                }
                return item.liked_by_user;
            });
            console.log(state);
            return state;
        case "ADD_DATA":
            console.log(action.payload);
            return action.payload;
        case "FILTER_DATA":
            if (action.payload) {
                defaultState = state;
                let filteredData = state.filter((item) => {
                    return item.liked_by_user === true;
                });
                return filteredData;
            } else {
                return defaultState;
            }
        default:
            return state;
    }
};
const store = createStore(reducer);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
