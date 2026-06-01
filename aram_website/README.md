This is the official Aram Tamil School (branch of California Tamil School) website.


<!--

## Managing the Annual Calendar

All events live in one file: `src/app/_data/events.ts`.

### Defaults
- Every Sunday with NO entry = green School Day (automatic).
- Other days with no entry = white / no class.
- Adding an entry for any date **overrides** the default — that day uses the new color/type.

### Color guide
- Special events (Pongal, Diwali, cultural) = blue
- Annual Day / Graduation = purple
- No class / leave / break = white
- School day = green

### Calendar Event Images

Every day in the calendar where theres an event there will be an image for it that is revealed on hover, you
can set the iamge for the date/event by linking the path to the image in the event declaration.

### Add an event
Append an entry to the `events` array:

```ts
{
  date: "2026-04-18",
  type: "annual",
  title: "Annual Day",
  description: "Student performances, dances, music, and skits.",
},
```

- `date`: `"YYYY-MM-DD"` (zero-padded, e.g. Feb 3 = `"2026-02-03"`).
- `type`: one of
  - `"special"`  → blue tint (Pongal, Diwali, cultural events)
  - `"leave"`    → white (cancelled Sunday, holidays, breaks)
  - `"annual"`   → purple (Annual Day only)
  - `"graduation"` → purple (Graduation only)
  - `"school"`   → green (rarely needed, Sundays already default green)
- `title`: short, shown both unhovered + hovered.
- `description`: one short sentence, shown on hover.

### Remove an event
Delete its `{ ... },` block. Sunday reverts to green by default if no events are specified.

### Summer break (auto)
Top of file:

```
const summerBreak = generateSundays(
  2026, 3, 19,   // start: year, MONTH (0-indexed!), day  → April 19, 2026
  2026, 7, 16,   // end:   year, MONTH (0-indexed!), day  → August 16, 2026
).map(...)
```

- Bulk-generates a `"leave"` entry for every Sunday in the range (so they show white, not green).
- These entries override the default Sunday-green just like manual entries do — same mechanism, just generated automatically to save typing.
- Month is 0-indexed: Jan=0, Feb=1, ..., April=3, ..., Aug=7, ..., Dec=11.
- Update the 6 numbers yearly to shift the summer range.

### After editing
Save the file. Local dev: refresh. Deployed: redeploy.

### Common mistakes
- Date NOT zero-padded → silently won't match.
- Month index off-by-one (Jan is 0, not 1).
- Missing comma after `}`.

-->

