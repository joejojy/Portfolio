window.toggleMenu = function() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  if (!hamburger || !mobileNav) return;
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  mobileNav.classList.toggle("is-open", !expanded);
  mobileNav.setAttribute("aria-hidden", String(expanded));
  document.body.style.overflow = expanded ? "" : "hidden";
};

const fallbackPortfolio = {
  profile: {
    name: "Your Name",
    initials: "JJ",
    role: "Design Engineer",
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
    { title: "BankDash", type: "Dashboard", year: "2025", tags: ["UI/UX", "Fintech", "Dashboard"], summary: "A unified fintech platform that simplifies complex financial management.", image: "https://images2.imgbox.com/9b/df/36KS4T4A_o.png", link: "https://www.behance.net/gallery/240316853/BankDash-Finance-Management-Dashboard", slug: "bankdash-finance-dashboard" }
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

const state = { portfolio: fallbackPortfolio, projectFlowCleanup: null };

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
  projectGrid: document.getElementById("project-grid"),
  projectCardTemplate: document.getElementById("project-card-template"),
  projectCount: document.getElementById("project-count"),
  projectProgressControl: document.querySelector(".project-progress"),
  projectProgress: document.querySelector(".project-progress span"),
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
  bindHamburger();
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
  setText(elements.brandInitials, profile.initials);
  if (elements.headerEmail) {
    elements.headerEmail.href = `mailto:${profile.email}`;
    elements.headerEmail.textContent = profile.email;
  }
  setText(elements.heroEyebrow, profile.role);
  setText(elements.heroTitle, profile.headline);
  setText(elements.heroIntro, profile.intro);
  setText(elements.currentFocus, profile.currentFocus);
  setText(elements.aboutTitle, about.heading);
  setText(elements.aboutCopy, about.copy);
  setText(elements.worksIntro, state.portfolio.worksIntro);
  setText(elements.contactTitle, contact.heading);
  setText(elements.contactCopy, contact.copy);
  setText(elements.footerName, profile.name);
  renderStats(stats);
  renderList(elements.focusList, about.focus);
  renderChips(elements.toolsList, about.tools);
  renderApproach(approach);
  renderProjects(projects);
  renderContactLinks(contact.links);
  renderHeroLinks(contact.links);
}

function setText(element, text) {
  if (element) element.textContent = text || "";
}

function renderStats(stats = []) {
  if (!elements.heroStats) return;
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
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    container.appendChild(listItem);
  });
}

function renderChips(container, items = []) {
  if (!container) return;
  container.innerHTML = "";
  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;
    container.appendChild(chip);
  });
}

function renderApproach(items = []) {
  if (!elements.approachList) return;
  elements.approachList.innerHTML = "";
  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "approach-item";
    const number = document.createElement("span");
    const title = document.createElement("h3");
    const copy = document.createElement("p");
    number.className = "approach-number";
    title.className = "approach-title";
    number.textContent = String(index + 1).padStart(2, "0");
    title.textContent = item.title;
    copy.textContent = item.copy;
    article.append(number, title, copy);
    elements.approachList.appendChild(article);
  });
}

function renderProjects(projects) {
  if (!elements.projectGrid || !elements.projectCardTemplate) return;
  if (typeof state.projectFlowCleanup === "function") state.projectFlowCleanup();
  elements.projectGrid.innerHTML = "";

  const viewport = document.createElement("div");
  const track = document.createElement("div");
  const sourceProjects = projects.length ? projects : fallbackPortfolio.projects;
  const totalProjects = String(sourceProjects.length).padStart(2, "0");
  const flowProjects = buildProjectFlowItems(sourceProjects);

  viewport.className = "project-viewport";
  track.className = "project-track";

  flowProjects.forEach((project, projectIndex) => {
    track.appendChild(createProjectCard(project, projectIndex));
  });

  viewport.appendChild(track);
  elements.projectGrid.appendChild(viewport);
  if (elements.projectCount) elements.projectCount.textContent = `01 / ${totalProjects}`;
  state.projectFlowCleanup = bindProjectFlow({
    viewport,
    track,
    flowTotal: flowProjects.length,
    projectTotal: sourceProjects.length
  });
}

function buildProjectFlowItems(projects) {
  const flowProjects = [];
  const minimumCards = Math.max(10, projects.length * 3);
  while (flowProjects.length < minimumCards) {
    flowProjects.push(...projects);
  }
  return flowProjects.slice(0, minimumCards);
}

