import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  useArticles,
  useDeleteArticle,
  useUpdateArticle,
  getArticle,
} from "../../js/articles.js";
import "./css/AdminPanelArticles.css";
import articleImage from "../../images/article.jpg";
import { Link } from "react-router-dom";

const AdminPanelArticles = () => {
  const [editingArticle, setEditingArticle] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 

  const { data: articlesData, isLoading, isError } = useArticles(currentPage); 
  const deleteArticleMutation = useDeleteArticle();
  const updateArticleMutation = useUpdateArticle();
  const navigate = useNavigate();

  const editFormRef = useRef(null);

  const handleDeleteArticle = async (articleId) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten artykuł?")) {
      try {
        await deleteArticleMutation.mutateAsync(articleId);
        alert("Artykuł został pomyślnie usunięty.");
      } catch (error) {
        console.error("Wystąpił błąd podczas usuwania artykułu:", error);
        alert("Wystąpił błąd podczas usuwania artykułu.");
      }
    }
  };

  const handleEditClick = async (articleId) => {
    setIsEditClicked(true);
    try {
      const article = await getArticle(articleId);
      setEditingArticle(article);
      setTitle(article.title);
      setContent(article.content);
      setCategoryId(article.categoryId);
    } catch (error) {
      console.error(
        "Wystąpił błąd podczas pobierania artykułu do edycji:",
        error
      );
    }

    if (editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn("Referencja editFormRef.current nie jest zdefiniowana.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(categoryId);
    console.log(content);
    console.log(title);
    console.log("id artykulu:" + editingArticle.id);

    try {
      await updateArticleMutation.mutateAsync({
        articleId: editingArticle.id,
        categoryId: categoryId,
        content: content,
        status: "PUBLISHED",
        title: title,
      });
      alert("Artykuł został pomyślnie zaktualizowany.");
    } catch (error) {}
  };

  useEffect(() => {
    console.log("articlesData:", articlesData);
    if (articlesData && articlesData.content) {
      console.log(
        "articlesData.content is an array:",
        Array.isArray(articlesData.content)
      );
    }
  }, [articlesData]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if (!articlesData || !articlesData.content) {
    return <div>No articles available</div>;
  }

  return (
    <div>
      <div className="add-article-btn">
        <Link to="/add-article">
          <button>Dodaj artykuł</button>
        </Link>
      </div>
      <div className="admin-articles-container">
        {articlesData.content.map((article) => (
          <div className="articleCard" key={article.id}>
            <p>id: {article.id}</p>
            <div className="articleImg">
              <img src={articleImage} alt="Article" />
              <p>{article.title}</p>
            </div>
            <div className="details">
              <button onClick={() => handleDeleteArticle(article.id)}>
                usuń
              </button>
              <button
                onClick={() => {
                  handleEditClick(article.id);
                }}
              >
                edytuj
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditClicked && editingArticle && (
        <div ref={editFormRef} className="editing-form">
          <h2>Edycja artykułu</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="number"
                placeholder="Kategoria ID"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder="Tytuł"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <textarea
                placeholder="Treść"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <div className="submitBtn">
              <button type="submit">Zapisz zmiany</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanelArticles;
