import type { Metadata } from "next";
import { SiteNavigation } from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "AIWC — A partnership for sustainable water futures",
  description:
    "The Australia India Water Centre connects research, education, training and communities across two nations to shape sustainable water futures.",
};

const focusAreas = [
  {
    number: "01",
    title: "Research",
    copy: "Joint, transdisciplinary inquiry across groundwater, rivers, catchments, water quality, climate resilience and digital water tools.",
  },
  {
    number: "02",
    title: "Education",
    copy: "Connected postgraduate learning that brings policy, governance, agriculture, catchments and systems thinking into one curriculum.",
  },
  {
    number: "03",
    title: "Training",
    copy: "Practical capacity building for young water professionals, government agencies, dam safety leaders and community water stewards.",
  },
  {
    number: "04",
    title: "Outreach",
    copy: "WaterWise, Water Talks, technical exchanges and community dialogue that turn specialist knowledge into shared action.",
  },
];

const researchProjects = [
  "Agricultural and food sustainability through transdisciplinary groundwater management",
  "Spring recharge and rejuvenation in the Kumaun Lesser Himalaya",
  "Coastal reservoirs as a strategy for water security",
  "Integrated urban water management",
  "Managed aquifer recharge through village-level intervention",
];

const programs = [
  {
    index: "P.01",
    title: "MARVI",
    kicker: "Groundwater / citizen science",
    copy: "Bhujal Jaankaars—local groundwater-informed volunteers—measure water levels, rainfall and quality, then translate the evidence into decisions communities can use. The MyWell app makes this shared resource visible.",
    detail:
      "Developed in Rajasthan and Gujarat, the approach has helped communities understand aquifers, maintain recharge structures, plan seasonal crops and move from individual extraction toward collective management.",
    image: "/media/2335-MARVI-3.jpg",
    href: "/managing-groundwater-use-and-sustaining-aquifer-recharge-through-village-level-interventions-marvi",
  },
  {
    index: "P.02",
    title: "Young Water Professionals",
    kicker: "Leadership / capacity",
    copy: "A transdisciplinary program for early-career water leaders, combining technical knowledge with critical thinking, communication, policy, social insight and mentorship.",
    detail:
      "Forty professionals have completed the program. Its Situation Understanding and Improvement Project turns learning into client-focused recommendations for real water challenges.",
    image: "/media/2340-YWP-1.jpg",
    href: "/the-young-water-professionals-program-ywp",
  },
  {
    index: "P.03",
    title: "Dam safety & DRIP II",
    kicker: "Infrastructure / knowledge exchange",
    copy: "Australian and Indian dam specialists exchange practice in risk assessment, structural health, emergency preparedness, regulation, stakeholder engagement and inclusive management.",
    detail:
      "Workshops and field visits—from Warragamba and Snowy Hydro to Bhatsa Dam—have supported a long-term WSU–IIT Roorkee partnership and a stronger professional network.",
    image: "/media/2344-DRIP-1.jpg",
    href: "/dam-rehabilitation-improvement-project-drip-ii",
  },
  {
    index: "P.04",
    title: "Village Groundwater Cooperatives",
    kicker: "Governance / shared resource",
    copy: "Farmer-led cooperatives use local groundwater and rainfall evidence to plan cropping, organise recharge, resolve water-sharing questions and connect villages with researchers and government.",
    detail:
      "The inclusive, democratic and data-led model emerged from MARVI and is being explored as a scalable way to govern groundwater as a common resource.",
    image: "/media/2354-VGC-1.jpg",
    href: "/village-groundwater-cooperatives-vgcs",
  },
];

