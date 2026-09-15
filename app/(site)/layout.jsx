import './tokens.css';
import './globals.css';

import { themeCss } from './themeStyles';

export default function SiteLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      {/* the families named by --font-display / --font-body in tokens.css */}
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..700;1,9..144,100..700&family=Raleway:ital,wght@0,300..700;1,400&display=swap"
        rel="stylesheet"
      />
      {/* theme.js -> --color-*, --image-*, --logo-*, --owner-* on :root */}
      <style id="theme" dangerouslySetInnerHTML={{ __html: themeCss() }} />
      {children}
    </>
  );
}
