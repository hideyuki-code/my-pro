import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Jestのmatcherを使えるようにする
import PokemonCard from './PokemonCard';
import type { PokemonDetail } from '../../types/pokemon.types'; // ここを import type に修正しています

// テストに使うモックデータを作成
const mockPokemon: Pick<PokemonDetail, 'id' | 'name' | 'sprites' | 'types'> = {
  id: 25,
  name: 'pikachu',
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    other: {
        'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
        }
    }
  },
  types: [
    { slot: 1, type: { name: 'electric', url: '' } },
  ],
};

// テストスイートを定義
describe('PokemonCard Component', () => {
  // 各テストケースを定義
  test('renders pokemon name', () => {
    render(<PokemonCard pokemon={mockPokemon} />); // コンポーネントをレンダリング
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument(); // 名前のテキストが表示されているか確認
  });

  test('renders pokemon image with correct src and alt text', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const imgElement = screen.getByAltText(/pikachu/i) as HTMLImageElement; // altテキストで画像要素を取得
    expect(imgElement).toBeInTheDocument(); // 画像が表示されているか確認
    expect(imgElement.src).toBe(mockPokemon.sprites.front_default); // srcが正しいか確認
  });

  test('renders pokemon types', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(/electric/i)).toBeInTheDocument(); // タイプ名が表示されているか確認
  });

  test('renders pokemon ID formatted', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText(/#025/i)).toBeInTheDocument(); // フォーマットされたIDが表示されているか確認
  });
});