const australianPeople = [
  "Alex Gardner",
  "Ajit Godbole",
  "Andrew Western",
  "Anik Bhaduri",
  "Arumugam Sathasivan",
  "Ashantha Goonetilleke",
  "Ashish Sharma",
  "Olayide Ogunsiji",
  "Ataur Rahman",
  "Ayomi Jayarathne",
  "Basant Maheshwari",
  "Brajesh Singh",
  "Buddhi Wijesiri",
  "Chris Derry",
  "David Tissue",
  "Dharma Hagare",
  "Anthony Stickland",
  "Asha Chand",
  "Vanita Yadav",
  "Karen Barker",
  "Godwin Ayoko",
  "Greg Leslie",
  "Howard Fallowfield",
  "Ian A. Wright",
  "Jason Reynolds",
  "Jay Bose",
  "Jeff Camkin",
  "John Ward",
  "Kadambot H. M. Siddique",
  "Kanagaratnam Baskaran",
  "Lloyd Chua",
  "Louise Barton",
  "Marc Miska",
  "Margaret Shanafield",
  "Maria Varua",
  "Meenakshi Arora",
  "Michelle Ryan",
  "Muttucumaru Sivakumar",
  "Okke Batelaan",
  "Prasanna Egodawatta",
  "Ricky-John Spencer",
  "Sally Thompson",
  "Samsul Huda",
  "Shu-Qing Yang",
  "Surendra Shrestha",
  "Susana Neto",
  "Tanya King",
  "Wendy Timms",
  "Wenyan Wu",
];

const indianPeople = [
  "Anamika Barua",
  "Ananthakumar M. A.",
  "Archana M. Nair",
  "Archana Sarkar",
  "Arindam Dey",
  "Arup Kumar Sarma",
  "Damodhara Rao Mailapalli",
  "Pankaj Kumar",
  "Sadashiva Murthy B. M.",
  "Smita Jauhari",
  "Alaknanda Ashok",
  "Alok Kumar",
  "B. Manoj Kumar",
  "Hanumanthappa D. C.",
  "Hema B. P.",
  "Lakshminarayana Rao",
  "Mahanand B. S.",
  "Mudalagiriyappa",
  "N. Haraprasad",
  "P. K. Singh",
  "Prabhat Kumar Singh",
  "Pushpa Tuppad",
  "Rajeev Kumar Srivastava",
  "Ramesh Honnasiddaiah",
  "S. Raviraj",
  "Siddaramaiah",
  "Sudip Mitra",
  "Sumit Sen",
  "V. Ramesh",
  "Vijaya Lakshmi Thatiparthi",
  "H. J. Shiva Prasad",
  "Hippu Salk Kristle Nathan",
  "Indranil De",
  "Jaivir Tyagi",
  "Jay Prakash Verma",
  "Jayantilal N. Patel",
  "Jyothi Prasad",
  "Kushal Anjaria",
  "Ligy Philip",
  "Mallickarjun Joshi",
  "Mihir Kumar Purkait",
  "Narendra Kumar Goel",
  "Prasit G. Agnihotri",
  "M. L. Sharma",
  "T. G. Sitharam",
  "Deveshkumar C. Jinwala",
  "Rajendra Singh",
  "Rajib Kumar Bhattacharjya",
  "Ravi Saxena",
  "Renji Remesan",
  "Rishikesh Bharti",
  "Sanjay Kumar Ghosh",
  "Sharad Kumar Jain",
  "Shive Prakash Rai",
  "Somsubhra Chakraborty",
  "Sreevalsa Kolathayar",
  "Thimmegowda M. N.",
  "Vivek L. Manekar",
];

const australianPartners = [
  "Australia India Institute",
  "Deakin University",
  "Flinders University",
  "Griffith University",
  "Queensland University of Technology",
  "The University of Melbourne",
  "UNSW Global Water Institute",
  "The University of Western Australia",
  "University of Wollongong",
  "Western Sydney University",
  "Department for Environment and Water, South Australia",
];

const indianPartners = [
  "University of Agricultural Sciences, Bangalore",
  "National Institute of Technology Karnataka",
  "Sardar Vallabhbhai National Institute of Technology",
  "Maharana Pratap University of Agriculture and Technology",
  "National Institute of Hydrology, Roorkee",
  "Jawaharlal Nehru Technological University, Hyderabad",
  "JSS Science and Technology University, Mysuru",
  "Indian Institute of Technology Guwahati",
  "Institute of Rural Management Anand",
  "Indian Institute of Technology Kharagpur",
  "Indian Institute of Technology Roorkee",
  "Indian Institute of Information Technology Dharwad",
  "Indian Institute of Science, Bangalore",
  "Banaras Hindu University",
  "Indian Institute of Technology (BHU) Varanasi",
  "G. B. Pant University of Agriculture and Technology",
  "Water Resources Department, Maharashtra",
  "Indian Institute of Technology Madras",
  "Institute of Land and Disaster Management",
];