function createProjectCard(project, index = 0) {
  const fragment = elements.projectCardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".project-card");
  const linkWrap = fragment.querySelector(".project-image-link");
  const image = fragment.querySelector(".project-image");
  const meta = fragment.querySelector(".project-meta");
  const title = fragment.querySelector(".project-title");
  const summary = fragment.querySelector(".project-summary");
  const tags = fragment.querySelector(".project-tags");
  const link = fragment.querySelector(".project-link");
  const projectCard = {
    year: project.year || "",
    category: project.type || "",
    title: project.title || "",
    tags: project.tags || [],
    description: project.summary || "",
    thumbnail: project.image || "",
    projectUrl: project.link || "#"
  };

  card.classList.remove("tilt-card");
  card.classList.add(`project-card--${index % 5}`);
  card.dataset.slug = project.slug || "";
  card.tabIndex = 0;
  card.setAttribute("role", "link");
  card.setAttribute("aria-label", `Open ${projectCard.title} project`);
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    window.open(projectCard.projectUrl, "_blank", "noopener,noreferrer");
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.open(projectCard.projectUrl, "_blank", "noopener,noreferrer");
    }
  });

  linkWrap.href = projectCard.projectUrl;
  image.src = projectCard.thumbnail;
  image.alt = `${projectCard.title} project preview`;
  meta.textContent = [projectCard.category, projectCard.year].filter(Boolean).join(" / ");
  title.textContent = projectCard.title;
  summary.textContent = projectCard.description;
  renderChips(tags, projectCard.tags);
  link.href = projectCard.projectUrl;
  link.textContent = "VIEW PROJECT";

  return card;
}

