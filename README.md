# タスク管理アプリ（学習用）

## 概要
このプロジェクトは、React と TypeScript の基本を学習するための簡易的なタスク管理アプリケーションです。シンプルな機能に焦点を当て、基本的な概念の理解を深めることを目的としています。

## 学習目標
- TypeScriptの基本的な型定義の理解と実装
- Reactの基本（コンポーネント、フック、状態管理）の習得
- コンポーネントテストの基本的な書き方の習得
- シンプルなアプリケーション開発の流れの理解

## 機能
- タスクの追加・表示・削除・完了機能
- タスクのフィルタリング（全て/未完了/完了）
- LocalStorage によるデータ永続化
- ダーク/ライトテーマの切り替え
- 基本的なレスポンシブデザイン

## 技術スタック
- フロントエンド: React 18 + TypeScript
- 状態管理: React Context API + useState
- スタイリング: CSS または Tailwind CSS
- テスト: Jest + React Testing Library
- データ永続化: LocalStorage

## セットアップ方法

### 前提条件
- Node.js (v16以上)
- npm または yarn

### インストール手順

```bash
# リポジトリをクローン（URLはあなたのリポジトリに合わせて変更）
git clone https://github.com/yourusername/task-manager.git
cd task-manager

# 依存パッケージのインストール
npm install
# または
yarn install

# 開発サーバーの起動
npm start
# または
yarn start
```

## プロジェクト構造

```
src/
├── components/   # UIコンポーネント
│   ├── common/   # 共通UI要素
│   └── tasks/    # タスク関連コンポーネント
├── contexts/     # 状態管理用のコンテキスト
├── hooks/        # カスタムフック
├── pages/        # ページコンポーネント
├── types/        # 型定義
└── utils/        # ユーティリティ関数
```

## 開発計画
プロジェクトは以下のフェーズで開発します：

1. **フェーズ1**: 基本機能の実装（タスクの追加・表示・削除・完了）
2. **フェーズ2**: 機能拡張（フィルタリング、テーマ切替、LocalStorage連携）
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
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## ライセンス
このプロジェクトは学習目的で作成されています。
