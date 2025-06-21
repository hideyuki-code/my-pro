import { renderHook, act } from '@testing-library/react';
import { useFavorites } from './useFavorites';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

const FAVORITES_KEY = 'pokemonFavorites';

describe('useFavorites Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('LocalStorageが空の場合、お気に入りも空の状態で初期化される', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favoriteIds).toEqual([]);
  });

  test('LocalStorageからお気に入りを読み込んで初期化される', () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([1, 3]));
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favoriteIds).toEqual([1, 3]);
  });

  test('addFavoriteは新しいIDを追加し、LocalStorageを更新する', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite(1);
    });
    expect(result.current.favoriteIds).toEqual([1]);
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_KEY)!)).toEqual([1]);

    act(() => {
      result.current.addFavorite(5);
    });
    expect(result.current.favoriteIds).toEqual([1, 5]);
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_KEY)!)).toEqual([1, 5]);
  });

  test('addFavoriteは重複するIDを追加しない', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite(1);
      result.current.addFavorite(1);
    });
    expect(result.current.favoriteIds).toEqual([1]);
  });

  test('removeFavoriteはIDを削除し、LocalStorageを更新する', () => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([1, 5, 10]));
    const { result } = renderHook(() => useFavorites());
    
    act(() => {
      result.current.removeFavorite(5);
    });
    expect(result.current.favoriteIds).toEqual([1, 10]);
    expect(JSON.parse(window.localStorage.getItem(FAVORITES_KEY)!)).toEqual([1, 10]);
  });

  test('isFavoriteはお気に入りIDに対してはtrue、それ以外はfalseを返す', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.addFavorite(7);
    });
    expect(result.current.isFavorite(7)).toBe(true);
    expect(result.current.isFavorite(8)).toBe(false);
  });

  test('toggleFavoriteはお気に入りでない場合は追加し、お気に入りの場合は削除する', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
        result.current.toggleFavorite(10);
    });
    expect(result.current.isFavorite(10)).toBe(true);
    expect(result.current.favoriteIds).toEqual([10]);

    act(() => {
        result.current.toggleFavorite(10);
    });
    expect(result.current.isFavorite(10)).toBe(false);
    expect(result.current.favoriteIds).toEqual([]);
  });
}); 