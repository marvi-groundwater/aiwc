import type { Metadata } from "next";
import { SiteFooter, SiteNavigation } from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "AIWC — A partnership for sustainable water futures",
  description:
    "The Australia India Water Centre connects research, education, training and communities across two nations to shape sustainable water futures.",
};

const focusAreas = [
  {
    number: "01",
    title: "Research",
    copy: "Joint inquiry across groundwater, rivers, catchments, water quality, climate resilience and digital water tools.",
    href: "/research",
  },
  {
    number: "02",
    title: "Education",
    copy: "Connected learning that brings policy, governance, agriculture, catchments and systems thinking into one curriculum.",
    href: "/education",
  },
  {
    number: "03",
    title: "Training",
    copy: "Practical capacity building for young water professionals, government agencies and community water stewards.",
    href: "/training-capacity-building",
  },
  {
    number: "04",
    title: "Outreach",
    copy: "WaterWise, Water Talks and community dialogue that turn specialist knowledge into shared action.",
    href: "/outreach",
  },
];

const programs = [
  {
    label: "Groundwater · citizen science",
    title: "MARVI",
    copy: "Local volunteers measure water levels, rainfall and quality, then turn shared evidence into decisions communities can use.",
    image: "/media/2335-MARVI-3.jpg",
    href: "/managing-groundwater-use-and-sustaining-aquifer-recharge-through-village-level-interventions-marvi",
  },
  {
    label: "Leadership · capacity",
    title: "Young Water Professionals",
    copy: "An immersive program for early-career water leaders, combining technical knowledge, communication, policy and mentorship.",
    image: "/media/2340-YWP-1.jpg",
    href: "/the-young-water-professionals-program-ywp",
  },
  {
    label: "Infrastructure · exchange",
    title: "Dam safety & DRIP II",
    copy: "Australian and Indian specialists share practice in risk assessment, emergency readiness, regulation and inclusive management.",
    image: "/media/2344-DRIP-1.jpg",
    href: "/dam-rehabilitation-improvement-project-drip-ii",
  },
];

const featuredStories = [
  {
    label: "AIWC @ 5 · November 2025",
    title: "Five years of collaboration. The next five shaped together.",
    image: "/media/2495-AIWC-5Conference_1.jpg",
    href: "/aiwc5-conference",
  },
  {
    label: "Webinar series",
    title: "Water Talks: policy, rivers, reuse and agriculture",
    image: "/media/2417-August-2025-Webinar-JPEG-scaled.jpg",
    href: "/webinar-series-water-talks-2025",
  },
  {
    label: "Postgraduate education",
    title: "Sustainable Water Futures: learning beyond disciplines",
    image: "/media/2290-AIWC-Education-1.jpg",
    href: "/masters-program-in-sustainable-water-futures",
  },
];

