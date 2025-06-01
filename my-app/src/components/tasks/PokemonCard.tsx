import React from 'react';
import type{ PokemonDetail } from '../../types/pokemon.types';

interface PokemonCardProps {
  pokemon: Pick<PokemonDetail, 'id' | 'name' | 'sprites' | 'types'>;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    if (!pokemon) return null;

    return (
        <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow bg-white">
        <img 
            src={pokemon.sprites.front_default || pokemon.sprites.other?.['official-artwork']?.front_default || 'fallback-image-url.png'} 
            alt={pokemon.name} 
            className="w-32 h-32 mx-auto mb-2"
        />
        <h2 className="text-xl font-bold text-center capitalize mb-1">{pokemon.name}</h2>
        <div className="text-center text-sm text-gray-500 mb-2">#{String(pokemon.id).padStart(3, '0')}</div>
        <div className="flex justify-center space-x-2">
            {pokemon.types.map((typeInfo) => (
            <span 
                key={typeInfo.type.name} 
                className={`px-2 py-1 text-xs font-semibold text-white rounded-full bg-gray-400 capitalize type-${typeInfo.type.name.toLowerCase()}`}>
                {typeInfo.type.name}
            </span>
            ))}
        </div>
        </div>
    );
};

export default PokemonCard;