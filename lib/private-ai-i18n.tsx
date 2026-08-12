"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type PrivateAiLang = "ja" | "zh" | "en";

export type PrivateAiI18nData = {
  brand: string;
  h1: string;
  sub: string;
  ctaPlans: string;
  ctaPoc: string;
  st1n: string;
  st1l: string;
  st2n: string;
  st2l: string;
  st3n: string;
  st3l: string;
  st4n: string;
  st4l: string;
  secH2: string;
  secLead: string;
  sec1h: string;
  sec1p: string;
  sec2h: string;
  sec2p: string;
  sec3h: string;
  sec3p: string;
  sec4h: string;
  sec4p: string;
  sec5h: string;
  sec5p: string;
  sec6h: string;
  sec6p: string;
  archH2: string;
  archLead: string;
  archN1h: string;
  archN1p: string;
  archArrow: string;
  archN2h: string;
  archN2p: string;
  archB1h: string;
  archB1p: string;
  archB2h: string;
  archB2p: string;
  archB3h: string;
  archB3p: string;
  plansH2: string;
  plansLead: string;
  reco: string;
  priceSuffix: string;
  pSscale: string;
  pSmodel: string;
  pSinit: string;
  pS1: string;
  pS2: string;
  pS3: string;
  pS4: string;
  pMscale: string;
  pMmodel: string;
  pMinit: string;
  pM1: string;
  pM2: string;
  pM3: string;
  pM4: string;
  pLscale: string;
  pLmodel: string;
  pLinit: string;
  pL1: string;
  pL2: string;
  pL3: string;
  pL4: string;
  taxnote: string;
  incH2: string;
  inc1h: string;
  inc1p: string;
  inc2h: string;
  inc2p: string;
  inc3h: string;
  inc3p: string;
  inc4h: string;
  inc4p: string;
  inc5h: string;
  inc5p: string;
  inc6h: string;
  inc6p: string;
  agH2: string;
  agLead: string;
  ag1h: string;
  ag1p: string;
  ag2h: string;
  ag2p: string;
  ag3h: string;
  ag3p: string;
  flowH2: string;
  fl1h: string;
  fl1p: string;
  fl2h: string;
  fl2p: string;
  fl3h: string;
  fl3p: string;
  fl4h: string;
  fl4p: string;
  honH2: string;
  honP1: string;
  honP2: string;
  consoleH2: string;
  consoleLead: string;
  consoleTab1: string;
  consoleTab2: string;
  consoleTab3: string;
  consoleNote: string;
  ctaH2: string;
  ctaP: string;
  ctaBtn: string;
  foot: string;
  termScenes: {
    cmd: string;
    steps: { t: string; d: number }[];
  }[];
  termClosing: string;
};

