# 開発者向け仕様書 (仮)

このドキュメントは、最終課題で作成するWebアプリケーション群（書籍管理、商品管理、ユーザー管理）の仕様についてまとめたものである。

## 1. 全体方針

- **技術スタック**: Node.js, Express, EJS
- **データ管理**: メモリ上の配列変数として管理（DB不使用）
- **共通機能**: 全てのデータに対してCRUD（作成、読み取り、更新、削除）機能を実装する。

## 2. データ構造

各アプリケーションで使用するデータのスキーマ定義。

### 2.1 書籍管理 (Books)
変数名: `book_list`

| プロパティ名 | 型 | 説明 | 例 |
| - | - | - | - |
| id | Integer | 一意のID | 1 |
| title | String | 書籍名 | "こころ" |
| author | String | 著者名 | "夏目漱石" |
| price | Integer | 価格 | 400 |
| publisher | String | 出版社 | "新潮文庫" |

### 2.2 商品管理 (Products)
変数名: `product_list`

| プロパティ名 | 型 | 説明 | 例 |
| - | - | - | - |
| id | Integer | 一意のID | 1 |
| code | String | 商品コード | "A001" |
| name | String | 商品名 | "鉛筆" |
| category | String | カテゴリ | "文房具" |
| price | Integer | 価格 | 100 |

### 2.3 ユーザー管理 (Users)
変数名: `user_list`

| プロパティ名 | 型 | 説明 | 例 |
| - | - | - | - |
| id | Integer | 一意のID | 1 |
| userid | String | ユーザーID | "taro01" |
| name | String | 名前 | "山田太郎" |
| age | Integer | 年齢 | 20 |
| email | String | メールアドレス | "taro@example.com" |

## 3. インターフェース仕様 (API & 画面)

全システムで統一された以下のURL設計を採用する。

### 3.1 HTTPメソッドとリソース

| 機能 | メソッド | URL (例: books) | 処理内容 |
| - | - | - | - |
| 一覧表示 | GET | `/books` | データ一覧を表示する。 |
| 新規登録画面 | GET | `/books/create` | 静的HTML (`/public/book_new.html`) へリダイレクト。 |
| 詳細表示 | GET | `/books/:number` | 指定インデックスのデータを表示する。 |
| 登録処理 | POST | `/books` | フォームデータを受け取り配列に追加し、一覧へ戻る。 |
| 編集画面 | GET | `/books/edit/:number` | 指定インデックスのデータをフォームに入れた状態で表示。 |
| 更新処理 | POST | `/books/update/:number` | フォームデータで配列を更新し、一覧へ戻る。 |
| 削除処理 | GET | `/books/delete/:number` | 指定インデックスのデータを削除し、一覧へリダイレクト。 |

### 3.2 ページ遷移図 (Mermaid)

```mermaid
stateDiagram
    state "一覧表示 (/books)" as List
    state "詳細表示 (/books/:id)" as Detail
    state "新規登録画面 (/books/create)" as Create
    state "編集画面 (/books/edit/:id)" as Edit
    state "登録処理 (POST)" as CreateProc
    state "更新処理 (POST)" as UpdateProc
    state "削除処理 (GET)" as DeleteProc

    [*] --> List
    List --> Detail: タイトルクリック
    Detail --> Edit: 編集ボタン
    Edit --> UpdateProc: 更新ボタン
    UpdateProc --> List: リダイレクト
    
    List --> Create: 追加リンク
    Create --> CreateProc: 登録ボタン
    CreateProc --> List: リダイレクト
    
    Detail --> DeleteProc: 削除ボタン
    DeleteProc --> List: リダイレクト
    