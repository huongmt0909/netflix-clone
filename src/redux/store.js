import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import rootSaga from "./saga/rootSaga";
import authSlice from "./slice/authSlice";
import movieSlice from "./slice/movieSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authSlice,
        movie: movieSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export default store
