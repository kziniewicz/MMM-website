import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import LoginSignup from './Components/LoginSignUp/LoginSignup';
import AllRecipesOrProducts from './Components/AllRecipesOrProducts/AllRecipesOrProducts';
import RecipeDetails from './Components/Recipes/RecipeDetails';
import Articles from './Components/Articles/Articles';
import Home from './Components/Home/Home';
import ProductDetails from './Components/Products/ProductDetails';
import AdminPanel from './Components/AdminPanel/AdminPanel';
import AddRecipe from './Components/Recipes/AddRecipe';
import RecipeProductResource from './Components/RecipeProductResource/RecipeProductResource';
import AdminPanelRecipes from './Components/AdminPanel/AdminPanelRecipes';
import AdminPanelArticles from './Components/AdminPanel/AdminPanelArticles';
import AdminPanelProducts from './Components/AdminPanel/AdminPanelProducts';
import AddArticle from './Components/Articles/AddArticle';
import AddProduct from './Components/Products/AddProduct';
import AdminPanelProductIngredients from './Components/AdminPanel/AdminPanelProductIngredients';
import UserProfile from './Components/UserProfile/UserProfile';
import ArticleDetails from './Components/Articles/ArticleDetails';
import AdminPanelArticleCatgeory from './Components/AdminPanel/AdminPanelArticleCategories';
import Footer from './Components/Footer/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="site-container">
        <Router>
          <Navbar />
          <div className="content-wrap">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/recipes" element={<AllRecipesOrProducts type="recipes" />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
              <Route path="/products" element={<AllRecipesOrProducts type="products" />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/add-product/:id?" element={<AddProduct />} />

              <Route path="/" element={<LoginSignup />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/add-article" element={<AddArticle />} />
              <Route path="/articles/:articleId" element={<ArticleDetails />} />

              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/add-recipe/:id?" element={<AddRecipe />} />
              <Route path="/admin-panel/categories" element={<RecipeProductResource type="categories" />} />
              <Route path="/admin-panel/brands" element={<RecipeProductResource type="brands" />} />
              <Route path="/admin-panel/allergens" element={<RecipeProductResource type="allergens" />} />
              <Route path="/admin-panel/countries" element={<RecipeProductResource type="countries" />} />
              <Route path="/admin-panel/articleCategories" element={<AdminPanelArticleCatgeory />} />
              <Route path="/admin-panel/recipes" element={<AdminPanelRecipes />} />
              <Route path="/admin-panel/articles" element={<AdminPanelArticles />} />
              <Route path="/admin-panel/products" element={<AdminPanelProducts />} />
              <Route path="/admin-panel/productsIngredients" element={<AdminPanelProductIngredients />} />
              <Route path="/admin-panel/ingredients" element={<RecipeProductResource type="ingredients" />} />
              <Route path="/user" element={<UserProfile />} />

            </Routes>
          </div>
          <Footer/>

        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
