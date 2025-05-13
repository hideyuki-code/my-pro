import { useEffect } from 'react';
import { getPokemonList } from './api/pokeApiClient';

function App() {
  // ここに処理を書く
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const data = await getPokemonList(5);
        console.log('ポケモン一覧', data);
      } catch (error) {
        console.error('エラーが発生しました', error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>ポケモンリストをコンソールで確認してみよう！</h1>
    </div>
  );
}

export default App;
