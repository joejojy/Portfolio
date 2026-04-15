const fallbackPortfolio = {
  profile: {
    name: "Your Name",
    initials: "JJ",
    role: "UI/UX Designer",
    headline: "I design useful interfaces that feel human.",
    intro: "I shape mobile and web experiences from messy ideas into crisp, human interfaces.",
    currentFocus: "Open to thoughtful product work",
    email: "hello@example.com"
  },
  stats: [
    { value: "12+", label: "Projects shaped" },
    { value: "4+", label: "Years practicing" },
    { value: "96", label: "Usability score" }
  ],
  about: {
    heading: "I turn research, flows, and pixels into products people can actually use.",
    copy: "I am a UI/UX designer who enjoys research, flows, prototyping, and interface craft. Replace this with your own story, process, and the kind of teams or projects you want to attract.",
    focus: ["Product strategy and user flows", "Wireframes, visual systems, and prototypes", "Usability improvements for web and mobile"],
    tools: ["Figma", "FigJam", "Framer", "Adobe XD", "Notion", "Miro"]
  },
  approach: [
    { title: "Research the real problem", copy: "I start by clarifying user needs, product goals, and the points where the current journey breaks down." },
    { title: "Structure the flow", copy: "I map the experience into screens, states, and decisions so the interface has a clear path before visual polish begins." },
    { title: "Prototype the feeling", copy: "I use motion, microcopy, and interaction details to test whether the product feels simple and intentional." },
    { title: "Refine the system", copy: "I turn the strongest direction into reusable patterns that stay consistent as the product grows." }
  ],
  worksIntro: "",
  projects: [
    { title: "BankDash", type: "Dashboard", year: "2025", tags: ["UI/UX", "Fintech", "Dashboard"], summary: "A unified fintech platform that simplifies complex financial management.", image: "https://images2.imgbox.com/9b/df/36KS4T4A_o.png", link: "https://www.behance.net/gallery/240316853/BankDash-Finance-Management-Dashboard", slug: "bankdash-finance-dashboard" },
    { title: "Mobile Banking Redesign", type: "App UX", year: "2026", tags: ["Research", "Prototype", "Mobile"], summary: "A calmer account overview and faster transfer flow for a finance app concept.", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80", link: "#", slug: "mobile-banking-redesign" },
    { title: "Studio Booking Dashboard", type: "Web Product", year: "2026", tags: ["Dashboard", "Design System", "SaaS"], summary: "A scheduling experience that helps teams scan bookings, resolve conflicts, and confirm details.", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=900&q=80", link: "#", slug: "studio-booking-dashboard" },
    { title: "Wellness Onboarding", type: "Interaction", year: "2025", tags: ["Onboarding", "UX Writing", "Testing"], summary: "A friendly first-run journey that gathers goals without making the product feel heavy.", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", link: "#", slug: "wellness-onboarding" }
  ],
  contact: {
    heading: "Let's make the next interface feel obvious.",
    copy: "For freelance work, product design roles, or collaboration notes, send a message.",
    links: [
      { label: "Email me", url: "https://mail.google.com/mail/?view=cm&fs=1&to=joeljojy10@gmail.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/joel-jojy-150246195/" },
      { label: "Behance", url: "https://www.behance.net/joeljojy/projects" }
    ]
  }
};

const state = { portfolio: fallbackPortfolio, selectedTag: "All" };

const elements = {
  brandInitials: document.getElementById("brand-initials"),
  headerEmail: document.getElementById("header-email"),
  heroSocialLinks: document.getElementById("hero-social-links"),
  heroEyebrow: document.getElementById("hero-eyebrow"),
  heroTitle: document.getElementById("hero-title"),
  heroIntro: document.getElementById("hero-intro"),
  currentFocus: document.getElementById("current-focus"),
  heroStats: document.getElementById("hero-stats"),
  aboutTitle: document.getElementById("about-title"),
  aboutCopy: document.getElementById("about-copy"),
  focusList: document.getElementById("focus-list"),
  toolsList: document.getElementById("tools-list"),
  approachList: document.getElementById("approach-list"),
  worksIntro: document.getElementById("works-intro"),
  projectFilters: document.getElementById("project-filters"),
  projectGrid: document.getElementById("project-grid"),
  projectCardTemplate: document.getElementById("project-card-template"),
  contactTitle: document.getElementById("contact-title"),
  contactCopy: document.getElementById("contact-copy"),
  contactLinks: document.getElementById("contact-links"),
  footerName: document.getElementById("footer-name"),
  cursorDot: document.querySelector(".cursor-dot")
};

init();

async function init() {
  state.portfolio = await loadPortfolio();
  renderPortfolio();
  bindCursor();
  bindTiltCards();
}

async function loadPortfolio() {
  try {
    const response = await fetch("./portfolio.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Portfolio JSON failed with status ${response.status}`);
    const portfolio = await response.json();
    return mergePortfolio(fallbackPortfolio, portfolio);
  } catch (error) {
    return fallbackPortfolio;
  }
}

function mergePortfolio(fallback, portfolio) {
  return {
    ...fallback,
    ...portfolio,
    profile: { ...fallback.profile, ...(portfolio.profile || {}) },
    about: { ...fallback.about, ...(portfolio.about || {}) },
    contact: { ...fallback.contact, ...(portfolio.contact || {}) },
    stats: Array.isArray(portfolio.stats) && portfolio.stats.length ? portfolio.stats : fallback.stats,
    approach: Array.isArray(portfolio.approach) && portfolio.approach.length ? portfolio.approach : fallback.approach,
    projects: Array.isArray(portfolio.projects) && portfolio.projects.length ? portfolio.projects : fallback.projects
  };
}

function renderPortfolio() {
  const { profile, about, contact, projects, stats, approach } = state.portfolio;
  document.title = `${profile.name} | ${profile.role}`;
  elements.brandInitials.textContent = profile.initials;
  elements.headerEmail.href = `mailto:${profile.email}`;
  elements.headerEmail.textContent = profile.email;
  elements.heroEyebrow.textContent = profile.role;
  elements.heroTitle.textContent = profile.headline;
  elements.heroIntro.textContent = profile.intro;
  elements.currentFocus.textContent = profile.currentFocus;
  elements.aboutTitle.textContent = about.heading;
  elements.aboutCopy.textContent = about.copy;
  elements.worksIntro.textContent = state.portfolio.worksIntro;
  elements.contactTitle.textContent = contact.heading;
  elements.contactCopy.textContent = contact.copy;
  elements.footerName.textContent = profile.name;
  renderStats(stats);
  renderList(elements.focusList, about.focus);
  renderChips(elements.toolsList, about.tools);
  renderApproach(approach);
  renderFilters(projects);
  renderProjects(projects);
  renderContactLinks(contact.links);
  renderHeroLinks(contact.links);
}

function renderStats(stats = []) {
  elements.heroStats.innerHTML = "";
  stats.forEach((stat) => {
    const card = document.createElement("article");
    card.className = "stat-card";
    const value = document.createElement("strong");
    const label = document.createElement("span");
    value.textContent = stat.value;
    label.textContent = stat.label;
    card.append(value, label);
    elements.heroStats.appendChild(card);
  });
}

function renderList(container, items = []) {
  container.innerHTML = "";
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    container.appendChild(listItem);
  });
}

function renderChips(container, items = []) {
  container.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    container.appendChild(chip);
  });
}

