/**
 * CalculatorHub – Shared UI Injector (ui.js)
 * Handles: Mega-menu navbar, search, footer, ripple effects, tabs
 */

const CALC_ROUTES = [
  // Financial
  { title: 'Mortgage Calculator', category: 'Financial', icon: '🏠', href: '/pages/financial/mortgage.html', desc: 'Monthly payments & amortization' },
  { title: 'Loan Calculator', category: 'Financial', icon: '💳', href: '/pages/financial/loan.html', desc: 'Loan repayments & interest' },
  { title: 'Interest Calculator', category: 'Financial', icon: '📈', href: '/pages/financial/interest.html', desc: 'Simple & compound interest' },
  { title: 'Compound Interest', category: 'Financial', icon: '💰', href: '/pages/financial/compound.html', desc: 'Watch your money grow' },
  { title: 'Investment Calculator', category: 'Financial', icon: '📊', href: '/pages/financial/investment.html', desc: 'Project investment returns' },
  { title: 'Payment Calculator', category: 'Financial', icon: '💵', href: '/pages/financial/payment.html', desc: 'Affordable payment plans' },
  // Health
  { title: 'BMI Calculator', category: 'Health', icon: '⚖️', href: '/pages/health/bmi.html', desc: 'Body Mass Index check' },
  { title: 'Calorie Calculator', category: 'Health', icon: '🥗', href: '/pages/health/calorie.html', desc: 'Daily calorie needs (TDEE)' },
  { title: 'BMR Calculator', category: 'Health', icon: '🔥', href: '/pages/health/bmr.html', desc: 'Basal Metabolic Rate' },
  { title: 'Body Fat Calculator', category: 'Health', icon: '💪', href: '/pages/health/bodyfat.html', desc: 'Body fat percentage (US Navy)' },
  // Math
  { title: 'Scientific Calculator', category: 'Math', icon: '🔬', href: '/pages/math/scientific.html', desc: 'Trig, log, exponents & more' },
  { title: 'Percentage Calculator', category: 'Math', icon: '%', href: '/pages/math/percentage.html', desc: 'Solve any % problem' },
  { title: 'Fraction Calculator', category: 'Math', icon: '½', href: '/pages/math/fraction.html', desc: 'Add, subtract, multiply fractions' },
  { title: 'Age Calculator', category: 'Math', icon: '🎂', href: '/pages/math/age.html', desc: 'Exact age from birthdate' },
  { title: 'Date Calculator', category: 'Math', icon: '📅', href: '/pages/math/date.html', desc: 'Date difference & duration' },
  { title: 'GPA Calculator', category: 'Math', icon: '🎓', href: '/pages/math/gpa.html', desc: 'Weighted GPA by credit hours' },
  { title: 'Grade Calculator', category: 'Math', icon: '📝', href: '/pages/math/grade.html', desc: 'Weighted average & final grade' },
];

/* ---------- Detect active page ---------- */
function getActivePath() {
  return window.location.pathname.replace(/\\/g, '/');
}

/* ============================================================
   APP BAR (Mega Menu)
   ============================================================ */
function buildAppBar() {
  const active = getActivePath();
  let activeCat = 'home';
  if (active.includes('/financial/')) activeCat = 'financial';
  else if (active.includes('/health/')) activeCat = 'health';
  else if (active.includes('/math/')) activeCat = 'math';

  const fin = CALC_ROUTES.filter(r => r.category === 'Financial');
  const hlth = CALC_ROUTES.filter(r => r.category === 'Health');
  const math = CALC_ROUTES.filter(r => r.category === 'Math');

  function megaItems(items) {
    return items.map(item => `
          <a href="${item.href}" class="mega-item">
            <div class="mega-item__icon">${item.icon}</div>
            <div>
              <div class="mega-item__title">${item.title.replace(' Calculator', '')}</div>
              <div class="mega-item__desc">${item.desc}</div>
            </div>
          </a>`).join('');
  }

  return `
  <header class="app-bar" id="appBar" role="banner">
    <!-- Logo -->
    <a href="/index.html" class="app-bar__logo">Calculator<span>Ese</span></a>

    <!-- Center Nav with Mega Dropdowns -->
    <nav class="app-nav" id="appNav" aria-label="Main navigation">
      <a href="/index.html" class="app-nav__item ${activeCat === 'home' ? 'active' : ''}">Home</a>

      <!-- Financial -->
      <div class="app-nav__group ${activeCat === 'financial' ? 'active' : ''}" id="navFinancial">
        <button class="app-nav__item has-dropdown" aria-haspopup="true" aria-expanded="false">
          💰 Financial <span class="nav-chevron">▾</span>
        </button>
        <div class="mega-menu" role="menu">
          <div class="mega-menu__header">
            <div class="mega-menu__cat-icon">💰</div>
            <div>
              <div class="mega-menu__cat-title">Financial Calculators</div>
              <div class="mega-menu__cat-desc">Plan your money, loans, and investments</div>
            </div>
          </div>
          <div class="mega-menu__grid">${megaItems(fin)}</div>
        </div>
      </div>

      <!-- Health -->
      <div class="app-nav__group ${activeCat === 'health' ? 'active' : ''}" id="navHealth">
        <button class="app-nav__item has-dropdown" aria-haspopup="true" aria-expanded="false">
          ❤️ Health <span class="nav-chevron">▾</span>
        </button>
        <div class="mega-menu" role="menu">
          <div class="mega-menu__header">
            <div class="mega-menu__cat-icon">❤️</div>
            <div>
              <div class="mega-menu__cat-title">Health Calculators</div>
              <div class="mega-menu__cat-desc">Track your fitness and body metrics</div>
            </div>
          </div>
          <div class="mega-menu__grid">${megaItems(hlth)}</div>
        </div>
      </div>

      <!-- Math -->
      <div class="app-nav__group ${activeCat === 'math' ? 'active' : ''}" id="navMath">
        <button class="app-nav__item has-dropdown" aria-haspopup="true" aria-expanded="false">
          🔢 Math <span class="nav-chevron">▾</span>
        </button>
        <div class="mega-menu" role="menu">
          <div class="mega-menu__header">
            <div class="mega-menu__cat-icon">🔢</div>
            <div>
              <div class="mega-menu__cat-title">Math Calculators</div>
              <div class="mega-menu__cat-desc">Scientific, fractions, grades & more</div>
            </div>
          </div>
          <div class="mega-menu__grid">${megaItems(math)}</div>
        </div>
      </div>
    </nav>

    <!-- Right: Search + CTA + Hamburger -->
    <div class="app-bar__right">
      <!-- Nav Currency Dropdown Container -->
      <div id="navCurrencySelector" style="display: none; margin-right: 12px;"></div>
      
      <!-- Uiverse-style Search -->
      <div class="uv-search" role="search">
        <input type="search" class="uv-search__input" id="headerSearch"
               placeholder="Search calculators…" autocomplete="off" aria-label="Search calculators">
        <button class="uv-search__btn" aria-label="Search" onclick="document.getElementById('headerSearch').focus()">
          <i class="las la-search" style="font-size:1.4rem;"></i>
        </button>
        <div class="search-dropdown" id="headerSearchDropdown" role="listbox" aria-label="Search results"></div>
      </div>
      <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Open navigation menu">☰</button>
    </div>
  </header>
  <!-- Mobile Nav Drawer -->
  <div class="mobile-nav-overlay" id="mobileOverlay"></div>
  <div class="mobile-nav-drawer" id="mobileDrawer">
    <div class="mobile-nav-drawer__head">
      <span class="app-bar__logo">Calculator<span>Ese</span></span>
      <button class="icon-btn" id="mobileClose" aria-label="Close menu">✕</button>
    </div>
    ${buildMobileNav()}
  </div>`;
}

function buildMobileNav() {
  const active = getActivePath();
  const cats = [
    { label: 'Financial', items: CALC_ROUTES.filter(r => r.category === 'Financial') },
    { label: 'Health', items: CALC_ROUTES.filter(r => r.category === 'Health') },
    { label: 'Math', items: CALC_ROUTES.filter(r => r.category === 'Math') },
  ];
  let html = `<a href="/index.html" class="mobile-nav-link ${active === '/' || active === '/index.html' ? 'active' : ''}">🏠 Home</a>`;
  for (const cat of cats) {
    html += `<div class="mobile-nav-group">
          <div class="mobile-nav-group__title">${cat.label}</div>
          ${cat.items.map(item => `<a href="${item.href}" class="mobile-nav-link ${active.endsWith(item.href.split('/').pop()) ? 'active' : ''}">${item.icon} ${item.title}</a>`).join('')}
        </div>`;
  }
  return html;
}

/* ============================================================
   FOOTER
   ============================================================ */
function buildFooter() {
  return `
  <footer class="footer" role="contentinfo">
    <div class="footer-grid">
      <div>
        <div class="footer__logo">CalculatorEse</div>
        <p class="footer__desc">Your all-in-one calculator suite for financial planning, health tracking, and mathematical computations. Free, fast, and always accurate.</p>
      </div>
      <div class="footer-col">
        <h4>Financial</h4>
        ${CALC_ROUTES.filter(r => r.category === 'Financial').map(r => `<a href="${r.href}">${r.title}</a>`).join('')}
      </div>
      <div class="footer-col">
        <h4>Health</h4>
        ${CALC_ROUTES.filter(r => r.category === 'Health').map(r => `<a href="${r.href}">${r.title}</a>`).join('')}
      </div>
      <div class="footer-col">
        <h4>Math</h4>
        ${CALC_ROUTES.filter(r => r.category === 'Math').map(r => `<a href="${r.href}">${r.title}</a>`).join('')}
      </div>
    </div>
    <div class="footer__bottom">
      <div class="footer__copyright">© ${new Date().getFullYear()} CalculatorEse. All rights reserved.</div>
      <div style="font-size:0.8rem;color:var(--text-disabled);">Built with ♥ using HTML, CSS & JavaScript</div>
    </div>
  </footer>`;
}

/* ============================================================
   INJECT LAYOUT
   ============================================================ */
function injectLayout() {
  const shell = document.querySelector('.app-shell');
  if (!shell) return;
  shell.insertAdjacentHTML('afterbegin', buildAppBar());
  shell.insertAdjacentHTML('beforeend', buildFooter());

  // Inject Line Awesome CSS if not present
  if (!document.querySelector('link[href*="line-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css';
    document.head.appendChild(link);
  }

  initMegaMenu();
  initMobileMenu();
  initSearch();
  initScrollBehavior();
}

/* ============================================================
   MEGA MENU
   ============================================================ */
function initMegaMenu() {
  const groups = document.querySelectorAll('.app-nav__group');

  let activeGroup = null;
  let closeTimer = null;

  function openGroup(grp) {
    if (activeGroup && activeGroup !== grp) closeGroup(activeGroup, true);
    clearTimeout(closeTimer);
    grp.classList.add('open');
    const btn = grp.querySelector('.app-nav__item');
    if (btn) btn.setAttribute('aria-expanded', 'true');
    activeGroup = grp;
  }

  function closeGroup(grp, immediate = false) {
    const doClose = () => {
      grp.classList.remove('open');
      const btn = grp.querySelector('.app-nav__item');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (activeGroup === grp) activeGroup = null;
    };
    if (immediate) { doClose(); return; }
    closeTimer = setTimeout(doClose, 150);
  }

  groups.forEach(grp => {
    const btn = grp.querySelector('.app-nav__item');
    const menu = grp.querySelector('.mega-menu');

    // Click toggle
    btn.addEventListener('click', e => {
      e.stopPropagation();
      grp.classList.contains('open') ? closeGroup(grp, true) : openGroup(grp);
    });

    // Hover open
    grp.addEventListener('mouseenter', () => openGroup(grp));
    grp.addEventListener('mouseleave', () => closeGroup(grp));

    // Keep open when hovering menu itself
    if (menu) {
      menu.addEventListener('mouseenter', () => clearTimeout(closeTimer));
      menu.addEventListener('mouseleave', () => closeGroup(grp));
    }
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (activeGroup && !activeGroup.contains(e.target)) closeGroup(activeGroup, true);
  });

  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeGroup) closeGroup(activeGroup, true);
  });
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('mobileClose');
  if (!toggle || !drawer) return;

  function open() { drawer.classList.add('open'); overlay.classList.add('visible'); document.body.style.overflow = 'hidden'; }
  function close() { drawer.classList.remove('open'); overlay.classList.remove('visible'); document.body.style.overflow = ''; }

  toggle.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ============================================================
   SCROLL HIDE
   ============================================================ */
function initScrollBehavior() {
  const bar = document.getElementById('appBar');
  if (!bar) return;
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    bar.classList.toggle('scrolled', y > 20);
    bar.classList.toggle('hidden', y > lastY && y > 80);
    lastY = y;
  }, { passive: true });
}

/* ============================================================
   SEARCH
   ============================================================ */
function initSearch() {
  const input = document.getElementById('headerSearch');
  const dropdown = document.getElementById('headerSearchDropdown');
  if (!input || !dropdown) return;

  function renderResults(q) {
    if (!q.trim()) { dropdown.classList.remove('visible'); return; }
    const matches = CALC_ROUTES.filter(r =>
      r.title.toLowerCase().includes(q.toLowerCase()) ||
      r.category.toLowerCase().includes(q.toLowerCase()) ||
      r.desc.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 8);

    dropdown.innerHTML = matches.length
      ? matches.map(r => `
        <a class="search-result-item" href="${r.href}">
          <span style="font-size:1.2rem">${r.icon}</span>
          <div>
            <div>${r.title}</div>
            <div class="search-result-item__cat">${r.category} · ${r.desc}</div>
          </div>
        </a>`).join('')
      : `<div class="search-result-item" style="color:var(--text-disabled)">No results for "${q}"</div>`;
    dropdown.classList.add('visible');
  }

  input.addEventListener('input', e => renderResults(e.target.value));
  input.addEventListener('focus', e => { if (e.target.value) renderResults(e.target.value); });
  document.addEventListener('click', e => {
    if (!input.closest('.uv-search').contains(e.target)) dropdown.classList.remove('visible');
  });

  // Hero search
  const heroSearch = document.getElementById('heroSearch');
  if (heroSearch) {
    const heroDropdown = document.getElementById('heroSearchDropdown');
    heroSearch.addEventListener('input', e => {
      const q = e.target.value;
      if (!heroDropdown || !q.trim()) { heroDropdown?.classList.remove('visible'); return; }
      const matches = CALC_ROUTES.filter(r =>
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.category.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 10);
      heroDropdown.innerHTML = matches.map(r => `
        <a class="search-result-item" href="${r.href}">
          <span style="font-size:1.2rem">${r.icon}</span>
          <div>
            <div>${r.title}</div>
            <div class="search-result-item__cat">${r.category} · ${r.desc}</div>
          </div>
        </a>`).join('');
      heroDropdown.classList.toggle('visible', matches.length > 0);
    });
    document.addEventListener('click', e => {
      if (heroDropdown && !heroSearch.contains(e.target)) heroDropdown.classList.remove('visible');
    });
  }
}

/* ============================================================
   RIPPLE EFFECT
   ============================================================ */
function addRipple(btn) {
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;
    const rect = this.getBoundingClientRect();
    circle.style.cssText = `width:${diameter}px;height:${diameter}px;left:${e.clientX - rect.left - radius}px;top:${e.clientY - rect.top - radius}px;`;
    circle.classList.add('ripple');
    this.querySelector('.ripple')?.remove();
    this.appendChild(circle);
  });
}

/* ============================================================
   TAB SYSTEM
   ============================================================ */
function initTabs(container) {
  const tabs = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tab-panel');
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      panels[i]?.classList.add('active');
    });
  });
  if (tabs[0]) { tabs[0].classList.add('active'); panels[0]?.classList.add('active'); }
}

/* ============================================================
   CURRENCY LOGIC (Global Top Currencies)
   ============================================================ */
const CURRENCIES = {
  USD: "🇺🇸 USD ($)",
  EUR: "🇪🇺 EUR (€)",
  GBP: "🇬🇧 GBP (£)",
  JPY: "🇯🇵 JPY (¥)",
  INR: "🇮🇳 INR (₹)",
  CAD: "🇨🇦 CAD ($)",
  AUD: "🇦🇺 AUD ($)",
  CHF: "🇨🇭 CHF (CHF)",
  CNY: "🇨🇳 CNY (¥)",
  BRL: "🇧🇷 BRL (R$)",
  MXN: "🇲🇽 MXN ($)",
  ZAR: "🇿🇦 ZAR (R)"
};

let currentCurrency = 'USD';

function initGlobalCurrencySelector() {
  const isFinancePage = window.location.pathname.includes('/financial/');
  const container = document.getElementById('navCurrencySelector');

  if (!container || !isFinancePage) return; // Only show on financial pages
  container.style.display = 'block';

  const select = document.createElement('select');
  select.className = 'mui-select';
  select.style.padding = '8px 32px 8px 16px';
  select.style.minWidth = '140px';
  select.style.fontSize = '0.9rem';
  select.style.height = '44px';

  // Create dropdown options
  for (const [code, label] of Object.entries(CURRENCIES)) {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = label;
    if (code === currentCurrency) opt.selected = true;
    select.appendChild(opt);
  }

  select.addEventListener('change', (e) => {
    currentCurrency = e.target.value;
    updateCurrencyPrefixes();

    // Automatically re-trigger calculations if a results panel is showing
    if (typeof window.calcPayment === 'function' && document.getElementById('payResult')?.style.display !== 'none') window.calcPayment();
    if (typeof window.calcLoanAmt === 'function' && document.getElementById('amtResult')?.style.display !== 'none') window.calcLoanAmt();
    if (typeof window.calcLoanTerm === 'function' && document.getElementById('termResult')?.style.display !== 'none') window.calcLoanTerm();

    if (typeof window.calculateMortgage === 'function' && document.getElementById('resultsPanel')?.style.display !== 'none') window.calculateMortgage();

    if (typeof window.calcSimple === 'function' && document.getElementById('si_result')?.style.display !== 'none') window.calcSimple();
    if (typeof window.calcCompound === 'function' && document.getElementById('ci_result')?.style.display !== 'none') window.calcCompound();
    if (typeof window.calcCompoundAdv === 'function' && document.getElementById('compResult')?.style.display !== 'none') window.calcCompoundAdv();

    if (typeof window.calcInvestment === 'function' && document.getElementById('invResult')?.style.display !== 'none') window.calcInvestment();

    if (typeof window.findPayment === 'function' && document.getElementById('pp_result')?.style.display !== 'none') window.findPayment();
    if (typeof window.findAmount === 'function' && document.getElementById('pa_result')?.style.display !== 'none') window.findAmount();
    if (typeof window.findTerm === 'function' && document.getElementById('pt_result')?.style.display !== 'none') window.findTerm();
  });

  container.innerHTML = '';
  container.appendChild(select);
  updateCurrencyPrefixes();
}

function getCurrencySymbol() {
  // Little hack to get the native symbol for the input boxes (like $ / €)
  try {
    const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency });
    const parts = formatter.formatToParts(0);
    return parts.find(p => p.type === 'currency')?.value || '$';
  } catch (e) { return '$'; }
}

function updateCurrencyPrefixes() {
  const symbol = getCurrencySymbol();
  document.querySelectorAll('.input-prefix.currency').forEach(el => {
    el.textContent = symbol;
  });
}

function fmtCurrency(val, currency = null) {
  const code = currency || currentCurrency;
  let decimals = 2;
  // JPY, KRW and a few others natively have 0 decimal places. Intl automatically handles most, but let's enforce min/max.
  if (['JPY', 'KRW', 'CLP', 'UGX', 'VND'].includes(code)) decimals = 0;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(val);
}
function fmtNumber(val, decimals = 2) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(val);
}
function fmtPercent(val, decimals = 2) {
  return `${fmtNumber(val, decimals)}%`;
}
function animateValue(el, from, to, duration = 600, formatter = v => v) {
  const start = performance.now();
  function step(ts) {
    const p = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = formatter(from + (to - from) * ease);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function initAnimateIn() {
  const els = document.querySelectorAll('.animate-in');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.style.opacity = 1); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = 1; observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => { el.style.opacity = 0; observer.observe(el); });
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initGlobalCurrencySelector();
  document.querySelectorAll('.btn').forEach(addRipple);
  document.querySelectorAll('.sci-btn').forEach(addRipple);
  document.querySelectorAll('[data-tabs]').forEach(initTabs);
  initAnimateIn();
});

window.CalculatorEse = {
  fmtCurrency, fmtNumber, fmtPercent, animateValue, addRipple, initTabs,
  CURRENCIES, getCurrencySymbol, CALC_ROUTES
};
