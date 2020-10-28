import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// upload a file (from filestack) to the backend
function* createRink(action) {
  try {
    // clear any alerts that may be in there already
    yield put({ type: "CLEAR_ALERT" });

    yield axios.post("/api/rinks", action.payload);
    // dispatch an alert that the upload was successful
    yield put({
      type: "SET_ALERT",
      payload: { message: "Successfully created rink", alert: "alert-success" },
    });
    // refresh list of uploads
    yield put({ type: "FETCH_RINKS" });
  } catch (error) {
    // dispatch an error that the upload was rejected
    yield put({
      type: "SET_ALERT",
      payload: { message: "Error creating rink", alert: "alert-error" },
    });
    console.log("Error getting map items from server:", error);
  }
}

// Refresh the global list of uploads from the database
function* fetchRink() {
  try {
    const response = yield axios.get("/api/rinks");
    // add the upload to the redux store
    yield put({ type: "SET_RINKS", payload: response.data });
  } catch (error) {
    // dispatch an error that the upload was rejected
    yield put({
      type: "SET_ALERT",
      payload: { message: "Error retrieving rinks", alert: "alert-error" },
    });
    console.log("Error getting rinks from server:", error);
  }
}

function* rinkSaga() {
  yield takeLatest("CREATE_RINK", createRink);
  yield takeLatest("FETCH_RINKS", fetchRink);
}

export default rinkSaga;
