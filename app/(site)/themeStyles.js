/* Turns theme.js into the custom properties the stylesheets read. The result
   is rendered as a <style> block by app/(site)/layout.jsx. */

import { theme } from './theme';

const toKebab = (name) => name.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

export function themeVariables({ colors, images } = theme) {
  const { hero, owner, logo } = images;

  return {
    ...Object.fromEntries(
      Object.entries(colors).map(([name, value]) => [`--color-${toKebab(name)}`, value])
    ),

    '--image-hero': `url("${hero.src}")`,
    '--image-hero-position': hero.position,

    '--logo-width': logo.width,
    '--logo-filter-on-dark': logo.filterOnDark,
    '--logo-filter-on-light': logo.filterOnLight,

    '--owner-width': owner.displayWidth,
    '--owner-offset-x': owner.offsetX,
    // drop the image by its empty strip so the subject sits on the fold
    '--owner-offset-y': `${+(((owner.height - owner.solidHeight) / owner.height) * 100).toFixed(3)}%`,
    // the stacked mobile layout crops that same strip away instead
    '--owner-crop-ratio': `${owner.width} / ${owner.solidHeight}`,
  };
}

export function themeCss(t = theme) {
  const declarations = Object.entries(themeVariables(t))
    .map(([property, value]) => `${property}:${value};`)
    .join('');
  // theme values are authored in code, but never let one close the <style>
  return `:root{${declarations}}`.replace(/</g, '\\3c ');
}
