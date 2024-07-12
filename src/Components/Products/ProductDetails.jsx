import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import "./css/ProductDetails.css";
import questionMarkImage from "../../images/question-mark.png";
import { useProductIdQuery } from "../../js/products.js";

const ProductDetails = () => {
  const { id } = useParams(); 
  const { data: product, isLoading, isError } = useProductIdQuery(id);

  if (!product) {
    return <div>Ładowanie...</div>;
  }
  const productImage =
    product.images && product.images.length > 0
      ? product.images[0].url 
      : questionMarkImage; 

  return (
    <div>
      <h1>{product.name}</h1>
      <div className="product-main-info">
        <p>Kod kreskowy: {product.barcode}</p>
        <p>Ilość: {product.quantity}</p>
        <p>NutriScore: {product.nutriScore}</p>
        <p>Grupa Nova: {product.novaGroup}</p>
        <p>
          Produkt vege: {product.ingredientAnalysis.vegetarian ? "Tak" : "Nie"}
        </p>
        <p>
          Olej palmowy: {product.ingredientAnalysis.fromPalmOil ? "Tak" : "Nie"}
        </p>
      </div>

      <div className="productContainer">
        <div className="productImage">
          {productImage && <img src={productImage} alt="Product" />}
        </div>

        <div className="product-other-info">
          <div className="category">
            <h3>Kategorie:</h3>
            <ul>
              {product.categories.map((category) => (
                <li key={category.id}>{category.name}</li>
              ))}
            </ul>
          </div>
          <div className="brands">
            <h3>Marka</h3>
            <ul>
              {product.brands.map((brand) => (
                <li key={brand.id}>{brand.name}</li>
              ))}
            </ul>
          </div>
          <div className="country">
            <h3>Kraj pochodzenia</h3>
            <ul>
              {product.countries.map((country) => (
                <li key={country.id}>{country.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="product-details-info">
        <div className="allergens">
          <h3>Alergeny</h3>
          <ul>
            {product.allergens.map((allergen, index) => (
              <li key={allergen.id}>
                {index !== 0 && ","} {allergen.name}
              </li>
            ))}
          </ul>
        </div>

        <h3>Składniki</h3>
        <ul>
          {product.ingredients &&
            product.ingredients.map((ingredient, index) => (
              <li key={ingredient.id}>
                {index !== 0 && ","} {ingredient.name}
              </li>
            ))}
        </ul>
      </div>

      <div className="nutriment-info">
        <h3>Składniki odżywcze</h3>
        <p>
          <span>Energy (kcal/100g)</span>
          {product.nutriment.energyKcalPer100g}
        </p>
        <p>
          <span>Fat (g/100g)</span>
          {product.nutriment.fatPer100g}
        </p>
        <p>
          <span>Fiber (g/100g)</span>
          {product.nutriment.fiberPer100g}
        </p>
        <p>
          <span>Proteins (g/100g)</span>
          {product.nutriment.proteinsPer100g}
        </p>
        <p>
          <span>Salt (g/100g)</span>
          {product.nutriment.saltPer100g}
        </p>
        <p>
          <span>Sugars (g/100g)</span>
          {product.nutriment.sugarsPer100g}
        </p>
        <p>
          <span>Sodium (g/100g)</span>
          {product.nutriment.sodiumPer100g}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
