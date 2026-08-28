/* Root layout. Deliberately style-free: the site's stylesheet is loaded by
   app/(site)/layout.jsx so it never leaks into the Studio. */

export const metadata = {
  title:
    'Gray Lake Builders — Design-Build Remodeling in Clear Creek County, Colorado',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
