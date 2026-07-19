# Template Pack: Elegant — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the "Elegant" template pack — one category + 12 coordinated templates (soft dark gradient, serif, gold accents) to FreeShow's default templates.

**Architecture:** Pure content in `src/frontend/utils/createData.ts`: register an `elegant` template category and add 12 `Template` objects (same shape as the existing `lowerThirdBlue`) to `getDefaultTemplates()`. No engine/type changes.

**Tech Stack:** TypeScript data objects; FreeShow template system.

**Shared Elegant palette (use in every template below):**
- Background gradient: `linear-gradient(160deg, #0e1526 0%, #1c2a44 100%)`
- Text color: `#f5f2ea` · Accent gold: `#d8b46a` · Font: `Georgia, 'Times New Roman', serif`
- Full-slide box: `top:0;left:0;width:1920px;height:1080px;` + `padding` + background
- Lower-third box: `top:820px;left:50px;width:1820px;height:220px;`

---

## Task 1: Category + heading templates (Title, Extra Title, Main Point, Main Point ALT)

**Files:**
- Modify: `src/frontend/utils/createData.ts` (`createDefaultTemplates` ~line 656, and inside `getDefaultTemplates()` before its closing `return a`)

- [ ] **Step 1: Register the `elegant` category**

At the top of `createDefaultTemplates()` (line 656), before `const deletedIds`, add:

```ts
    templateCategories.update((a) => {
        if (!a.elegant) a.elegant = { default: true, name: "Elegant", icon: "text" }
        return a
    })
```

- [ ] **Step 2: Add the 4 heading templates**

Inside `getDefaultTemplates()`, immediately before its closing `return a`, add:

```ts
    // ---- ELEGANT PACK ----
    const elegantBg = "top:0;left:0;width:1920px;height:1080px;background: linear-gradient(160deg, #0e1526 0%, #1c2a44 100%);padding:120px;"
    a.elegantTitle = {
        isDefault: true, name: "Elegant – Title", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:center;", text: [{ value: "", style: "font-size:150px;font-family:Georgia, 'Times New Roman', serif;color:#d8b46a;font-weight:bold;letter-spacing:2px;" }] }] }]
    }
    a.elegantExtraTitle = {
        isDefault: true, name: "Elegant – Extra Title", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:center;", text: [{ value: "", style: "font-size:84px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;font-style:italic;" }] }] }]
    }
    a.elegantMainPoint = {
        isDefault: true, name: "Elegant – Main Point", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:center;", text: [{ value: "", style: "font-size:130px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;font-weight:bold;" }] }] }]
    }
    a.elegantMainPointAlt = {
        isDefault: true, name: "Elegant – Main Point ALT", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:center;", text: [{ value: "", style: "font-size:110px;font-family:Georgia, 'Times New Roman', serif;color:#d8b46a;font-weight:bold;font-style:italic;" }] }] }]
    }
```

