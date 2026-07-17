import { primaryNavigation } from "@/app/data/content";

export function SiteNavigation() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <aside className="sidebar" aria-label="Primary navigation">
        <a className="brand brand-image" href="/" aria-label="AIWC home">
          <img src="/media/1055-AIWC_Logo.png" alt="Australia India Water Centre" />
          <span className="brand-note">Australia ↔ India</span>
        </a>

        <p className="nav-label">Explore the centre</p>
        <nav className="side-nav">
          {primaryNavigation.map((item) => (
            <a className="nav-item" href={item.href} key={item.href}>
              <span className="nav-number">{item.number}</span>
              <span>{item.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>

        <div className="sidebar-foot">
          <p>A joint platform for sustainable water futures.</p>
          <a href="mailto:aiwc@westernsydney.edu.au">aiwc@westernsydney.edu.au</a>
        </div>
      </aside>

      <header className="mobile-bar">
        <a className="mobile-brand" href="/">
          AIWC <span>Australia ↔ India</span>
        </a>
        <details>
          <summary>Menu</summary>
          <nav>
            {primaryNavigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer content-wrap">
      <a className="footer-brand" href="/">AIWC</a>
      <p>
        A joint initiative of institutions, government agencies and water businesses from Australia and India.
      </p>
      <div>
        <a href="https://www.youtube.com/@australiaindiawatercentre-9628" target="_blank" rel="noreferrer">
          YouTube ↗
        </a>
        <a href="/media-library">Media archive</a>
        <span>© AIWC 2026</span>
      </div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavigation />
      <main id="main-content" className="inner-main">
        {children}
        <section className="inner-footer-band">
          <SiteFooter />
        </section>
      </main>
    </>
  );
}
