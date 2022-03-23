import { configureStore } from "@reduxjs/toolkit";

import elementsSlice from "./reducers/elements.slice"

export const store = configureStore({
	reducer: {
		elements: elementsSlice
	}
});