- [ ] **Step 3: Lint**

Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/utils/createData.ts`
Expected: no new errors (baseline-compared).

- [ ] **Step 4: Commit**

```bash
git add src/frontend/utils/createData.ts
git commit -m "feat(templates): Elegant pack — category + heading templates"
```

---

## Task 2: Body templates (List, General Text, Quote, Scripture)

**Files:**
- Modify: `src/frontend/utils/createData.ts` (inside `getDefaultTemplates()` after the Task 1 block)

- [ ] **Step 1: Add the 4 body templates**

After the `a.elegantMainPointAlt` block, add:

```ts
    a.elegantList = {
        isDefault: true, name: "Elegant – List", color: "#1c2a44", category: "elegant",
        items: [{ style: "top:0;left:0;width:1920px;height:1080px;background: linear-gradient(160deg, #0e1526 0%, #1c2a44 100%);padding:120px 160px;", align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:left;", text: [{ value: "", style: "font-size:74px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;line-height:1.4;" }] }] }]
    }
    a.elegantGeneralText = {
        isDefault: true, name: "Elegant – General Text", color: "#1c2a44", category: "elegant",
        items: [{ style: "top:0;left:0;width:1920px;height:1080px;background: linear-gradient(160deg, #0e1526 0%, #1c2a44 100%);padding:120px 160px;", align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:left;", text: [{ value: "", style: "font-size:66px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;line-height:1.4;" }] }] }]
    }
    a.elegantQuote = {
        isDefault: true, name: "Elegant – Quote", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:center;", text: [{ value: "", style: "font-size:92px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;font-style:italic;" }] }] }]
    }
    a.elegantScripture = {
        isDefault: true, name: "Elegant – Scripture", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [
            { align: "text-align:center;", text: [{ value: "", style: "font-size:72px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;" }] },
            { align: "text-align:center;", text: [{ value: "", style: "font-size:42px;font-family:Georgia, 'Times New Roman', serif;color:#d8b46a;font-style:italic;", customType: "disableTemplate" }] }
        ] }]
    }
```

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/utils/createData.ts`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/frontend/utils/createData.ts
git commit -m "feat(templates): Elegant pack — list, general text, quote, scripture"
```

---

## Task 3: Lyrics + lower-third templates

**Files:**
- Modify: `src/frontend/utils/createData.ts` (inside `getDefaultTemplates()` after the Task 2 block)

- [ ] **Step 1: Add the 4 remaining templates**

After the `a.elegantScripture` block, add:

```ts
    a.elegantLyrics = {
        isDefault: true, name: "Elegant – Lyrics & Text", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:center;", text: [{ value: "", style: "font-size:96px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;font-weight:bold;line-height:1.3;" }] }] }]
    }
    a.elegantGeneralLyrics = {
        isDefault: true, name: "Elegant – General Lyrics", color: "#1c2a44", category: "elegant",
        items: [{ style: elegantBg, align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:center;", text: [{ value: "", style: "font-size:82px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;line-height:1.3;" }] }] }]
    }
    a.elegantLowerThird = {
        isDefault: true, name: "Elegant – Lower Third", color: "#1c2a44", category: "elegant",
        items: [{ style: "top:820px;left:50px;width:1820px;height:220px;background: rgba(14,21,38,0.82);padding:25px 40px;border-left:8px solid #d8b46a;", align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:left;", text: [{ value: "", style: "font-size:74px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;font-weight:bold;" }] }] }]
    }
    a.elegantLowerThirdQuote = {
        isDefault: true, name: "Elegant – Lower Third Quote", color: "#1c2a44", category: "elegant",
        items: [{ style: "top:820px;left:50px;width:1820px;height:220px;background: rgba(14,21,38,0.82);padding:25px 40px;border-left:8px solid #d8b46a;", align: "", textFit: "shrinkToFit", lines: [{ align: "text-align:left;", text: [{ value: "", style: "font-size:60px;font-family:Georgia, 'Times New Roman', serif;color:#f5f2ea;font-style:italic;" }] }] }]
    }
```

- [ ] **Step 2: Lint**

Run: `npx eslint -c config/linting/eslint.frontend.json --ext .ts src/frontend/utils/createData.ts`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/frontend/utils/createData.ts
git commit -m "feat(templates): Elegant pack — lyrics + lower-third templates"
```

---

## Task 4: Build + visual verification

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 2: Package DMG (local test only — do NOT publish)**

Run: `npx electron-builder --config config/building/electron-builder.yaml --mac dmg --arm64 --publish never`
Expected: DMG created.

- [ ] **Step 3: Manual checks**
  - Templates tab shows an **Elegant** category with 12 templates.
  - Drag **Elegant – Title** onto a slide → dark gradient + gold serif title.
  - Check Scripture (two-line: verse + gold reference), Lower Third (bottom gold bar), List (left aligned).
  - Confirm the 12 look coordinated.

## Self-review notes

- Spec coverage: category + 12 slots (Title, Extra Title, Main Point, Main Point ALT, List, General Text, Quote, Scripture, Lyrics & Text, General Lyrics, Lower Third, Lower Third Quote). ✓
- All template objects use the confirmed FreeShow shape (`isDefault/name/color/category/items[{style,align,textFit,lines[{align,text[{value,style}]}]}]`), matching `lowerThirdBlue`.
- Scripture reference line uses `customType: "disableTemplate"` per the spec (keeps its own size), mirroring existing scripture templates.
- `elegantBg` const is defined once in Task 1 and reused; body/list templates use their own padded variant.
