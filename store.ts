import { configureStore } from "@reduxjs/toolkit";
import SavedReducer from "./SavedReducer";
import SavedDraft from "./SavedDraft";

export default configureStore({
    reducer: {booking: SavedReducer, saveddraft: SavedDraft}
})