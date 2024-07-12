import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import "./css/Articles.css";
import { useArticles } from "../../js/articles";
import { Link, useNavigate } from "react-router-dom";

const Articles = () => {
  const [currentPage, setCurrentPage] = useState(1); 
  const { data: articlesData, isLoading, isError } = useArticles(currentPage); 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  if (!articlesData || !articlesData.content) {
    return <div>No articles available</div>;
  }

  const articles = articlesData.content;
  const totalPages = articlesData.totalPages;

  return (
    <div>
      <div className="articles-container">
        {articles.map((article) => (
          <div className="article-card" key={article.id}>
            <Link to={`/articles/${article.id}`}>
              <div className="articleImage"></div>
              <div className="articleDetails">
                <h2>{article.title}</h2>
                <div className="article-content">
                  <p>{article.content}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Articles;
