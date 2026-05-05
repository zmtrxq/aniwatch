import { useAnime } from '../context/AnimeContext';

function FavoriteButton({ anime }) {
  const { isFavorite, toggleFavorite } = useAnime();
  const saved = isFavorite(anime.mal_id);

  return (
    <button
      type="button"
      className={saved ? 'favorite-button saved' : 'favorite-button'}
      onClick={() => toggleFavorite(anime)}
    >
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}

export default FavoriteButton;
