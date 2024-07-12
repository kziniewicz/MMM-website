import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./css/RecipeDetails.css"; 
import { useRecipeIdQuery } from "../../js/recipes.js";
import {
  useFetchReviews,
  useAddReviewMutation,
  useEditReviewMutation,
  useDeleteReviewMutation,
} from "../../js/recipeReview.js";
import { useLoggedInUserId } from "../../js/user.js"; 

const RecipeDetails = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null); 
  const { data: recipe } = useRecipeIdQuery(id); 
  const { data: reviews, refetch } = useFetchReviews(id);

  const addReviewMutation = useAddReviewMutation();
  const editReviewMutation = useEditReviewMutation(); 
  const deleteReviewMutation = useDeleteReviewMutation(); 
  const { data: loggedInUserId } = useLoggedInUserId(); 

  const handleAddReview = async () => {
    try {
      await addReviewMutation.mutateAsync({ recipeId: id, comment, rating });
      await refetch(); 
      setShowReviewForm(false); 
    } catch (error) {
      console.error("Wystąpił błąd podczas dodawania recenzji:", error);
    }
  };

  const handleEditReview = (reviewId, initialComment, initialRating) => {
    setEditingReviewId(reviewId);
    setComment(initialComment);
    setRating(initialRating);
    setShowReviewForm(true); 
  };

  const handleSubmitEditReview = async () => {
    try {
      await editReviewMutation.mutateAsync({
        recipeId: id,
        reviewId: editingReviewId,
        comment,
        rating,
      });
      await refetch();
      setRating(0);
      setComment("");
      setShowReviewForm(false);
      setEditingReviewId(null);
    } catch (error) {
      console.error("Wystąpił błąd podczas edycji recenzji:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewMutation.mutateAsync({ recipeId: id, reviewId });
      await refetch();
    } catch (error) {
      console.error("Wystąpił błąd podczas usuwania recenzji:", error);
    }
  };
  if (!recipe) {
    return <div>Nie znaleziono przepisu o podanym ID.</div>;
  }

  return (
    <div>
      <div className="title">
        <h2>{recipe.name}</h2>
      </div>
      <div className="imgAndIngredients">
        <div className="recipeImage">
          <img src={recipe.coverImageUrl} alt="Recipe" />
        </div>
        <div className="ingredients">
          <h3>SKŁADNIKI:</h3>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name}: {ingredient.amount} {ingredient.unit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="otherDetails">
        <h3>PRZYGOTOWANIE</h3>
        <p>{recipe.instructions}</p>
        <h3>ILOŚĆ PORCJI</h3>
        <p>{recipe.servings}</p>
        <h3>CZAS PRZYGOTOWANIA</h3>
        <p>{recipe.totalTime} min</p>
      </div>
      <div className="recipeReview">
      <h3>K O M E N T A R Z E</h3>
      {!showReviewForm && (
        <div className="addReview">
          <button onClick={() => setShowReviewForm(true)}>
            Dodaj opinię
          </button>
        </div>
      )}
      {showReviewForm && (
        <div className="addReview">
          <div className="addReviewDetails">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value={0}>Wybierz ocenę</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Dodaj komentarz..."
            />
            {editingReviewId && ( 
              <button onClick={handleSubmitEditReview}>Edytuj</button>
            )}
            {!editingReviewId && ( 
              <button onClick={handleAddReview}>Dodaj opinię</button>
            )}
          </div>
        </div>
      )}
      <ul>
        {reviews && reviews.map((review) => (
          <li key={review.id}>
              <div className="review-card">
                <div className="userName">
                  <p>{review.fullName}</p>
                </div>
                <p>Ocena: {review.rating}/5</p>
                <p>{review.comment}</p>
                {loggedInUserId === review.userId && (
                  <div className="del-edit-btn">
                    <button onClick={() => handleDeleteReview(review.id)}>
                      Usuń
                    </button>
                    <button
                      onClick={() =>
                        handleEditReview(
                          review.id,
                          review.comment,
                          review.rating
                        )
                      }
                    >
                      Edytuj
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecipeDetails;
