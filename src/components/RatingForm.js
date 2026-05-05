import { useState } from 'react';
import { useAnime } from '../context/AnimeContext';

function RatingForm({ animeId }) {
  const { ratings, saveRating } = useAnime();
  const [rating, setRating] = useState(ratings[animeId] || '');

  function handleSubmit(event) {
    event.preventDefault();
    saveRating(animeId, rating);
  }

  return (
    <form className="rating-form" onSubmit={handleSubmit}>
      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={rating}
        onChange={(event) => setRating(event.target.value)}
        placeholder="0-10"
      />
      <button type="submit">Rate</button>
    </form>
  );
}

export default RatingForm;
