import axios from 'axios';
// type-only import を使用
import type { PokemonListResponse, PokemonDetail } from '../types/pokemon.types';

// axiosのインスタンスを作成
const pokeApiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // PokeAPIのベースURL
  timeout: 5000, // タイムアウト（ミリ秒）
});

// ポケモン一覧を取得する関数
export const getPokemonList = async (
    limit: number = 20,
    offset: number = 0
): Promise<PokemonListResponse> => {
  try {
    const response = await pokeApiClient.get<PokemonListResponse>('/pokemon', {
      params: {limit, offset},
    })
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

export const getPokemonDetail = async (
  nameOrId: string | number
): Promise<PokemonDetail> => {
  try {
    const response = await pokeApiClient.get<PokemonDetail>(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch pokemon detail for ${nameOrId}`, error);
    if (axios.isAxiosError(error)) {
      // Axiosのエラーに関する詳細なハンドリング
    }
    throw error;
  }
}

// export default を使用
export default pokeApiClient;