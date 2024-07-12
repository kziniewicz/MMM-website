import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import "./css/AddRecipe.css";
import {
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useRecipeIdQuery,
} from "../../js/recipes.js"; 
import { useResourceQueries } from "../../js/resources.js";

const AddRecipe = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredientInputs, setIngredientInputs] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredientName, setSelectedIngredientName] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = !!id || location.pathname.includes("/add-recipe/");
  const navigate = useNavigate();


  const addRecipeMutation = useAddRecipeMutation();
  const updateRecipeMutation = useUpdateRecipeMutation();

  const { getResource: getIngredients } = useResourceQueries("ingredients"); 
  const { data: recipeData, isLoading, isError } = useRecipeIdQuery(id); 

  useEffect(() => {
    if (isEditMode && id) {
      if (!isLoading && !isError) {
        setValue("name", recipeData.name);
        setValue("servings", recipeData.servings);
        setValue("kcalPerServing", recipeData.kcalPerServing);
        setValue("totalTime", recipeData.totalTime);
        setValue("coverImageUrl", recipeData.coverImageUrl);
        setValue("instructions", recipeData.instructions);

        const initialInputs = recipeData.ingredients.reduce((acc, curr) => {
          acc[curr.ingredientId] = { amount: curr.amount, unit: curr.unit };
          return acc;
        }, {});
        setSelectedIngredients(
          recipeData.ingredients.map((ingredient) => ingredient.ingredientId)
        );
        setIngredientInputs(initialInputs);
      }
    }
    const fetchIngredients = async () => {
      const ingredients = await getIngredients(); 
      setIngredients(ingredients);
    };

    fetchIngredients();
  }, [id, isLoading, isError]);

  const handleIngredientChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedIngredients(selectedOptions);
    const initialInputs = selectedOptions.reduce((acc, curr) => {
      acc[curr] = { amount: "", unit: "G" };
      return acc;
    }, {});
    setIngredientInputs(initialInputs);
    const selectedIngredient = ingredients.find(
      (ingredient) => ingredient.id === parseInt(selectedOptions[0])
    ); 
    setSelectedIngredientName(selectedIngredient?.name || ""); 
  };

  const handleIngredientInput = (event, ingredientId) => {
    const { name, value } = event.target;
    setIngredientInputs((prevState) => ({
      ...prevState,
      [ingredientId]: {
        ...prevState[ingredientId],
        [name]: value,
      },
    }));
  };

  const handleIngredientSearch = (event) => {
    setIngredientSearch(event.target.value.toLowerCase()); 
  };

  const onSubmit = async (data) => {
    try {
      const {
        name,
        servings,
        kcalPerServing,
        totalTime,
        coverImageUrl,
        instructions,
      } = data;
      const recipeData = {
        name,
        servings,
        kcalPerServing,
        totalTime,
        coverImageUrl,
        instructions,
        ingredients: selectedIngredients.map((ingredientId) => ({
          ingredientId,
          amount: ingredientInputs[ingredientId]?.amount || 0, 
          unit: ingredientInputs[ingredientId]?.unit || "G", 
        })),
      };
      if (isEditMode) {
        await updateRecipeMutation.mutateAsync({
          recipeId: id,
          updatedRecipe: recipeData,
        });
        alert("Przepis został zaktualizowany pomyślnie");
        navigate("/admin-panel/recipes");

      } else {
        await addRecipeMutation.mutateAsync(recipeData);
        alert("Nowy przepis został dodany pomyślnie");
        navigate("/admin-panel/recipes");

      }
    } catch (error) {
      alert("Wystąpił błąd podczas przetwarzania danych przepisu:", error);
    }
  };

  return (
    <div className="addRecipe-container">
      <h1> {isEditMode ? "EDYCJA PRZEPISU" : "DODAWANIE PRZEPISU"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="recipe-form">
          <div className="grid-left">
            <label>Tytuł przepisu:</label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && <span>To pole jest wymagane</span>}

            <label>Ilość porcji:</label>
            <input
              type="number"
              name="servings"
              {...register("servings", { required: true, min: 1 })}
            />
            {errors.servings && errors.servings.type === "required" && (
              <span>To pole jest wymagane</span>
            )}
            {errors.servings && errors.servings.type === "min" && (
              <span>Ilość porcji musi być większa niż 0</span>
            )}

            <label>Ilość kalorii na jedną porcję:</label>
            <input
              type="number"
              name="kcalPerServing"
              {...register("kcalPerServing", { required: true, min: 0 })}
            />
            {errors.kcalPerServing &&
              errors.kcalPerServing.type === "required" && (
                <span>To pole jest wymagane</span>
              )}
            {errors.kcalPerServing && errors.kcalPerServing.type === "min" && (
              <span>Ilość kalorii musi być większa lub równa 0</span>
            )}

            <label>Czas przygotowania (min):</label>
            <input
              type="number"
              name="totalTime"
              {...register("totalTime", { required: true, min: 1 })}
            />
            {errors.totalTime && errors.totalTime.type === "required" && (
              <span>To pole jest wymagane</span>
            )}
            {errors.totalTime && errors.totalTime.type === "min" && (
              <span>Czas przygotowania musi być większy niż 0</span>
            )}

            <label>URL obrazka:</label>
            <input
              type="text"
              name="coverImageUrl"
              {...register("coverImageUrl", { required: true })}
            />
            {errors.coverImageUrl && <span>To pole jest wymagane</span>}
          </div>

          <div className="grid-right">
            <label>Instrukcje:</label>
            <textarea
              name="instructions"
              {...register("instructions", { required: true })}
            />
            {errors.instructions && <span>To pole jest wymagane</span>}

            <div>
              <label>Lista składników:</label>
              <input
                type="text"
                placeholder="Szukaj składnika"
                value={ingredientSearch}
                onChange={handleIngredientSearch}
              />
              <select
                name="ingredients"
                multiple
                onChange={handleIngredientChange}
              >
                {Array.isArray(ingredients) &&
                  ingredients
                    .filter((ingredient) =>
                      ingredient.name.toLowerCase().includes(ingredientSearch)
                    )
                    .map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name}
                      </option>
                    ))}
              </select>
              {selectedIngredients.map((ingredientId) => (
                <div className="ingredient-details" key={ingredientId}>
                  <label>
                    {
                      ingredients.find(
                        (ingredient) => ingredient.id === ingredientId
                      )?.name
                    }
                  </label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Ilość"
                    value={ingredientInputs[ingredientId]?.amount || ""}
                    onChange={(event) =>
                      handleIngredientInput(event, ingredientId)
                    }
                  />
                  <select
                    name="unit"
                    value={ingredientInputs[ingredientId]?.unit || "G"}
                    onChange={(event) =>
                      handleIngredientInput(event, ingredientId)
                    }
                  >
                    <option value="G">Gramy (g)</option>
                    <option value="ML">Mililitry (ml)</option>
                    <option value="TSP">Łyżeczki (tsp)</option>
                    <option value="TBSP">Łyżki (tbsp)</option>
                    <option value="CUP">Kubki (cup)</option>
                    <option value="PIECE">Sztuki (piece)</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="submit-button">
          <button type="submit">
            {isEditMode ? "Zapisz zmiany" : "Dodaj przepis"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
