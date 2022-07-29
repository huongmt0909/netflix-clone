import { fork, take, call, put, all } from "redux-saga/effects";
import { authAction } from "../slice/authSlice";
import { login } from "../../services/authServices";
import History from "../../utils/history";


function* handleSignIn(action) {
    try {
        const res = yield call(login, action.payload.values);
        if (res.status === 200) {
            if (res.data.status === true) {
                const response = res.data;
                localStorage.setItem("currentUser", JSON.stringify(response.data));
                yield put(authAction.loginSuccess(response.data));
                yield History.navigate("/");
                yield take(authAction.logout.type);
                yield call(handleLogout);
            } else {
                const response = res.data;
                yield put(authAction.loginFailed());
                action.payload.ShowToast(`${response.data}`, 'error')

            }
        }
    } catch (error) {
        yield put(authAction.loginFailed());
    }
}

function* handleLogout() {
    localStorage.removeItem("currentUser");
    yield put(authAction.logout());
    yield History.navigate("/login");
}

function* watchSignInFlow() {
    while (true) {
        const isLoggedIn = localStorage.getItem("currentUser");
        if (!isLoggedIn) {
            const action = yield take(authAction.login.type); //wait dispatch signin
            yield fork(handleSignIn, action);
        } else {
            const data = JSON.parse(isLoggedIn);
            yield put(authAction.loginSuccess(data));
            yield take(authAction.logout.type);
            yield call(handleLogout);
        }
    }
}

export default function* authSaga() {
    yield all([fork(watchSignInFlow)]);
}
