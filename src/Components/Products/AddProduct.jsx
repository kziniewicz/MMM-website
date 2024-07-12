import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useProductIdQuery,
} from "../../js/products.js";
import { useResourceQueries } from "../../js/resources.js";
import "./css/AddProduct.css";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    allergensId: [],
    barcode: "",
    brandsId: [],
    categoriesId: [],
    countriesId: [],
    ingredientAnalysis: {
      fromPalmOil: false,
      ingredientsDescription: "",
      vegan: false,
      vegetarian: false,
    },
    ingredientsId: [],
    name: "",
    novaGroup: 0,
    nutriScore: 0,
    nutriment: {
      energyKcalPer100g: 0,
      fatPer100g: 0,
      fiberPer100g: 0,
      proteinsPer100g: 0,
      saltPer100g: 0,
      sodiumPer100g: 0,
      sugarsPer100g: 0,
    },
    quantity: "",
  });

  const [brands, setBrands] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isResourcesLoaded, setResourcesLoaded] = useState(false); 
  const { id } = useParams();
  const location = useLocation();
  const isEditMode = !!id || location.pathname.includes("/add-product/");

  const addProductMutation = useAddProductMutation();
  const updateProductMutation = useUpdateProductMutation();
  const { data: productData, isLoading, isError } = useProductIdQuery(id);
  const [searchText, setSearchText] = useState("");

  const { getResource: getBrands } = useResourceQueries("brands");
  const { getResource: getAllergens } = useResourceQueries("allergens");
  const { getResource: getCountries } = useResourceQueries("countries");
  const { getResource: getCategories } = useResourceQueries("categories");
  const { getResource: getIngredients } = useResourceQueries(
    "products/ingredients"
  );

  useEffect(() => {
    if (!isResourcesLoaded) {
      Promise.all([
        getBrands(),
        getAllergens(),
        getCountries(),
        getCategories(),
        getIngredients(),
      ]).then(
        ([
          brandsData,
          allergensData,
          countriesData,
          categoriesData,
          ingredientsData,
        ]) => {
          setBrands(brandsData);
          setAllergens(allergensData);
          setCountries(countriesData);
          setCategories(categoriesData);
          setIngredients(ingredientsData);
          setResourcesLoaded(true); 
        }
      );
    }
  }, [
    getBrands,
    getAllergens,
    getCountries,
    getCategories,
    getIngredients,
    isResourcesLoaded,
  ]);

  useEffect(() => {
    if (isEditMode && productData) {
      setFormData(productData);
    }
  }, [isEditMode, productData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parentField, childField] = name.split("."); 

    if (childField) {
      setFormData((prevState) => ({
        ...prevState,
        [parentField]: {
          ...prevState[parentField],
          [childField]: value, 
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value, 
      }));
    }
  };

  const handleCheckboxChange = (e, propertyName) => {
    const { checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      ingredientAnalysis: {
        ...prevState.ingredientAnalysis,
        [propertyName]: checked,
      },
    }));
  };

  const handleNutrimentChange = (e) => {
    const { name, value } = e.target;
    const nutrimentField = name.split(".");
    setFormData((prevState) => ({
      ...prevState,
      nutriment: {
        ...prevState.nutriment,
        [nutrimentField[1]]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        const response = await updateProductMutation.mutateAsync({
          productId: formData.id,
          updatedProduct: formData,
        });
        alert("Product updated successfully:", response);
      } else {
        const response = await addProductMutation.mutateAsync(formData);
        alert("Product added successfully:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMultipleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedOptions,
    }));
  };

  const filterOptions = (options) => {
    return options.filter((option) =>
      option.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <div className="addProduct-container">
      <h1>{isEditMode ? "EDYCJA PRODUKTU" : "DODAWANIE PRODUKTU"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="product-form">
          <div className="grid-left">
            <label>Nazwa produktu:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <label>Kod kreskowy:</label>
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
            />

            <label>Nova Group:</label>
            <select
              name="novaGroup"
              onChange={handleChange}
              value={formData.novaGroup}
            >
              <option value="0">Wybierz wartość</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <label>Nutri score:</label>
            <select
              name="nutriScore"
              onChange={handleChange}
              value={formData.nutriScore}
            >
              <option value="0">Wybierz wartość</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>

            <label>Ilość:</label>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />

            <label>Opis Składników:</label>
            <input
              type="text"
              name="ingredientAnalysis.description"
              value={formData.ingredientAnalysis.description}
              onChange={handleChange}
            />

            <label>Energia:</label>
            <input
              type="number"
              name="nutriment.energyKcalPer100g"
              value={formData.nutriment.energyKcalPer100g}
              onChange={handleNutrimentChange}
            />
            <label>Tłuszcz:</label>
            <input
              type="number"
              name="nutriment.fatPer100g"
              value={formData.nutriment.fatPer100g}
              onChange={handleNutrimentChange}
            />
            <label>Błonnik:</label>
            <input
              type="number"
              name="nutriment.fiberPer100g"
              value={formData.nutriment.fiberPer100g}
              onChange={handleNutrimentChange}
            />
            <label>Białko:</label>
            <input
              type="number"
              name="nutriment.proteinsPer100g"
              value={formData.nutriment.proteinsPer100g}
              onChange={handleNutrimentChange}
            />
            <label>Sól:</label>
            <input
              type="number"
              name="nutriment.saltPer100g"
              value={formData.nutriment.saltPer100g}
              onChange={handleNutrimentChange}
            />
            <label>Sód:</label>
            <input
              type="number"
              name="nutriment.sodiumPer100g"
              value={formData.nutriment.sodiumPer100g}
              onChange={handleNutrimentChange}
            />
            <label>Cukry:</label>
            <input
              type="number"
              name="nutriment.sugarsPer100g"
              value={formData.nutriment.sugarsPer100g}
              onChange={handleNutrimentChange}
            />

            <div className="checkbox-container">
              <label>Wegański:</label>
              <input
                type="checkbox"
                name="ingredientAnalysis.vegan"
                checked={formData.ingredientAnalysis.vegan}
                onChange={(e) => handleCheckboxChange(e, "vegan")}
              />
              <label>Wegetariański:</label>
              <input
                type="checkbox"
                name="ingredientAnalysis.vegetarian"
                checked={formData.ingredientAnalysis.vegetarian}
                onChange={(e) => handleCheckboxChange(e, "vegetarian")}
              />
              <label>Z olejem palmowym:</label>
              <input
                type="checkbox"
                name="ingredientAnalysis.fromPalmOil"
                checked={formData.ingredientAnalysis.fromPalmOil}
                onChange={(e) => handleCheckboxChange(e, "fromPalmOil")}
              />
            </div>
          </div>

          <div className="grid-right">
            <label>Marka:</label>
            <input
              type="text"
              placeholder="Wyszukaj..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              name="brandsId"
              onChange={handleMultipleSelectChange}
              value={formData.brandsId} 
              multiple
            >
              {filterOptions(brands).map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>

            <label>Alergeny:</label>
            <input
              type="text"
              placeholder="Wyszukaj..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              name="allergensId"
              onChange={handleMultipleSelectChange}
              value={formData.allergensId} 
              multiple
            >
              {filterOptions(allergens).map((allergen) => (
                <option key={allergen.id} value={allergen.id}>
                  {allergen.name}
                </option>
              ))}
            </select>

            <label>Kraje:</label>
            <input
              type="text"
              placeholder="Wyszukaj..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              name="countriesId"
              onChange={handleMultipleSelectChange}
              value={formData.countriesId} 
              multiple
            >
              {filterOptions(countries).map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>

            <label>Kategoria:</label>
            <input
              type="text"
              placeholder="Wyszukaj..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              name="categoriesId"
              onChange={handleMultipleSelectChange}
              value={formData.categoriesId} 
              multiple
            >
              {filterOptions(categories).map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label>Składniki:</label>
            <input
              type="text"
              placeholder="Wyszukaj..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              name="ingredientsId"
              onChange={handleMultipleSelectChange}
              value={formData.ingredientsId} 
              multiple
            >
              {filterOptions(ingredients).map((ingredient) => (
                <option key={ingredient.id} value={ingredient.id}>
                  {ingredient.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="submit-btn">
          <button type="submit">Dodaj produkt</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
