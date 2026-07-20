import { primaryNavigation } from "@/app/data/content";

export function SiteNavigation() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <aside className="science-sidebar" aria-label="Primary navigation">
        <a className="science-brand" href="/" aria-label="Australia India Water Centre home">
          <img src="/media/994-AIWC-Favicon.png" alt="" />
          <span><strong>AIWC</strong><small>Australia India<br />Water Centre</small></span>
        </a>

        <div className="bilateral-mark" aria-label="Australia and India bilateral partnership">
          <span>AU</span><i aria-hidden="true" /><span>IN</span>
        </div>

        <p className="science-nav-label">Centre navigation</p>
        <nav className="science-navigation">
          {primaryNavigation.map((item) => (
            <a href={item.href} key={item.href}>
              <span>{item.number}</span><strong>{item.label}</strong><i aria-hidden="true">→</i>
            </a>
          ))}
        </nav>

        <div className="science-sidebar-footer">
          <p>Bilateral research, education and professional exchange.</p>
          <a href="mailto:aiwc@westernsydney.edu.au">aiwc@westernsydney.edu.au</a>
        </div>
      </aside>

      <header className="science-mobile-bar">
        <a className="science-mobile-brand" href="/">
          <img src="/media/994-AIWC-Favicon.png" alt="" />
          <span><strong>AIWC</strong><small>Australia India Water Centre</small></span>
        </a>
        <details>
          <summary>Menu</summary>
          <nav aria-label="Mobile navigation">
            {primaryNavigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer science-footer">
      <div className="site-shell footer-grid">
        <div className="footer-intro">
          <a className="footer-science-brand" href="/">
            <img src="/media/994-AIWC-Favicon.png" alt="" />
            <span><strong>AIWC</strong><small>Australia India Water Centre</small></span>
          </a>
          <p>Connecting research, education, training and communities across Australia and India for sustainable water futures.</p>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Centre</p>
          <a href="/about">About</a><a href="/our-work">Research and programs</a><a href="/our-people">People</a><a href="/partners">Partners</a>
        </div>
        <div className="footer-column">
          <p className="footer-heading">Evidence</p>
          <a href="/archive">Knowledge archive</a><a href="/media-library">Media library</a><a href="/journal-articles">Journal articles</a><a href="https://www.youtube.com/@australiaindiawatercentre-9628" target="_blank" rel="noreferrer">YouTube ↗</a>
        </div>
        <div className="footer-column footer-contact-column">
          <p className="footer-heading">Contact</p>
          <a href="mailto:aiwc@westernsydney.edu.au">aiwc@westernsydney.edu.au</a><a href="/contact">Australia and India contacts</a>
        </div>
      </div>
      <div className="site-shell footer-bottom"><span>© AIWC 2026</span><span>Australia ↔ India · Water science without borders</span></div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><SiteNavigation /><main id="main-content" className="inner-main">{children}</main><SiteFooter /></>;
}
