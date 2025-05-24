# Max Fung

Personal website showcasing works across music, design, and engineering. Built with Astro and Tailwind CSS.

I wanted to rebuild my personal site to showcase more of my creative work and serve as a de facto home base for all of my creations over the years. I decided to build this site with Astro because I preferred something higher performance and
content-rich, and also wanted to try out a new framework without leaning so heavily on React all the time. The result is something I am very pleased with.

I ended up programming a sort of messy content pipeline with image and video optimization scripts leveraging `sharp` and `ffmpeg` to compress media and convert everything to .webp format in order to streamline the large amount of pictures and videos being showcased here.

## 🚀 Tech Stack

- [Astro](https://astro.build) - Static Site Generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [React](https://react.dev) - UI components
- [MDX](https://mdxjs.com) - Markdown with JSX support

## 🧞 Development

All commands are run from the root of the project:

| Command               | Action                                       |
| :-------------------- | :------------------------------------------- |
| `bun install`         | Installs dependencies                        |
| `bun dev`             | Starts local dev server at `localhost:4321`  |
| `bun build`           | Build your production site to `./dist/`      |
| `bun preview`         | Preview your build locally, before deploying |
| `bun optimize:images` | Optimize images in the project               |
| `bun optimize:videos` | Optimize videos in the project               |

## 📁 Project Structure

```text
/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Page layouts
│   ├── pages/         # Route components
│   ├── styles/        # Global styles and themes
│   └── lib/           # Utility functions
└── package.json
```

## 🎨 Design

The site uses a custom color scheme with dark mode support, built on top of Tailwind CSS. The design system includes:

- Custom typography with Archiv Grotesk font
- Responsive layouts
- Dark/light mode theming
- Custom UI components

## 📝 License

All rights reserved.
