import { useEffect, useState } from 'react';
import { useAnime } from '../context/AnimeContext';

function ReviewForm({ animeId }) {
  const { reviews, saveReview } = useAnime();
  const [text, setText] = useState(reviews[animeId] || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setText(reviews[animeId] || '');
  }, [animeId, reviews]);

  function handleSubmit(event) {
    event.preventDefault();
    saveReview(animeId, text);
    setSaved(true);
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <label htmlFor="review">Personal note</label>
      <textarea
        id="review"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setSaved(false);
        }}
        placeholder="Write a note"
      />
      <button type="submit">Save note</button>
      {saved && <div className="status-box success">Note saved</div>}
    </form>
  );
}

export default ReviewForm;
