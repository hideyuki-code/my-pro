# F1-2 Axios・APIクライアント設定

## チケット概要

axios@1.6.8 を導入し、PokeAPI (https://pokeapi.co/) と通信するための基本的なAPIクライアント設定を行う。

## 作業内容

1.  `axios` がプロジェクトにインストールされていることを確認（F1-1で実施済み）。
2.  APIクライアント用のモジュールを作成 (`src/api/pokeApiClient.ts` など)。
3.  `axios` インスタンスを作成し、ベースURL (`https://pokeapi.co/api/v2/`)、タイムアウトなどの基本設定を行う。
4.  PokeAPIのポケモン一覧取得エンドポイント (`/pokemon`) への基本的なGETリクエスト関数を実装する。
5.  APIレスポンスの型（暫定で `any` も可、F1-3で詳細定義）と基本的なエラーハンドリングを考慮する。
6.  作成したクライアント関数を呼び出し、コンソール等で動作確認を行う。

## 受け入れ基準

-   `axios` を利用したPokeAPI用のクライアントが設定されている。
-   ベースURL、タイムアウトなどの共通設定が適用されている。
-   ポケモン一覧を取得する基本的な関数が実装され、PokeAPIからデータを取得できる。
-   基本的なエラーハンドリングの仕組みが考慮されている。

## 学習ポイント

## 備考

-   PokeAPIドキュメント: [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)
-   この段階では、APIレスポンスの型は厳密でなくても良い。F1-3で詳細な型定義を行う。

## 学習目標

-   `axios` を用いて外部APIと通信するクライアントを実装する方法を理解する。
-   APIクライアントの共通設定（ベースURL、ヘッダー、タイムアウト）を行う方法を学ぶ。
-   `async/await` を用いた非同期処理の記述方法を実践する。
-   APIリクエストの成功時と失敗時の基本的な処理フローを理解する。
-   開発者ツール（ネットワークタブ）を使ってAPIリクエストとレスポンスを確認する方法を学ぶ。

## 詳細ステップ

### 1. APIクライアント用ディレクトリ作成
-   `src/api` ディレクトリを作成する（存在しない場合）。

### 2. APIクライアントファイル作成
-   `src/api/pokeApiClient.ts` ファイルを作成する。
-   `axios` をインポートする。
    ```typescript
    import axios from 'axios';
    ```

### 3. axiosインスタンスの設定
-   `pokeApiClient.ts` 内に、`axios` インスタンスを作成し、基本設定を行う。
    ```typescript
    const pokeApiClient = axios.create({
      baseURL: 'https://pokeapi.co/api/v2/',
      timeout: 5000, // 5秒
    });

    export default pokeApiClient;
    ```

### 4. ポケモン一覧取得関数の実装
-   `pokeApiClient.ts` にポケモン一覧を取得する非同期関数を実装する（例）。
    ```typescript
    // F1-3で定義する型を想定 (例: PokemonListResponse)
    // interface PokemonListResponse {
    //   count: number;
    //   next: string | null;
    //   previous: string | null;
    //   results: { name: string; url: string }[];
    // }

    export const getPokemonList = async (limit: number = 20, offset: number = 0) => {
      try {
        // const response = await pokeApiClient.get<PokemonListResponse>('/pokemon', {
        const response = await pokeApiClient.get('/pokemon', { // F1-3完了まではany型で受けることも可
          params: {
            limit,
            offset,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Axios固有のエラー処理
          console.error('Axios error:', error.message);
          // error.response?.data などで詳細情報を取得可能
        } else {
          // その他のエラー処理
          console.error('Unexpected error:', error);
        }
        throw error; // エラーを再スローするか、適切に処理する
      }
    };
    ```
-   上記の `PokemonListResponse` はF1-3で作成する型の一例です。

### 5. 動作確認
-   任意のコンポーネントや `App.tsx` などで `getPokemonList` を呼び出し、コンソールに結果が出力されることを確認する。
    ```typescript
    // App.tsx やテスト用ファイルなど
    import { useEffect } from 'react';
    import { getPokemonList } from './api/pokeApiClient'; // パスは適宜調整

    function App() {
      useEffect(() => {
        const fetchPokemon = async () => {
          try {
            const data = await getPokemonList(5);
            console.log('Pokemon List:', data);
          } catch (error) {
            console.error('Failed to fetch pokemon list:', error);
          }
        };
        fetchPokemon();
      }, []);

      return (
        // ...
      );
    }
    export default App;
    ```

## 関連ドキュメント

-   [F1-1 プロジェクト初期設定](./F1-1_プロジェクト初期設定.md)
-   [F1-3 基本型定義の作成](./F1-3_基本型定義の作成.md) (作成後リンク)
-   [チケット一覧](../../チケット一覧.md)

## 担当者

（担当者名）

## 見積時間

## 理解度チェックリスト（運用ルール付き）

- [x] 1. import/exportは何のために使うの？
- [x] 2. axios.createでインスタンスを作ると何が便利なの？
- [x] 3. async/awaitって何？どうして使うの？
- [x] 4. try-catchのcatch(error)のerrorって何？
- [x] 5. axios.isAxiosErrorはどんなときに使うの？
- [x] 6. throw error; を書くと何が起きる？書かないとどうなる？
- [x] 7. useEffectは何のために使うの？第二引数の[]はどういう意味？
- [x] 8. アロー関数（=>）と普通の関数の違いは？asyncをつけると何が変わる？
    - [x] アロー関数のthisは外側のスコープのthisを参照する。クラスのメソッド内で使うとインスタンスのthisになる。
    - [x] asyncをつけると関数内でawaitが使え、非同期処理を直列的に書けるようになる.
- [ ] 9. APIから取得したデータはどこで確認できる？
- [ ] 10. Viteの開発サーバーをhttps化するにはどうする？
- [ ] 11. ViteとApp Router（Next.js）の違いは？ルーティングの考え方は同じ？

### 運用ルール
- 実装や学習が終わったら、各チェックリスト項目について「自分の言葉で説明」や「理解した内容」をこのチャットでアウトプットしてください。
- AI（アシスタント）が内容を確認し、概ね正解であればチェックを入れます。
- 今後もこの方式でチェックリストの運用を行います。
