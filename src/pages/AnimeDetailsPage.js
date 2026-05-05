import { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import RatingForm from '../components/RatingForm';
import ReviewForm from '../components/ReviewForm';
import StatusMessage from '../components/StatusMessage';
import { useAnime } from '../context/AnimeContext';

function AnimeDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const { animeDetails, animeList, detailStatus, getAnimeDetails, ratings } = useAnime();
  const backPath = location.state?.from || '/';

  const listAnime = useMemo(
    () => animeList.find((anime) => String(anime.mal_id) === String(id)),
    [animeList, id]
  );

  useEffect(() => {
    if (!animeDetails[id]) {
      getAnimeDetails(id);
    }
  }, [animeDetails, getAnimeDetails, id]);

  const anime = animeDetails[id] || listAnime;
  const image = anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url;

  if (!anime && detailStatus.loading) {
    return <StatusMessage loading={detailStatus.loading} />;
  }

  if (!anime && detailStatus.error) {
    return <StatusMessage error={detailStatus.error} />;
  }

  if (!anime) {
    return (
      <div className="empty-state">
        Anime was not found. <Link to={backPath}>Back to list</Link>
      </div>
    );
  }

  return (
    <>
      <div className="page-title-row">
        <h1>Anime Details</h1>
        <Link className="nav-link" to={backPath}>
          Back
        </Link>
      </div>

      <StatusMessage
        loading={detailStatus.loading}
        error={detailStatus.error}
        success={detailStatus.success}
        successText="Anime details loaded"
      />

      <section className="detail-layout">
        <div className="detail-side">
          <img className="detail-cover" src={image} alt={anime.title} />
          <RatingForm animeId={id} />
        </div>

        <div className="detail-panel">
          <h1>{anime.title_english || anime.title}</h1>
          <FavoriteButton anime={anime} />

          <div className="detail-meta">
            <div>
              <span>Score</span>
              <strong>
                ⭐ {anime.score || 'N/A'} {ratings[id] ? `(❤️ ${ratings[id]})` : ''}
              </strong>
            </div>
            <div>
              <span>Rank</span>
              <strong>#{anime.rank || 'N/A'}</strong>
            </div>
            <div>
              <span>Episodes</span>
              <strong>{anime.episodes || 'N/A'}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{anime.status || 'N/A'}</strong>
            </div>
          </div>

          <div className="genre-row">
            {(anime.genres || []).map((genre) => (
              <span className="genre-chip" key={genre.mal_id || genre.name}>
                {genre.name}
              </span>
            ))}
          </div>

          <p className="synopsis">{anime.synopsis || 'No synopsis available.'}</p>

          <ReviewForm animeId={id} />
        </div>
      </section>
    </>
  );
}

export default AnimeDetailsPage;