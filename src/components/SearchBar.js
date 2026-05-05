import { useAnime } from '../context/AnimeContext';

function SearchBar() {
  const { searchQuery, setSearchQuery } = useAnime();

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search anime"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
