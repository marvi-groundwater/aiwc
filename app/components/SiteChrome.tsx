import { primaryNavigation } from "@/app/data/content";

export function SiteNavigation() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>

      <aside className="flow-sidebar" aria-label="Primary navigation">
        <div className="flow-current" aria-hidden="true">
          <i /><i /><i /><i />
        </div>

        <a className="flow-brand" href="/" aria-label="Australia India Water Centre home">
          <img src="/media/994-AIWC-Favicon.png" alt="" />
          <span><strong>AIWC</strong><small>Australia India Water Centre</small></span>
        </a>

        <div className="flow-bilateral" aria-label="Australia and India partnership">
          <span>AU</span><b aria-hidden="true" /><span>IN</span>
        </div>

        <nav className="flow-navigation">
          {primaryNavigation.map((item) => (
            <a href={item.href} key={item.href} aria-label={item.label}>
              <span>{item.number}</span>
              <strong>{item.label}</strong>
              <i aria-hidden="true">↗</i>
            </a>
          ))}
        </nav>

        <div className="flow-sidebar-foot">
          <p>Water science without borders.</p>
          <a href="mailto:aiwc@westernsydney.edu.au">aiwc@westernsydney.edu.au</a>
        </div>
      </aside>

      <header className="flow-mobile-bar">
        <a className="flow-mobile-brand" href="/">
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
    <footer className="site-footer flow-footer">
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
