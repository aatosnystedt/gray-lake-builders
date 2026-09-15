import { Fragment } from 'react';

import { DEFAULT_FORM } from '@/content/defaults';
import { getHomePage } from '@/sanity/queries';

import { ArrowIcon, ChevronIcon, PhoneIcon, StarIcon } from './icons';
import { SiteBehaviors } from './SiteBehaviors';
import { theme } from './theme';

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
  const { images } = theme;
  const form = DEFAULT_FORM;

  return (
    <>
      <section className="hero">
        <div className="hero__bg" role="img" aria-label={images.hero.alt} />
        <div className="hero__scrim" />

        <header className="header">
          <div className="shell header__inner">
            <a className="brand" href="#" aria-label="Gray Lake Builders — home">
              <img src={images.logo.src} alt={images.logo.alt} />
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
                <ArrowIcon />
              </a>
            </nav>

            <a className="phone" href="tel:+12533004991">
              <PhoneIcon />
              <span>(253) 300-4991</span>
            </a>

            <a className="btn btn--primary header__cta" href="#consult">
              <span>{hero.heroPrimaryCtaLabel}</span>
              <ArrowIcon />
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
                src={images.ratingIcon.src}
                alt={images.ratingIcon.alt}
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
                  <StarIcon key={i} />
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
                <ArrowIcon />
              </a>
              <a className="btn btn--light" href="#projects">
                {hero.heroSecondaryCtaLabel}
              </a>
            </div>
          </div>

          <img
            className="hero__owner"
            src={images.owner.src}
            alt={images.owner.alt}
          />

          <div className="card" id="consult">
            <h2 className="card__title">
              <Lines text={form.heading} render={withItalicAmpersand} />
            </h2>
            <p className="card__sub">{form.subheading}</p>

            <form className="form" noValidate>
              {form.fields.map((field) => (
                <Field key={field.id} {...field} />
              ))}
              <button className="form__submit" type="submit">
                {form.submit}
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
function Lines({ text, render = (line) => line }) {
  const lines = text.split('\n');
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && ' '}
      {i > 0 && <br />}
      {render(line)}
    </Fragment>
  ));
}

/* The form heading sets its ampersand in Fraunces italic. */
function withItalicAmpersand(line) {
  const parts = line.split('&');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <em>&amp;</em>}
      {part}
    </Fragment>
  ));
}

function NavMenu({ label, links }) {
  return (
    <div className="nav__item nav__item--menu">
      <a className="nav__link" href="#">
        {label}
        <ChevronIcon />
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
  const shared = { id, name, placeholder, required };
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea className="field__input field__input--area" {...shared} />
      ) : (
        <input className="field__input" type={type} {...shared} />
      )}
    </div>
  );
}
