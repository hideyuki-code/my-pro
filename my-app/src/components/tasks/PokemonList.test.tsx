// src/components/tasks/PokemonList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonList from './PokemonList';
import * as pokeApiClient from '../../api/pokeApiClient'; // APIクライアントをインポート
import type { PokemonListResponse, PokemonListItem } from '../../types/pokemon.types';
import type { MockedFunction } from 'vitest';

// pokeApiClient全体をモック
vi.mock('../../api/pokeApiClient');
const mockedGetPokemonList = pokeApiClient.getPokemonList as MockedFunction<typeof pokeApiClient.getPokemonList>;

const mockPokemonItems: PokemonListItem[] = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

const mockResponse: PokemonListResponse = {
  count: mockPokemonItems.length,
  next: null,
  previous: null,
  results: mockPokemonItems,
};

describe('PokemonListコンポーネント', () => {
  beforeEach(() => {
    // 各テストの前にモックをリセット
    mockedGetPokemonList.mockClear();
  });

  test('初期状態でローディング表示がレンダリングされる', () => {
    // 解決しないPromiseを返してローディング状態を維持する
    mockedGetPokemonList.mockImplementationOnce(() => new Promise(() => {}));
    render(<PokemonList />);
    expect(screen.getByText(/読み込み中.../i)).toBeInTheDocument();
  });

  test('データ取得成功後、ポケモンカードがレンダリングされる', async () => {
    // API通信が成功した場合のシナリオをシミュレート
    mockedGetPokemonList.mockResolvedValueOnce(mockResponse);
    render(<PokemonList />);
    
    await waitFor(() => {
      // PokemonCard がレンダリングされることを確認（名前で確認）
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/読み込み中.../i)).not.toBeInTheDocument();
  });

  test('データ取得失敗時、エラーメッセージがレンダリングされる', async () => {
    // API通信が失敗した場合のシナリオをシミュレート
    mockedGetPokemonList.mockRejectedValueOnce(new Error('API Error'));
    render(<PokemonList />);

    await waitFor(() => {
      expect(screen.getByText(/ポケモンの取得に失敗しました。/i)).toBeInTheDocument();
    });
    expect(screen.queryByText(/読み込み中.../i)).not.toBeInTheDocument();
  });

  test('リストが空の場合、「ポケモンが見つかりませんでした」メッセージがレンダリングされる', async () => {
    // 空のレスポンスを返して「ポケモンが見つかりませんでした」状態をシミュレート
    const emptyResponse: PokemonListResponse = { ...mockResponse, results: [], count: 0 };
    mockedGetPokemonList.mockResolvedValueOnce(emptyResponse);
    render(<PokemonList />);

    await waitFor(() => {
      expect(screen.getByText(/ポケモンが見つかりませんでした。/i)).toBeInTheDocument();
    });
  });
});