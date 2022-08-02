import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movieList: [],
        totalPage: 0,
        isFetching: false,
        error: false,
        currentPage: 1,
    },
    reducers: {
        getMovie: (state) => {
            state.isFetching = true;
        },
        getMovieSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.movieList = action.payload.data;
            state.totalPage = action.payload.totalPage
            state.currentPage = action.payload.currentPage
        },
        getMovieFailed: (state) => {
            state.error = true;
            state.isFetching = false;
        },
        addMovie: (state) => {
            state.isFetching = true
        },
        addMovieSuccess: (state) => {
            state.isFetching = false
            state.error = false
        },
        addMovieFailed: (state) => {
            state.isFetching = false
            state.error = true
        },
        updateMovie: (state) => {
            state.isFetching = true
        },
        updateMovieSuccess: (state, action) => {
            const newData = state.movieList.map(item =>
                item.id === action.payload.id ? action.payload : item
            );
            state.movieList = newData
            state.isFetching = false
            state.error = false
        },
        updateMovieFailed: (state) => {
            state.isFetching = false
            state.error = true
        },
        removeMovie: (state) => {
            state.isFetching = true
        },
        removeMovieSuccess: (state, action) => {
            state.movieList.splice(state.movieList.findIndex((arrow) => arrow.id === action.payload), 1);
            state.isFetching = false;
            state.error = false
        },
        removeMovieFailed: (state) => {
            state.isFetching = false
            state.error = true
        },
        setCurrentPage: (state, action) =>{
            state.currentPage = action.payload
        },
        setTotalPage: (state, action) =>{
            state.totalPage = action.payload
        }
    },
});

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
