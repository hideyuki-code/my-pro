export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

// ポケモンのタイプに関する型
export interface PokemonType {
    slot: number; // スロット番号
    type: {
      name: string; // タイプ名 (例: "grass", "poison")
      url: string;  // タイプの詳細情報APIのURL
    };
}

// ポケモンの特性に関する型
export interface PokemonAbility {
    ability: {
        name: string; // 特性名 (例: "overgrow")
        url: string;  // 特性の詳細情報APIのURL
    };
    is_hidden: boolean; // 隠れ特性かどうか
    slot: number;       // スロット番号
}

// ポケモンの種族値に関する型
export interface PokemonStat {
    base_stat: number; // 基本の種族値
    effort: number;    // 努力値
    stat: {
        name: string; // 種族値の名前 (例: "hp", "attack")
        url: string;  // 種族値の詳細情報APIのURL
    };
}

// ポケモンの画像（スプライト）に関する型
export interface PokemonSprites {
    front_default: string; // 正面のデフォルト画像URL
    // 必要に応じて他のスプライトも追加できます
    // 例: other?.['official-artwork']?.front_default など、より高解像度の画像
    other?: {
        'official-artwork'?: { // JavaScriptの識別子として無効な文字を含むキーは引用符で囲む
        front_default: string | null;
        };
        // 他にも dream_world など様々なスプライトがあります
    };
}

// ポケモン詳細情報の型
// PokemonListItem を拡張することもできますが、ここでは独立して定義します
export interface PokemonDetail {
    id: number;                // ポケモン図鑑ID
    name: string;              // ポケモン名
    height: number;            // 高さ (デシメートル単位)
    weight: number;            // 重さ (ヘクトグラム単位)
    sprites: PokemonSprites;   // 画像スプライト
    types: PokemonType[];      // タイプ（複数持つことがあるため配列）
    abilities: PokemonAbility[]; // 特性（複数持つことがあるため配列）
    stats: PokemonStat[];      // 種族値（複数あるため配列）
    // species: { name: string, url: string } // ポケモンの種に関する情報へのURLなど、必要に応じて追加
}