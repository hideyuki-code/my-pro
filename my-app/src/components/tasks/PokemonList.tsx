// src/components/tasks/PokemonList.tsx
import React, { useEffect, useState } from 'react';
import { getPokemonList } from '../../api/pokeApiClient'; // F1-2で作成
import type { PokemonListItem, PokemonListResponse } from '../../types/pokemon.types'; // F1-3で作成
import PokemonCard from './PokemonCard'; // F1-5で作成
// import SearchBar from '../features/SearchAndFilter/SearchBar'; // F1-6
// import TypeFilter from '../features/SearchAndFilter/TypeFilter'; // F1-6
// import Pagination from '../common/Pagination'; // F1-7

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [currentPage, setCurrentPage] = useState(1); // F2-5で本格利用
  // const [totalPages, setTotalPages] = useState(0); // F2-5で本格利用

  useEffect(() => {
    const fetchList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const limit = 20;
        // const offset = (currentPage - 1) * limit; // F2-5で本格利用
        const data: PokemonListResponse = await getPokemonList(/* limit, offset */);
        setPokemonList(data.results);
        // setTotalPages(Math.ceil(data.count / limit)); // F2-5
      } catch (err) {
        setError('ポケモンの取得に失敗しました。');
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchList();
  }, [/* currentPage */]); // currentPageが変更されたら再取得 (F2-5)

  if (isLoading) return <div className="text-center p-8">読み込み中...</div>;
  if (error) return <div className="text-center p-8 text-red-500">エラー: {error}</div>;
  if (pokemonList.length === 0) return <div className="text-center p-8">ポケモンが見つかりませんでした。</div>;

  return (
    <div className="pokemon-list-container">
      {/* F1-6, F1-7で作成したコンポーネントをここに配置予定 */}
      {/* <div className="controls mb-6">
        <SearchBar />
        <TypeFilter />
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pokemonList.map((pokemon) => (
          // PokemonCardに必要なpropsを渡す。詳細情報を別途取得する必要があるかもしれない点に注意
          // この段階では `name` と `url` のみで、PokemonCard側で詳細取得 or ダミー表示を想定
          // または、getPokemonList のレスポンスで画像URLなどが取れるようにAPIクライアントを調整する (PokeAPIのpokemonエンドポイントは詳細情報を含む)
          // ここでは簡易的に PokemonListItem をそのまま渡すが、PokemonCardのprops型と整合性を取る必要がある
          // F1-5のPokemonCardPropsがPick<PokemonDetail,...>なので、このままでは型エラーになる。
          // PokemonCardがPokemonListItemを受け取れるようにするか、ここで詳細情報を取得する処理が必要。
          // 今回は簡単のため、PokemonCardのpropsを一時的に調整するか、またはエラーのまま進めてF1-9で解決する。
          // 以下はダミーのidとsprites, typesを付与する例 (APIレスポンスにこれらはないため)
          <PokemonCard 
            key={pokemon.name} 
            pokemon={{
                ...pokemon, 
                id: parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0'), // URLからIDを抽出
                sprites: { front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0')}.png` },
                types: [] // 仮。詳細はF1-9で取得
            }}
          />
        ))}
      </div>
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
    </div>
  );
};

export default PokemonList;