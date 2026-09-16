import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Calendar, ChevronDown, Github, Linkedin, Mail, Menu, ArrowUpRight, X } from 'lucide-react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const queryClient = new QueryClient();

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
];

const services = [
  {
    title: 'Full-Stack Web & App Development',
    description: 'End-to-end product builds, from a focused MVP to a dependable production application.',
  },
  {
    title: 'Backend & API Engineering',
    description: 'REST APIs, microservices, database design, and system architecture that holds up under use.',
  },
  {
    title: 'Cloud & DevOps',
    description: 'AWS deployment, containerization, and CI/CD setup that makes shipping repeatable.',
  },
  {
    title: 'AI & Agentic Systems',
    description: 'LLM integration, RAG pipelines, multi-agent orchestration, and workflow automation agents.',
  },
  {
    title: 'Data & Automation',
    description: 'Data pipelines, scraping, dashboards, and practical automation for work that should not be manual.',
  },
  {
    title: 'Technical Advisory',
    description: 'Architecture reviews and feasibility consulting before expensive decisions get locked in.',
  },
];

const cases = [
  {
    number: '01',
    title: 'Orkestrix',
    subtitle: 'AI-powered screen & workflow builder',
    image: '/images/orkestrix.png',
    problem: 'Building complete frontend and backend screens manually from business requirements is time-consuming and requires significant development effort. The project was built to automate application development from natural-language requirements.',
    approach: 'Built an agentic AI system using LLMs, LangGraph, and multi-agent orchestration. The system interprets natural-language prompts, generates frontend and backend code, creates reusable tools, dynamically selects the appropriate tools, and orchestrates workflows to produce functional application screens.',
    outcome: 'Automated the generation of full-stack application screens from natural-language prompts, reducing repetitive development work and enabling faster prototyping and application development.',
  },
  {
    number: '02',
    title: 'Regulatory RAG pipeline',
    subtitle: 'Compliance reporting',
    image: '/images/compliance.png',
    problem: 'Financial institutions need to verify documents and processes against large volumes of regulatory requirements. Manual compliance checking is slow, difficult to scale, and can lead to missed requirements.',
    approach: 'Built a RAG-based compliance checking system using Python, Transformers, ChromaDB, embeddings, and LLMs. Singapore banking regulations were converted into a searchable knowledge base. Relevant regulatory clauses were retrieved based on the input and provided to the LLM for compliance analysis, reasoning, and report generation.',
    outcome: 'Automated regulatory compliance analysis and generated reports containing compliance scores, identified violations, relevant regulations, and reasoning, with results generated in under 60 seconds.',
  },
  {
    number: '03',
    title: 'Sanskrit–English semantic search',
    subtitle: 'Embedding model fine-tuning',
    image: '/images/sanen.png',
    problem: 'An off-the-shelf multilingual embedding model performed poorly on Sanskrit-English retrieval.',
    approach: 'Fine-tuned a multilingual embedding model end-to-end (an 8-stage pipeline covering preprocessing, transliteration, indexing, and training) on a dedicated retrieval dataset.',
    outcome: 'Recall@10 improved from 15% (zero-shot) to 41.3% after fine-tuning.',
  },
  {
    number: '04',
    title: 'SalesX – AI Lead Generation',
    subtitle: 'Lead generation',
    image: '/images/salesx.png',
    problem: 'Finding potential customers that match a company\'s Ideal Customer Profile (ICP) requires searching across multiple online platforms and manually filtering prospects, making lead generation time-consuming.',
    approach: 'Built an AI-powered lead-generation system that searches and extracts prospect information from sources such as websites, LinkedIn, Instagram, and Facebook, then filters and organizes leads according to predefined ICP criteria.',
    outcome: 'Automated the prospect discovery and filtering process, helping sales teams identify ICP-matched leads faster and reducing the amount of manual research required.',
  },
];

