# fung.studio

Personal website showcasing works across music, design, and engineering. Built with Astro, TailwindCSS, and React.

This site serves as a central hub for my creative and technical portfolio. I chose Astro for its performance and content-focused architecture, and took the opportunity to experiment with Bun as an alternative to Node/`npm`.

I update my blog with new writing occasionally, and do my best to keep my portfolio up-to-date. If you like my work and want to connect, feel free to reach out here or at any of the publicly available links on my site.

As of 2025, the site is hosted on Cloudflare and served using Cloudflare Workers, which is cheap, fast, and convenient for my personal use.

## Development

```shell
# To keep the site up to date
bun install

# To run the dev server
bun dev
```

## Content Optimization

To handle the extensive media library, I built custom optimization scripts using `sharp` and `ffmpeg` to compress images and videos into .webp format for efficient cloud storage and delivery.

```shell
# To optimize images (converts images in src/assets/works and src/assets/hero to .webp)
bun run optimize:images

# To optimize videos (converts .mov and .mp4 files to .webp in a directory)
bun run optimize:videos [directory]
```

## License

This repository contains the source code for my personal website, which is publicly hosted on GitHub. However, this site showcases a significant amount of static content including my personal development work, musical compositions, and other creative projects. All images, media, written content, and creative works displayed on this site are my own copyrighted material. While the website code is open source, all rights to the images, videos, audio, design work, and other media assets showcased here are reserved.
