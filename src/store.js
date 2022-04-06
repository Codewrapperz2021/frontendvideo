import { createStore } from "redux";
import rootReducer from "./reducers/rootreducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
    key: 'persist-store',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, composeWithDevTools())
export const persistor = persistStore(store)