const publications = [
  {
    year: "2023",
    title: "Geospatial data and web-based tools for managing irrigation infrastructure expansion projects",
    meta: "World Water Policy",
    href: "https://doi.org/10.1002/wwp2.12130",
  },
  {
    year: "2023",
    title: "Mentoring in the Young Water Professionals program: lessons for effective capacity development",
    meta: "World Water Policy 9(3)",
    href: "https://doi.org/10.1002/wwp2.12129",
  },
  {
    year: "2023",
    title: "Training young water professionals in leadership and transdisciplinary competencies",
    meta: "World Water Policy 9(3)",
    href: "https://doi.org/10.1002/wwp2.12114",
  },
  {
    year: "2022",
    title: "Integrating sensitivity and uncertainty analysis in a groundwater potential zone model",
    meta: "Journal of Hydrology 610",
    href: "https://doi.org/10.1016/j.jhydrol.2022.127837",
  },
  {
    year: "2021",
    title: "Enhancing non-revenue water reduction by incorporating service benchmarks and best practices",
    meta: "Journal of IWWA 3(4)",
    href: "/journal-articles",
  },
];

const principles = [
  "Equal partnership between Australia and India",
  "Transdisciplinary research, innovation and learning",
  "Shared growth and benefit for every partner",
  "Transparency, trust and a lasting collaborative legacy",
];

function NameList({ names }: { names: string[] }) {
  return (
    <ol className="name-list">
      {names.map((name, index) => (
        <li key={name}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          {name}
        </li>
      ))}
    </ol>
  );
}