export default function Home() {
  return (
    <>
      <SiteNavigation />
      <main id="main-content" className="home-main">
        <section className="home-hero">
          <div className="site-shell home-hero-grid">
            <div className="home-hero-copy">
              <p className="eyebrow">Bilateral water science · Established 2020</p>
              <h1>Two countries.<br />One water future.</h1>
              <p className="home-hero-lede">
                We connect people, knowledge and action across Australia and India to address the water challenges neither country can solve alone.
              </p>
              <div className="home-actions">
                <a className="button primary" href="/our-work">Explore our work <span aria-hidden="true">→</span></a>
                <a className="button quiet" href="/our-people">Meet the network</a>
              </div>
              <div className="research-tags" aria-label="Research focus areas">
                <span>Groundwater systems</span><span>Climate resilience</span><span>Water governance</span><span>Digital monitoring</span>
              </div>
            </div>
            <figure className="home-hero-media">
              <img src="/media/91-Homepage-Hero-Images.webp" alt="Water landscapes and collaboration across Australia and India" />
              <div className="science-plate"><span>Network</span><strong>30</strong><small>partner institutions</small></div>
              <figcaption><span>AIWC field network</span><strong>Research · education · training · outreach</strong></figcaption>
            </figure>
          </div>
        </section>

        <section className="impact-band" aria-label="AIWC at a glance">
          <div className="site-shell impact-grid">
            <p className="impact-statement">A bilateral platform for practical, long-term cooperation on water.</p>
            <div><strong>2</strong><span>countries working as equals</span></div>
            <div><strong>100+</strong><span>researchers and water leaders</span></div>
            <div><strong>30</strong><span>partner institutions</span></div>
          </div>
        </section>

        <section className="confluence-section" aria-labelledby="confluence-title">
          <div className="site-shell confluence-grid">
            <figure className="confluence-visual">
              <img loading="lazy" src="/og.png" alt="A river joining the landscapes of Australia and India" />
              <figcaption>One water future · Two bodies of knowledge</figcaption>
            </figure>
            <div className="confluence-copy">
              <p className="eyebrow">Australia · India · Shared water knowledge</p>
              <h2 id="confluence-title">Two landscapes.<br />A shared current.</h2>
              <p>From dryland catchments to monsoon-fed river systems, the Centre connects different environmental experience through one long-term scientific partnership.</p>
              <div className="country-threads">
                <div><span>AU / Australia</span><strong>Drought · catchments · groundwater · resilience</strong></div>
                <i aria-hidden="true">↔</i>
                <div><span>IN / India</span><strong>Monsoon · rivers · agriculture · communities</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-mission">
          <div className="site-shell mission-grid">
            <div>
              <p className="eyebrow">Why the Centre exists</p>
              <h2>Different landscapes. Shared pressures.</h2>
            </div>
            <div className="mission-copy">
              <p>
                Floods and droughts, climate change, rapid urbanisation, pressure on farms and declining water quality connect the experiences of both nations.
              </p>
              <p>
                AIWC brings researchers, policy-makers, industry and communities together to learn with—and from—one another, turning common ground into practical cooperation.
              </p>
              <a className="text-link" href="/about">About the Centre <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <section className="home-section focus-section">
          <div className="site-shell">
            <div className="home-section-heading">
              <div>
                <p className="eyebrow">How we work</p>
                <h2>Knowledge that moves into action.</h2>
              </div>
              <p>Research informs teaching, training changes practice, and communities help shape the questions.</p>
            </div>
            <div className="home-focus-grid">
              {focusAreas.map((area) => (
                <a className="home-focus-card" href={area.href} key={area.title}>
                  <span>{area.number}</span>
                  <h3>{area.title}</h3>
                  <p>{area.copy}</p>
                  <i aria-hidden="true">→</i>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section programs-section">
          <div className="site-shell">
            <div className="home-section-heading compact-heading">
              <div>
                <p className="eyebrow">Programs in focus</p>
                <h2>Long-term work, grounded in place.</h2>
              </div>
              <a className="text-link" href="/our-work">View all programs <span aria-hidden="true">→</span></a>
            </div>
            <div className="home-program-grid">
              {programs.map((program) => (
                <article className="home-program-card" key={program.title}>
                  <a className="home-program-image" href={program.href}>
                    <img src={program.image} alt="" />
                  </a>
                  <div>
                    <p className="eyebrow">{program.label}</p>
                    <h3><a href={program.href}>{program.title}</a></h3>
                    <p>{program.copy}</p>
                    <a className="card-link" href={program.href}>Explore the program <span aria-hidden="true">→</span></a>
                  </div>
                </article>
              ))}
            </div>
            <p className="programs-more">
              Also explore <a href="/village-groundwater-cooperatives-vgcs">Village Groundwater Cooperatives</a>, a farmer-led model for managing groundwater as a shared resource.
            </p>
          </div>
        </section>

        <section className="network-section">
          <div className="site-shell network-grid">
            <div className="network-copy">
              <p className="eyebrow light">A centre without walls</p>
              <h2>Expertise travels both ways.</h2>
              <p>
                Researchers, practitioners and institutional leaders make AIWC a working network—sharing methods, mentoring emerging leaders and building enduring relationships.
              </p>
              <div className="network-actions">
                <a className="button inverse" href="/our-people">Meet our people</a>
                <a className="network-link" href="/partners">Explore partners →</a>
              </div>
            </div>
            <div className="network-numbers">
              <div><strong>49</strong><span>members across Australia</span></div>
              <div><strong>58</strong><span>members across India</span></div>
              <div><strong>2020</strong><span>the Centre was established</span></div>
            </div>
          </div>
        </section>

        <section className="home-section stories-section">
          <div className="site-shell">
            <div className="home-section-heading compact-heading">
              <div>
                <p className="eyebrow">Latest from the Centre</p>
                <h2>Ideas, events and opportunities.</h2>
              </div>
              <a className="text-link" href="/archive">Browse the archive <span aria-hidden="true">→</span></a>
            </div>
            <div className="story-card-grid">
              {featuredStories.map((story) => (
                <a className="story-card" href={story.href} key={story.title}>
                  <img src={story.image} alt="" />
                  <div>
                    <p className="eyebrow">{story.label}</p>
                    <h3>{story.title}</h3>
                    <span>Read more →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-contact">
          <div className="site-shell contact-callout">
            <div>
              <p className="eyebrow light">Start a conversation</p>
              <h2>Water connects us.<br />Let’s work together.</h2>
            </div>
            <div>
              <p>Interested in research, education, professional exchange or partnership with the Centre?</p>
              <a className="button accent" href="mailto:aiwc@westernsydney.edu.au">Contact AIWC <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