function renderApproach(items = []) {
  elements.approachList.innerHTML = "";
  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "approach-item";
    const number = document.createElement("span");
    const title = document.createElement("h3");
    const copy = document.createElement("p");
    number.className = "approach-number";
    number.textContent = String(index + 1).padStart(2, "0");
    title.textContent = item.title;
    copy.textContent = item.copy;
    article.append(number, title, copy);
    elements.approachList.appendChild(article);
  });
}

function renderFilters(projects) {
  const tags = ["All", ...new Set(projects.flatMap((project) => project.tags || []))];
  elements.projectFilters.innerHTML = "";
  tags.forEach((tag) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${state.selectedTag === tag ? " is-active" : ""}`;
    button.textContent = tag;
    button.addEventListener("click", () => {
      state.selectedTag = tag;
      renderFilters(state.portfolio.projects);
      renderProjects(state.portfolio.projects);
      bindTiltCards();
    });
    elements.projectFilters.appendChild(button);
  });
}

function renderProjects(projects) {
  const visibleProjects = state.selectedTag === "All" ? projects : projects.filter((project) => (project.tags || []).includes(state.selectedTag));
  elements.projectGrid.innerHTML = "";
  visibleProjects.forEach((project) => {
    const fragment = elements.projectCardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".project-card");
    const linkWrap = fragment.querySelector(".project-image-link");
    const image = fragment.querySelector(".project-image");
    const meta = fragment.querySelector(".project-meta");
    const title = fragment.querySelector(".project-title");
    const summary = fragment.querySelector(".project-summary");
    const tags = fragment.querySelector(".project-tags");
    const link = fragment.querySelector(".project-link");
    card.dataset.slug = project.slug || "";
    linkWrap.href = project.link || "#";
    image.src = project.image;
    image.alt = `${project.title} project preview`;
    meta.textContent = [project.type, project.year].filter(Boolean).join(" / ");
    title.textContent = project.title;
    summary.textContent = project.summary;
    renderChips(tags, project.tags || []);
    link.href = project.link || "#";
    elements.projectGrid.appendChild(fragment);
  });
}

function renderContactLinks(links = []) {
  elements.contactLinks.innerHTML = "";
  links.forEach((link) => elements.contactLinks.appendChild(createLink(link)));
}

function renderHeroLinks(links = []) {
  elements.heroSocialLinks.innerHTML = "";
  links.filter((link) => !link.url.startsWith("mailto:")).forEach((link) => elements.heroSocialLinks.appendChild(createLink(link)));
}

function createLink(link) {
  const anchor = document.createElement("a");
  anchor.href = link.url;
  anchor.textContent = link.label;
  if (!link.url.startsWith("mailto:")) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
  return anchor;
}

function bindCursor() {
  if (!elements.cursorDot || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.addEventListener("pointermove", (event) => {
    elements.cursorDot.classList.add("is-visible");
    elements.cursorDot.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  });
  document.querySelectorAll("a, button, .tilt-card").forEach((item) => {
    item.addEventListener("pointerenter", () => elements.cursorDot.classList.add("is-active"));
    item.addEventListener("pointerleave", () => elements.cursorDot.classList.remove("is-active"));
  });
}

function bindTiltCards() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 4;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -4;
      card.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}