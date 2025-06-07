# F1-7 ページネーションUI実装

## チケット概要

ポケモン一覧ページなどで使用する、シンプルなページネーションUIコンポーネントを実装します。この段階ではUIの見た目と、現在のページ番号や総ページ数をpropsで受け取り表示することに注力します。実際のページ切り替えロジックはF2-5で実装します。

## 作業内容

1.  ページネーションコンポーネント (`Pagination.tsx`) を作成する。
    *   propsとして現在のページ番号 (`currentPage`)、総ページ数 (`totalPages`) を受け取る。
    *   propsとしてページ変更時に呼び出されるコールバック関数 (`onPageChange`) を受け取る (F2-5で本格利用)。
    *   「前へ」「次へ」ボタンと、ページ番号（一部）を表示する。
    *   現在のページ、最初のページ、最後のページでは適切に「前へ」「次へ」ボタンを無効化 (disabled) する。
2.  Tailwind CSS (v3.4.3) を用いて、ページネーションコンポーネントのスタイリングを行う。
    *   ボタンやページ番号の見た目を整える。
    *   アクティブなページ番号を視覚的に示すスタイルを適用する。
3.  このコンポーネントを配置する親コンポーネント（例: `PokemonListPage.tsx` や `App.tsx`）で、propsを渡して表示を確認する。

## 受け入れ基準

-   ページネーションコンポーネントが実装され、現在のページ、総ページ数に基づいて適切に表示される。
-   「前へ」「次へ」ボタンが表示され、境界条件（最初のページ、最後のページ）で無効化される。
-   基本的なスタイリングが適用されている。

## 学習ポイント

-   UIコンポーネントの組み合わせによる複雑なUIの構築。
-   propsを用いたコンポーネント間のデータ（状態）の受け渡し。
-   状態に応じたUIの動的な制御（例: ボタンのdisabled属性）。
-   条件付きレンダリングの基本的な使い方。
-   将来的な機能拡張を見据えたコンポーネント設計の考え方。

## 備考

-   このチケットでは、実際のページ切り替えロジックの実装はスコープ外とする。
-   表示するページ番号の数（例: 現在のページ±2件など）は固定で実装してよい。

## 学習目標

-   複数の情報（現在のページ、総ページ数など）に基づいて動的に表示が変わるUIコンポーネントを実装できるようになる。
-   propsを通じて親コンポーネントからデータを受け取り、それに応じてコンポーネントの表示や振る舞いを制御する方法を理解する。
-   ボタンの活性・非活性状態をpropsや内部ロジックに基づいて制御する方法を学ぶ。
-   Tailwind CSSを使って、ナビゲーション要素（ページネーションなど）をスタイリングするスキルを向上させる。

## 詳細ステップ

