# MIT Muses Website

The official homepage of the MIT Muses, hosted on GitHub Pages.

---

## Project structure

```
index.html                  # Shell page: navbar + Angular view container
views/                      # HTML templates, one per page
    home.html
    members.html
    alumni.html
    media.html
    auditions.html
    contact.html
    alumniMap.html
js/
    modules/app.js          # Angular app setup, routing, and Firebase config
    controllers/            # One controller per page — fetches data, drives the view
        members-controller.js
        media-controller.js
        auditions-controller.js
        contact-controller.js
        home-controller.js
        alumniMap-controller.js
css/
    base.css                # Reset / base styles
    style.css               # Site-specific styles
img/
    headshots/              # Member photos (referenced by URL in Firebase)
assets/                     # Video and other static assets
```

---

## How to update content

**Members and alumni** — edit directly in the [Firebase Console](https://console.firebase.google.com). Find the `mitmuses-8c97c-restore` project, go to **Realtime Database**, and edit the `members` or `alumni` nodes. Each member entry has these fields:

| Field | Description |
|---|---|
| `name` | Full name |
| `photo` | Path or URL to their headshot (e.g. `/img/headshots/name.jpg`) |
| `positions` | Array of role titles |
| `major` | Academic major |
| `year` | Class year |
| `other_activities` | Array of other involvement |

**Moving someone to alumni** — uncomment the helper call at the bottom of `js/controllers/members-controller.js`, deploy, then comment it back out after it runs once. See the examples already written in that file.

**Static pages** (auditions info, contact info, etc.) — edit the corresponding file in `views/`.

**Headshots** — add the image to `img/headshots/`, then update the `photo` field for that member in Firebase.

---

## Deployment

The site is deployed automatically via **GitHub Pages** — pushing to the `master` branch publishes the changes. There is no build step.
