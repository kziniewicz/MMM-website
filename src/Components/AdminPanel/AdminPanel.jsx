import React from 'react';
import { Link } from 'react-router-dom';
import './css/AdminPanel.css'

const AdminPanel = () => {

  return (
    <div>
      <h1>Panel Administartora</h1>
      <div className='admin-options'>

      <div className='option-container'>
      <Link to={`/admin-panel/categories`}>
      <h3>Modyfikacja Kategorii</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>

      <div className='option-container'>
      <Link to={`/admin-panel/brands`}>
      <h3>Modyfikacja Marek</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>


      <div className='option-container'>
      <Link to={`/admin-panel/countries`}>
      <h3>Modyfikacja Krajów pochodzenia</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>


      <div className='option-container'>
      <Link to={`/admin-panel/allergens`}>
      <h3>Modyfikacja Alergenów</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>

      <div className='option-container'>
      <Link to={`/admin-panel/recipes`}>
      <h3>Modyfikacja Przepisów</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>

      <div className='option-container'>
      <Link to={`/admin-panel/products`}>
      <h3>Modyfikacja Produktów</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>

      <div className='option-container'>
      <Link to={`/admin-panel/articles`}>
      <h3>Modyfikacja Artykułów</h3>
      <p>(dodaj, usuń, edytuj, przeglądaj)</p>
      </Link>
      </div>

      <div className='option-container'>
      <Link to={`/admin-panel/articleCategories`}>

      <h3>Modyfikacja Kategorii Artykułów</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>

      <div className='option-container'>
      <Link to={`/admin-panel/ingredients`}>
      <h3>Modyfikacja Składników</h3>
      <p>(dodaj)</p>
      </Link>
      </div>

      <div className='option-container'>
      <Link to={`/admin-panel/productsIngredients`}>
      <h3>Modyfikacja Składników produktów</h3>
      <p>(dodaj, usuń, edytuj)</p>
      </Link>
      </div>

      </div>
    </div>
  );
};

export default AdminPanel;
