import type { Metadata } from "next";
import { PageFrame } from "@/app/components/SiteChrome";
import { images, siteContent } from "@/app/data/content";

export const metadata: Metadata = {
  title: "Our partners",
  description: "Universities, research institutions, government agencies and water organisations in the AIWC Australia–India network.",
};

const australianPartners = [
  "Australia India Institute", "Deakin University", "Flinders University", "Griffith University",
  "Queensland University of Technology", "The University of Melbourne", "UNSW Global Water Institute",
  "The University of Western Australia", "University of Wollongong", "Western Sydney University",
  "Department for Environment and Water, South Australia",
];

const indianPartners = [
  "University of Agricultural Sciences, Bangalore", "National Institute of Technology Karnataka",
  "Sardar Vallabhbhai National Institute of Technology", "Maharana Pratap University of Agriculture and Technology",
  "National Institute of Hydrology, Roorkee", "Jawaharlal Nehru Technological University, Hyderabad",
  "JSS Science and Technology University, Mysuru", "Indian Institute of Technology Guwahati",
  "Institute of Rural Management Anand", "Indian Institute of Technology Kharagpur",
  "Indian Institute of Technology Roorkee", "Indian Institute of Information Technology Dharwad",
  "Indian Institute of Science, Bangalore", "Banaras Hindu University", "Indian Institute of Technology (BHU) Varanasi",
  "G. B. Pant University of Agriculture and Technology", "Water Resources Department, Maharashtra",
  "Indian Institute of Technology Madras", "Institute of Land and Disaster Management",
];

const logoIds = new Set([
  92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
  337, 339, 340, 341, 342, 344, 345, 346, 347, 361, 362, 1639, 2470, 2480, 2481, 2482,
]);

export default function PartnersPage() {
  const logos = images.filter((image) => logoIds.has(image.id));

  return (
    <PageFrame>
      <section className="partners-hero">
        <div className="content-wrap">
          <p className="eyebrow light">The institutional network</p>
          <h1>A centre without walls.</h1>
          <p className="lede">
            Universities, public agencies, research institutes and water organisations contribute local depth—and a platform for long-term exchange between Australia and India.
          </p>
        </div>
      </section>

      <section className="content-wrap partner-logo-wall" aria-label="AIWC partner logos">
        {logos.map((logo) => (
          <figure key={logo.id}>
            <img src={logo.localSrc} alt={logo.title === "Australia logos" ? `AIWC Australian partner logo ${logo.id}` : logo.title} loading="lazy" />
            <figcaption>{logo.title}</figcaption>
          </figure>
        ))}
      </section>

      <section className="content-wrap partner-country-columns">
        <div>
          <div className="country-head"><span>AU</span><h2>Australia</h2></div>
          <ol>{australianPartners.map((partner, index) => <li key={partner}><span>{String(index + 1).padStart(2, "0")}</span>{partner}</li>)}</ol>
        </div>
        <div>
          <div className="country-head"><span>IN</span><h2>India</h2></div>
          <ol>{indianPartners.map((partner, index) => <li key={partner}><span>{String(index + 1).padStart(2, "0")}</span>{partner}</li>)}</ol>
        </div>
      </section>

      <section className="maps-section">
        <div className="content-wrap">
          <div className="subsection-head"><p className="eyebrow light">Geography of the partnership</p><h2>Find the network.</h2></div>
          <div className="map-grid">
            {siteContent.maps.map((map) => (
              <article key={map.url}><h3>{map.label}</h3><iframe src={map.url} title={map.label} loading="lazy" /><a href={map.url} target="_blank" rel="noreferrer">Open the full map ↗</a></article>
            ))}
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
