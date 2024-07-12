import React, { useState } from "react";
import { useAddArticle } from "../../js/articles";
import "./css/AddArticle.css";
import { useNavigate } from "react-router-dom";

const AddArticle = () => {
  const [categoryId, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const addArticleMutation = useAddArticle();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addArticleMutation.mutateAsync({
        categoryId,
        content,
        status,
        title,
      });
      console.log("Dodano artykuł");
      alert(`Dodano artykuł`);
      navigate("/admin-panel/articles");

    } catch (error) {
      console.error("Wystąpił błąd podczas dodawania artykułu:", error);
    }
  };

  return (
    <div className="article-container">
      <h1>DODAWANIE ARTYKUŁU:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tytuł:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Treść:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label htmlFor="categoryId">ID kategorii:</label>
        <input
          type="text"
          id="categoryId"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <label htmlFor="status">Status:</label>
        <input
          type="text"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <div className="submit-btn">
          <button type="submit">Dodaj artykuł</button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
