import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// will be fired on ADD_FAVORITE
function* addFavorite(action) {
  try {
    yield axios.post(`/api/favorites`, action.payload);
    yield put({ type: "SET_FAVORITES", payload: action.payload });
  } catch (error) {
    console.log("Error with adding favorite:", error);
  }
}

// will be fired on DELETE_FAVORITE
function* deleteFavorite(action) {
  try {
    yield axios.delete(`/:id`, { data: action.payload });
  } catch (error) {
    console.log("Error with deleting favorite:", error);
  }
}

function* addFavoriteSaga() {
  yield takeLatest("ADD_FAVORITE", addFavorite);
  yield takeLatest("DELETE_FAVORITE", deleteFavorite);
}

export default addFavoriteSaga;