const i18nData: Record<PrivateAiLang, PrivateAiI18nData> = {
  ja: {
    brand: "Jacky | Private LLM for High-Security Environments",
    h1: 'データセキュリティを、<br><span class="text-[#8fd6a4]">最優先に設計した</span><br>社内AI基盤。',
    sub: "銀行・金融機関の要件を基準に設計した、月額定額のオンプレミスAI。モデルも推論も、すべて御社の管理区域内。外部への通信はゼロ。閉域網でも完全に動作します。機密データを扱うすべての企業に、銀行水準のセキュリティをお届けします。",
    ctaPlans: "料金プランを見る",
    ctaPoc: "無料PoCの相談",
    st1n: "0<small> byte</small>",
    st1l: "外部へのデータ送信",
    st2n: "閉域網",
    st2l: "インターネット遮断環境で稼働",
    st3n: "¥69,800<small>/月〜</small>",
    st3l: "定額・従量課金なし",
    st4n: "年4回",
    st4l: "最新モデルへ無償更新",
    secH2: "「外部に出せないデータ」を扱う組織のために。",
    secLead: "勘定系のソースコード、顧客情報、製造業の設計データ、未公開の研究開発。クラウドAIに送信できない情報を扱う組織こそ、AIの生産性を最も必要としています。本サービスは銀行水準のセキュリティ要件を基準に設計し、機密データを扱うあらゆる企業にお届けします。",
    sec1h: "物理的に、出ない",
    sec1p: "モデルも推論も御社の管理区域内で完結。閉域網・インターネット遮断環境での稼働を標準想定とし、外部通信に依存する機能は一切ありません。",
    sec2h: "全スタックが検証可能",
    sec2p: "モデル・推論サーバ・開発エージェントまで全てオープンソース。ブラックボックスがなく、御社セキュリティ部門による検証が可能です。外部へのライセンス認証も不要。",
    sec3h: "監査に耐える",
    sec3p: "APIゲートウェイで利用者認証と監査ログ(誰が・いつ・何を送信したか)を記録。FISC安全対策基準・ISMS等の監査に対応する構成説明資料をご提供します。",
    sec4h: "ベンダーリスクなし",
    sec4p: "クラウドAI利用時の「外部委託先」に該当する第三者へのデータ提供が発生しないため、委託先管理・越境データの論点そのものが消えます。",
    sec5h: "定額で使い放題",
    sec5p: "トークン従量課金はありません。チーム全員で何度使っても月額は変わりません。予算稟議が一度で済みます。",
    sec6h: "いつも最新モデル",
    sec6p: "オープンソースLLMの進化は数ヶ月単位。四半期ごとに、その時点で最良のモデルへ無償で入れ替えます(閉域環境へは訪問更新)。",
    archH2: "構成はシンプル。公開するのは、APIひとつだけ。",
    archLead: "DGX Sparkは御社ネットワーク内にサーバとして設置し、外部に公開するのはLLM API(OpenAI互換)の1ポートのみ。開発者は自席の端末からCLIで社内IPに接続します。モデル・監査ログ・利用データがサーバの外に出ることはありません。",
    archN1h: "開発者の端末",
    archN1p: "CLIをインストールするだけ。モデルの配布は不要。コードの読み書きは各自の端末上で行われます。",
    archArrow: "社内LAN / TLS暗号化 / APIキー認証",
    archN2h: "DGX Spark(サーバ)",
    archN2p: "公開はAPIゲートウェイの1ポートのみ。モデル・推論・監査ログはすべてこの中で完結。その他のポートはすべて閉鎖します。",
    archB1h: "利用者ごとのAPIキー",
    archB1p: "キーは個人単位で発行。監査ログで「誰の利用か」を必ず特定できます。LDAP/AD連携にも対応。",
    archB2h: "IP制限・レート制限",
    archB2p: "許可された端末・セグメントからのみ接続可能。利用者ごとのレート制限で、チーム全体の公平な利用を担保します。",
    archB3h: "サーバは最小露出",
    archB3p: "推論エンジンはローカルバインドで直接公開しません。管理アクセス(SSH)は管理セグメントからのみ。通信は社内LANの中でもTLSで暗号化。",
    plansH2: "月額プラン — チームの規模で選ぶ3プラン",
    plansLead: "すべてのプランに、機器・設置・保守運用・モデル更新・OpenAI互換APIゲートウェイが含まれます。標準契約24ヶ月。",
    reco: "おすすめ",
    priceSuffix: "/月(税別・24ヶ月契約)",
    pSscale: "〜5名の開発チーム",
    pSmodel: "Qwen3-Coder-Next 搭載",
    pSinit: "初期設置費 ¥350,000(税別)",
    pS1: "コーディング特化モデル(80B)",
    pS2: "256Kトークンコンテキスト・軽快な応答",
    pS3: "DGX Spark ×1台",
    pS4: "12ヶ月契約の場合:¥91,000/月",
    pMscale: "5〜15名の開発チーム",
    pMmodel: "DeepSeek V4-Flash(フル精度)搭載",
    pMinit: "初期設置費 ¥600,000(税別)",
    pM1: "フラッグシップ級の総合力(284B)",
    pM2: "2台構成・チーム同時利用の余裕",
    pM3: "最大100万トークン(単一セッション時)",
    pM4: "12ヶ月契約の場合:¥163,000/月",
    pLscale: "15〜30名の開発チーム",
    pLmodel: "GLM-5.2 搭載",
    pLinit: "初期設置費 ¥1,030,000(税別)",
    pL1: "オープンソース最高峰(744B・MIT)",
    pL2: "4台クラスタ構成",
    pL3: "最大100万トークン(単一セッション時)",
    pL4: "12ヶ月契約の場合:¥338,000/月",
    taxnote: "※ 表示価格はすべて税別。契約満了後は残価でのお買い取り、または最新機材への無償アップグレード継続をお選びいただけます。",
    incH2: "月額に、ぜんぶ含まれています。",
    inc1h: "設置・構築",
    inc1p: "機器搬入から推論サーバ構築、社内ネットワーク接続、動作検収まで担当エンジニアが実施。",
    inc2h: "開発ツール連携",
    inc2p: "OpenAI互換APIを提供。AIコーディングエージェントを、設定ひとつでそのまま接続できます。導入時に御社の開発環境での接続検証まで実施します。",
    inc3h: "保守・故障対応",
    inc3p: "リモート監視と定期メンテナンス。万一の故障時は48時間以内に代替機で復旧します。",
    inc4h: "四半期モデル更新",
    inc4p: "同プラン内のモデルは無償で入れ替え可能。「常にその時点のベストなオープンモデル」を維持します。",
    inc5h: "利用状況ダッシュボード",
    inc5p: "誰がどれだけ使っているかを可視化。導入効果の社内報告にそのまま使えます。",
    inc6h: "管理者トレーニング",
    inc6p: "導入時に半日の管理者研修を実施。日常運用に専任者は不要です。",
    agH2: "閉域網は「オプション」ではなく、設計の前提です。",
    agLead: "金融機関をはじめ、機密性の高い開発現場の多くは、インターネットから物理的に隔離された環境にあります。本サービスはその環境を前提に設計されており、モデル・推論サーバ・コーディングエージェント・依存パッケージまで、必要なすべてをオフラインバンドルとして構築。テレメトリや自動更新チェックも無効化した状態で納品します。",
    ag1h: "オフライン構築",
    ag1p: "エージェント本体から依存パッケージまで、外部接続なしで動く形で導入。テレメトリ送信も無効化します。",
    ag2h: "訪問メンテナンス",
    ag2p: "リモート保守の代わりに、担当エンジニアが定期訪問。モデル更新は暗号化ストレージで持参し、その場で入れ替えます。",
    ag3h: "オフライン運用オプション",
    ag3p: "Plan S/M:+¥35,000/月、Plan L:+¥65,000/月(税別)。四半期ごとの訪問モデル更新・点検を含みます。",
    flowH2: "ご契約から稼働まで、最短2週間。",
    fl1h: "ヒアリング",
    fl1p: "チーム規模・用途・セキュリティ要件をお伺いし、最適なプランをご提案します。",
    fl2h: "無料PoC",
    fl2p: "実機デモで速度と品質をご確認ください。御社のコードベースでの検証も可能です。",
    fl3h: "設置・構築",
    fl3p: "機器搬入・構築・検収。性能検収レポート(実測値)をお渡しします。",
    fl4h: "運用開始",
    fl4p: "以降は月額のみ。保守もモデル更新もすべてお任せください。",
    honH2: "正直にお伝えします。",
    honP1: '<b>クラウドの最上位モデルと同じ応答速度ではありません。</b>本サービスの応答生成速度はプランにより毎秒10〜50トークン程度です。一方、コード解析(読み込み)は毎秒1,000トークン超と高速で、コーディングエージェント用途に最適化しています。契約書には実測性能の検収基準を明記し、数値でお約束します。',
    honP2: '<b>だからこそ、無料PoCで実際に触ってから</b>ご判断ください。「この速度と品質で、データが一切外に出ない」ことの価値を、御社の実務でお確かめいただけます。',
    consoleH2: '運用も、見える。管理コンソール標準搭載。',
    consoleLead: '導入後の運用状態・監査ログ・各種設定は、管理者用コンソールでいつでも確認できます(管理セグメントからのみアクセス可)。記録はメタデータのみで、プロンプト本文は保存しません。認証拒否やレート超過もすべて記録され、監査提出用の CSV/JSON にエクスポートできます。',
    consoleTab1: '運用状態',
    consoleTab2: '監査ログ',
    consoleTab3: '設定',
    consoleNote: '※ 画面はプレビュー(モックデータ)です。実際の画面は契約構成により異なります。',
    ctaH2: "まずは、実機を見てください。",
    ctaP: "デモ機を持ってお伺いします。御社の会議室で、外部に一切接続しないAIがコードを書く様子をご覧ください。NDA締結のうえ、セキュリティチェックシートへの回答にも対応いたします。",
    ctaBtn: "無料PoCを申し込む",
    foot: 'Jacky · お問い合わせ: newbdez33@gmail.com · GitHub: @newbdez33<br>NVIDIA および DGX は NVIDIA Corporation の商標です。価格は2026年8月時点・税別。',
    termClosing: "— 応答したのは社内のマシン。データは1バイトも外に出ていません —",
    termScenes: [
      {
        cmd: "認証エラーの原因を調査して修正して",
        steps: [
          { t: "▸ auth/session.ts を解析中…", d: 900 },
          { t: "▸ 原因:トークン更新時の競合状態を検出", d: 1100 },
          { t: "▸ 修正パッチを作成、テスト12件パス ✓", d: 1200 },
        ],
      },
      {
        cmd: "顧客データ処理コードをセキュリティ観点でレビューして",
        steps: [
          { t: "▸ data/export.ts ほか14ファイルを解析中…", d: 950 },
          { t: "▸ 指摘:個人情報のログ出力を2箇所検出", d: 1150 },
          { t: "▸ マスキング処理を追加、監査ログに記録 ✓", d: 1200 },
        ],
      },
    ],
  },
  zh: {
    brand: "Jacky | Private LLM for High-Security Environments",
    h1: '把数据安全，<br><span class="text-[#8fd6a4]">放在第一位设计的</span><br>企业内部 AI 基座。',
    sub: "以银行·金融机构的安全要求为设计基准的月费定额本地部署 AI。模型与推理全部在贵司管理区域内完成，对外通信为零，在闭域网(与互联网物理隔离)环境中也能完整运行。凡是有机密数据要保护的企业，都能以合理的价格获得银行级的安全。",
    ctaPlans: "查看价格方案",
    ctaPoc: "咨询免费 PoC",
    st1n: "0<small> byte</small>",
    st1l: "对外数据传输",
    st2n: "闭域网",
    st2l: "可在断网环境运行",
    st3n: "¥69,800<small>/月起</small>",
    st3l: "定额·无按量计费",
    st4n: "每年4次",
    st4l: "免费更新至最新模型",
    secH2: '为"数据不能外传"的组织而生。',
    secLead: "核心系统源代码、客户信息、制造业的设计图纸、未公开的研发资料——越是无法把数据交给云端 AI 的组织，越需要 AI 带来的生产力。本服务以银行级安全要求为设计基准，服务所有需要保护机密数据的企业。",
    sec1h: "物理上，出不去",
    sec1p: "模型与推理全部在贵司管理区域内完成。以闭域网·断网环境为标准运行前提，不存在任何依赖外部通信的功能。",
    sec2h: "全栈可审查",
    sec2p: "模型、推理服务器、开发 Agent 全部开源，没有黑盒，贵司安全部门可自行审查验证。无需向外部做许可证激活。",
    sec3h: "经得起审计",
    sec3p: "API 网关记录用户认证与审计日志(谁·何时·发送了什么)。提供对应 FISC 安全对策基准·ISMS 等审计所需的架构说明资料。",
    sec4h: "没有供应商风险",
    sec4p: "不存在使用云端 AI 时「外部委托方」性质的第三方数据提供，委托方管理、数据跨境等议题从根源上消失。",
    sec5h: "定额，用到饱",
    sec5p: "没有按 token 计费。全团队使用再多，月费不变，预算审批一次通过。",
    sec6h: "始终是最新模型",
    sec6p: "开源大模型以数月为单位进化。每季度免费换装为当期最优模型(闭域环境为上门更新)。",
    archH2: "架构很简单：对外只暴露一个 API。",
    archLead: "DGX Spark 作为服务器部署在贵司网络内，对外只开放 LLM API(OpenAI 兼容)一个端口。开发者在自己的电脑上用 CLI 连接内网 IP 即可使用。模型、审计日志、使用数据都不会离开服务器。",
    archN1h: "开发者的电脑",
    archN1p: "只需安装 CLI，无需分发模型。代码的读写都发生在各自的终端上。",
    archArrow: "内网 LAN / TLS 加密 / API key 认证",
    archN2h: "DGX Spark(服务器)",
    archN2p: "对外仅开放 API 网关一个端口。模型、推理、审计日志全部在其内部完成，其余端口全部关闭。",
    archB1h: "一人一把 API key",
    archB1p: "密钥按个人发放，审计日志可以准确归因到「是谁在用」。支持 LDAP/AD 集成。",
    archB2h: "IP 限制·限流",
    archB2p: "只有被许可的终端·网段可以连接。按用户限流，保证团队公平使用。",
    archB3h: "服务器最小暴露",
    archB3p: "推理引擎只绑定本机回环，不直接对外。管理访问(SSH)仅限管理网段。即使在内网，通信也走 TLS 加密。",
    plansH2: "月租方案 — 按团队规模选择的 3 档 Plan",
    plansLead: "所有 Plan 均包含：设备、安装、保守运维、模型更新、OpenAI 兼容 API 网关。标准合约 24 个月。",
    reco: "推荐",
    priceSuffix: "/月(不含税·24个月合约)",
    pSscale: "~5 人开发团队",
    pSmodel: "搭载 Qwen3-Coder-Next",
    pSinit: "初装费 ¥350,000(不含税)",
    pS1: "编码特化模型(80B)",
    pS2: "256K token 上下文·响应轻快",
    pS3: "DGX Spark ×1 台",
    pS4: "12个月合约:¥91,000/月",
    pMscale: "5~15 人开发团队",
    pMmodel: "搭载 DeepSeek V4-Flash(全精度)",
    pMinit: "初装费 ¥600,000(不含税)",
    pM1: "旗舰级综合能力(284B)",
    pM2: "双机构成·团队并发余量充足",
    pM3: "最长 100 万 token 上下文(单会话时)",
    pM4: "12个月合约:¥163,000/月",
    pLscale: "15~30 人开发团队",
    pLmodel: "搭载 GLM-5.2",
    pLinit: "初装费 ¥1,030,000(不含税)",
    pL1: "开源最高峰(744B·MIT 许可)",
    pL2: "4 台集群构成",
    pL3: "最长 100 万 token 上下文(单会话时)",
    pL4: "12个月合约:¥338,000/月",
    taxnote: "※ 所示价格均不含税。合约期满后可按残值买断，或免费升级至最新机型继续使用。",
    incH2: "月费，包含全部。",
    inc1h: "安装·构建",
    inc1p: "从设备搬入、推理服务器构建、内网接入到验收，全部由我方工程师完成。",
    inc2h: "开发工具对接",
    inc2p: "提供 OpenAI 兼容 API。AI 编码 Agent 一个配置即可直连，导入时在贵司开发环境完成连通验证。",
    inc3h: "保守·故障对应",
    inc3p: "远程监控与定期维护。万一故障，48 小时内以替换机恢复。",
    inc4h: "季度模型更新",
    inc4p: "同 Plan 内模型免费换装，始终保持「当期最优开源模型」。",
    inc5h: "用量可视化面板",
    inc5p: "谁用了多少一目了然，可直接用于内部导入效果汇报。",
    inc6h: "管理员培训",
    inc6p: "导入时提供半天管理员培训，日常运维无需专职人员。",
    agH2: "闭域网不是「选项」，而是设计前提。",
    agLead: "以金融机构为代表，许多高机密开发现场都处于与互联网物理隔离的环境。本服务以此为前提设计：模型、推理服务器、编码 Agent 及全部依赖包，以离线包形式构建交付，遥测与自动更新检查均在禁用状态下交货。",
    ag1h: "离线构建",
    ag1p: "从 Agent 本体到依赖包，以完全无外部连接的形态导入，遥测发送一律禁用。",
    ag2h: "上门维护",
    ag2p: "以工程师定期上门代替远程保守。模型更新以加密存储介质携带，现场换装。",
    ag3h: "离线运用选项",
    ag3p: "Plan S/M:+¥35,000/月，Plan L:+¥65,000/月(不含税)。含每季度上门模型更新与点检。",
    flowH2: "从签约到上线，最短 2 周。",
    fl1h: "需求沟通",
    fl1p: "了解团队规模、用途、安全要求，提出最合适的方案。",
    fl2h: "免费 PoC",
    fl2p: "通过实机演示确认速度与质量，也可在贵司代码库上验证。",
    fl3h: "安装·构建",
    fl3p: "设备搬入、构建、验收，并提交实测性能验收报告。",
    fl4h: "开始运用",
    fl4p: "此后只有月费。保守与模型更新全部交给我们。",
    honH2: "我们坦诚相告。",
    honP1: '<b>响应速度不及云端最顶级模型。</b>本服务的生成速度依 Plan 约为每秒 10~50 token；但代码解析(读入)超过每秒 1,000 token，已为编码 Agent 用途做了优化。合同中明确写入实测性能验收基准，以数字作出承诺。',
    honP2: '<b>正因如此，请先通过免费 PoC 实际体验</b>后再做判断。"以这个速度和质量，数据一个字节都不外流"的价值，请在贵司的实务中亲自确认。',
    consoleH2: '运维状态，一目了然。管理控制台标配。',
    consoleLead: '部署后的运行状态、审计日志、各项设置，管理员随时可在控制台确认(仅限管理网段访问)。记录只含元数据，不保存提示词正文；认证拒绝、超限等事件全部留痕，可导出为审计提交用的 CSV/JSON。',
    consoleTab1: '运行状态',
    consoleTab2: '审计日志',
    consoleTab3: '设置',
    consoleNote: '※ 画面为预览(模拟数据)，实际界面因合约配置而异。',
    ctaH2: "先看实机，再谈其他。",
    ctaP: "我们带演示机上门。在贵司会议室，亲眼见证一台完全不连外网的 AI 写代码。可签署 NDA，并对应安全检查表的填写。",
    ctaBtn: "申请免费 PoC",
    foot: 'Jacky · 联系: newbdez33@gmail.com · GitHub: @newbdez33<br>NVIDIA 与 DGX 为 NVIDIA Corporation 商标。价格为 2026 年 8 月时点·不含税。',
    termClosing: "— 响应来自公司内部的机器。数据一个字节都没有离开内网 —",
    termScenes: [
      {
        cmd: "调查认证报错的原因并修复",
        steps: [
          { t: "▸ 正在解析 auth/session.ts…", d: 900 },
          { t: "▸ 原因：检测到 token 刷新时的竞态条件", d: 1100 },
          { t: "▸ 已生成修复补丁，12 项测试通过 ✓", d: 1200 },
        ],
      },
      {
        cmd: "从安全角度审查客户数据处理代码",
        steps: [
          { t: "▸ 正在解析 data/export.ts 等 15 个文件…", d: 950 },
          { t: "▸ 发现：2 处个人信息被输出到日志", d: 1150 },
          { t: "▸ 已添加脱敏处理，并记入审计日志 ✓", d: 1200 },
        ],
      },
    ],
  },
  en: {
    brand: "Jacky | Private LLM for High-Security Environments",
    h1: 'An in-house AI platform<br><span class="text-[#8fd6a4]">designed security-first,</span><br>for data that can\'t leave.',
    sub: "Engineered to the security requirements of banks and financial institutions — and available to every company that handles confidential data. Models and inference run entirely inside your premises. Zero outbound traffic. Fully operational on air-gapped networks. One flat monthly fee.",
    ctaPlans: "See pricing",
    ctaPoc: "Request a free PoC",
    st1n: "0<small> bytes</small>",
    st1l: "Data sent outside",
    st2n: "Air-gapped",
    st2l: "Runs with internet fully disconnected",
    st3n: "¥69,800<small>/mo+</small>",
    st3l: "Flat fee — no per-token billing",
    st4n: "4× / year",
    st4l: "Free upgrades to the latest models",
    secH2: "For organizations whose data must never leave.",
    secLead: "Core source code, customer records, manufacturing designs, unpublished R&D. The organizations that cannot send data to cloud AI are precisely the ones that need AI productivity most. This service is engineered to bank-grade security requirements — and built for every enterprise that handles confidential data.",
    sec1h: "Physically contained",
    sec1p: "Models and inference stay inside your controlled premises. Air-gapped operation is the standard assumption — nothing in the stack depends on outbound connectivity.",
    sec2h: "A fully auditable stack",
    sec2p: "Model, inference server, and coding agents are all open source. No black boxes — your security team can inspect everything. No external license activation required.",
    sec3h: "Built for audits",
    sec3p: "The API gateway enforces user authentication and records audit logs (who sent what, and when). We provide architecture documentation for FISC Security Guidelines and ISMS audits.",
    sec4h: "No vendor exposure",
    sec4p: "No data is ever provided to a third party, so the outsourcing-oversight and cross-border data questions raised by cloud AI simply never arise.",
    sec5h: "Flat fee, unlimited use",
    sec5p: "No per-token billing. Your whole team can use it as much as they want — the monthly fee never changes. One budget approval, done.",
    sec6h: "Always a current model",
    sec6p: "Open-source LLMs advance every few months. Each quarter we swap in the best available model at no charge (delivered on-site for air-gapped environments).",
    archH2: "A simple architecture. One API, nothing else exposed.",
    archLead: "The DGX Spark sits inside your network as a server, exposing a single port: an OpenAI-compatible LLM API. Developers connect from their own machines using CLIs, pointed at the internal IP. Models, audit logs, and usage data never leave the server.",
    archN1h: "Developer machines",
    archN1p: "Just install a CLI — no model distribution needed. Code is read and written on each developer's own machine.",
    archArrow: "Internal LAN / TLS / API-key auth",
    archN2h: "DGX Spark (server)",
    archN2p: "Only the API gateway port is exposed. Model, inference, and audit logs are all contained inside. Every other port is closed.",
    archB1h: "Per-user API keys",
    archB1p: "Keys are issued per individual, so audit logs always attribute usage to a person. LDAP/AD integration available.",
    archB2h: "IP allowlist & rate limits",
    archB2p: "Only approved machines and segments can connect. Per-user rate limits keep usage fair across the team.",
    archB3h: "Minimal server exposure",
    archB3p: "The inference engine binds to localhost and is never exposed directly. Admin access (SSH) is restricted to the management segment. Traffic is TLS-encrypted even on the internal LAN.",
    plansH2: "Monthly plans — three tiers by team size",
    plansLead: "Every plan includes hardware, installation, maintenance, model updates, and an OpenAI-compatible API gateway. Standard term: 24 months.",
    reco: "Recommended",
    priceSuffix: "/mo (excl. tax · 24-mo term)",
    pSscale: "Dev teams up to 5",
    pSmodel: "Powered by Qwen3-Coder-Next",
    pSinit: "Setup fee ¥350,000 (excl. tax)",
    pS1: "Coding-specialized model (80B)",
    pS2: "256K-token context · snappy responses",
    pS3: "DGX Spark ×1",
    pS4: "12-month term: ¥91,000/mo",
    pMscale: "Dev teams of 5–15",
    pMmodel: "Powered by DeepSeek V4-Flash (full precision)",
    pMinit: "Setup fee ¥600,000 (excl. tax)",
    pM1: "Flagship-class capability (284B)",
    pM2: "Two-node setup · headroom for concurrent use",
    pM3: "Up to 1M-token context (single session)",
    pM4: "12-month term: ¥163,000/mo",
    pLscale: "Dev teams of 15–30",
    pLmodel: "Powered by GLM-5.2",
    pLinit: "Setup fee ¥1,030,000 (excl. tax)",
    pL1: "Top-tier open source (744B · MIT)",
    pL2: "Four-node cluster",
    pL3: "Up to 1M-token context (single session)",
    pL4: "12-month term: ¥338,000/mo",
    taxnote: "※ All prices exclude tax. At end of term, purchase the hardware at residual value or continue with a free upgrade to current equipment.",
    incH2: "Everything is in the monthly fee.",
    inc1h: "Installation & setup",
    inc1p: "Our engineers handle delivery, inference-server build-out, network integration, and acceptance testing.",
    inc2h: "Dev tool integration",
    inc2p: "OpenAI-compatible API. Coding agents connect with a single config change — we verify the integration in your environment at rollout.",
    inc3h: "Maintenance & failures",
    inc3p: "Monitoring and scheduled maintenance included. If hardware fails, we restore service with replacement units within 48 hours.",
    inc4h: "Quarterly model updates",
    inc4p: "Swap to any model that fits your plan, free of charge. You always run the best open model of the moment.",
    inc5h: "Usage dashboard",
    inc5p: "See who uses how much — ready-made material for internal ROI reporting.",
    inc6h: "Admin training",
    inc6p: "Half-day training at rollout. No dedicated operator needed for day-to-day use.",
    agH2: "Air-gapped is not an option. It is the default.",
    agLead: "Financial institutions are the classic case, but many high-confidentiality teams develop on networks physically isolated from the internet. This service is designed for exactly that: model, inference server, coding agents, and every dependency are delivered as an offline bundle, with telemetry and auto-update checks disabled before handover.",
    ag1h: "Offline build",
    ag1p: "Agents and all dependencies installed to run with zero external connectivity. Telemetry disabled across the stack.",
    ag2h: "On-site maintenance",
    ag2p: "Scheduled engineer visits replace remote maintenance. Model updates arrive on encrypted storage and are installed on the spot.",
    ag3h: "Offline operation option",
    ag3p: "Plan S/M: +¥35,000/mo. Plan L: +¥65,000/mo (excl. tax). Includes quarterly on-site model updates and inspection.",
    flowH2: "From contract to production in as little as 2 weeks.",
    fl1h: "Consultation",
    fl1p: "We assess team size, use cases, and security requirements, then propose the right plan.",
    fl2h: "Free PoC",
    fl2p: "See speed and quality on real hardware — including against your own codebase.",
    fl3h: "Install & build",
    fl3p: "Delivery, setup, and acceptance testing, with a measured-performance report.",
    fl4h: "Go live",
    fl4p: "From here on, just the monthly fee. Maintenance and model updates are on us.",
    honH2: "A few honest words.",
    honP1: '<b>This is not as fast as the top cloud models.</b> Generation speed is roughly 10–50 tokens/second depending on plan. Code analysis (reading), however, exceeds 1,000 tokens/second — optimized for coding-agent workloads. Your contract specifies measured acceptance criteria, in numbers.',
    honP2: '<b>That is exactly why we ask you to try it first.</b> Judge after a free PoC — and see for yourself what it is worth when this speed and quality comes with not a single byte leaving your network.',
    consoleH2: 'Operations you can see. Admin console included.',
    consoleLead: 'After rollout, administrators can check runtime status, audit logs, and settings anytime from the admin console (reachable only from the management segment). Logging is metadata-only — prompt contents are never stored. Auth rejections and rate-limit events are all recorded and exportable as CSV/JSON for audits.',
    consoleTab1: 'Monitoring',
    consoleTab2: 'Audit log',
    consoleTab3: 'Settings',
    consoleNote: '※ Screens shown are a preview with mock data. Actual screens vary by contract configuration.',
    ctaH2: "Start by seeing the real machine.",
    ctaP: "We bring a demo unit to you. Watch an AI write code in your meeting room with no external connection whatsoever. NDA available; we also respond to security questionnaires.",
    ctaBtn: "Request a free PoC",
    foot: 'Jacky · Contact: newbdez33@gmail.com · GitHub: @newbdez33<br>NVIDIA and DGX are trademarks of NVIDIA Corporation. Prices as of August 2026, tax excluded.',
    termClosing: "— Answered by a machine inside your walls. Not one byte left the network —",
    termScenes: [
      {
        cmd: "investigate the auth error and fix it",
        steps: [
          { t: "▸ analyzing auth/session.ts…", d: 900 },
          { t: "▸ cause: race condition during token refresh", d: 1100 },
          { t: "▸ patch created, 12 tests passing ✓", d: 1200 },
        ],
      },
      {
        cmd: "review the customer-data pipeline for security issues",
        steps: [
          { t: "▸ analyzing data/export.ts +14 files…", d: 950 },
          { t: "▸ found: PII written to logs in 2 places", d: 1150 },
          { t: "▸ masking added, recorded in audit log ✓", d: 1200 },
        ],
      },
    ],
  },
};

