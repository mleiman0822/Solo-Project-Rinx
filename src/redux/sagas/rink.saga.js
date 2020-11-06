import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Refresh the global list of uploads from the database
function* fetchRinks() {
  try {
    const response = yield axios.get("/api/rinks");
    // add the upload to the redux store
    yield put({ type: "SET_MAP_RINKS", payload: response.data });
  } catch (error) {
    // dispatch an error that the upload was rejected
    yield put({
      type: "SET_ALERT",
      payload: { message: "Error retrieving map items", alert: "alert-error" },
    });
    console.log("Error getting map items from server:", error);
  }
}

function* rinkItemSaga() {
  yield takeLatest("FETCH_RINKS", fetchRinks);
}

export default rinkItemSaga;
