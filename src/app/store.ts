import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import recipeDetail from '../features/recipeSlice';

export const store = configureStore({
  reducer: {
    recipe: recipeDetail,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
