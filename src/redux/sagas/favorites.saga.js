import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// will be fired on ADD_FAVORITE
function* addFavorite(action) {
  try {
    yield axios.post(`/api/favorites`, action.payload);
    yield put({ type: "SET_FAVORITES", payload: action.payload });
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.log("Error with adding favorite:", error);
  }
}

//getting the favorites from the favorites route
function* getFavorite(action) {
  try {
    const response = yield axios.get(`/api/favorites`, action.payload);
    yield put({ type: "SET_FAVORITES", payload: response.data });
  } catch (error) {
    console.log("Error with adding favorite:", error);
  }
}

// will be fired on DELETE_FAVORITE
function* deleteFavorite(action) {
  try {
    yield axios.delete(`/api/favorites/${action.payload}`);
    yield put({ type: "FETCH_FAVORITES" });
  } catch (error) {
    console.log("Error with deleting favorite:", error);
  }
}

function* addFavoriteSaga() {
  yield takeLatest("ADD_FAVORITE", addFavorite);
  yield takeLatest("DELETE_FAVORITE", deleteFavorite);
  yield takeLatest("FETCH_FAVORITES", getFavorite);
}

export default addFavoriteSaga;