function bindProjectFlow({ viewport, track, flowTotal, projectTotal }) {
  let activeIndex = 0;
  let visibleCount = 1;
  let maxIndex = 0;
  let cardStep = 0;
  let autoFlowTimer = null;
  let isPaused = false;
  let autoFlowDelay = 3200;
  let progressClickCount = 0;
  let isBreakingApart = false;
  let suppressProjectClick = false;
  const breakApartDuration = 900;
  const dragThreshold = 44;

  const stopAutoFlow = () => {
    if (autoFlowTimer) window.clearInterval(autoFlowTimer);
    autoFlowTimer = null;
  };

  const startAutoFlow = () => {
    stopAutoFlow();
    if (flowTotal <= visibleCount || isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoFlowTimer = window.setInterval(goNext, autoFlowDelay);
  };

  const measure = () => {
    const firstCard = track.querySelector(".project-card");
    if (!firstCard) return;
    const cards = Array.from(track.querySelectorAll(".project-card"));
    const cardWidth = firstCard.getBoundingClientRect().width;
    const secondCard = cards[1];
    cardStep = secondCard ? Math.max(1, secondCard.getBoundingClientRect().left - firstCard.getBoundingClientRect().left) : cardWidth;
    const overlap = Math.max(0, cardWidth - cardStep);
    const gridWidth = elements.projectGrid.clientWidth;
    const isMobileFlow = window.matchMedia("(max-width: 760px)").matches;
    const activeScale = isMobileFlow ? 1.02 : 1.06;
    const scaledCardWidth = cardWidth * activeScale;
    const scaleInset = Math.max(0, (scaledCardWidth - cardWidth) / 2);
    const maxViewportPad = Math.max(0, (gridWidth - cardWidth) / 2);
    const desiredPad = isMobileFlow
      ? Math.max(maxViewportPad, scaleInset + 2)
      : Math.max(overlap * 0.5, cardWidth * 0.08, scaleInset + 2);
    const edgePadLimit = isMobileFlow ? maxViewportPad : cardWidth * 0.18;
    const edgePad = Math.min(desiredPad, edgePadLimit, maxViewportPad);
    const usableWidth = gridWidth - (edgePad * 2);
    const fittedCount = Math.max(1, Math.floor((usableWidth - cardWidth) / cardStep) + 1);
    const visibleCap = isMobileFlow ? 1 : 3;
    visibleCount = Math.min(fittedCount, visibleCap);
    visibleCount = Math.min(visibleCount, flowTotal);
    const layoutWindowWidth = cardWidth + (Math.max(0, visibleCount - 1) * cardStep);
    const windowWidth = isMobileFlow ? gridWidth - (edgePad * 2) : Math.min(Math.max(layoutWindowWidth, scaledCardWidth), gridWidth - (edgePad * 2));
    track.style.setProperty("--project-edge-pad", `${edgePad}px`);
    viewport.style.setProperty("--project-window-width", `${windowWidth + (edgePad * 2)}px`);
    maxIndex = Math.max(0, flowTotal - visibleCount);
    activeIndex = Math.min(activeIndex, maxIndex);
    update();
    startAutoFlow();
  };

  const update = () => {
    track.style.transform = `translate3d(${-activeIndex * cardStep}px, 0, 0)`;
    updateProjectCardPositions(track, activeIndex, visibleCount);
    if (elements.projectCount) {
      const projectIndex = projectTotal ? (activeIndex % projectTotal) + 1 : 1;
      elements.projectCount.textContent = `${String(projectIndex).padStart(2, "0")} / ${String(projectTotal).padStart(2, "0")}`;
    }
    if (elements.projectProgress) {
      const progress = projectTotal <= 1 ? 1 : ((activeIndex % projectTotal) + 1) / projectTotal;
      elements.projectProgress.style.transform = `scaleX(${Math.min(progress, 1)})`;
    }
  };

  function goNext() {
    activeIndex = activeIndex >= maxIndex ? 0 : activeIndex + 1;
    update();
  }

  function goPrevious() {
    activeIndex = activeIndex <= 0 ? maxIndex : activeIndex - 1;
    update();
  }

  const goNextFromControl = () => {
    goNext();
    startAutoFlow();
  };

  const triggerBreakApart = () => {
    if (isBreakingApart || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progressClickCount = 0;
      return;
    }

    const visibleCards = Array.from(track.querySelectorAll(".project-card:not(.project-card--hidden)"));
    if (!visibleCards.length) {
      progressClickCount = 0;
      return;
    }

    isBreakingApart = true;
    stopAutoFlow();
    elements.projectGrid.classList.add("is-breaking");

    visibleCards.forEach((card, index) => {
      const startY = index === 1 ? 0 : index === 0 ? 18 : 8;
      const startScale = index === 1 ? 1.06 : index === 0 ? 0.86 : 0.94;
      const driftX = index === 0 ? -74 : index === 1 ? 18 : 82;
      const driftY = index === 1 ? -108 : -86;
      const rotate = index === 0 ? -13 : index === 1 ? 7 : 15;
      card.style.setProperty("--break-start-y", `${startY}px`);
      card.style.setProperty("--break-start-scale", String(startScale));
      card.style.setProperty("--break-x", `${driftX}px`);
      card.style.setProperty("--break-y", `${driftY}px`);
      card.style.setProperty("--break-rotate", `${rotate}deg`);
      card.classList.add("is-breaking-away");
    });

    window.setTimeout(() => {
      visibleCards.forEach((card) => {
        card.classList.remove("is-breaking-away");
        card.style.removeProperty("--break-start-y");
        card.style.removeProperty("--break-start-scale");
        card.style.removeProperty("--break-x");
        card.style.removeProperty("--break-y");
        card.style.removeProperty("--break-rotate");
      });
      elements.projectGrid.classList.remove("is-breaking");
      isBreakingApart = false;
      progressClickCount = 0;
      if (!isPaused) startAutoFlow();
    }, breakApartDuration);
  };

  const handleProgressClick = (event) => {
    goNextFromControl();
    if (event.detail === 0 || event.button !== 0) return;
    progressClickCount += 1;
    if (progressClickCount >= 6) window.requestAnimationFrame(triggerBreakApart);
  };

  const handleProgressKeydown = (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    goNextFromControl();
  };

  const pause = () => {
    isPaused = true;
    stopAutoFlow();
  };

  const resume = () => {
    isPaused = false;
    startAutoFlow();
  };

  const bindDragMovement = () => {
    let pointerId = null;
    let startX = 0;
    let lastX = 0;
    let isDragging = false;
    const interactiveSelector = "a, button, input, select, textarea, [role='button']";

    const setDragTransform = (deltaX) => {
      track.style.transform = `translate3d(${(-activeIndex * cardStep) + deltaX}px, 0, 0)`;
    };

    const endDrag = (event) => {
      if (pointerId !== event.pointerId) return;
      const dragDistance = lastX - startX;
      viewport.releasePointerCapture?.(pointerId);
      pointerId = null;
      viewport.classList.remove("is-dragging");
      track.classList.remove("is-dragging");

      if (isDragging && Math.abs(dragDistance) >= dragThreshold) {
        if (dragDistance < 0) goNext();
        else goPrevious();
      } else {
        update();
      }

      if (isDragging) {
        suppressProjectClick = true;
        window.setTimeout(() => {
          suppressProjectClick = false;
        }, 0);
      }
      isDragging = false;
      if (!isPaused) startAutoFlow();
    };

    const handlePointerDown = (event) => {
      if (event.button !== 0 || flowTotal <= visibleCount || isBreakingApart) return;
      if (event.target.closest(interactiveSelector)) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      lastX = startX;
      isDragging = false;
      stopAutoFlow();
      viewport.setPointerCapture?.(pointerId);
    };

    const handlePointerMove = (event) => {
      if (pointerId !== event.pointerId) return;
      lastX = event.clientX;
      const dragDistance = lastX - startX;
      if (!isDragging && Math.abs(dragDistance) < 8) return;
      isDragging = true;
      viewport.classList.add("is-dragging");
      track.classList.add("is-dragging");
      setDragTransform(dragDistance);
    };

    const handleClickCapture = (event) => {
      if (!suppressProjectClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressProjectClick = false;
    };

    viewport.addEventListener("pointerdown", handlePointerDown);
    viewport.addEventListener("pointermove", handlePointerMove);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    elements.projectGrid.addEventListener("click", handleClickCapture, true);

    return () => {
      viewport.removeEventListener("pointerdown", handlePointerDown);
      viewport.removeEventListener("pointermove", handlePointerMove);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      elements.projectGrid.removeEventListener("click", handleClickCapture, true);
    };
  };

  const unbindDragMovement = bindDragMovement();

  elements.projectGrid.addEventListener("mouseenter", pause);
  elements.projectGrid.addEventListener("mouseleave", resume);
  elements.projectGrid.addEventListener("focusin", pause);
  elements.projectGrid.addEventListener("focusout", resume);
  if (elements.projectProgressControl) {
    elements.projectProgressControl.setAttribute("role", "button");
    elements.projectProgressControl.setAttribute("tabindex", "0");
    elements.projectProgressControl.setAttribute("aria-label", "Show next project");
    elements.projectProgressControl.addEventListener("click", handleProgressClick);
    elements.projectProgressControl.addEventListener("keydown", handleProgressKeydown);
  }

  let resizeObserver;
  if ("ResizeObserver" in window) {
    resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(elements.projectGrid);
  } else {
    window.addEventListener("resize", measure);
  }

  requestAnimationFrame(measure);

  return () => {
    stopAutoFlow();
    elements.projectGrid.removeEventListener("mouseenter", pause);
    elements.projectGrid.removeEventListener("mouseleave", resume);
    elements.projectGrid.removeEventListener("focusin", pause);
    elements.projectGrid.removeEventListener("focusout", resume);
    if (elements.projectProgressControl) {
      elements.projectProgressControl.removeEventListener("click", handleProgressClick);
      elements.projectProgressControl.removeEventListener("keydown", handleProgressKeydown);
    }
    unbindDragMovement();
    if (resizeObserver) resizeObserver.disconnect();
    else window.removeEventListener("resize", measure);
  };
}

function updateProjectCardPositions(track, activeIndex, visibleCount) {
  const cards = Array.from(track.querySelectorAll(".project-card"));
  const centerOffset = Math.floor(visibleCount / 2);
  cards.forEach((card, index) => {
    card.classList.remove("project-card--0", "project-card--1", "project-card--2", "project-card--3", "project-card--4", "project-card--hidden");
    const relativeIndex = index - activeIndex;
    if (relativeIndex < 0 || relativeIndex >= visibleCount) {
      card.classList.add("project-card--4", "project-card--hidden");
      return;
    }
    const distanceFromCenter = relativeIndex - centerOffset;
    if (distanceFromCenter <= -2) card.classList.add("project-card--0");
    else if (distanceFromCenter === -1) card.classList.add("project-card--1");
    else if (distanceFromCenter === 0) card.classList.add("project-card--2");
    else if (distanceFromCenter === 1) card.classList.add("project-card--3");
    else card.classList.add("project-card--4");
  });
}

function renderContactLinks(links = []) {
  if (!elements.contactLinks) return;
  elements.contactLinks.innerHTML = "";
  links.forEach((link) => elements.contactLinks.appendChild(createLink(link)));
}

function renderHeroLinks(links = []) {
  if (!elements.heroSocialLinks) return;
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
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!elements.cursorDot || !canHover || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

function bindHamburger() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const closeBtn = document.getElementById("mobile-nav-close");
  if (!hamburger || !mobileNav) return;

  const closeMenu = () => {
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  hamburger.addEventListener("click", function() {
    const expanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", String(!expanded));
    mobileNav.classList.toggle("is-open", !expanded);
    mobileNav.setAttribute("aria-hidden", String(expanded));
    document.body.style.overflow = expanded ? "" : "hidden";
  });

  closeBtn?.addEventListener("click", closeMenu);

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeMenu();
    }
  });
}
