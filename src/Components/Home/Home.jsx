import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useRecipesQuery } from "../../js/recipes";
import { useProductsQuery } from "../../js/products";
import { useArticles } from "../../js/articles";
import questionMarkImage from "../../images/question-mark.png";
import articleImage from "../../images/article.jpg";
import userReviewImage from "../../images/user-review1.jpg";
import userReviewImage2 from "../../images/user-review2.jpg";
import userReviewImage3 from "../../images/user-review3.jpg";
import userReviewImage4 from "../../images/user-review4.jpg";
import userReviewImage5 from "../../images/user-review5.jpg";
import userReviewImage6 from "../../images/user-review6.jpg";

import "./Home.css";

const Home = () => {
  const [currentPage] = useState(1);
  const [searchTerm] = useState("");
  const [sortDirection] = useState("DESC");
  const {
    data: recipesData,
    isLoading: recipesLoading,
    isError: recipesError,
  } = useRecipesQuery(1096, searchTerm, sortDirection);
  const { data: productData } = useProductsQuery(
    132,
    searchTerm,
    sortDirection
  );
  const { data: articlesData, isLoading, isError } = useArticles(currentPage); 
  
  const contactRef = useRef(null);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const AnimatedTitle = () => {
    const props = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: 800,
      config: { immediate: true },
      onRest: () => {} 
    });
  
    return (
      <animated.h2 style={props}>
        MealMasterMind
      </animated.h2>
    );
  };
  
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollPosition >= documentHeight * 0.8) {
        setShowAdditionalContent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000); 

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  return (
    <div className="home-content">
      <div className="banner" id="banner">
        <div className="content">
          <div className="overlay">
          <h2>MealMasterMind</h2>
            <p>
              Odkryj nowe poziomy kulinarnych inspiracji i personalizacji teraz,
              gdy jesteś z nami. Jako zalogowany użytkownik, masz pełny dostęp
              do naszych spersonalizowanych funkcji i narzędzi, które pomogą Ci
              w tworzeniu zdrowych i smacznych posiłków dopasowanych do Twoich
              preferencji.
            </p>
          </div>
        </div>
      </div>

      <div className="scroll-down-arrow" onClick={scrollToContact}>
           <FontAwesomeIcon icon={faArrowDown} />
      </div>

      
      <div className="row" id="row">
        
        <div className="title">
          <p className="titleText">
            Popularne <span>P</span>rzepisy
          </p>
        </div>
        <div className="content">
          {recipesLoading ? (
            <p>Ładowanie...</p>
          ) : recipesError ? (
            <p>Wystąpił błąd podczas pobierania danych przepisów.</p>
          ) : (
            recipesData &&
            recipesData.content &&
            recipesData.content.slice(0, 3).map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <img src={recipe.coverImageUrl} />
                <p>{recipe.name}</p>
              </div>
            ))
          )}
        </div>
        <div className="more-button">
          <Link to="/recipes">
            <button>Zobacz więcej</button>
          </Link>
        </div>{" "}
      </div>

      <div className="row" id="row">
        <div className="title">
          <p className="titleText">
            Popularne <span>P</span>rodukty
          </p>
        </div>
        <div className="content">
          {productData &&
            productData.content &&
            productData.content.slice(0, 3).map((product) => (
              <div className="recipe-card" key={product.id}>
                {product.image && product.image.url ? (
                  <img src={product.image.url} alt="Product" />
                ) : (
                  <img src={questionMarkImage} alt="Question Mark" />
                )}
                <p>{product.name}</p>
              </div>
            ))}
        </div>
        <div className="more-button">
          <Link to="/products">
            <button>Zobacz więcej</button>
          </Link>
        </div>
      </div>

      <div className="row" id="row">
        <div className="title">
          <p className="titleText">
            Popularne <span>A</span>rtykuły
          </p>
        </div>
        <div className="content">
          {articlesData &&
            articlesData.content &&
            articlesData.content.slice(0, 3).map((article) => (
              <div className="recipe-card" key={article.id}>
                <img src={articleImage} alt="Product" />

                <p>{article.title}</p>
              </div>
            ))}
        </div>
        <div className="more-button">
          <Link to="/articles">
            <button>Zobacz więcej</button>
          </Link>
        </div>
      </div>

      <div className="row" id="row">
  <div className="title">
    <p className="titleText">
      Opinie <span>U</span>żytkowników
    </p>
  </div>
  <div className="user-reviews-container">
    <div className="user-reviews" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
      {[
        { image: userReviewImage2, text: "Bardzo polecam! Świetne przepisy i produkty.", author: "Piotr S." },
        { image: userReviewImage, text: "Najlepsze miejsce dla miłośników kuchni!", author: "Anna K." },
        { image: userReviewImage3, text: "Fantastyczne źródło inspiracji kulinarnych.", author: "Artur L." },
        { image: userReviewImage4, text: "Bardzo polecam! Świetne przepisy i produkty.", author: "Malwina S." },
        { image: userReviewImage5, text: "Najlepsze miejsce dla miłośników kuchni!", author: "Krzysztof K." },
        { image: userReviewImage6, text: "Fantastyczne źródło inspiracji kulinarnych.", author: "Karolina L." },
      ].map((review, index) => (
        <div className="user-review" key={index}>
          <div className="user-review-img">
            <img src={review.image} alt="Opinia użytkownika" />
          </div>
          <p>{review.text}</p>
          <span>- {review.author}</span>
        </div>
      ))}
    </div>
  </div>
</div>



      <div className="contact" id="contact" ref={contactRef}>
        <div className="title">
          <p className="titleText">
            <span>K</span>ontakt
          </p>
        </div>
        <div className="form-container">
          <div className="contactForm">
            <h3>Wyślij Wiadomość</h3>
            <div className="inputBox">
              <input type="text" placeholder="Imię" />
            </div>
            <div className="inputBox">
              <input type="text" placeholder="Nazwisko" />
            </div>
            <div className="inputBox">
              <input type="text" placeholder="Email" />
            </div>
            <div className="inputBox">
              <input type="text" placeholder="Treść" />
            </div>
            <button>Wyślij</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
