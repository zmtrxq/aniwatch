import { Link, useLocation } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import { useAnime } from '../context/AnimeContext';

function AnimeCard({ anime }) {
  const location = useLocation();
  const { ratings } = useAnime();
  const image = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url;
  const genres = anime.genres || [];
  const visibleGenres = genres.slice(0, 2);
  const extraGenres = genres.length - visibleGenres.length;
  const userRating = ratings[anime.mal_id];
  const linkState = { from: location.pathname };

  return (
    <article className="anime-card">
      <Link to={`/anime/${anime.mal_id}`} state={linkState} className="anime-cover">
        <img src={image} alt={anime.title} />
      </Link>

      <div className="anime-content">
        <span className="anime-status">{anime.airing ? 'Currently Airing' : anime.status}</span>

        <Link to={`/anime/${anime.mal_id}`} state={linkState} className="anime-title">
          <h2>{anime.title_english || anime.title}</h2>
        </Link>

        <div className="anime-stats">
          <div>
            <strong>
              ⭐ {anime.score || 'N/A'} {userRating ? `(❤️ ${userRating})` : ''}
            </strong>
            <span>{anime.members ? anime.members.toLocaleString() : '0'} users</span>
          </div>
          <div>
            <strong>#{anime.rank || 'N/A'}</strong>
            <span>Ranking</span>
          </div>
        </div>

        <div className="genre-row">
          {visibleGenres.map((genre) => (
            <span className="genre-chip" key={genre.mal_id || genre.name}>
              {genre.name}
            </span>
          ))}
          {extraGenres > 0 && <span className="genre-chip">+{extraGenres}</span>}
        </div>

        <div className="card-actions">
          <FavoriteButton anime={anime} />
        </div>
      </div>
    </article>
  );
}

export default AnimeCard;

