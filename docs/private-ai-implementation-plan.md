# Private AI 実装計画

## 概要

`jacky.jp/private-ai` に、オンプレミス Private LLM サービスのランディングページを追加する。

## 元ネタ

OneDrive 上の `dgx-spark-customer-lp.html` — 銀行水準のセキュリティを備えた社内 AI 基盤の LP。
NVIDIA DGX Spark をハードウェア基盤とし、閉域網・インターネット遮断環境で動作する Private LLM を月額定額で提供するサービス。

## 個人版へのアダプト

- 「株式会社◯◯◯」→ **Jacky（個人事業主）** として提供
- 契約主体は個人、サービス内容は同等
- 連絡先は jacky.jp の既存連絡手段（GitHub / Email）を流用
- 価格体系は据え置き（個人でも DGX Spark の調達・構築・運用は可能なため）

## ページ構成

```
app/private-ai/
├── page.tsx              # メインLP（Client Component）
├── layout.tsx            # 専用レイアウト（meta, OG）
├── components/
│   ├── hero.tsx          # ヒーロー + Terminal アニメーション
│   ├── security-grid.tsx # セキュリティ特徴グリッド
│   ├── architecture.tsx  # アーキテクチャ図
│   ├── pricing-plans.tsx # 料金プラン
│   ├── included.tsx      # 含まれるもの一覧
│   ├── air-gap.tsx       # 閉域網セクション
│   ├── flow-section.tsx  # 導入フロー
│   └── cta-section.tsx   # CTA + フッター
├── data/
│   └── i18n.ts           # 三語（JA/ZH/EN）翻訳データ
└── styles.ts             # 専用カラー変数・ユーティリティ
```

## 技術スタック

- **フレームワーク**: Next.js 16 App Router（既存）
- **スタイリング**: Tailwind CSS 4（既存）
- **i18n**: 既存の `LanguageContext` を拡張、private-ai 翻訳データ追加
- **アニメーション**: CSS アニメーション + `useEffect`（Client Component）
- **静的出力**: `output: 'export'` 対応（既存）
- **デプロイ**: Cloudflare Pages（既存）

## 実装フェーズ

### Phase 1 — ページ骨格
- [ ] `app/private-ai/layout.tsx` — metadata, OG image
- [ ] `app/private-ai/page.tsx` — 全セクションの組み立て
- [ ] `data/i18n.ts` — 翻訳データ（JA/ZH/EN）
- [ ] `components/hero.tsx` — Terminal アニメーション付きヒーロー

### Phase 2 — コンテンツセクション
- [ ] `components/security-grid.tsx` — 6つのセキュリティ特徴
- [ ] `components/architecture.tsx` — アーキテクチャ図
- [ ] `components/pricing-plans.tsx` — Plan S/M/L 料金表
- [ ] `components/included.tsx` — 月額に含まれるもの
- [ ] `components/air-gap.tsx` — 閉域網セクション
- [ ] `components/flow-section.tsx` — 導入フロー
- [ ] `components/cta-section.tsx` — CTA + フッター

### Phase 3 — 調整・デプロイ
- [ ] レスポンシブ対応
- [ ] パフォーマンス確認
- [ ] `pnpm build` で静的エクスポート確認
- [ ] OG画像作成（private-ai 専用）
- [ ] GitHub push → Cloudflare Pages 自動デプロイ確認

## 既存コードとの関係

- `lib/i18n-context.tsx` に private-ai の翻訳キーを追加
- `app/layout.tsx` は変更せず、private-ai 独自の layout を持つ
- 既存ページ（portfolio）への影響はなし
