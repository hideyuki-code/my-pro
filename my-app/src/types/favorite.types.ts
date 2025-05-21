// src/types/favorite.types.ts

// お気に入りポケモンとして保存する情報の型 (IDのみを保存するシンプルな例)
export interface FavoritePokemon {
  id: number; // ポケモンのID
  // 必要であれば、お気に入りに追加した日時などを追加することもできます
  // addedAt?: number; // 例: タイムスタンプ (Date.now() のような値)
}