function NotFound() {
  return (
    <section className="not-found">
      <div>
        <div className="eyebrow">Page not found</div>
        <h1>Wrong turn.</h1>
        <Link href="/" className="button" data-testid="link-not-found-home">Back to home <ArrowUpRight size={16} /></Link>
      </div>
    </section>
  );
}

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className="site-header">
      <div className="page-wrap nav-row">
        <Link href="/" className="brand" data-testid="link-brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>infincy</span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${location === item.href ? 'active' : ''}`}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="nav-cta" data-testid="link-nav-start-project">
            Start a project <ArrowUpRight size={15} strokeWidth={2.2} />
          </Link>
        </nav>
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          data-testid="button-mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-wrap">
        <div className="footer-grid">
          <div>
            <Link href="/" className="footer-brand" data-testid="link-footer-brand">infincy</Link>
            <p className="footer-description">
              A small software engineering studio for products that need the whole thing built properly.
            </p>
          </div>
          <div>
            <div className="footer-title">Explore</div>
            {navItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="footer-link" data-testid={`link-footer-${item.label.toLowerCase()}`}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="footer-link" data-testid="link-footer-contact">Start a project</Link>
          </div>
          <div>
            <div className="footer-title">Elsewhere</div>
            <a className="footer-link" href="https://github.com/himanshunagapure" target="_blank" rel="noreferrer" data-testid="link-footer-github">
              <Github size={13} /> GitHub
            </a>
            <a className="footer-link" href="https://www.linkedin.com/in/hnagapure/m" target="_blank" rel="noreferrer" data-testid="link-footer-linkedin">
              <Linkedin size={13} /> LinkedIn
            </a>
            <a className="footer-link" href="mailto:himanshunagapure.official@gmail.com" data-testid="link-footer-email">
              <Mail size={13} /> himanshunagapure.official@gmail.com
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Infincy. Built end to end.</span>
          <span>Independent software engineering studio.</span>
        </div>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);
  return (
    <div className="site-shell">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function PageBottomCta() {
  return (
    <section className="closing">
      <div className="page-wrap closing-inner">
        <div>
          <div className="eyebrow">Next, if it feels right</div>
          <h2>Have a project<br />in mind?</h2>
        </div>
        <div>
          <p className="closing-copy">Bring the rough idea, the half-working prototype, or the system that needs a second pair of eyes.</p>
          <Link href="/contact" className="button button-dark" data-testid="link-closing-start-project">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="page-wrap hero-grid">
          <div className="reveal">
            <div className="eyebrow">Independent software engineering studio</div>
            <h1>We build the backend, the full product, and the <em>AI layer</em> - when you need it.</h1>
            <p className="hero-copy">Infincy is a software engineering studio. Full-stack apps, backend systems, cloud infrastructure, and production-grade AI features - built end to end.</p>
            <Link href="/contact" className="button" data-testid="link-hero-start-project">
              Start a project <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="reveal reveal-delay">
            <div className="hero-aside">
              <p>One founder. Full-stack delivery. No hand-offs between the idea and the implementation.</p>
              <div className="aside-meta"><span>01 / 04</span><span>India · Remote</span></div>
            </div>
            <div className="hero-note">
              <div className="hero-note-label">Built for the part after the demo.</div>
              <p>When a promising prototype needs architecture, interfaces, deployment, and a way to survive real users.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="page-wrap">
        <div className="proof-strip">
          <div className="proof-item" data-testid="text-proof-compliance"><div className="proof-number">&lt;60s</div><div className="proof-label">Compliance reports generated in under 60 seconds</div></div>
          <div className="proof-item" data-testid="text-proof-recall"><div className="proof-number">15 → 41.3%</div><div className="proof-label">Recall improved after fine-tuning</div></div>
          <div className="proof-item" data-testid="text-proof-founder"><div className="proof-number">01</div><div className="proof-label">Founder, full-stack delivery</div></div>
        </div>
      </div>
      <section className="section">
        <div className="page-wrap">
          <div className="section-heading">
            <div><div className="eyebrow">What we do</div><h2>The hard parts,<br />made buildable.</h2></div>
            <div><p className="section-intro">A focused set of engineering capabilities for teams that need to move from a good idea to a product people can depend on.</p><Link href="/services" className="text-link" data-testid="link-home-services">See all services <ArrowUpRight size={14} /></Link></div>
          </div>
          <div className="service-grid">
            {services.slice(0, 4).map((service, index) => (
              <Link href="/services" className="service-card" key={service.title} data-testid={`card-home-service-${index}`}>
                <div><div className="service-index">0{index + 1}</div><h3>{service.title}</h3><p>{service.description}</p></div>
                <span className="text-link">Explore <ArrowUpRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="work-preview">
        <div className="page-wrap">
          <div className="section-heading">
            <div><div className="eyebrow">Selected work</div><h2>Evidence over<br />enthusiasm.</h2></div>
            <Link href="/work" className="button button-ghost" data-testid="link-home-work">View all work <ArrowUpRight size={15} /></Link>
          </div>
          <div className="work-grid">
            {cases.map((item, index) => (
              <article className="work-card" key={item.title} data-testid={`card-home-work-${index}`}>
                <div className="work-placeholder">
                  <img src={item.image} alt={`${item.title} screenshot`} />
                </div>
                <div className="work-meta"><span>{item.number}</span><span>{item.subtitle}</span></div>
                <h3>{item.title}</h3>
                <p>{item.outcome}</p>
                <Link href="/work" className="text-link dark-link" data-testid={`link-home-case-${index}`}>View case study <ArrowUpRight size={14} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <PageBottomCta />
    </>
  );
}

function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="page-intro">
      <div className="page-wrap page-intro-grid">
        <div className="reveal"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1></div>
        <p className="page-intro-copy reveal reveal-delay">{children}</p>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <PageIntro eyebrow="About Infincy" title="Engineering, then AI - not the other way around.">
        I build the foundations first. Then I reach for AI when it makes the product meaningfully better, not just more fashionable.
      </PageIntro>
      <section className="section">
        <div className="page-wrap about-story">
          <h2>A small studio is a different kind of commitment.</h2>
          <div className="story-copy">
            <p>I started in computer science and moved through data and analytics roles before getting close to the systems underneath the numbers.</p>
            <p>In a GenAI engineering role, I built production multi-agent AI systems: LangGraph orchestration, RAG pipelines, and the unglamorous wiring that makes an intelligent feature reliable in the hands of a real user.</p>
            <p>Infincy is where I do that same caliber of work directly with clients. Classic full-stack and backend projects are as welcome here as AI-specific ones. The through line is thoughtful engineering, delivered end to end.</p>
          </div>
        </div>
        <div className="page-wrap founder-photo-wrap">
          <div className="founder-placeholder">
            <img src="/images/founder.png" alt="Himanshu Nagapure, founder of Infincy" />
          </div>
          <p className="photo-caption">Himanshu Nagapure — founder of Infincy Studio.</p>
        </div>
      </section>
      <section className="principles">
        <div className="page-wrap principles-grid">
          <h2>How I work</h2>
          <div className="principle-list">
            <div className="principle"><div className="principle-num">01</div><div><h3>Ship the whole thing, not just a demo.</h3><p>The path from a compelling first screen to a stable, deployed product is where the real engineering lives.</p></div></div>
            <div className="principle"><div className="principle-num">02</div><div><h3>AI should solve a real problem, not be the headline.</h3><p>Start with the job to be done. Use a model only when it earns its place in the system.</p></div></div>
            <div className="principle"><div className="principle-num">03</div><div><h3>Direct communication, no account managers in between.</h3><p>You work with the person making the technical decisions, every week and every milestone.</p></div></div>
          </div>
        </div>
      </section>
      <PageBottomCta />
    </>
  );
}

function Services() {
  return (
    <>
      <PageIntro eyebrow="Capabilities & engagements" title="The right amount of engineering for what comes next.">
        From a first release to a system that needs to scale, Infincy can join at the level of clarity and complexity the work actually calls for.
      </PageIntro>
      <section className="offerings">
        <div className="page-wrap">
          <div className="section-heading"><div><div className="eyebrow">Core offerings</div><h2>Specific help.<br />No fog.</h2></div><p className="section-intro">Choose one lane or combine a few. Most interesting products need more than one.</p></div>
          <div className="offering-list">
            {services.map((service, index) => (
              <div className="offering" key={service.title} data-testid={`row-service-${index}`}>
                <div className="offering-number">0{index + 1}</div><h3>{service.title}</h3><p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="packages">
        <div className="page-wrap">
          <div className="eyebrow">Engagement packages</div>
          <div className="package-grid">
            <div className="package"><div><h3>Launch</h3><div className="package-kicker">MVP / landing product</div><p>Scoped full-stack build, fixed price, 2–4 weeks.</p></div><div className="package-price">Get a quote</div></div>
            <div className="package"><div><h3>Build</h3><div className="package-kicker">Full product</div><p>End-to-end app, backend, and cloud deployment, milestone-based.</p></div><div className="package-price">Get a quote</div></div>
            <div className="package"><div><h3>Scale / Retainer</h3><div className="package-kicker">Ongoing partner</div><p>Monthly retainer for features, AI additions, and maintenance.</p></div><div className="package-price">Starting at ₹—</div></div>
          </div>
        </div>
      </section>
      <PageBottomCta />
    </>
  );
}

function Work() {
  return (
    <>
      <PageIntro eyebrow="Selected work" title="Useful systems, built for the part after launch.">
        A few examples of the problems I like to get close to: complex workflows, messy information, and models that need to perform beyond a notebook.
      </PageIntro>
      <section className="case-list">
        <div className="page-wrap">
          {cases.map((item, index) => (
            <article className="case-study" key={item.title} data-testid={`case-study-${index}`}>
              <div className="case-visual">
                <div className="project-placeholder">
                  <img src={item.image} alt={`${item.title} screenshot`} />
                </div>
              </div>
              <div>
                <div className="case-label">{item.number} / Case study</div>
                <h2>{item.title}<br /><span>{item.subtitle}</span></h2>
                <div className="case-meta-block"><strong>Problem</strong><p>{item.problem}</p></div>
                <div className="case-meta-block"><strong>Approach</strong><p>{item.approach}</p></div>
                <div className="case-meta-block"><strong>Outcome</strong><p>{item.outcome}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <PageBottomCta />
    </>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' });
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return (
    <>
      <section className="contact-section">
        <div className="page-wrap contact-grid">
          <div className="contact-heading">
            <div className="eyebrow">Open to a good problem</div>
            <h1>Start a project.</h1>
            <p>Tell me a bit about what you're building - I'll get back to you within a day or two.</p>
            <div className="contact-side-note"><p>Good first conversations can be about a brief, a broken system, or a question you're not ready to call a project yet.</p></div>
          </div>
          <div>
            <form className="inquiry-form" onSubmit={submit} data-testid="form-project-inquiry">
              <div className="field"><label htmlFor="name">Name</label><input id="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Your name" required data-testid="input-name" /></div>
              <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="you@company.com" required data-testid="input-email" /></div>
              <div className="field"><label htmlFor="project-type">Project type</label><div className="select-wrap"><select id="project-type" value={form.type} onChange={(event) => update('type', event.target.value)} required data-testid="select-project-type"><option value="" disabled>Select one</option><option>Full-Stack App</option><option>Backend & API</option><option>AI & Agentic Systems</option><option>Not sure yet</option></select><ChevronDown size={17} /></div></div>
              <div className="field"><label htmlFor="budget">Budget range</label><div className="select-wrap"><select id="budget" value={form.budget} onChange={(event) => update('budget', event.target.value)} required data-testid="select-budget"><option value="" disabled>Select a rough band</option><option>Under ₹5L</option><option>₹5L–₹15L</option><option>₹15L–₹30L</option><option>₹30L+</option><option>Not sure yet</option></select><ChevronDown size={17} /></div></div>
              <div className="field"><label htmlFor="message">Message</label><textarea id="message" value={form.message} onChange={(event) => update('message', event.target.value)} placeholder="What are you building, and where are you in the process?" required data-testid="textarea-message" /></div>
              <div className="form-bottom">
                {submitted ? <span className="form-note" data-testid="status-form-submitted">Thanks - your note is ready for a reply. I’ll be in touch within a day or two.</span> : <span className="form-note">No sales sequence. Just a thoughtful reply from the person who would do the work.</span>}
                <button type="submit" className="button" data-testid="button-submit-inquiry">Start a project <ArrowUpRight size={16} /></button>
              </div>
            </form>
            <div className="contact-details">
              <div><h3>Prefer a direct note?</h3><a href="mailto:himanshunagapure.official@gmail.com" data-testid="link-contact-email">himanshunagapure.official@gmail.com</a></div>
              <div><h3>Book a first conversation</h3><a href="https://cal.com" target="_blank" rel="noreferrer" data-testid="link-contact-calendar"><Calendar size={14} /> Calendar link placeholder <ArrowUpRight size={13} /></a></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Shell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/work" component={Work} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Shell>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;