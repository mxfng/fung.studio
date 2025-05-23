import React from "react";

interface ImageGalleryProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  children,
  columns = 2,
}) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return <div className={`grid ${gridCols} gap-4 my-8`}>{children}</div>;
};

interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt, caption }) => {
  return (
    <figure className="group relative overflow-hidden rounded-lg">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
