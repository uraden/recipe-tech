import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../features/recipeSlice";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../app/store";
import "./DetailPage.css";

const DetailPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const recipe = recipes.find((recipe) => recipe.id === id);

  const getRandomColor = () => {
    const colors = ['#e6e6fa', '#f0f8ff', '#ffe4e1', '#f5f5dc', '#f0fff0', '#e6faf5', '#fae6e7', '#f4fae6'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  return (
    <div className="detailMain">
      <h1>Recipe Detail</h1>
      {recipe && (
        <div className="recipeDetails">
          <div className="recipeImage">
            <img src={recipe.image} alt={recipe.name} />
          </div>
          <div className="recipeInfo">
            <h1>{recipe.name}</h1>
            <div> 
            <p> Cooking Time: <span className="timerRecipe">{recipe.cookingTime}</span></p>
            </div>
            <p>{recipe.description}</p>
            <div className="ingredientList">
            <h3>Ingredients:</h3>
              {recipe.ingredients.split(',' ).map((ingredient, index) => {
                  if (ingredient.trim() !== "") {
                    return <div 
                              className="ingredient" 
                              key={index}
                              style={{ backgroundColor: getRandomColor() }}
                              >
                              {ingredient}
                              </div>;
                  }
                  return null;
                })
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