type PrivateAiContextType = {
  lang: PrivateAiLang;
  setLang: (lang: PrivateAiLang) => void;
  t: PrivateAiI18nData;
};

const PrivateAiContext = createContext<PrivateAiContextType | undefined>(undefined);

export function PrivateAiProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<PrivateAiLang>("ja");

  useEffect(() => {
    queueMicrotask(() => {
      const saved = localStorage.getItem("private-ai-lang") as PrivateAiLang | null;
      if (saved && (saved === "ja" || saved === "zh" || saved === "en")) {
        setLang(saved);
        return;
      }
      const browser = navigator.language.toLowerCase();
      if (browser.startsWith("zh")) setLang("zh");
      else if (browser.startsWith("ja")) setLang("ja");
      else setLang("en");
    });
  }, []);

  const changeLang = (next: PrivateAiLang) => {
    setLang(next);
    localStorage.setItem("private-ai-lang", next);
  };

  const value = { lang, setLang: changeLang, t: i18nData[lang] };

  return (
    <PrivateAiContext.Provider value={value}>
      {children}
    </PrivateAiContext.Provider>
  );
}

export function usePrivateAiI18n() {
  const context = useContext(PrivateAiContext);
  if (context === undefined) {
    throw new Error("usePrivateAiI18n must be used within a PrivateAiProvider");
  }
  return context;
}
