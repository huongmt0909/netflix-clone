import { fork, select, take, call, put, all, takeEvery } from "redux-saga/effects";
import { movieActions } from "../slice/movieSlice";
import { getAll, create, update, remove } from '../../services/movieServices'
import { currentPageSelector, movieSelector, totalPage } from '../selector'
import History from "../../utils/history";


function* handleGetMovie(action) {
    try {
        const res = yield call(getAll, action.payload.page);
        if (res.status === 200) {
            if (res.data.status === true) {
                const response = res.data
                const dataResponse = response.data
                const dataPayload = {
                    totalPage: dataResponse.totalPage,
                    data: dataResponse.data,
                    currentPage: dataResponse.page,
                }
                yield put(movieActions.getMovieSuccess(dataPayload))
            }
        }
    } catch (error) {
        yield put(movieActions.getMovieFailed())
    }
}


function* handleAddMovie(action) {
    try {
        const res = yield call(create, action.payload.values)
        if (res.status === 200) {
            if (res.data.status === true) {
                action.payload.ShowToast('Create new movie success!', 'success')
                yield put(movieActions.addMovieSuccess())
                const currentPage = yield select(currentPageSelector);

                yield put(movieActions.getMovie({ page: currentPage }))
            }
            else {
                yield put(movieActions.addMovieFailed())
                action.payload.ShowToast('Add failed movie, please try again later!', 'error')
            }
        }
    } catch (error) {
        yield put(movieActions.addMovieFailed())
        action.payload.ShowToast('Add failed movie, please try again later!', 'error')
    }

}
function* handleUpdateMovie(action) {
    try {
        const id = action.payload.values.id
        const res = yield call(update, id, action.payload.values)
        if (res.status === 200) {
            if (res.data.status === true) {
                yield put(movieActions.updateMovieSuccess(action.payload.values))
                action.payload.ShowToast('Update movie success!', 'success')
            }
            else {
                yield put(movieActions.updateMovieSuccess())
                action.payload.ShowToast('Update failed movie, please try again later!', 'error')
            }

        }

    } catch (error) {

        yield put(movieActions.updateMovieSuccess())
        action.payload.ShowToast('Update failed movie, please try again later!', 'error')
    }
}

function* handleRemoveMovie(action) {
    try {
        const res = yield call(remove, action.payload.id)
        if (res.status === 200) {
            if (res.data.status === true) {
                yield put(movieActions.removeMovieSuccess(action.payload.id))
                action.payload.ShowToast('Remove Movie success!', 'success')

                let currentPage = yield select(currentPageSelector);
                let totalPageSelector = yield select(totalPage);

                const movieList = yield select(movieSelector)
                if (movieList.length === 0) {
                    currentPage = currentPage - 1
                    totalPageSelector = totalPageSelector - 1
                    yield History.navigate(`/admin?page=${currentPage}`);
                }
                yield put(movieActions.setTotalPage(totalPageSelector))
                yield put(movieActions.setCurrentPage(currentPage))
                yield put(movieActions.getMovie({ page: currentPage }))

            }
            else {
                yield put(movieActions.removeMovieFailed())
                action.payload.ShowToast('Delete movie failed, please try again later!', 'error')
            }
        }
    } catch (error) {
        yield put(movieActions.removeMovieFailed())
        action.payload.ShowToast('Delete movie failed, please try again later!', 'error')
    }

}

function* WaitDispatchGetMovie() {
    while (true) {
        const action = yield take(movieActions.getMovie.type);
        yield fork(handleGetMovie, action)
    }
}

function* WaitDispatchAddMovie() {
    while (true) {
        const data = yield take(movieActions.addMovie.type);    //wait dispatch 
        yield fork(handleAddMovie, data)
    }
}

function* WaitDispatchUpdateMovie() {
    while (true) {
        const data = yield take(movieActions.updateMovie.type);    //wait dispatch 
        yield fork(handleUpdateMovie, data)
    }
}

function* WaitDispatchRemoveTodo() {
    while (true) {
        const data = yield take(movieActions.removeMovie.type);    //wait dispatch 
        yield fork(handleRemoveMovie, data)
    }
}

export default function* movieSaga() {
    yield all([fork(WaitDispatchGetMovie), fork(WaitDispatchAddMovie), fork(WaitDispatchUpdateMovie), fork(WaitDispatchRemoveTodo)]);
}
