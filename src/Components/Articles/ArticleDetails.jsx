import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../../js/articles";
import articleImage from "../../images/article.jpg";
import "./css/ArticleDetails.css";

const ArticleDetails = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        
        if (!articleId) {
          throw new Error("Article ID is undefined");
        }

        const fetchedArticle = await getArticle(articleId);
        setArticle(fetchedArticle);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!article) return <div>No data available</div>;

  return (
    <div>
      <div className="articleTitle">
        <h1>{article.title}</h1>
      </div>
      <div className="image">
        <img src={articleImage} alt="Article" />
      </div>
      <div className="articleContent">
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticleDetails;
