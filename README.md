# Portfolio — React + Vite

Dark portfolio website inspired by anandamw.vercel.app.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx / .css      # Fixed navbar with scroll effect
├── sections/
│   ├── Hero.jsx / .css        # Hero with typewriter animation
│   ├── About.jsx / .css       # About + stats + skills
│   ├── Resume.jsx / .css      # Education & Experience timeline
│   ├── Gallery.jsx / .css     # Photo gallery with lightbox
│   ├── Portfolio.jsx / .css   # Projects with category filter
│   └── Contact.jsx / .css     # Contact + social links + footer
├── index.css                  # Global styles, CSS variables, grid bg
├── App.jsx                    # Root component + custom cursor
└── main.jsx                   # Entry point
```

## ✏️ Customization

### Personal Info
- `src/components/Navbar.jsx` → Change `YOURNAME`
- `src/sections/Hero.jsx` → Edit `roles[]` array & subtitle
- `src/sections/About.jsx` → Edit bio, stats, skills
- `src/sections/Resume.jsx` → Edit education & experience arrays
- `src/sections/Gallery.jsx` → Replace placeholder emojis with `<img>` tags
- `src/sections/Portfolio.jsx` → Add your real projects
- `src/sections/Contact.jsx` → Update social links & email

### Adding Real Photos
In `Gallery.jsx`, replace the `.gallery__placeholder` span with:
```jsx
<img src="/photos/your-photo.jpg" alt="Description" />
```
Put your photos in the `/public/photos/` folder.

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --black: #0a0a0a;       /* main background */
  --white: #ffffff;        /* primary text/accents */
  /* ...etc */
}
```

### Grid Background
The grid pattern is applied via `.grid-bg` class using CSS `background-image` 
with two `linear-gradient` layers — no extra library needed.

## 🛠️ Tech Stack
- React 18
- Vite 5
- Lucide React (icons)
- CSS Modules (per-component .css files)
- Google Fonts: Bebas Neue, Space Mono, Inter
