import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../../js/products"; 
import "../RecipeProductResource/RecipeProductResource.css";

const AdminPanelProducts = () => {
  const [productId, setProductId] = useState("");
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);

  const navigate = useNavigate();

  const deleteProductMutation = useDeleteProductMutation(); 

  const handleDelete = async () => {
    try {
      await deleteProductMutation.mutateAsync(productId); 
      setShowDeleteInput(false);
      setProductId(""); 
      alert("produkt usunieto");
    } catch (error) {
      console.error("Błąd usuwania produktu:", error);
    }
  };

  const handleEdit = (id) => {
    setShowEditInput(false);
    navigate(`/add-product/${id}`);
  };

  const handleAdd = () => {
    navigate("/add-product");
  };

  return (
    <div className="main-container">
      <h1>PRODUKTY</h1>
      <div className="option-btn">
        <button onClick={handleAdd}>dodaj produkt</button>
      </div>

      <div className="option-btn">
        <button onClick={() => setShowDeleteInput(true)}>Usuń Produkt</button>
      </div>
      {showDeleteInput && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID produktu"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={handleDelete} disabled={!productId}>
            Potwierdź Usunięcie
          </button>
        </div>
      )}

      <div className="option-btn">
        <button onClick={() => setShowEditInput(true)}>Edytuj Produkt</button>
      </div>

      {showEditInput && (
        <div className="option-resource">
          <input
            type="text"
            placeholder="ID produktu"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button onClick={() => handleEdit(productId)} disabled={!productId}>
            Edytuj produkt
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanelProducts;
