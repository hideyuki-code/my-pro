/// <reference types="vitest/globals" />
// src/components/tasks/PokemonDetailView.test.tsx
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import PokemonDetailView from './PokemonDetailView';
import * as pokeApiClient from '../../api/pokeApiClient';
import type { PokemonDetail } from '../../types/pokemon.types';

import { vi } from 'vitest';

vi.mock('../../api/pokeApiClient');
const mockedGetPokemonDetail = pokeApiClient.getPokemonDetail as vi.MockedFunction<typeof pokeApiClient.getPokemonDetail>;

const mockPikachuDetail: PokemonDetail = {
  id: 25,
  name: 'pikachu',
  height: 4,
  weight: 60,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
      }
    }
  },
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  abilities: [{ ability: { name: 'static', url: '' }, is_hidden: false, slot: 1 }],
  stats: [{ base_stat: 35, effort: 0, stat: { name: 'hp', url: '' } }, { base_stat: 90, effort: 2, stat: { name: 'speed', url: '' } }],
};

describe('PokemonDetailView Component', () => {
  beforeEach(() => {
    mockedGetPokemonDetail.mockClear();
  });

  test('初期ロード時にローディング状態がレンダリングされる', () => {
    mockedGetPokemonDetail.mockImplementationOnce(() => new Promise(() => {})); 
    render(<PokemonDetailView pokemonNameOrId="pikachu" />);
    expect(screen.getByText(/詳細情報を読み込み中.../i)).toBeInTheDocument();
  });

  test('データ取得成功後、ポケモンの詳細情報がレンダリングされる', async () => {
    mockedGetPokemonDetail.mockResolvedValueOnce(mockPikachuDetail);
    render(<PokemonDetailView pokemonNameOrId="pikachu" />);

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      expect(screen.getByText(/#025/i)).toBeInTheDocument();
      expect(screen.getByText(/electric/i)).toBeInTheDocument();
      expect(screen.getByText(/static/i)).toBeInTheDocument();
      expect(screen.getByText(/speed/i)).toBeInTheDocument(); // 種族値の一部
      const img = screen.getByAltText('pikachu') as HTMLImageElement;
      expect(img.src).toBe(mockPikachuDetail.sprites.other!['official-artwork']!.front_default);
    });
  });

  test('データ取得失敗時にエラーメッセージがレンダリングされる', async () => {
    mockedGetPokemonDetail.mockRejectedValueOnce(new Error('API Error'));
    render(<PokemonDetailView pokemonNameOrId="unknown" />);

    await waitFor(() => {
      expect(screen.getByText(/ポケモン「unknown」の詳細取得に失敗しました。/i)).toBeInTheDocument();
    });
  });

  test('onBackToListが提供された場合、戻るボタンがレンダリングされ、クリック時に呼び出される', async () => {
    const handleBack = vi.fn();
    mockedGetPokemonDetail.mockResolvedValueOnce(mockPikachuDetail);
    render(<PokemonDetailView pokemonNameOrId="pikachu" onBackToList={handleBack} />);
    
    await waitFor(() => screen.getByText(/pikachu/i)); // Wait for content to load

    const backButton = screen.getByText(/← ポケモン一覧へ戻る/i);
    expect(backButton).toBeInTheDocument();
    backButton.click();
    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});