import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '../utils/localStorage';

const FAVORITES_KEY = 'pokemonFavorites';

type FavoritePokemonId = number;

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<Set<FavoritePokemonId>>(new Set());

  useEffect(() => {
    const storedFavorites = getItem<FavoritePokemonId[]>(FAVORITES_KEY);
    if (storedFavorites) {
      setFavoriteIds(new Set(storedFavorites));
    }
  }, []);

  useEffect(() => {
    setItem<FavoritePokemonId[]>(FAVORITES_KEY, Array.from(favoriteIds));
  }, [favoriteIds]);

  const addFavorite = useCallback((id: FavoritePokemonId) => {
    setFavoriteIds(prevIds => {
      const newIds = new Set(prevIds);
      newIds.add(id);
      return newIds;
    });
  }, []);

  const removeFavorite = useCallback((id: FavoritePokemonId) => {
    setFavoriteIds(prevIds => {
      const newIds = new Set(prevIds);
      newIds.delete(id);
      return newIds;
    });
  }, []);

  const isFavorite = useCallback((id: FavoritePokemonId): boolean => {
    return favoriteIds.has(id);
  }, [favoriteIds]);

  const toggleFavorite = useCallback((id: FavoritePokemonId) => {
    if (favoriteIds.has(id)) {
        removeFavorite(id);
    } else {
        addFavorite(id);
    }
  }, [favoriteIds, addFavorite, removeFavorite]);

  return { favoriteIds: Array.from(favoriteIds), addFavorite, removeFavorite, isFavorite, toggleFavorite };
}; 