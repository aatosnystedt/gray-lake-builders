'use client';

/* Everything that used to live in main.js: the mobile nav panel and the
   measurement behind the hero's photo/white seam. Both are plain DOM work
   against markup the server already rendered, so they run once on mount and
   clean up after themselves. */

import { useEffect } from 'react';

export function SiteBehaviors() {
  useEffect(mountNav, []);
  useEffect(mountHeroCut, []);
  return null;
}

/* Mobile nav panel.
   The desktop bar and the mobile panel share one set of links, so the only
   state here is an `is-nav-open` class on <body> and `is-expanded` on the two
   items that have submenus. All motion lives in CSS. */
function mountNav() {
  const body = document.body;
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  const OPEN = 'is-nav-open';
  const mq = window.matchMedia('(max-width: 1040px)');

  const collapseAll = () => {
    nav.querySelectorAll('.is-expanded').forEach((i) => i.classList.remove('is-expanded'));
  };

  const setOpen = (open) => {
    body.classList.toggle(OPEN, open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    // stop the page scrolling behind the panel
    body.style.overflow = open ? 'hidden' : '';
    if (!open) collapseAll();
  };

  const onToggle = () => setOpen(!body.classList.contains(OPEN));

  const onKeydown = (e) => {
    if (e.key === 'Escape' && body.classList.contains(OPEN)) {
      setOpen(false);
      toggle.focus();
    }
  };

  // In the panel a submenu parent expands in place rather than following its
  // href -- there is no hover on touch. The desktop bar is untouched.
  const onSubmenuClick = (e) => {
    if (!mq.matches) return;
    e.preventDefault();
    e.currentTarget.parentElement.classList.toggle('is-expanded');
  };

  const onNavigate = () => setOpen(false);

  // resizing up to the desktop bar clears any mobile state
  const onMqChange = (e) => {
    if (!e.matches) setOpen(false);
  };

  const submenuLinks = [...nav.querySelectorAll('.nav__item--menu > .nav__link')];
  const navigatingLinks = [
    ...nav.querySelectorAll(
      '.nav__menu-link, .nav__item:not(.nav__item--menu) .nav__link'
    ),
  ];

  toggle.addEventListener('click', onToggle);
  document.addEventListener('keydown', onKeydown);
  submenuLinks.forEach((l) => l.addEventListener('click', onSubmenuClick));
  navigatingLinks.forEach((l) => l.addEventListener('click', onNavigate));
  mq.addEventListener('change', onMqChange);

  return () => {
    toggle.removeEventListener('click', onToggle);
    document.removeEventListener('keydown', onKeydown);
    submenuLinks.forEach((l) => l.removeEventListener('click', onSubmenuClick));
    navigatingLinks.forEach((l) => l.removeEventListener('click', onNavigate));
    mq.removeEventListener('change', onMqChange);
    setOpen(false);
  };
}

/* Where the hero photo ends on mobile.
   The stacked layout puts the form under the copy and the owner photo, so the
   cut line depends on how that copy wraps -- CSS can't see it from an
   absolutely positioned backdrop. Publish it as `--hero-cut` on .hero; the
   mobile query is the only thing that reads it. */
function mountHeroCut() {
  const hero = document.querySelector('.hero');
  const card = document.querySelector('.card');
  if (!hero || !card) return;

  const update = () => {
    const overlap = parseFloat(getComputedStyle(hero).getPropertyValue('--hero-overlap')) || 0;
    const cut = card.getBoundingClientRect().top - hero.getBoundingClientRect().top + overlap;
    hero.style.setProperty('--hero-cut', Math.round(cut) + 'px');
  };

  update();
  // the webfonts land after first paint and reflow the headline under the card
  if (document.fonts) document.fonts.ready.then(update);
  // the hero's own height barely moves when the copy rewraps, so watch the
  // card as well -- it is the element whose position we are actually tracking
  const ro = new ResizeObserver(update);
  ro.observe(hero);
  ro.observe(card);
  window.addEventListener('resize', update);

  return () => {
    ro.disconnect();
    window.removeEventListener('resize', update);
  };
}
