import { useMemo } from 'react';
import AnimeGrid from '../components/AnimeGrid';
import SearchBar from '../components/SearchBar';
import StatusMessage from '../components/StatusMessage';
import { useAnime } from '../context/AnimeContext';
import useDebounce from '../hooks/useDebounce';

function HomePage() {
  const { animeList, searchQuery, topStatus } = useAnime();
  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredAnime = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    if (!query) {
      return animeList;
    }

    return animeList.filter((anime) => {
      const genres = (anime.genres || []).map((genre) => genre.name).join(' ');
      const text = `${anime.title} ${anime.title_english || ''} ${anime.status || ''} ${genres}`;
      return text.toLowerCase().includes(query);
    });
  }, [animeList, debouncedSearch]);

  return (
    <>
      <div className="page-title-row">
        <h1>Top Anime</h1>
        <span className="muted-count">{filteredAnime.length} titles</span>
      </div>

      <SearchBar />

      <StatusMessage
        loading={topStatus.loading}
        error={topStatus.error}
        success={topStatus.success}
        successText="Anime list loaded"
      />

      {!topStatus.loading && !topStatus.error && (
        <AnimeGrid animeList={filteredAnime} emptyText="No anime found" />
      )}
    </>
  );
}

export default HomePage;
