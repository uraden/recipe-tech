import React, { useState, useEffect, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Recipe } from "../types/recipeTypes";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import { ToastContainer, toast } from "react-toastify";
import { createRecipe, updateRecipe } from "../features/recipeSlice";
import "react-toastify/dist/ReactToastify.css";
import "./FormPage.css";
import { AppDispatch } from "../app/store";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const FormPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [meatType, setMeatType] = useState<string>("");
  const [cookingTime, setCookingTime] = useState<string>("00:00");

  const location = useLocation();
  const recipeToUpdate = location.state?.recipe;

  const navigate = useNavigate();

  useEffect(() => {
    if (recipeToUpdate) {
      setName(recipeToUpdate.name);
      setImage(recipeToUpdate.image);
      setDescription(recipeToUpdate.description);
      setIngredients(recipeToUpdate.ingredients);
      setCookingTime(recipeToUpdate.cookingTime);
    }
  }, [recipeToUpdate]);

  const validateImageURL = (url: string) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Please enter a name for the recipe!");
      return false;
    }

    if (!cookingTime.trim()) {
      toast.error("Please enter the cooking time!");
      return false;
    }

    if (!description.trim()) {
      toast.error("Please enter a description for the recipe!");
      return false;
    }

    if (!validateImageURL(image)) {
      toast.error("Invalid Image URL! Please enter a valid URL!");
      return;
    }

    if (!meatType) {
      toast.error("Please select a meat type");
      return false;
    }

    if (!ingredients.trim()) {
      toast.error("Please enter the ingredients!");
      return false;
    }

    if (!ingredients.includes(",")) {
      toast.error("Please separate ingredients with commas!");
      return false;
    }  

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedRecipe: Recipe = {
      id: recipeToUpdate?.id || "",
      name,
      image,
      cookingTime,
      description,
      ingredients,
      meatType,
    };

    if (recipeToUpdate) {
      dispatch(updateRecipe(updatedRecipe));
      navigate("/recipe-tech");
    } else {
      dispatch(createRecipe(updatedRecipe));
      navigate("/recipe-tech");
    }

    setName("");
    setImage("");
    setCookingTime("");
    setDescription("");
    setIngredients("");
  };

  return (
    <div className="form-page-container">
      {recipeToUpdate ? <h1>Update Recipe</h1> : <h1>Create Recipe</h1>}
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label">Name of the recipe</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="form6Example3"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Link for the image</label>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            id="form6Example3"
            className="form-control"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Cooking Time</label>
          <TimePicker
            value={cookingTime}
            onChange={(e) => setCookingTime(e as SetStateAction<string>)}
            format="HH:mm"
            clearIcon={null}
            id="form6Example3"
            className="customTimePicker"
            required
          />
        </div>
        <div className="form-outline mb-4">
          <label className="form-label">Description of recipe </label>
          <textarea
            placeholder="Description"
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            id="form6Example7"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Meat Type</label>
          <select
            value={meatType}
            onChange={(e) => setMeatType(e.target.value)}
            className="form-control"
          >
            <option value="">Select a meat type</option>
            <option value="beef">Beef</option>
            <option value="chicken">Chicken</option>
            <option value="fish">Fish </option>
            <option value="mutton">Mutton </option>
            <option value="vegetarian">Vegetarian </option>
            <option value="others">Others </option>
          </select>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">
            Ingredients need it{" "}
            <small>(please add comma between ingredients)</small>
          </label>
          <textarea
            placeholder="Ingredients (separated by a new line)"
            value={ingredients}
            rows={4}
            onChange={(e) => setIngredients(e.target.value)}
            className="form-control"
            id="form6Example7"
          />
        </div>
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
        {recipeToUpdate ? (
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Update the Recipe
          </button>
        ) : (
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Create New Recipe
          </button>
        )}
      </form>
    </div>
  );
};

export default FormPage;
