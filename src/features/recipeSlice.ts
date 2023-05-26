import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../app/store';
import axios from 'axios';
import { Recipe } from '../types/recipeTypes';

interface RecipeState {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
};

const recipeDetail = createSlice({
  name: 'recipeDetail',
  initialState,
  reducers: {
    fetchRecipesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRecipesSuccess(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchRecipesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createRecipeStart(state) {
      state.loading = true;
      state.error = null;
    },
    createRecipeSuccess(state, action: PayloadAction<Recipe>) {
      state.recipes.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createRecipeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateRecipeStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateRecipeSuccess(state, action: PayloadAction<Recipe>) {
      const updatedIndex = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload.id
      );
      if (updatedIndex !== -1) {
        state.recipes[updatedIndex] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateRecipeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteRecipeStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteRecipeSuccess(state, action: PayloadAction<string>) {
      state.recipes = state.recipes.filter(
        (recipe) => recipe.id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteRecipeFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  fetchRecipesStart,
  fetchRecipesSuccess,
  fetchRecipesFailure,
  createRecipeStart,
  createRecipeSuccess,
  createRecipeFailure,
  updateRecipeStart,
  updateRecipeSuccess,
  updateRecipeFailure,
  deleteRecipeStart,
  deleteRecipeSuccess,
  deleteRecipeFailure,
} = recipeDetail.actions;

export default recipeDetail.reducer;

// Async action to fetch recipes
export const fetchRecipes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchRecipesStart());
    const response = await axios.get<Recipe[]>(
      'https://5ff4107016cf4f0017c1fa9e.mockapi.io/api/v1/recipe'
    );
    dispatch(fetchRecipesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchRecipesFailure(error.message || 'Failed to fetch recipes'));
  }
};

// Async action to create a recipe
export const createRecipe = (recipe: Recipe): AppThunk => async (dispatch) => {
  try {
    dispatch(createRecipeStart());
    const response = await axios.post<Recipe>(
      'https://5ff4107016cf4f0017c1fa9e.mockapi.io/api/v1/recipe',
      recipe
    );
    dispatch(createRecipeSuccess(response.data));
  } catch (error: any) {
    dispatch(createRecipeFailure(error.message || 'Failed to create recipe'));
  }
};

// Async action to update a recipe
export const updateRecipe = (recipe: Recipe): AppThunk => async (dispatch) => {
  try {
    dispatch(updateRecipeStart());
    const response = await axios.put<Recipe>(
      `https://5ff4107016cf4f0017c1fa9e.mockapi.io/api/v1/recipe/${recipe.id}`,
      recipe
    );
    dispatch(updateRecipeSuccess(response.data));
  } catch (error: any) {
    dispatch(updateRecipeFailure(error.message || 'Failed to update recipe'));
  }
};

// Async action to delete a recipe
export const deleteRecipe = (recipeId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(deleteRecipeStart());
    await axios.delete(
      `https://5ff4107016cf4f0017c1fa9e.mockapi.io/api/v1/recipe/${recipeId}`
    );
    dispatch(deleteRecipeSuccess(recipeId));
  } catch (error: any) {
    dispatch(deleteRecipeFailure(error.message || 'Failed to delete recipe'));
  }
};
