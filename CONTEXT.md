# Workshop Terminal Context

Workshop Terminal is a personal publishing site for Ladislas. It is a calm, accessible workshop notebook for documenting code, product thinking, tools, systems, experiments, failures, projects, and field notes.

## Language

**Workshop Terminal**:
The site and publishing system.
_Avoid_: Personal brand site, portfolio, generic blog

**Log**:
A written post, note, guide, experiment, retrospective, or reference.
_Avoid_: Article, blog post, entry

**Project**:
A living hub for ongoing or finished work.
_Avoid_: Case study, portfolio item

**Route**:
A curated topic destination that groups Logs and Projects.
_Avoid_: Category, section

**Cover**:
The album-cover-style image attached to a Log or Project.
_Avoid_: Thumbnail, preview image

**Mood**:
Internal metadata describing the emotional or visual direction of a Cover.
_Avoid_: Category, tag

**High Clarity**:
A persistent reader-controlled display mode that increases readability and reduces decorative ambiguity.
_Avoid_: AAA mode, disabled mode, accessibility mode

**Now Boarding**:
The homepage section for current or active Projects.
_Avoid_: Current work, now page

**Discussion**:
An optional GitHub Discussion link attached to a Log.
_Avoid_: Native comments, comment section

## Relationships

- A **Log** belongs to exactly one primary **Route**.
- A **Log** can have many tags.
- A **Log** can relate to zero or more **Projects**.
- A **Project** can relate to zero or more **Logs**.
- A **Route** curates many **Logs** and zero or more **Projects**.
- A **Cover** belongs to a **Log** or **Project**.
- **High Clarity** modifies the display of all pages and composes with light and dark themes.
- A **Discussion** belongs to at most one **Log** and is optional.

## Example dialogue

> **Dev:** "Should this go under Product and Tools?"
> **Domain expert:** "Pick one primary **Route** for the **Log**, then use tags for the cross-links. A Log has one departure gate, but many connections."

> **Dev:** "Can I ship a post without a cover?"
> **Domain expert:** "Drafts can be incomplete, but published **Logs** and **Projects** should normally have a **Cover** because album-cover browsing is part of Workshop Terminal’s identity."

> **Dev:** "Is High Clarity our accessible version?"
> **Domain expert:** "No. The default site must already target WCAG 2.2 AA. **High Clarity** is an additional comfort mode."

## Flagged ambiguities

- "Category" was used during planning, but the resolved product term is **Route**.
- "Blog post" may be used casually, but the product term is **Log**.
- "Thumbnail" may be used technically, but the product term is **Cover**.
- "AAA mode" was considered, but rejected as a label unless formal WCAG AAA conformance is tested. Use **High Clarity** instead.
