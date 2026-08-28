import { Fragment } from 'react';

import { getHomePage } from '@/sanity/queries';

import { SiteBehaviors } from './SiteBehaviors';

/* Published copy is cached at the edge; a change in the Studio shows up on the
   next revalidation. */
export const revalidate = 60;

const SERVICES = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Basement Finishing',
  'Whole-Home Renovation',
  'Custom Additions',
];

const ABOUT = ['Our Story', 'How We Build', 'Meet The Team', 'Careers'];

export default async function HomePage() {
  const hero = await getHomePage();

  return (
    <>
      <section className="hero">
        <div
          className="hero__bg"
          role="img"
          aria-label="Snow-covered mountain neighborhood in Clear Creek County, Colorado"
        />
        <div className="hero__scrim" />

        <header className="header">
          <div className="shell header__inner">
            <a className="brand" href="#" aria-label="Gray Lake Builders — home">
              <img src="/assets/logo.png" alt="Gray Lake Builders" />
            </a>

            <nav className="nav" id="site-nav" aria-label="Primary">
              <NavMenu label="Services" links={SERVICES} />
              <div className="nav__item">
                <a className="nav__link" href="#">
                  Featured Projects
                </a>
              </div>
              <NavMenu label="About Us" links={ABOUT} />
              <div className="nav__item">
                <a className="nav__link" href="#">
                  Contact
                </a>
              </div>

              <a className="btn btn--primary nav__cta" href="#consult">
                <span>{hero.heroPrimaryCtaLabel}</span>
                <Arrow />
              </a>
            </nav>

            <a className="phone" href="tel:+12533004991">
              <svg
                className="phone__icon"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.6a1 1 0 0 1-.25 1z"
                />
              </svg>
              <span>(253) 300-4991</span>
            </a>

            <a className="btn btn--primary header__cta" href="#consult">
              <span>{hero.heroPrimaryCtaLabel}</span>
              <Arrow />
            </a>

            <button
              className="nav-toggle"
              type="button"
              aria-label="Open menu"
              aria-expanded="false"
              aria-controls="site-nav"
            >
              <span className="nav-toggle__bars" aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </header>

        <div className="shell hero__inner">
          <div className="hero__copy">
            <div className="rating">
              <img
                className="rating__g"
                src="/assets/google.svg"
                alt="Google"
                width="25"
                height="25"
              />
              <span className="rating__score">5.0</span>
              <span
                className="rating__stars"
                role="img"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} />
                ))}
              </span>
              <span className="rating__count">(18)</span>
            </div>

            <h1 className="hero__title">
              <Lines text={hero.heroHeading} />
            </h1>

            <p className="hero__lede">{hero.heroSubheading}</p>

            <div className="hero__actions">
              <a className="btn btn--primary" href="#consult">
                <span>{hero.heroPrimaryCtaLabel}</span>
                <Arrow />
              </a>
              <a className="btn btn--light" href="#projects">
                {hero.heroSecondaryCtaLabel}
              </a>
            </div>
          </div>

          <img
            className="hero__owner"
            src="/assets/owner.png"
            alt="Owner of Gray Lake Builders"
          />

          <div className="card" id="consult">
            <h2 className="card__title">
              Schedule A Free Budget <em>&amp;</em> <br />
              Design Consultation
            </h2>
            <p className="card__sub">
              Fill out the required information and we&rsquo;ll reach out in 24
              hours.
            </p>

            <form className="form" noValidate>
              <Field
                id="f-name"
                name="name"
                type="text"
                label="Full Name (Required)"
                placeholder="First and last name"
                required
              />
              <Field
                id="f-email"
                name="email"
                type="email"
                label="Email Address (Required)"
                placeholder="[email protected]"
                required
              />
              <Field
                id="f-phone"
                name="phone"
                type="tel"
                label="Phone Number (Required)"
                placeholder="(555) 123-4567"
                required
              />
              <div className="field">
                <label className="field__label" htmlFor="f-details">
                  Project Details
                </label>
                <textarea
                  className="field__input field__input--area"
                  id="f-details"
                  name="details"
                  placeholder="Briefly describe your remodel"
                />
              </div>
              <button className="form__submit" type="submit">
                Schedule My Free Consultation
              </button>
            </form>
          </div>
        </div>
      </section>

      <SiteBehaviors />
    </>
  );
}

/* A heading line break is authored as a newline in Sanity. Mobile hides the
   <br> in CSS and the text reflows, so the space before each break has to be
   real -- without it the two lines would run together at narrow widths. */
function Lines({ text }) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

function NavMenu({ label, links }) {
  return (
    <div className="nav__item nav__item--menu">
      <a className="nav__link" href="#">
        {label}
        <svg
          className="chev"
          width="11"
          height="7"
          viewBox="0 0 11 7"
          aria-hidden="true"
        >
          <path
            d="M1 1.25 5.5 5.5 10 1.25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <div className="nav__menu">
        <ul className="nav__menu-list">
          {links.map((link) => (
            <li key={link}>
              <a className="nav__menu-link" href="#">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Field({ id, name, type, label, placeholder, required }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      <input
        className="field__input"
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function Arrow() {
  return (
    <svg
      className="arrow"
      width="22"
      height="9"
      viewBox="0 0 22 9"
      aria-hidden="true"
    >
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

function Star() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="m12 17.27 5.18 3.13a.6.6 0 0 0 .9-.65l-1.37-5.89 4.57-3.96a.6.6 0 0 0-.34-1.05l-6.02-.51-2.36-5.56a.6.6 0 0 0-1.11 0L9.09 8.34l-6.02.51a.6.6 0 0 0-.34 1.05l4.57 3.96-1.37 5.89a.6.6 0 0 0 .9.65z"
      />
    </svg>
  );
}
