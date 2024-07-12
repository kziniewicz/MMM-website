import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteRecipeMutation, useRecipesQuery } from "../../js/recipes"; 
import "../RecipeProductResource/RecipeProductResource.css";

const AdminPanelRecipes = () => {
  const [currentPage] = useState(1);
  const [sortDirection] = useState('asc');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteInputs, setShowDeleteInputs] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState("");

  const { data, refetch } = useRecipesQuery(currentPage, searchTerm, sortDirection);
  const deleteRecipeMutation = useDeleteRecipeMutation();

  const navigate = useNavigate();

  const handleAddRecipeClick = () => {
    navigate("/add-recipe");
  };

  const handleDeleteRecipeClick = async () => {
    if (window.confirm("Czy na pewno chcesz usunąć ten przepis?")) {
      try {
        await deleteRecipeMutation.mutateAsync(deleteId);
        alert("Przepis został pomyślnie usunięty");
        refetch(); // Refresh the recipe list
      } catch (error) {
        console.error("Błąd podczas usuwania przepisu:", error);
      }
    }
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchValue)
    );
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    if (data) {
      setRecipes(data.content);
      setFilteredRecipes(data.content);
    }
  }, [data]);

  const handleRecipeChange = (e) => {
    setSelectedRecipe(e.target.value);
  };

  return (
    <div className="opt-container">
      <h1>PRZEPISY</h1>
      <div className="option-search">
        <input
          type="text"
          placeholder="Search recipes"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={selectedRecipe} onChange={handleRecipeChange}>
          <option value="">Select...</option>
          {filteredRecipes.map((recipe) => (
            <option key={recipe.id} value={recipe.id}>
              {recipe.name} - id: {recipe.id}
            </option>
          ))}
        </select>
      </div>
      <div className="option-btn">
        <button onClick={handleAddRecipeClick}>Dodaj przepis</button>
      </div>
      <div className="option-btn">
        <button onClick={() => setShowDeleteInputs(!showDeleteInputs)}>Usuń przepis</button>
      </div>
      {showDeleteInputs && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID przepisu"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <button onClick={handleDeleteRecipeClick}>Usuń</button>
        </div>
      )}
      <div className="option-btn">
        <button onClick={() => setShowEditInput(true)}>Edytuj przepis</button>
      </div>
      {showEditInput && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID przepisu"
            value={editRecipeId}
            onChange={(e) => setEditRecipeId(e.target.value)}
          />
          <button onClick={() => navigate(`/add-recipe/${editRecipeId}`)}>
            Edytuj
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanelRecipes;
