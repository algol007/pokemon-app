import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./reducers/pokemonReducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['pokemon'],
}

const rootReducer = combineReducers({ 
  pokemon: pokemonReducer,
})


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export type RootState = ReturnType<typeof rootReducer>
export const persistor = persistStore(store)