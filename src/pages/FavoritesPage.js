import AnimeGrid from '../components/AnimeGrid';
import { useAnime } from '../context/AnimeContext';

function FavoritesPage() {
  const { favoriteAnime } = useAnime();

  return (
    <>
      <div className="page-title-row">
        <h1>Favorites</h1>
        <span className="muted-count">{favoriteAnime.length} saved</span>
      </div>

      <AnimeGrid animeList={favoriteAnime} emptyText="No favorites yet" />
    </>
  );
}

export default FavoritesPage;