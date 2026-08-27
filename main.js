/* Mobile nav panel.
   The desktop bar and the mobile panel share one set of links, so the only
   state here is an `is-nav-open` class on <body> and `is-expanded` on the two
   items that have submenus. All motion lives in CSS. */

(() => {
  const body = document.body;
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  const OPEN = 'is-nav-open';
  const mq = window.matchMedia('(max-width: 1040px)');

  const collapseAll = () => {
    nav.querySelectorAll('.is-expanded').forEach(i => i.classList.remove('is-expanded'));
  };

  const setOpen = (open) => {
    body.classList.toggle(OPEN, open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    // stop the page scrolling behind the panel
    body.style.overflow = open ? 'hidden' : '';
    if (!open) collapseAll();
  };

  toggle.addEventListener('click', () => setOpen(!body.classList.contains(OPEN)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains(OPEN)) {
      setOpen(false);
      toggle.focus();
    }
  });

  // In the panel a submenu parent expands in place rather than following its
  // href -- there is no hover on touch. The desktop bar is untouched.
  nav.querySelectorAll('.nav__item--menu > .nav__link').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (!mq.matches) return;
      e.preventDefault();
      link.parentElement.classList.toggle('is-expanded');
    });
  });

  // anything that actually navigates closes the panel
  nav.querySelectorAll('.nav__menu-link, .nav__item:not(.nav__item--menu) .nav__link')
    .forEach(link => link.addEventListener('click', () => setOpen(false)));

  // resizing up to the desktop bar clears any mobile state
  mq.addEventListener('change', (e) => { if (!e.matches) setOpen(false); });
})();