### 1. ページネーションコンポーネント作成
-   `src/components/common/Pagination.tsx` を作成する。
    ```typescript
    // src/components/common/Pagination.tsx
    import React from 'react';

    interface PaginationProps {
      currentPage: number;
      totalPages: number;
      onPageChange: (page: number) => void; // F2-5で本格的に使用
    }

    const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
      const handlePrevious = () => {
        if (currentPage > 1) {
          // onPageChange(currentPage - 1); // F2-5で有効化
        }
      };

      const handleNext = () => {
        if (currentPage < totalPages) {
          // onPageChange(currentPage + 1); // F2-5で有効化
        }
      };

      // 表示するページ番号のロジック (簡易版)
      // より複雑なロジック (例: ... を表示する) はここでは省略
      const pageNumbers = [];
      const maxPagesToShow = 5;
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow && startPage > 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (totalPages <= 0) return null; // ページがない場合は何も表示しない

      return (
        <div className="flex justify-center items-center space-x-2 my-8">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            前へ
          </button>

          {startPage > 1 && (
            <>
              <button 
                onClick={() => { /* onPageChange(1) */ }} 
                className={`px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50`}
              >
                1
              </button>
              {startPage > 2 && <span className="text-gray-500">...</span>}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => { /* onPageChange(page) */ }}
              disabled={currentPage === page}
              className={`px-4 py-2 border rounded-md 
                          ${currentPage === page 
                            ? 'bg-blue-500 text-white border-blue-500' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'}
                          disabled:opacity-75 disabled:cursor-not-allowed`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages -1 && <span className="text-gray-500">...</span>}
              <button 
                onClick={() => { /* onPageChange(totalPages) */ }}
                className={`px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            次へ
          </button>
        </div>
      );
    };

    export default Pagination;
    ```

### 2. スタイリング
-   Tailwind CSSを使って、ボタンやページ番号、全体のレイアウトをスタイリングする。
-   現在のページを示すスタイル（背景色や文字色など）を適用する。

### 3. 親コンポーネントでの利用と確認
-   例えば `src/App.tsx` や `src/pages/PokemonListPage.tsx` で `Pagination` コンポーネントをインポートし、仮の `currentPage` と `totalPages` を渡して表示を確認する。
    ```typescript
    // 例: src/App.tsx
    import React, { useState } from 'react';
    import Pagination from './components/common/Pagination'; // パスは適宜調整
    // ... 他のimport

    function App() {
      const [currentPage, setCurrentPage] = useState(3);
      const totalPages = 10;

      const handlePageChange = (page: number) => {
        // setCurrentPage(page); // F2-5で有効化
        console.log('Page changed to:', page);
      };

      return (
        <div className="container mx-auto p-4">
          {/* ... 他のコンテンツ ... */}
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      );
    }

    export default App;
    ```

## 学習資料
-   [React公式ドキュメント - 条件付きレンダリング](https://ja.react.dev/learn/conditional-rendering)
-   [React公式ドキュメント - リストとkey](https://ja.react.dev/learn/rendering-lists) (ページ番号リストの表示に)
-   [Tailwind CSS - Pagination](https://tailwindui.com/components/application-ui/navigation/pagination) (UIデザインの参考に。有料コンポーネントの場合あり)
-   [WAI-ARIA Authoring Practices - Pagination](https://www.w3.org/WAI/ARIA/apg/patterns/pagination/) (アクセシビリティの参考に)

## 口頭で説明できるようにすべき質問
-   ページネーションコンポーネントは、どのようなpropsを受け取るのが一般的ですか？
-   「前へ」「次へ」ボタンの活性/非活性は、どのような条件で制御しますか？
-   表示するページ番号のロジック（例：常に5つのページ番号を表示し、現在のページが中央に来るようにする）はどのように実装できますか？（アイデアレベルでOK）
-   条件付きレンダリング（例：最初のページや最後のページへのジャンプボタンを特定の条件下でのみ表示する）は、どのように実装しますか？
-   この段階では `onPageChange` のロジックをコメントアウトしていますが、F2-5でこれを有効化する際、親コンポーネントでは何を行う必要がありますか？

## 関連ドキュメント
-   [F2-5 ページネーション機能実装とテスト実装](./F2-5_ページネーション機能実装とテスト実装.md)
-   [チケット一覧](../../チケット一覧.md)

## 担当者
（担当者名）

## 見積時間
4時間

## 学習・作業フィードバック (YYYY/MM/DD)
- **達成事項:**
    - `Pagination` コンポーネントのUI実装と親コンポーネントでの表示確認を完了した。
    - チケットに記載された「口頭で説明できるようにすべき質問」の全てに回答し、設計思想や実装の背景について理解を深めた。
- **学んだこと・気づき:**
    - **コンポーネントの設計思想:**
        - なぜ状態を親コンポーネントで管理し、子はpropsで受け取るのか（状態の一元管理、API連携、再利用性）。
        - ページネーションの表示ロジック（なぜ全ページ番号を表示しないのか、省略記号の役割など）。
    - **React/JSXの基本ルール:**
        - 条件付きレンダリングの一般的な実装方法 (`{条件 && <UI />}` 形式)。
        - JSXが単一のルート要素を返す必要がある理由と、Fragment (`<>`) の役割。
        - 設計書（基本設計・詳細設計）の役割と、アルゴリズムが詳細設計で定義されることの理解。
- **課題と次のアクション:**
    - 設計思想やコードの意図を自分の言葉で説明する訓練を継続する。
    - F2-5では、今回学んだ `onPageChange` の役割を意識し、状態更新とAPI連携を実装する。 