function PartnerList({ names }: { names: string[] }) {
  return (
    <ul className="partner-list">
      {names.map((name, index) => (
        <li key={name}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{name}</strong>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <SiteNavigation />

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">A partnership for sustainable water futures</p>
            <h1>
              Two countries.
              <br />
              One water future.
            </h1>
            <p className="lede">
              We connect people, knowledge and action across Australia and India to address the water challenges neither country can solve alone.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore our work <span aria-hidden="true">↓</span>
              </a>
              <a className="button" href="#people">
                Meet the network <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="hero-stage">
            <img
              src="/media/91-Homepage-Hero-Images.webp"
              alt="Water landscapes and collaboration across Australia and India"
            />
            <span className="hero-label">Australia India Water Centre</span>
            <span className="hero-roundel">EST.<br />2020</span>
            <p className="hero-caption">Research · education · training · outreach</p>
          </div>
        </section>

        <section className="statement" aria-label="AIWC at a glance">
          <div className="statement-grid">
            <p className="meta">Our shared premise</p>
            <blockquote>
              Water is not only a technical challenge. It is a shared social, environmental and economic responsibility.
            </blockquote>
          </div>
          <div className="metric-row">
            <div className="metric">
              <strong>2</strong>
              <span>countries, working as equals</span>
            </div>
            <div className="metric">
              <strong>100+</strong>
              <span>researchers and water leaders</span>
            </div>
            <div className="metric">
              <strong>4</strong>
              <span>connected areas of action</span>
            </div>
          </div>
        </section>

        <section className="page-section" id="about">
          <div className="section-head content-wrap">
            <span className="section-index">02 / About</span>
            <div>
              <p className="eyebrow">Why the centre exists</p>
              <h2>Different landscapes. Shared pressures.</h2>
              <p className="lede">
                Floods and droughts, climate change, rapid urbanisation, pressure on farms, competition for water and declining water quality connect the experiences of both nations.
              </p>
            </div>
          </div>

          <div className="section-body content-wrap split">
            <div>
              <p className="pull-quote">
                AIWC is a long-term platform for researchers, policy-makers, industry, communities and non-government organisations to learn with—and from—one another.
              </p>
            </div>
            <div className="prose">
              <p>
                Australia and India rely on fresh water for food production, livelihoods, human wellbeing and economic development. Their contexts differ, but the underlying questions are increasingly connected: how should water be shared, protected, monitored and governed in a changing climate?
              </p>
              <p>
                The Centre was established by universities, research institutions, government agencies and water businesses to turn that common ground into practical cooperation across research, education, training and outreach.
              </p>
              <h3>Our vision</h3>
              <p>
                To act as a catalyst: breaking down silos, thinking differently and facilitating sustainable water futures through bilateral partnership and transdisciplinary practice.
              </p>
            </div>
          </div>

          <div className="principles content-wrap">
            {principles.map((principle, index) => (
              <article key={principle}>
                <span>0{index + 1}</span>
                <p>{principle}</p>
              </article>
            ))}
          </div>

          <div className="conference-band">
            <div className="conference-image">
              <img
                src="/media/2495-AIWC-5Conference_1.jpg"
                alt="Delegates at the AIWC five-year conference"
              />
            </div>
            <div className="conference-copy">
              <p className="eyebrow light">AIWC @ 5 · November 2025</p>
              <h3>Five years of collaboration. The next five shaped together.</h3>
              <p>
                Around 80 delegates gathered at Western Sydney University to review the Centre’s impact and shape an AIWC 2030 agenda across research, education, policy, communications and long-term sustainability.
              </p>
              <ul>
                <li>Climate-resilient agriculture and groundwater security</li>
                <li>PFAS, water quality and digital monitoring tools</li>
                <li>Joint degrees, micro-credentials and expanded YWP training</li>
                <li>Deeper government, industry and regional partnerships</li>
              </ul>
              <a className="text-link light" href="/aiwc5-conference">
                Read the conference story <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="page-section" id="work">
          <div className="section-head content-wrap">
            <span className="section-index">03 / Our work</span>
            <div>
              <p className="eyebrow">From knowledge to action</p>
              <h2>Four ways we work.</h2>
              <p className="lede">
                Each program is distinct. The value comes from connecting them—so research informs teaching, training changes practice, and communities shape the questions.
              </p>
            </div>
          </div>

          <div className="focus-grid content-wrap">
            {focusAreas.map((area) => (
              <article className="focus-card" key={area.title}>
                <span>{area.number}</span>
                <h3>{area.title}</h3>
                <p>{area.copy}</p>
              </article>
            ))}
          </div>

          <div className="research-strip">
            <div className="content-wrap research-layout">
              <div>
                <p className="eyebrow light">Research portfolio</p>
                <h3>Water systems, seen whole.</h3>
              </div>
              <ol>
                {researchProjects.map((project, index) => (
                  <li key={project}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {project}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="content-wrap program-list">
            <div className="program-intro">
              <p className="eyebrow">Programs in focus</p>
              <h3>Long-term work, grounded in place.</h3>
            </div>
            {programs.map((program, index) => (
              <article className={`program ${index % 2 ? "reverse" : ""}`} key={program.title}>
                <div className="program-image">
                  <img src={program.image} alt="" />
                  <span>{program.index}</span>
                </div>
                <div className="program-copy">
                  <p className="eyebrow">{program.kicker}</p>
                  <h3>{program.title}</h3>
                  <p className="program-lede">{program.copy}</p>
                  <p>{program.detail}</p>
                  <a className="text-link" href={program.href}>
                    Explore the original project record <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section education-section" id="education">
          <div className="section-head content-wrap">
            <span className="section-index">04 / Education</span>
            <div>
              <p className="eyebrow">Sustainable Water Futures</p>
              <h2>Learning beyond disciplines.</h2>
              <p className="lede">
                A postgraduate pathway for people who need to understand water as a technical system, a policy challenge and a lived human experience.
              </p>
            </div>
          </div>

          <div className="content-wrap education-grid">
            <div className="degree-card">
              <p className="meta">Master’s specialisation</p>
              <h3>Sustainable Water Futures</h3>
              <p>
                Theory, practical skills, reflection and research-based projects equip graduates to develop innovative responses to complex water challenges.
              </p>
              <a className="button" href="/masters-program-in-sustainable-water-futures">
                Program overview <span aria-hidden="true">↗</span>
              </a>
            </div>
            <ol className="theme-list">
              <li>
                <span>01</span>
                <div><strong>Transdisciplinary sustainability</strong><p>Culture, society, leadership, reflexivity and systems thinking.</p></div>
              </li>
              <li>
                <span>02</span>
                <div><strong>Planning, policy & governance</strong><p>Ecology, economics, hydro-diplomacy and public participation.</p></div>
              </li>
              <li>
                <span>03</span>
                <div><strong>Water in agriculture</strong><p>Allocation, irrigation, harvesting and digital efficiency.</p></div>
              </li>
              <li>
                <span>04</span>
                <div><strong>Catchment sustainability</strong><p>Natural, urban and peri-urban systems at catchment scale.</p></div>
              </li>
            </ol>
          </div>

          <div className="exchange-note content-wrap">
            <p className="eyebrow">Technical exchange series</p>
            <h3>Four workshops. One continuing conversation.</h3>
            <div>
              <p>Groundwater sustainability</p>
              <p>Soil and water for food security</p>
              <p>Wastewater reuse</p>
              <p>Water informatics</p>
            </div>
            <small>
              Delivered with the Australia India Institute through the bilateral Joint Working Group on water.
            </small>
          </div>
        </section>

        <section className="page-section people-section" id="people">
          <div className="section-head content-wrap">
            <span className="section-index">05 / People</span>
            <div>
              <p className="eyebrow">A bilateral network</p>
              <h2>Expertise travels both ways.</h2>
              <p className="lede">
                Researchers, practitioners and institutional leaders across two countries make the Centre a working network—not simply a list of members.
              </p>
            </div>
          </div>

          <div className="leaders content-wrap">
            <article>
              <span>AU</span>
              <h3>Basant Maheshwari</h3>
              <p>Director · Western Sydney University</p>
            </article>
            <article>
              <span>IN</span>
              <h3>Parmeswar Iyer</h3>
              <p>Co-Director · IIT Guwahati</p>
            </article>
            <article>
              <span>AU</span>
              <h3>Dharma Hagare</h3>
              <p>Country Co-ordinator · Australia</p>
            </article>
            <article>
              <span>IN</span>
              <h3>Subashisa Datta</h3>
              <p>Country Co-ordinator · India</p>
            </article>
          </div>

          <div className="directory content-wrap">
            <details open>
              <summary>
                <span>Australia</span>
                <small>{australianPeople.length} members</small>
              </summary>
              <NameList names={australianPeople} />
            </details>
            <details>
              <summary>
                <span>India</span>
                <small>{indianPeople.length} members</small>
              </summary>
              <NameList names={indianPeople} />
            </details>
          </div>
        </section>

        <section className="page-section partners-section" id="partners">
          <div className="section-head content-wrap">
            <span className="section-index">06 / Partners</span>
            <div>
              <p className="eyebrow">The institutional network</p>
              <h2>A centre without walls.</h2>
              <p className="lede">
                Universities, public agencies, institutes and water organisations contribute local depth and a platform for long-term exchange.
              </p>
            </div>
          </div>

          <div className="partner-columns content-wrap">
            <div>
              <div className="country-head"><span>AU</span><h3>Australia</h3></div>
              <PartnerList names={australianPartners} />
            </div>
            <div>
              <div className="country-head"><span>IN</span><h3>India</h3></div>
              <PartnerList names={indianPartners} />
            </div>
          </div>
        </section>

        <section className="page-section knowledge-section" id="knowledge">
          <div className="section-head content-wrap">
            <span className="section-index">07 / Knowledge</span>
            <div>
              <p className="eyebrow">WaterWise · publications · talks</p>
              <h2>Knowledge is useful when it moves.</h2>
              <p className="lede">
                The Centre’s library connects formal research with webinars, field experience, community perspectives and practical tools.
              </p>
            </div>
          </div>

          <div className="waterwise content-wrap">
            <div className="waterwise-title">
              <p className="eyebrow light">WaterWise</p>
              <h3>A dialogue for sustainable water futures.</h3>
              <p>
                Created on World Environment Day 2021, WaterWise is designed as a participatory dialogue—not a one-way transfer of facts. It makes space for forms of knowledge and experience often missing from water debates.
              </p>
            </div>
            <div className="story-stack">
              <a href="/rejuvenation-of-the-springs-in-the-himalayan-region-evaluation-of-options-and-strategies-mr-neeraj-pant-phd-candidate">
                <span>Field research</span>
                <strong>Rejuvenating springs in the Himalayan region</strong>
                <i>↗</i>
              </a>
              <a href="/dams-safety-and-rehabilitation">
                <span>Infrastructure</span>
                <strong>Dam safety and rehabilitation</strong>
                <i>↗</i>
              </a>
              <a href="/webinar-series-water-talks-2025">
                <span>Webinar series</span>
                <strong>Water Talks: policy, rivers, reuse and agriculture</strong>
                <i>↗</i>
              </a>
            </div>
          </div>

          <div className="library content-wrap">
            <div className="library-head">
              <div>
                <p className="eyebrow">Selected publications</p>
                <h3>Research across the water system.</h3>
              </div>
              <a className="text-link" href="/journal-articles">
                Full journal archive <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="publication-list">
              {publications.map((publication) => (
                <a href={publication.href} key={publication.title}>
                  <span>{publication.year}</span>
                  <strong>{publication.title}</strong>
                  <small>{publication.meta}</small>
                  <i>↗</i>
                </a>
              ))}
            </div>
          </div>

          <div className="resource-grid content-wrap">
            <article>
              <span>01</span>
              <h3>Journal articles</h3>
              <p>Groundwater, urban runoff, membranes, catchments, climate sensitivity, water quality and leadership.</p>
              <a href="/journal-articles">Browse articles ↗</a>
            </article>
            <article>
              <span>02</span>
              <h3>Conference papers</h3>
              <p>Flood risk, drought, non-revenue water, hydrologic modelling and sustainable infrastructure.</p>
              <a href="/conference-papers">Browse papers ↗</a>
            </article>
            <article>
              <span>03</span>
              <h3>Books & chapters</h3>
              <p>Long-form scholarship, including landscape segmentation and agroecosystem simulation.</p>
              <a href="/books-chapters">Browse books ↗</a>
            </article>
            <article>
              <span>04</span>
              <h3>Practical resources</h3>
              <p>Dam safety seminars, operating practice, flood risk, GEDSI and public communication.</p>
              <a href="/resources">Browse resources ↗</a>
            </article>
          </div>

          <details className="content-map content-wrap">
            <summary>
              <span>Original content map</span>
              <small>All public sections consolidated here</small>
            </summary>
            <div>
              <p>
                Home · About · Our work · Research · Education · Training & capacity building · Outreach · AIWC@5 · News · WaterWise Blog · Journal articles · Conference papers · Books & chapters · Resources · Australian people · Indian people · Australian partners · Indian partners · Contact
              </p>
              <p>
                Program records represented include MARVI, Young Water Professionals, DRIP II, Dam Safety and Risk Management, Village Groundwater Cooperatives, Sustainable Water Futures, the Australia–India Technical Exchange, Water Talks, Hydro-diplomacy and the webinar archive.
              </p>
            </div>
          </details>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-top content-wrap">
            <span className="section-index">08 / Contact</span>
            <div>
              <p className="eyebrow light">Start a conversation</p>
              <h2>Water connects us.<br />Let’s work together.</h2>
              <a className="button inverse" href="mailto:aiwc@westernsydney.edu.au">
                Contact the Centre <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="contacts content-wrap">
            <article>
              <span>Australia</span>
              <h3>Basant Maheshwari</h3>
              <p>Director · Western Sydney University<br />Locked Bag 1797, Penrith NSW 2751</p>
              <a href="mailto:b.maheshwari@westernsydney.edu.au">b.maheshwari@westernsydney.edu.au</a>
              <hr />
              <h3>Dharma Hagare</h3>
              <p>Country Co-ordinator · Australia</p>
              <a href="mailto:D.Hagare@westernsydney.edu.au">D.Hagare@westernsydney.edu.au</a>
            </article>
            <article>
              <span>India</span>
              <h3>Parmeswar Iyer</h3>
              <p>Co-Director · Indian Institute of Technology Guwahati</p>
              <a href="mailto:director@iitg.ac.in">director@iitg.ac.in</a>
              <hr />
              <h3>Subashisa Datta</h3>
              <p>Country Co-ordinator · India</p>
              <a href="mailto:subashisa@iitg.ac.in">subashisa@iitg.ac.in</a>
            </article>
            <article>
              <span>Centre</span>
              <h3>AIWC Centre Manager</h3>
              <p>Western Sydney University</p>
              <a href="mailto:aiwc@westernsydney.edu.au">aiwc@westernsydney.edu.au</a>
              <hr />
              <h3>Suresh Kartha</h3>
              <p>Centre for Sustainable Water Research</p>
              <a href="mailto:hocswr@iitg.ac.in">hocswr@iitg.ac.in</a>
            </article>
          </div>

          <footer className="content-wrap">
            <a className="footer-brand" href="#home">AIWC</a>
            <p>A joint initiative of institutions, government agencies and water businesses from Australia and India.</p>
            <div>
              <a href="https://www.youtube.com/@australiaindiawatercentre-9628">YouTube ↗</a>
              <span>© AIWC 2026</span>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
