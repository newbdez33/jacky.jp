# Portfolio roadmap

两阶段：**极简名片**（当前形态打磨）→ **拿机会**（提高转化与可信度）。

---

## Phase 1 — 极简名片（保持一页、少结构）

目标：访客 10 秒内知道你是谁、如何联系；无多余板块。

**进度备忘**：文案英/日、SEO（含 `public/og.png` 与 Open Graph / Twitter 大图卡）、`<html lang>` 与界面同步、Footer/GitHub 区 a11y 与错误态、Jest 与 build 已通过。仍可做：§8 真机微调间距。

### 1. 文案（英）

- 在 `lib/i18n-context.tsx` 的 `en.hero.description` 中，**替换或缩短** `part4`（当前偏泛用的 “innovative solutions…”）。
- 新结语建议满足：**一个具体维度**（例如偏好的产品类型、规模、或一条可公开的成果/方向），**不超过原句约 1.5 倍长度**。
- 通读整段 `part1`～`part4` 拼接后的完整英文，检查逗号与 “and” 是否读起来自然。

**验收**：读给非同行听，能复述出你「主要在做什么」而不是「任何开发者都能说的那句话」。

### 2. 文案（日）

- 打开 `lib/i18n-context.tsx` 的 `ja.hero.description`，**以完整日文句为单位**重写（可保留字段拆分，但日文应像一气呵成的一段话）。
- 核对与英文信息**对等**：角色、东京、AI / ブロックチェーン / トレーディングボット、整体语气（热情但不过度推销）。
- 检查敬体/常体全文一致（建议常体或です・ます统一一种）。

**验收**：母语或高水平日语读者读起来无「翻译腔拼接」感。

### 3. SEO 与链接预览

- 在 `app/layout.tsx` 的 `metadata` 中扩展 `**description`**（约 1～2 句，含 1～2 个可搜索关键词，与首页自我介绍一致）。
- 按需增加 `**metadataBase`**（生产环境完整域名，如 `https://jacky.jp`），便于相对路径解析。
- 增加 `**openGraph`**：`title`、`description`、`url`、`siteName`；`locale` 可设 `en_US`，若只做单页可暂不设 `alternateLocale`。
- 增加 `**twitter**`：`card`（通常 `summary` 或 `summary_large_image`）、`title`、`description`。
- `**og:image**`：静态导出下需使用**绝对 URL**（指向已部署域上的 `/og.png` 等）；在 `public/` 放一张简单 OG 图（1200×630 左右）并在 metadata 里引用。

**验收**：用 [opengraph.xyz](https://www.opengraph.xyz/) 或各平台调试工具预览链接时，标题/描述/图合理且无相对路径失效。

### 4. 语言标记（`<html lang>`）

- 将 `lang` 从 `app/layout.tsx` 的静态 `en` 改为与当前界面语言一致（`en` | `ja`）。
- 实现方式任选其一：**在 `layout` 用 client 包装层**根据 `LanguageProvider` 或 `localStorage` 同步 `document.documentElement.lang`，或**把 `html` 挪入 small client root**（注意与 Next App Router 结构的兼容性）。
- 首次加载：与 `LanguageProvider` 内「浏览器语言 / localStorage」逻辑一致，避免闪错语言（可接受极短 hydration 修正，但尽量避免错误 `lang` 久留）。

**验收**：切英/日时，开发者工具里 `<html lang>` 随之变为 `en` 或 `ja`。

### 5. 无障碍与语义

- `components/footer.tsx`：若链接为 X，将 `sr-only` 从 “Twitter” 改为 **“X”** 或 **“X (formerly Twitter)”**（与产品名一致即可）。
- 外链 `Link` 已含 `rel="noopener noreferrer"` 则保持；检查图标按钮是否都有可见或可读标签。
- `components/github-contributions.tsx`：热力图在 `loading` 或数据为空时，是否对屏幕阅读器有可理解的说明（可选 `aria-busy` / 简短 `aria-label` 或邻接文案）。

**验收**：键盘可聚焦到语言切换与社交按钮；用屏幕阅读器扫一遍主结构无严重误导。

### 6. GitHub 贡献区稳定性

- `components/github-contributions.tsx`：`fetch` 失败或返回非预期 JSON 时，**不要**长期只显示空白图 + 无限 skeleton。
- 行为建议（择一或组合）：设置 `error` / `failed` 状态；显示一行 `text-muted-foreground` 说明（中英日三语文案可放在 `i18n-context`）；或保留空日历但下方有「无法加载贡献数据」提示。
- `console.error` 可保留，生产环境可考虑降级为单次上报或静默（非必须）。

**验收**：断网或 API 502 时，页面仍显「有意为之」的占位，而非像坏掉的区块。

### 7. 构建、测试与发布

- 本地执行 `npm run build`，确认 `out/` 生成且无报错（项目为 `output: "export"`）。
- 执行 `npm run lint` 与 `npm test`，修复新增问题。
- 对照 `README.md` 的部署说明走一遍（如 `wrangler pages deploy out`），**记录实际使用的命令与分支**；若与文档不符，**更新 README** 或在本文件「部署」小节记一笔真实流程。

**验收**：从干净 clone 到可重复的一键构建；部署文档与真实步骤一致。

### 8. 视觉与阅读节奏（极简范围内）

- 真机或浏览器设备模式看 `Hero` → 贡献图 → 徽章 → Footer：间距是否过挤/过散（仅微调 class，不加新板块）。
- 长段落在小屏是否换行自然、无尴尬孤行（必要时只调 `max-w` 或 `text-balance` 等极小改动）。

**验收**：单页、无项目列表也能自信发链接；移动端与桌面阅读体验干净。

---

### Phase 1 建议顺序

1. 文案英/日（改 `i18n-context.tsx`）
2. `metadata` + OG 图（`layout.tsx` + `public/`）
3. `<html lang>` 同步
4. a11y 小修 + GitHub 区错误态
5. build / lint / test / 部署文档核对
6. 最后做微调间距（若需要）

---

## Phase 2 — 拿机会（提高联系与背书）

目标：招聘方 / 合作方无需离开站点也能判断「是否值得聊」，并降低联系摩擦。

- **精选作品**：新增小节 2～4 个条目（名称、一句话、技术标签、链接：repo / demo / 文章任选）。
- **明确 CTA**：页脚或 hero 附近增加主行动（例如「邮件联系」或「预约简短通话」），与社交并列。
- **联系方式**：若公开邮箱，用 `mailto:` 或防爬 obfuscation 方案二选一；或固定表单链接（Google Form / Typeform 等）。
- **简历 / PDF**：可选「下载 CV」链接（托管在 repo、`public/` 或云存储），保持可更新。
- **技能与领域**：短列表（栈、云、链上/交易相关等），与作品区交叉引用，避免堆砌。
- **信任补强**：Testimonials、公司/客户 logo（若有许可）、或「曾用技术」与项目对应。
- **分析（可选）**：隐私友好的访问量（如 Cloudflare Web Analytics），用于迭代内容。
- **结构化数据（可选）**：`Person` / `ProfilePage` JSON-LD，利于搜索结果富摘要。

完成标准：陌生人能在 2 分钟内回答：做什么、做过什么、怎么联系、下一步是什么。

---

## 备注

- Phase 2 不必一次做完；优先 **作品 + 主 CTA + 联系** 三项即可显著改善转化。
- 若长期保持极简，可将 Phase 2 中的「作品」改为单一外链（如 GitHub profile 置顶 repo），仍算轻量实现。

