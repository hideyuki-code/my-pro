import axios from 'axios';

// axiosのインスタンスを作成
const pokeApiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/', // PokeAPIのベースURL
  timeout: 5000, // タイムアウト（ミリ秒）
});

// ポケモン一覧を取得する関数
export const getPokemonList = async (limit: number = 20, offset: number = 0) => {
  try {
    const response = await pokeApiClient.get('/pokemon', {
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

export default pokeApiClient;