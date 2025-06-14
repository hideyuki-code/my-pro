// src/components/tasks/PokemonDetailView.tsx
import React, { useEffect, useState } from 'react';
import { getPokemonDetail } from '../../api/pokeApiClient'; // F1-3で定義/F1-2で例示
import type { PokemonDetail } from '../../types/pokemon.types'; // F1-3で定義

interface PokemonDetailViewProps {
  pokemonNameOrId: string | number;
  onBackToList?: () => void; // 一覧へ戻る処理など
}

const PokemonDetailView: React.FC<PokemonDetailViewProps> = ({ pokemonNameOrId, onBackToList }) => {
  const [pokemonDetail, setPokemonDetail] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemonNameOrId) return;
    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getPokemonDetail(pokemonNameOrId);
        setPokemonDetail(data);
      } catch (err) {
        setError(`ポケモン「${pokemonNameOrId}」の詳細取得に失敗しました。`);
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchDetail();
  }, [pokemonNameOrId]);

  if (isLoading) return <div className="text-center p-8">詳細情報を読み込み中...</div>;
  if (error) return <div className="text-center p-8 text-red-500">エラー: {error} {onBackToList && <button onClick={onBackToList} className="text-blue-500 underline ml-2">一覧へ戻る</button>}</div>;
  if (!pokemonDetail) return <div className="text-center p-8">ポケモンの詳細が見つかりませんでした。{onBackToList && <button onClick={onBackToList} className="text-blue-500 underline ml-2">一覧へ戻る</button>}</div>;

  const officialArtwork = pokemonDetail.sprites.other?.['official-artwork']?.front_default;
  const mainSprite = officialArtwork || pokemonDetail.sprites.front_default;

  return (
    <div className="pokemon-detail-view container mx-auto p-4 bg-gray-50 rounded-lg shadow-xl">
      {onBackToList && <button onClick={onBackToList} className="mb-4 text-blue-600 hover:underline">← ポケモン一覧へ戻る</button>}
      <div className="md:flex">
        <div className="md:w-1/3 text-center">
          <img src={mainSprite || 'fallback-image.png'} alt={pokemonDetail.name} className="w-64 h-64 mx-auto mb-4 object-contain" />
          <h1 className="text-4xl font-bold capitalize mb-1">{pokemonDetail.name}</h1>
          <p className="text-gray-600 text-xl mb-4">#{String(pokemonDetail.id).padStart(3, '0')}</p>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-1">タイプ</h2>
            <div className="flex space-x-2">
              {pokemonDetail.types.map(typeInfo => (
                <span key={typeInfo.type.name} className={`px-3 py-1 text-sm font-semibold text-white rounded-full bg-gray-400 capitalize type-${typeInfo.type.name.toLowerCase()}`}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div><span className="font-semibold">高さ:</span> {pokemonDetail.height / 10} m</div>
            <div><span className="font-semibold">重さ:</span> {pokemonDetail.weight / 10} kg</div>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2 border-b pb-1">特性（アビリティ）</h2>
            <ul className="list-disc list-inside">
              {pokemonDetail.abilities.map(abilityInfo => (
                <li key={abilityInfo.ability.name} className="capitalize">
                  {abilityInfo.ability.name} {abilityInfo.is_hidden && "(隠れ特性)"}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2 border-b pb-1">種族値</h2>
            {pokemonDetail.stats.map(statInfo => (
              <div key={statInfo.stat.name} className="mb-1">
                <span className="capitalize font-medium">{statInfo.stat.name.replace('-', ' ')}: </span>
                <span>{statInfo.base_stat}</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(statInfo.base_stat / 255) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailView;