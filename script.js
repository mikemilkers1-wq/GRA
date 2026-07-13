const menuData = {
  news: {
    title: "Aktuelle Meldungen",
    primary: ["Politik & Recht", "Praesidiumskolumne", "Vereinsreport", "Sicherheit im Alltag"],
    related: ["GRA Recht kompakt", "Deutscher Bundestag", "Laenderportale Waffenrecht", "EU-Feuerwaffenrichtlinie"]
  },
  videos: {
    title: "Videos",
    primary: ["GRA Studio", "Vereinsleben", "Interviewreihe", "Sportgeraete vorgestellt"],
    related: ["G36 im Sportkontext", "Walther PDP Uebersicht", "Blaser R8 Jagd & Brauchtum", "Sicher lagern"]
  },
  legal: {
    title: "Recht & Verantwortung",
    primary: ["WaffG erklaert", "Sachkunde", "Beduerfnis & Verein", "Aufbewahrung"],
    related: ["Grundgesetz Art. 9", "WaffG Paragraf 4", "WaffG Paragraf 10", "WaffG Paragraf 36"]
  },
  safety: {
    title: "Sicherheit & Ausbildung",
    primary: ["Standregeln", "Jugendarbeit", "Erste Schritte", "Trainer finden"],
    related: ["GRA Sicherheitsregeln", "Schuetzenhaus-Check", "Online Lernmodule", "Trainerqualifikation"]
  },
  competitive: {
    title: "Sportschiessen",
    primary: ["Liga & Termine", "Klassifizierung", "Luftdruck", "Kleinkaliber"],
    related: ["DSB-nahe Wettbewerbe", "Landesmeisterschaften", "Vereinsmeisterschaften", "Para-Sport"]
  },
  clubs: {
    title: "Vereine",
    primary: ["Verein suchen", "Landesverbaende", "Jugendgruppen", "Vereinsmaterial"],
    related: ["Nord", "Ost", "West", "Sued"]
  },
  events: {
    title: "Veranstaltungen",
    primary: ["Freunde der GRA", "Messe Dortmund", "Schuetzenfest Hannover", "Sicherheitstage"],
    related: ["Berlin", "Koeln", "Munich", "Hamburg", "Leipzig"]
  }
};

const drawerSections = {
  "latest-news": menuData.news,
  "latest-videos": menuData.videos,
  "legislative": menuData.legal,
  "safety": menuData.safety,
  "competitive": menuData.competitive,
  "clubs": menuData.clubs,
  "events": menuData.events,
  "shopping": {
    title: "Service & Vorteile",
    primary: ["Mitgliedschaft waehlen", "Rabatte ansehen", "Magazin wechseln", "Profil verwalten"],
    related: ["GRA Shop", "Partnerangebote", "Impressum", "Datenschutz"]
  }
};

const searchItems = [
  {
    title: "H&K G36: Deutsches System im sportlichen Kontext",
    text: "Eine redaktionelle Uebersicht zur Rolle deutscher Hersteller in Vereins- und Sportdiskussionen.",
    image: "assets/g36-detail.jpg",
    tags: "GRA SPORT, H&K, DEUTSCHE HERSTELLER"
  },
  {
    title: "WaffG kompakt: Was Vereinsmitglieder wissen sollten",
    text: "Ueberblick zu Erlaubnis, Sachkunde, Beduerfnis und Aufbewahrung. Kein Ersatz fuer Rechtsberatung.",
    image: "assets/reichstag.jpg",
    tags: "RECHT, WAFFG, DEUTSCHLAND"
  },
  {
    title: "Sicher lagern: Aufbewahrung nach WaffG Paragraf 36",
    text: "Die GRA erklaert, warum sichere Aufbewahrung ein Kernpunkt verantwortungsvoller Vereinsarbeit ist.",
    image: "assets/shooting-range.png",
    tags: "SICHERHEIT, VEREIN, AUFBEWAHRUNG"
  },
  {
    title: "Walther PDP, Blaser R8 und G36: Deutsche Namen in der Debatte",
    text: "Ein neutraler Produkt- und Hintergrundartikel ohne technische Anleitungen oder Verkaufsabwicklung.",
    image: "assets/g36.jpg",
    tags: "PRODUKTE, WALTHER, BLASER, H&K"
  },
  {
    title: "Finde GRA-Angebote in deiner Naehe",
    text: "Suche fuer Vereine, Sachkundetage und Informationsabende in deutschen Staedten.",
    image: "assets/gra-dm-event.jpg",
    tags: "VEREINE, TERMINE, DEUTSCHLAND"
  }
];

function qs(selector, scope = document) {
  if (!scope) return null;
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  if (!scope) return [];
  return Array.from(scope.querySelectorAll(selector));
}

function showToast(message) {
  const toast = qs("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 3800);
}

function fillMegaMenus() {
  qsa("[data-menu]").forEach((item) => {
    const key = item.dataset.menu;
    const data = menuData[key];
    const pop = qs(".mega-pop", item);
    if (!data || !pop) return;
    pop.innerHTML = `
      <a class="view-all" href="#${key}">Alle ansehen&nbsp;-></a>
      <div class="mega-section">
        <h3>${data.title}</h3>
        <ul class="mega-list">
          ${data.primary.map((entry) => `<li><a href="#${key}">${entry}</a></li>`).join("")}
        </ul>
      </div>
      <div class="mega-section">
        <h3>Verwandte GRA-Seiten</h3>
        <ul class="mega-list">
          ${data.related.map((entry) => `<li><a href="#sources">${entry}</a></li>`).join("")}
        </ul>
      </div>`;
  });
}

function setupNav() {
  fillMegaMenus();
  const navItems = qsa("[data-menu]");
  navItems.forEach((item) => {
    const trigger = qs(".nav-trigger", item);
    const closeOthers = () => navItems.forEach((other) => {
      if (other !== item) other.classList.remove("open");
    });
    item.addEventListener("mouseenter", () => {
      closeOthers();
      item.classList.add("open");
    });
    item.addEventListener("mouseleave", () => item.classList.remove("open"));
    trigger?.addEventListener("click", (event) => {
      event.preventDefault();
      closeOthers();
      item.classList.toggle("open");
    });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-menu]")) {
      navItems.forEach((item) => item.classList.remove("open"));
    }
  });
}

function setupDrawer() {
  const drawer = qs("#drawer");
  const backdrop = qs("#drawerBackdrop");
  const openButtons = qsa("[data-open-drawer]");
  const closeButtons = qsa("[data-close-drawer]");
  const mainPanel = qs(".drawer-main", drawer);

  const open = () => {
    drawer?.classList.add("show");
    backdrop?.classList.add("show");
    document.body.classList.add("drawer-open");
  };

  const close = () => {
    drawer?.classList.remove("show", "sub-open");
    backdrop?.classList.remove("show");
    qsa(".drawer-sub", drawer).forEach((panel) => panel.classList.remove("active"));
    document.body.classList.remove("drawer-open");
  };

  openButtons.forEach((button) => button.addEventListener("click", open));
  closeButtons.forEach((button) => button.addEventListener("click", close));
  backdrop?.addEventListener("click", close);

  qsa("[data-sub]", drawer).forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.sub;
      const data = drawerSections[key];
      if (!data || !drawer) return;
      qsa(".drawer-sub", drawer).forEach((panel) => panel.remove());
      const panel = document.createElement("div");
      panel.className = "drawer-sub active";
      panel.innerHTML = `
        <div class="drawer-head">
          <button class="back-btn" type="button" aria-label="Zurueck">&#8249;</button>
          <h2>${data.title}</h2>
          <button class="drawer-close" type="button" aria-label="Menue schliessen">&times;</button>
        </div>
        <div class="drawer-panel">
          <a class="view-all" href="#${key}">Alle ansehen&nbsp;-></a>
          <ul class="drawer-list">
            ${data.primary.map((entry) => `<li><a href="#${key}">${entry}</a></li>`).join("")}
          </ul>
        </div>
        <div class="drawer-panel">
          <h3>Verwandte GRA-Seiten</h3>
          <ul class="drawer-list">
            ${data.related.map((entry) => `<li><a href="#sources">${entry}</a></li>`).join("")}
          </ul>
        </div>`;
      mainPanel?.after(panel);
      drawer.classList.add("sub-open");
      qs(".back-btn", panel)?.addEventListener("click", () => {
        drawer.classList.remove("sub-open");
        panel.remove();
      });
      qs(".drawer-close", panel)?.addEventListener("click", close);
    });
  });
}

function setupSearch() {
  const overlay = qs("#searchOverlay");
  const input = qs("#siteSearch");
  const openButtons = qsa("[data-open-search]");
  const closeButton = qs("#searchClose");
  const form = qs("#searchForm");

  const open = () => {
    overlay?.classList.add("show");
    window.setTimeout(() => input?.focus(), 20);
  };

  const close = () => overlay?.classList.remove("show");

  openButtons.forEach((button) => button.addEventListener("click", open));
  closeButton?.addEventListener("click", close);
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = input?.value.trim() || "";
    if (!query) {
      input?.focus();
      return;
    }
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      close();
      qsa("[data-menu]").forEach((item) => item.classList.remove("open"));
    }
  });
}

