/* ==========================================================================
   System icons
   --------------------------------------------------------------------------
   These are part of the fixed design, like the tokens: every project uses
   exactly these shapes. Import them — don't redraw them. All of them paint
   with currentColor, so they follow whatever colour their parent sets.
   ========================================================================== */

/* The long arrow inside primary buttons. Nudges right on hover (.arrow). */
export function ArrowIcon() {
  return (
    <svg className="arrow" width="22" height="9" viewBox="0 0 22 9" aria-hidden="true">
      <path
        d="M0 4.5h20M16.3 1 20 4.5l-3.7 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* The handset in front of the phone number. */
export function PhoneIcon() {
  return (
    <svg className="phone__icon" width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z"
      />
    </svg>
  );
}

/* The dropdown chevron beside nav items with a submenu. */
export function ChevronIcon() {
  return (
    <svg className="chev" width="11" height="7" viewBox="0 0 11 7" aria-hidden="true">
      <path
        d="M1 1.25 5.5 5.5 10 1.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* One rating star. */
export function StarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 17.27 5.18 3.13a.6.6 0 0 0 .9-.65l-1.37-5.89 4.57-3.96a.6.6 0 0 0-.34-1.05l-6.02-.51-2.36-5.56a.6.6 0 0 0-1.11 0L9.09 8.34l-6.02.51a.6.6 0 0 0-.34 1.05l4.57 3.96-1.37 5.89a.6.6 0 0 0 .9.65z"
      />
    </svg>
  );
}
