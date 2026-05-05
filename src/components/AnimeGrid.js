import AnimeCard from './AnimeCard';

function AnimeGrid({ animeList, emptyText }) {
  if (animeList.length === 0) {
    return <div className="empty-state">{emptyText}</div>;
  }

  return (
    <div className="anime-grid">
      {animeList.map((anime) => (
        <AnimeCard anime={anime} key={anime.mal_id} />
      ))}
    </div>
  );
}

export default AnimeGrid;
