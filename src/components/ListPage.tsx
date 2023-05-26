import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, deleteRecipe } from "../features/recipeSlice";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { RootState, AppDispatch } from "../app/store";
import { useNavigate } from "react-router-dom";
import { Recipe } from "../types/recipeTypes";
import "./ListPage.css";
import cowIcon from "../icons/cow.png";
import chickenIcon from "../icons/chicken.png";
import fishIcon from "../icons/fish.png";
import otherIcon from "../icons/others.png";
import saladIcon from "../icons/salad.png";
import sheepIcon from "../icons/sheep.png";

const ListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipe.recipes);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [selectedMeatType, setSelectedMeatType] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRecipes);
    } else {
      setSearchResults(recipes);
    }
  }, [searchQuery, recipes]);

  const handleDeleteRecipe = (recipeId: string) => {
    dispatch(deleteRecipe(recipeId));
    dispatch(fetchRecipes());
    toast.info("Deleted Successfully!");
  };

  const handleEditRecipe = (recipeId: string) => {
    if (recipeId === "new") {
      navigate("/form");
    } else {
      const recipeToUpdate = recipes.find((recipe) => recipe.id === recipeId);
      if (recipeToUpdate) {
        navigate(`/form/${recipeId}`, { state: { recipe: recipeToUpdate } });
      }
    }
    dispatch(fetchRecipes());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMeatTypeFilter = (meatType: string) => {
    if (selectedMeatType === meatType) {
      setSelectedMeatType(null); 
    } else {
      setSelectedMeatType(meatType); 
    }
  };


  return (
    <div className="recipe-list">
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="search-container">
        <input
          type="text"
          placeholder="Search recipes by name"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
        <div className="meat-type-icons">
          <button
            className={`meat-type-btn ${selectedMeatType === "beef" ? "active" : ""}`}
            onClick={() => handleMeatTypeFilter("beef")}
          >
            <img src={cowIcon} alt="Beef" className={`meat-type-icon ${selectedMeatType === "beef" ? "active" : ""}`} />
          </button>
          <button
            className={`meat-type-btn ${selectedMeatType === "chicken" ? "active" : ""}`}
            onClick={() => handleMeatTypeFilter("chicken")}
          >
             <img src={chickenIcon} alt="Chicken" className={`meat-type-icon ${selectedMeatType === "chicken" ? "active" : ""}`} />
          </button>
          <button
            className={`meat-type-btn ${selectedMeatType === "fish" ? "active" : ""}`}
            onClick={() => handleMeatTypeFilter("fish")}
          >
            <img src={fishIcon} alt="Fish" className={`meat-type-icon ${selectedMeatType === "fish" ? "active" : ""}`} />
          </button>
          <button
            className={`meat-type-btn ${selectedMeatType === "mutton" ? "active" : ""}`}
            onClick={() => handleMeatTypeFilter("mutton")}
          >
            <img src={sheepIcon} alt="Mutton" className={`meat-type-icon ${selectedMeatType === "mutton" ? "active" : ""}`} />
          </button>
          <button
            className={`meat-type-btn ${selectedMeatType === "vegetarian" ? "active" : ""}`}
            onClick={() => handleMeatTypeFilter("vegetarian")}
          >
            <img src={saladIcon} alt="Vegetarian" className={`meat-type-icon ${selectedMeatType === "vegetarian" ? "active" : ""}`} />
          </button>
          <button
            className={`meat-type-btn ${selectedMeatType === "others" ? "active" : ""}`}
            onClick={() => handleMeatTypeFilter("others")}
          >
            <img src={otherIcon} alt="Others" className={`meat-type-icon ${selectedMeatType === "others" ? "active" : ""}`} />
          </button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <>
          <h1>Recipes List</h1>
          <div className="row">
            {searchResults.map((recipe: Recipe) => {
              if (selectedMeatType && recipe.meatType !== selectedMeatType) {
                return null; 
              }
              return (
                <div className="col-md-4 main-card" key={recipe.id}>
                  <div className="recipe-card">
                    <Link to={`/detail/${recipe.id}`}>
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="recipe-image"
                      />
                      <div className="recipe-details">
                        <h3 className="recipe-name">{recipe.name}</h3>
                        <p>Cooking Time: {recipe.cookingTime}</p>
                      </div>
                    </Link>
                    <div className="recipe-actions d-flex justify-content-center">
                      <button
                        className="bts-list del-btn ms-2"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        <AiFillDelete style={{ fontSize: "1.5rem" }} />
                      </button>
                      <button
                        className="bts-list edit-btn ms-2"
                        onClick={() => handleEditRecipe(recipe.id)}
                      >
                        <AiFillEdit style={{ fontSize: "1.5rem" }} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <h2 className="no-recipes">No Recipes found...</h2>
      )}
    </div>
  );
};

export default ListPage;
