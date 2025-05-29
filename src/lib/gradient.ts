function generateHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function generateGradient(slug: string): { hue1: number; hue2: number } {
  const hash = generateHash(slug);
  return {
    hue1: hash % 360,
    hue2: (hash + 120) % 360,
  };
}

export { generateHash, generateGradient };
