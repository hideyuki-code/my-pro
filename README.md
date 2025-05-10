# ポケモン情報閲覧アプリ（学習用）

## 概要
このプロジェクトは、React・TypeScript・Axios・Viteの基本を学習するためのPokeAPI連携ポケモン情報閲覧アプリです。API通信や非同期処理、状態管理の基礎を体験することを目的としています。

## 学習目標
- TypeScriptの型定義と型安全な設計の理解
- Reactの基本（コンポーネント、フック、状態管理）の習得
- AxiosによるAPI通信の基礎
- シンプルなUI/UX設計とレスポンシブ対応
- コンポーネントテストの基本

## 主な機能
- ポケモン一覧の取得・表示（PokeAPI利用）
- ポケモン詳細情報の表示
- ポケモン名による検索
- タイプによるフィルタリング
- お気に入り登録・解除（LocalStorage利用）
- お気に入り一覧表示
- ページネーション
- ダーク/ライトテーマ切替
- 基本的なレスポンシブデザイン

## 技術スタック
- フロントエンド: React 18 + TypeScript
- ビルドツール: Vite
- 状態管理: React Context API + useState
- API通信: Axios
- スタイリング: CSS または Tailwind CSS
- テスト: Jest + React Testing Library
- データ永続化: LocalStorage
- 外部API: [PokeAPI](https://pokeapi.co/)

## セットアップ方法

### 前提条件
- Node.js (v16以上)
- npm または yarn

### インストール手順

```bash
# リポジトリをクローン（URLはあなたのリポジトリに合わせて変更）
git clone https://github.com/yourusername/pokemon-viewer.git
cd pokemon-viewer

# 依存パッケージのインストール
npm install
# または
yarn install

# 開発サーバーの起動
npm run dev
# または
yarn dev
```

## プロジェクト構造

```
src/
├── components/   # UIコンポーネント
│   ├── common/   # 共通UI要素
│   └── pokemon/  # ポケモン関連コンポーネント
├── contexts/     # 状態管理用のコンテキスト
├── hooks/        # カスタムフック
├── pages/        # ページコンポーネント
├── services/     # APIサービス
├── api/          # APIクライアント設定
├── types/        # 型定義
└── utils/        # ユーティリティ関数
```

## 開発計画
プロジェクトは以下のフェーズで開発します：

1. **フェーズ1**: 基本機能の実装（一覧・詳細・お気に入り・API通信）
2. **フェーズ2**: 機能拡張（検索・フィルタ・テーマ切替・ページネーション・エラーハンドリング）
3. **フェーズ3**: テストと最適化

詳細な開発チケットは `docs/チケット/チケット一覧.md` を参照してください。

## ドキュメント
- `docs/要件定義書.md` - 要件定義
- `docs/基本設計書.md` - 基本設計
- `docs/画面設計書.md` - 画面設計
- `docs/チケット/` - 開発チケットと詳細

## 参考資料
- [React公式ドキュメント](https://ja.reactjs.org/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [PokeAPI公式ドキュメント](https://pokeapi.co/docs/v2)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## ライセンス
このプロジェクトは学習目的で作成されています。