function setupPromo() {
  const promo = qs("#promo");
  if (!promo) return;
  promo.classList.add("show");
  qsa("[data-close-promo]").forEach((button) => button.addEventListener("click", () => {
    promo.classList.remove("show");
  }));
}

function setupNewsletter() {
  const bar = qs("#newsletterBar");
  const form = qs("#newsletterForm");
  const input = qs("#newsletterEmail");
  const panel = qs("#interestPanel");
  const save = qs("#saveInterests");
  const success = qs("#successBar");

  qsa("[data-close-newsletter]").forEach((button) => button.addEventListener("click", () => {
    bar?.classList.add("hidden");
    success?.classList.add("hidden");
  }));

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input?.value.trim() || "";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      showToast("Bitte eine gueltige E-Mail-Adresse eingeben.");
      input?.focus();
      return;
    }
    bar?.classList.add("hidden");
    panel?.classList.add("show");
  });

  const checks = qsa("#interestPanel input[type='checkbox']");
  const updateSave = () => {
    const any = checks.some((check) => check.checked);
    if (save) {
      save.disabled = !any;
      save.textContent = any ? "Interessen speichern" : "Mindestens ein Interesse auswaehlen";
    }
  };
  checks.forEach((check) => check.addEventListener("change", updateSave));
  updateSave();

  save?.addEventListener("click", () => {
    if (save.disabled) return;
    panel?.classList.remove("show");
    success?.classList.remove("hidden");
  });

  qs("#closeInterestPanel")?.addEventListener("click", () => panel?.classList.remove("show"));
}

function setupChat() {
  const widget = qs("#chatWidget");
  const compact = () => widget?.classList.add("compact");
  qs("#dismissChat")?.addEventListener("click", compact);
  qs("#chatNow")?.addEventListener("click", () => {
    compact();
    showToast("Ein Berater ist derzeit nicht verfuegbar.");
  });
  qs("#liveChatButton")?.addEventListener("click", () => {
    showToast("Der Chat nimmt derzeit keine neuen Nachrichten an.");
  });
}

function setupForms() {
  qs("#loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Der Servicebereich ist aktuell im Wartungsmodus.");
  });

  qsa("[data-add-plan]").forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.addPlan || "Mitgliedschaft";
      qs("#selectedPlan")?.replaceChildren(document.createTextNode(plan));
      showToast(`${plan} wurde in den Warenkorb gelegt.`);
      qs("#magazines")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  qs("#orderForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    showToast("Deine Anfrage wurde vorgemerkt. Eine Bestaetigung erfolgt nach Pruefung.");
  });
}

function setupAccordions() {
  qsa(".accordion-item").forEach((item, index) => {
    const button = qs("button", item);
    if (index === 0) item.classList.add("open");
    button?.addEventListener("click", () => {
      item.classList.toggle("open");
    });
  });
}

function setupSearchResultsPage() {
  const title = qs("#searchTerm");
  const count = qs("#resultCount");
  const mount = qs("#searchResults");
  if (!title || !mount) return;

  const params = new URLSearchParams(window.location.search);
  const raw = params.get("q") || "GRA";
  const query = raw.trim() || "GRA";
  title.textContent = query;
  const normalized = query.toLowerCase();
  const filtered = searchItems.filter((item) => {
    const haystack = `${item.title} ${item.text} ${item.tags}`.toLowerCase();
    return haystack.includes(normalized.replace("!", "")) || normalized.length < 3;
  });
  const results = filtered.length ? filtered : searchItems;
  const pretendCount = 1280 + query.length * 137;
  if (count) count.textContent = `${pretendCount.toLocaleString("de-DE")} Ergebnisse`;
  mount.innerHTML = results.map((item, index) => `
    <article class="result-card ${index === 0 ? "featured" : ""}">
      <div>
        <h2>${item.title}</h2>
        <p>${item.text}</p>
        <p class="result-meta">${item.tags}</p>
      </div>
      <img src="${item.image}" alt="">
    </article>
  `).join("");
}

function setupTableButtons() {
  qsa("[data-info]").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("Die Detailseite wird vorbereitet.");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setupDrawer();
  setupSearch();
  setupPromo();
  setupNewsletter();
  setupChat();
  setupForms();
  setupAccordions();
  setupSearchResultsPage();
  setupTableButtons();
});
