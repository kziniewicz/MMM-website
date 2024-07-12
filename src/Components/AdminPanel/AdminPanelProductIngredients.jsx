
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} from "../../js/productIngredient";
import "../RecipeProductResource/RecipeProductResource.css";

const AdminPanelProductIngredients = () => {
  const [formData, setFormData] = useState({
    fromPalmOil: false,
    name: "",
    vegan: false,
    vegetarian: false,
  });
  const [ingredientId, setIngredientId] = useState("");
  const [editingIngredient, setEditingIngredient] = useState(false);
  const [addingIngredient, setAddingIngredient] = useState(false);
  const [deletingIngredient, setDeletingIngredient] = useState(false);

  const navigate = useNavigate();
  const addIngredientMutation = useAddIngredientMutation();
  const updateIngredientMutation = useUpdateIngredientMutation();
  const deleteIngredientMutation = useDeleteIngredientMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddIngredient = async () => {
    try {
      console.log(formData);
      await addIngredientMutation.mutateAsync(formData);
      alert("Ingredient added successfully");
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  const handleUpdateIngredient = async () => {
    try {
      await updateIngredientMutation.mutateAsync({ ingredientId, formData });
      alert("Ingredient updated successfully");
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  const handleDeleteIngredient = async () => {
    try {
      await deleteIngredientMutation.mutateAsync(ingredientId);
      alert("Ingredient deleted successfully");
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  return (
    <div className="main-container">
      <h1> PRODUCT INGREDIENTS</h1>
      <div className="option-btn">
        <button onClick={() => setAddingIngredient(true)}>
          Add Ingredient
        </button>
      </div>
      {addingIngredient && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="Nzawa"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="checkbox-container">
            <label>From Palm Oil: </label>

            <input
              type="checkbox"
              name="fromPalmOil"
              checked={formData.fromPalmOil}
              onChange={handleChange}
            />
            <label>Vegan:</label>

            <input
              type="checkbox"
              name="vegan"
              checked={formData.vegan}
              onChange={handleChange}
            />
            <label>Vegetarian:</label>

            <input
              type="checkbox"
              name="vegetarian"
              checked={formData.vegetarian}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleAddIngredient}>Add Ingredient</button>
        </div>
      )}
      <div className="option-btn">
        <button onClick={() => setEditingIngredient(true)}>
          Edit Ingredient
        </button>
      </div>
      {editingIngredient && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID zasobu"
            value={ingredientId}
            onChange={(e) => setIngredientId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nazwa"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="checkbox-container">
            <label>From Palm Oil: </label>

            <input
              type="checkbox"
              name="fromPalmOil"
              checked={formData.fromPalmOil}
              onChange={handleChange}
            />
            <label>Vegan:</label>

            <input
              type="checkbox"
              name="vegan"
              checked={formData.vegan}
              onChange={handleChange}
            />
            <label>Vegetarian:</label>

            <input
              type="checkbox"
              name="vegetarian"
              checked={formData.vegetarian}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleUpdateIngredient}>Update Ingredient</button>
        </div>
      )}

      <div className="option-btn">
        <button onClick={() => setDeletingIngredient(true)}>
          Delete Ingredient
        </button>
      </div>
      {deletingIngredient && (
        <div className="option-resource">
          <label>
            <input
              type="text"
              placeholder="ID zasobu"
              value={ingredientId}
              onChange={(e) => setIngredientId(e.target.value)}
            />
          </label>
          <button onClick={handleDeleteIngredient}>Delete Ingredient</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanelProductIngredients;
