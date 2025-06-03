import React, { useState } from 'react';

// PokeAPIから取得できる主要なタイプ (例)
const pokemonTypes = [
  'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
] as const; // readonlyなタプルとして扱うため as const

type PokemonType = typeof pokemonTypes[number];

interface TypeFilterProps {
  onTypeChange?: (selectedType: PokemonType) => void; // F2-4で本格的に使用
}

const TypeFilter: React.FC<TypeFilterProps> = ({ onTypeChange }) => {
  const [selectedType, setSelectedType] = useState<PokemonType>('all');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = event.target.value as PokemonType;
    setSelectedType(newType);
    if (onTypeChange) {
      // onTypeChange(newType); // F2-4で有効化
    }
  };

  return (
    <div className="mb-4">
      <select
        value={selectedType}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white capitalize"
      >
        {pokemonTypes.map((type) => (
          <option key={type} value={type} className="capitalize">
            {type === 'all' ? 'すべてのタイプ' : type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;
