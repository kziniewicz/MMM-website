import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import "./AllRecipesOrProducts.css";
import questionMarkImage from "../../images/question-mark.png";
import { useRecipesQuery, useRecipeOfDayQuery } from "../../js/recipes";
import { useProductsQuery } from "../../js/products";

const AllRecipesOrProducts = ({ type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("ASC");
  const [showRecipeOfDay, setShowRecipeOfDay] = useState(false);
  const navigate = useNavigate();

  const {
    data: { content: recipeItems = [], totalPages: recipeTotalPages = 4 } = {},
  } = useRecipesQuery(currentPage, searchTerm, sortDirection);
  const {
    data: {
      content: productItems = [],
      totalPages: productTotalPages = 4,
    } = {},
  } = useProductsQuery(currentPage, searchTerm, sortDirection);
  const { data: recipeOfDay } = useRecipeOfDayQuery({
    enabled: showRecipeOfDay,
  });

  useEffect(() => {}, [currentPage, searchTerm, sortDirection, type]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (e) => {
    setSortDirection(e.target.value);
  };

  const handleRecipeOfDayClick = async () => {
    setShowRecipeOfDay(true); 
    navigate(`/recipes/${recipeOfDay.id}`);
  };

  return (
    <div>
      <section className="search-container">
        <input
          type="text"
          id="search-box"
          placeholder={`Wyszukaj ${
            type === "recipes" ? "przepis..." : "produkt..."
          }`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select id="filter-select" onChange={handleSortChange}>
          <option value="ASC">nazwy rosnąco</option>
          <option value="DESC">nazwy malejąco</option>
        </select>
      </section>

      {type === "recipes" && (
        <div className="RecipeOfTheDay">
          <div className="border">
            <button onClick={handleRecipeOfDayClick}>
              Zobacz swój przepis dnia!
            </button>
          </div>
        </div>
      )}

      <section id="items-container">
        {type === "recipes" &&
          recipeItems.map((item) => (
            <div key={item.id} className="item-card">
              <Link to={`/recipes/${item.id}`}>
                <div className="item-image">
                  <img
                    src={item.coverImageUrl || questionMarkImage}
                    alt="Recipe Cover"
                  />
                </div>
                <div className="item-content">
                  <span className="item-title">{item.name}</span>
                </div>
              </Link>
            </div>
          ))}

        {type === "products" &&
          productItems.map((item) => (
            <div key={item.id} className="item-card">
              <Link to={`/products/${item.id}`}>
                <div className="item-image">
                  {item.image ? (
                    <img src={item.image.url} alt="Product" />
                  ) : (
                    <img src={questionMarkImage} alt="Question Mark" />
                  )}
                </div>
                <div className="item-content">
                  <span className="item-title">{item.name}</span>
                </div>
              </Link>
            </div>
          ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={type === "recipes" ? recipeTotalPages : productTotalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllRecipesOrProducts;
