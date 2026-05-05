import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';

const AnimeContext = createContext(null);
const API_URL = 'https://api.jikan.moe/v4';
const TOP_KEY = 'aniwatch_top_anime';
const DETAILS_KEY = 'aniwatch_anime_details';
const FAVORITES_KEY = 'aniwatch_favorites';
const REVIEWS_KEY = 'aniwatch_reviews';
const RATINGS_KEY = 'aniwatch_ratings';

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AnimeProvider({ children }) {
  const [animeList, setAnimeList] = useState(() => readStorage(TOP_KEY, []));
  const [animeDetails, setAnimeDetails] = useState(() => readStorage(DETAILS_KEY, {}));
  const [favorites, setFavorites] = useState(() => readStorage(FAVORITES_KEY, []));
  const [reviews, setReviews] = useState(() => readStorage(REVIEWS_KEY, {}));
  const [ratings, setRatings] = useState(() => readStorage(RATINGS_KEY, {}));
  const [searchQuery, setSearchQuery] = useState('');
  const {
    loading: topLoading,
    error: topError,
    success: topSuccess,
    run: runTopFetch,
  } = useFetch();
  const {
    loading: detailLoading,
    error: detailError,
    success: detailSuccess,
    run: runDetailFetch,
  } = useFetch();

  useEffect(() => {
    if (animeList.length >= 100) {
      return;
    }

    async function loadTopAnime() {
      const topAnime = await runTopFetch(async () => {
        const pages = [];

        for (let page = 1; page <= 4; page += 1) {
          const response = await fetch(`${API_URL}/top/anime?limit=25&page=${page}`);

          if (!response.ok) {
            throw new Error('Could not load anime');
          }

          const result = await response.json();
          pages.push(...result.data);

          if (page < 4) {
            await new Promise((resolve) => setTimeout(resolve, 350));
          }
        }

        return pages.slice(0, 100);
      });

      if (topAnime) {
        setAnimeList(topAnime);
      }
    }

    loadTopAnime();
  }, [animeList.length, runTopFetch]);

  useEffect(() => {
    if (animeList.length > 0) {
      localStorage.setItem(TOP_KEY, JSON.stringify(animeList));
    }
  }, [animeList]);

  useEffect(() => {
    localStorage.setItem(DETAILS_KEY, JSON.stringify(animeDetails));
  }, [animeDetails]);

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
  }, [ratings]);

  const getAnimeDetails = useCallback(
    async (animeId) => {
      const id = String(animeId);

      if (animeDetails[id]) {
        return animeDetails[id];
      }

      const anime = await runDetailFetch(async () => {
        const response = await fetch(`${API_URL}/anime/${id}`);

        if (!response.ok) {
          throw new Error('Could not load anime details');
        }

        const result = await response.json();
        return result.data;
      });

      if (anime) {
        setAnimeDetails((current) => ({ ...current, [id]: anime }));
      }

      return anime;
    },
    [animeDetails, runDetailFetch]
  );

  function toggleFavorite(anime) {
    const id = Number(anime.mal_id);

    setFavorites((current) => {
      if (current.includes(id)) {
        return current.filter((favoriteId) => favoriteId !== id);
      }

      return [...current, id];
    });
  }

  function isFavorite(animeId) {
    return favorites.includes(Number(animeId));
  }

  function saveReview(animeId, text) {
    setReviews((current) => ({ ...current, [animeId]: text }));
  }

  function saveRating(animeId, rating) {
    setRatings((current) => ({ ...current, [animeId]: rating }));
  }

  const favoriteAnime = favorites
    .map((id) => animeDetails[id] || animeList.find((anime) => anime.mal_id === id))
    .filter(Boolean);

  const value = {
    animeList,
    animeDetails,
    detailStatus: {
      loading: detailLoading,
      error: detailError,
      success: detailSuccess,
    },
    favoriteAnime,
    getAnimeDetails,
    isFavorite,
    ratings,
    reviews,
    saveRating,
    saveReview,
    searchQuery,
    setSearchQuery,
    toggleFavorite,
    topStatus: {
      loading: topLoading,
      error: topError,
      success: topSuccess,
    },
  };

  return <AnimeContext.Provider value={value}>{children}</AnimeContext.Provider>;
}

export function useAnime() {
  return useContext(AnimeContext);
}

