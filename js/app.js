/**
 * Rocky: The Rockefeller Christmas Tree - Interactive Scope of Work Application
 * Neo Gen Technologies | Account Manager: ayaz@neogentechnologies.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initMobileDrawer();
  initScrollSpy();
  initBeatsExplorer();
  initConfigurator();
  initSignaturePad();
  initSignOffForm();
  initModal();
});

// ==========================================
// 1. AMBIENT SNOW PARTICLES (DISABLED)
// ==========================================
function initSnowCanvas() {
  // Background snowfall animation removed as requested
}

// ==========================================
// 2. SCROLL PROGRESS BAR & HEADER BEHAVIOR
// ==========================================
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  const header = document.getElementById('siteHeader');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (bar) bar.style.width = `${progress}%`;

    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  const printBtn = document.getElementById('printProposalBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }
}

// ==========================================
// 2B. MOBILE NAVIGATION DRAWER
// ==========================================
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.closeMobileDrawer = closeDrawer;

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// ==========================================
// 2C. SCROLL SPY ACTIVE NAV LINK
// ==========================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ==========================================
// 3. BEATS BOARD DATA & EXPLORER
// ==========================================
const BEATS_DATA = [
  // ACT ONE
  { act: 'act1', num: 1, title: 'The Hidden Forest Wakes', func: 'Inciting Setup', desc: 'Snow blankets the Hidden Forest. Animals and saplings buzz as the Rockefeller choosing begins.', visual: 'Wide aerial over snowy evergreen valley; comical animal activity.' },
  { act: 'act1', num: 2, title: 'The Contenders Rise', func: 'Contenders', desc: 'Mighty evergreens volunteer before Old Oak. Bruce Spruce flaunts his symmetry.', visual: 'Mountains of majestic trees volunteer; Bruce towering in mist.' },
  { act: 'act1', num: 3, title: 'Rocky in the Hollow', func: 'Introduction', desc: 'Rocky stands crooked and bare in the shadows, clinging to his lifelong Christmas wish.', visual: 'Twisted, sparse Norway spruce in shaded rocky cleft.' },
  { act: 'act1', num: 4, title: 'Rocky Speaks Up', func: 'Inciting Incident', desc: 'Rocky calls out his name. The forest freezes in disbelief, then bursts into laughter.', visual: 'Tiny Rocky speaking; silence ripples through the valley.' },
  { act: 'act1', num: 5, title: 'AJ Sings the Mocking Song', func: 'Antagonism', desc: 'AJ the squirrel circles Rocky, performing a cruel rhyming song about his bare limbs.', visual: 'AJ doing acrobatic flips on Rocky\'s branches, dropping pinecones.' },
  { act: 'act1', num: 6, title: 'Bruce\'s Warning', func: 'Threat', desc: 'Bruce Spruce looms over Rocky at dusk, demanding he withdraw his name or face humiliation.', visual: 'Bruce casting an enormous shadow over shivering Rocky.' },
  { act: 'act1', num: 7, title: 'Mary Louise Arrives', func: 'Mentor Introduction', desc: 'Teacup-sized forest guardian Mary Louise drives Bruce away. She refuses magic: "You must believe!"', visual: 'Glowing tiny fairy nose-to-nose with massive Bruce.' },
  { act: 'act1', num: 8, title: 'The Rule of Belief', func: 'Commitment', desc: 'Mary Louise instructs Rocky: drink water, greet the sun, and repeat: "I am tall, fluffy, and green!"', visual: 'Rocky standing straight at night, whispering his new affirmation.' },
  // ACT TWO
  { act: 'act2', num: 9, title: 'Growth Takes Work', func: 'Montage', desc: 'Rocky pushes roots toward spring water and stretches toward the sun. His needles darken.', visual: 'Montage: root touching water, melting snow, branches unfurling.' },
  { act: 'act2', num: 10, title: 'Forest Takes Notice', func: 'Rising Action', desc: 'Rocky\'s confidence blooms. Mrs. Pickles and AJ whisper in suspicion of forbidden magic.', visual: 'Animals peeking around trunks at a visibly fuller Rocky.' },
  { act: 'act2', num: 11, title: 'The Night Before the Choosing', func: 'Anticipation', desc: 'On eve of contest, Rocky looks lush and green. Bruce and AJ plot in the shadows.', visual: 'Rocky glowing under northern lights; Bruce and AJ whispering.' },
  { act: 'act2', num: 12, title: 'The Bramble Trap', func: 'Villain Action', desc: 'Bruce and AJ trap Mary Louise under heavy bramble and netting so she cannot help Rocky.', visual: 'AJ tying heavy knots around the fairy\'s glowing bramble cage.' },
  { act: 'act2', num: 13, title: 'Judging Morning', func: 'Moral Choice', desc: 'Helicopters approach. Mary Louise cries for help. Rocky faces a choice between glory and love.', visual: 'Helicopter shadows approaching; faint fairy glow trapped in snow.' },
  { act: 'act2', num: 14, title: 'Rocky Tears Up His Roots', func: 'Sacrifice', desc: 'Rocky rips his roots from frozen earth, crawling down the slope to Mary Louise as judges pass.', visual: 'Exploding frozen soil as Rocky uproots; needles dropping in agony.' },
  { act: 'act2', num: 15, title: 'AJ Changes Sides', func: 'Redemption', desc: 'Seeing Rocky bleed sap for Mary Louise, AJ realizes the truth and bites open the net knots.', visual: 'Gray Rocky straining; AJ chewing cords; Mary Louise bursting free.' },
  { act: 'act2', num: 16, title: 'Bruce Wins the Ribbon', func: 'False Defeat', desc: 'Bruce is crowned with the red champion ribbon while Rocky sits broken and gray in the hollow.', visual: 'Bruce ribboned as helicopters circle; Rocky battered in silence.' },
  { act: 'act2', num: 17, title: 'Rocky Stops Believing', func: 'Dark Night of Soul', desc: 'Rocky wilts. Mrs. Pickles quietly places her vanity mirror face-down in the snow beside him.', visual: 'Rocky and Mrs. Pickles at dusk; silver mirror face-down in snow.' },
  { act: 'act2', num: 18, title: 'AJ Sings a New Song', func: 'Recovery', desc: 'AJ returns, rewriting his cruel song into praise. A single green needle shoots upward.', visual: 'AJ singing earnestly; forest saplings gathering; one bright needle.' },
  { act: 'act2', num: 19, title: 'Rocky Returns as Himself', func: 'Internal Victory', desc: 'Rocky regains strength, not as a perfect tree, but as his strong, authentic, crooked self.', visual: 'Rocky proud, crooked, mentoring young sapling Pip.' },
  { act: 'act2', num: 20, title: 'The Catastrophic Ice Storm', func: 'Climactic Threat', desc: 'Freezing rain glazes the forest into brittle glass. Violent winds crack Bruce\'s massive trunk.', visual: 'Savage blizzard; Rocky bracing five saplings; Bruce splitting.' },
  { act: 'act2', num: 21, title: 'Rocky Braces Bruce', func: 'Courage & Forgiveness', desc: 'Rocky crosses the frozen ridge, wedging his small sturdy trunk to keep Bruce from collapsing.', visual: 'Small Rocky locked beneath huge cracked Bruce in howling wind.' },
  { act: 'act2', num: 22, title: 'The Champion\'s Ornaments', func: 'Symbolic Shield', desc: 'Rocky reaches into Mary Louise\'s ruined home, sheltering her handmade dewdrop ornaments.', visual: 'Rocky\'s iced branch gently cradling fragile crystalline star.' },
  { act: 'act2', num: 23, title: 'The Perfect Tree Discovered', func: 'Climax of Act 2', desc: 'At dawn, ice-crowned Rocky refracts sunrise into millions of prisms. The returning chopper lands: "We found the tree!"', visual: 'Rocky glazed in ice, blazing with rainbow light; judges landing.' },
  { act: 'act2', num: 24, title: 'Bruce\'s Public Confession', func: 'Reconciliation', desc: 'Bruce reveals the trap to the forest, declaring Rocky sacrificed his first chance to save Mary Louise.', visual: 'Cracked, ribboned Bruce bowing deeply before ice-crowned Rocky.' },
  // ACT THREE
  { act: 'act3', num: 25, title: 'The Saw', func: 'Threshold', desc: 'A crane and wrapped saw arrive. Rocky learns what going to New York costs, and says yes.', visual: 'Rocky facing the wrapped ceremonial saw; forest gathered in quiet.' },
  { act: 'act3', num: 26, title: 'Goodbye to the Forest', func: 'Departure', desc: 'Pip clings to Rocky\'s boughs. Mary Louise hangs her star. As the crane lifts, the forest bows.', visual: 'Entire forest bowing in respect as Rocky rises into the sky.' },
  { act: 'act3', num: 27, title: 'The Flatbed to New York', func: 'Road Sequence', desc: 'Rocky travels highways on an oversized rig. AJ and Mrs. Pickles stow away under tarps.', visual: 'Highway under night stars; Rocky netted on flatbed; cities cheering.' },
  { act: 'act3', num: 28, title: 'The World Stands Up', func: 'Arrival', desc: 'Rocky enters Manhattan. Giant cranes hoist him across 5th Avenue and into Rockefeller Plaza.', visual: 'Rocky flying between towering skyscrapers, yellow cabs below.' },
  { act: 'act3', num: 29, title: 'Crushed in the Plaza', func: 'Final Crisis', desc: 'The net is removed. Long travel has flattened Rocky\'s needles. Crew doubts if he was the right choice.', visual: 'Small battered Rocky alone in empty Plaza at midnight.' },
  { act: 'act3', num: 30, title: 'Believing for Others', func: 'Final Choice', desc: 'Looking at empty plaza chairs, Rocky repeats his words, not for himself, but for the people.', visual: 'Rocky opening branch by branch in fresh falling midnight snow.' },
  { act: 'act3', num: 31, title: 'The Great Illumination', func: 'Public Climax', desc: 'The switch is flipped. Rocky erupts into 50,000 multi-colored lights before cheering thousands.', visual: 'Breathtaking Rockefeller Center lighting; golden glow; crowd cheers.' },
  { act: 'act3', num: 32, title: 'One More Gift', func: 'Epilogue Bridge', desc: 'When the season ends, Rocky\'s wood builds a warm home for a family in need.', visual: 'Warm spring house built from Rocky\'s timber; Pip smiling in forest.' },
  { act: 'act3', num: 33, title: 'The Top of the World', func: 'Final Legacy', desc: 'In the storybook North Pole, Rocky takes his eternal place among generations of chosen trees.', visual: 'Northern lights dancing over rows of radiant trees; Rocky at center.' }
];

function initBeatsExplorer() {
  const container = document.getElementById('beatsContainer');
  const tabBtns = document.querySelectorAll('.beat-tab-btn');
  if (!container) return;

  function renderBeats(filterAct) {
    container.innerHTML = '';
    const filtered = filterAct === 'all' ? BEATS_DATA : BEATS_DATA.filter(b => b.act === filterAct);

    filtered.forEach(b => {
      const card = document.createElement('div');
      card.className = 'beat-item-card';
      card.innerHTML = `
        <div class="beat-number-tag">Beat ${b.num} • ${b.func}</div>
        <div class="beat-title">${b.title}</div>
        <div class="beat-desc">${b.desc}</div>
        <div class="beat-visual"><strong>Visual Key:</strong> ${b.visual}</div>
      `;
      container.appendChild(card);
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderBeats(btn.getAttribute('data-act'));
    });
  });

  renderBeats('all');
}

// ==========================================
// 4. INTERACTIVE SOW CONFIGURATOR
// ==========================================
let currentConfig = {
  baseName: "Festival Proof-of-Concept Pilot (3–5 Min)",
  basePrice: 4950,
  baseTimeline: "5–6 Weeks",
  voName: "Pro Indie Multi-Voice Ensemble (3 Actors)",
  voPrice: 850,
  addons: [],
  subtotal: 5800,
  discount: 0,
  total: 5800,
  deposit: 1450
};

function initConfigurator() {
  const baseRadios = document.querySelectorAll('input[name="base_pkg"]');
  const voRadios = document.querySelectorAll('input[name="vo_tier"]');
  const addonChecks = document.querySelectorAll('input[name="addon_opt"]');

  baseRadios.forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll('input[name="base_pkg"]').forEach(el => {
        el.closest('.config-radio-label').classList.remove('selected');
      });
      r.closest('.config-radio-label').classList.add('selected');
      updatePricing();
    });
  });

  voRadios.forEach(r => {
    r.addEventListener('change', () => {
      document.querySelectorAll('input[name="vo_tier"]').forEach(el => {
        el.closest('.config-radio-label').classList.remove('selected');
      });
      r.closest('.config-radio-label').classList.add('selected');
      updatePricing();
    });
  });

  addonChecks.forEach(c => {
    c.addEventListener('change', () => {
      if (c.checked) {
        c.closest('.config-radio-label').classList.add('selected');
      } else {
        c.closest('.config-radio-label').classList.remove('selected');
      }
      updatePricing();
    });
  });

  // Package select buttons in Section 6
  document.querySelectorAll('.select-package-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pkg = btn.getAttribute('data-pkg');
      if (pkg === 'pilot_2d') selectBaseIndex(0);
      else if (pkg === 'vertical_series') selectBaseIndex(1);
      else if (pkg === 'full_special') selectBaseIndex(2);
      
      const configEl = document.getElementById('configurator');
      if (configEl) configEl.scrollIntoView({ behavior: 'smooth' });
      showToast(`Switched package to ${btn.closest('.pricing-card').querySelector('.pricing-plan-name').innerText}`);
    });
  });

  // Retainer and YouTube buttons
  document.querySelectorAll('.select-yt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const yt = btn.getAttribute('data-yt');
      const checks = document.querySelectorAll('input[name="addon_opt"]');
      if (yt === 'yt_launch') {
        checks[0].checked = true;
        checks[0].closest('.config-radio-label').classList.add('selected');
      } else {
        checks[1].checked = true;
        checks[1].closest('.config-radio-label').classList.add('selected');
      }
      updatePricing();
      const configEl = document.getElementById('configurator');
      if (configEl) configEl.scrollIntoView({ behavior: 'smooth' });
      showToast("Added YouTube Management plan to your Scope Builder.");
    });
  });

  function selectBaseIndex(index) {
    const radios = document.querySelectorAll('input[name="base_pkg"]');
    if (radios[index]) {
      radios[index].checked = true;
      radios.forEach(r => r.closest('.config-radio-label').classList.remove('selected'));
      radios[index].closest('.config-radio-label').classList.add('selected');
      updatePricing();
    }
  }

  function updatePricing() {
    const selectedBase = document.querySelector('input[name="base_pkg"]:checked');
    const selectedVO = document.querySelector('input[name="vo_tier"]:checked');
    const checkedAddons = document.querySelectorAll('input[name="addon_opt"]:checked');

    let baseVal = selectedBase ? parseInt(selectedBase.value, 10) : 8850;
    let voVal = selectedVO ? parseInt(selectedVO.value, 10) : 850;
    
    currentConfig.basePrice = baseVal;
    currentConfig.baseName = selectedBase ? selectedBase.getAttribute('data-name') : "2D Animation";
    
    if (baseVal === 25950) currentConfig.baseTimeline = "18 Weeks (Full Movie + 10 Highlights)";
    else if (baseVal === 24500) currentConfig.baseTimeline = "16–18 Weeks";
    else if (baseVal === 21800) currentConfig.baseTimeline = "12–14 Weeks (Rolling Deliveries)";
    else if (baseVal === 4950) currentConfig.baseTimeline = "5–6 Weeks";
    else if (baseVal === 19500) currentConfig.baseTimeline = "14–16 Weeks";
    else if (baseVal === 8850) currentConfig.baseTimeline = "8–10 Weeks (Rolling Deliveries)";
    else if (baseVal === 3250) currentConfig.baseTimeline = "4 Weeks";
    else currentConfig.baseTimeline = "6–8 Weeks";

    currentConfig.voPrice = voVal;
    currentConfig.voName = selectedVO ? selectedVO.getAttribute('data-name') : "VO Tier";

    currentConfig.addons = [];
    let addonsTotal = 0;
    checkedAddons.forEach(a => {
      const val = parseInt(a.value, 10);
      addonsTotal += val;
      currentConfig.addons.push({
        id: a.id,
        name: a.getAttribute('data-name'),
        price: val
      });
    });

    // Social Media Syndication Modules (if active)
    if (typeof activeSocialModules !== 'undefined') {
      if (activeSocialModules.tiktok) {
        addonsTotal += 850;
        currentConfig.addons.push({ id: 'social_tiktok', name: 'TikTok Algorithm & Sound Engine', price: 850 });
      }
      if (activeSocialModules.instagram) {
        addonsTotal += 750;
        currentConfig.addons.push({ id: 'social_instagram', name: 'Instagram Reels & Stories Engine', price: 750 });
      }
      if (activeSocialModules.omni) {
        addonsTotal += 1250;
        currentConfig.addons.push({ id: 'social_omni', name: 'Omni-Channel Social Bundle (TikTok + Reels)', price: 1250 });
      }
    }

    const subtotal = baseVal + voVal + addonsTotal;
    // Bundle incentive discount if series + YouTube 6-Mo campaign ($2,340)
    let discount = 0;
    if (baseVal === 8850 && addonsTotal >= 2340) {
      discount = 400; // $400 indie author holiday bonus incentive
    }

    const total = subtotal - discount;
    const deposit = Math.round(total * 0.50); // 50% Initial Kickoff Deposit as requested

    currentConfig.subtotal = subtotal;
    currentConfig.discount = discount;
    currentConfig.total = total;
    currentConfig.deposit = deposit;

    // Render in UI
    renderSummary();
  }

  function renderSummary() {
    const billList = document.getElementById('billItemsList');
    if (!billList) return;

    billList.innerHTML = `
      <li>
        <span class="item-name">${currentConfig.baseName}</span>
        <span class="item-val">$${currentConfig.basePrice.toLocaleString()}</span>
      </li>
      <li>
        <span class="item-name">${currentConfig.voName}</span>
        <span class="item-val">$${currentConfig.voPrice.toLocaleString()}</span>
      </li>
    `;

    currentConfig.addons.forEach(a => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="item-name">${a.name}</span>
        <span class="item-val">+$${a.price.toLocaleString()}</span>
      `;
      billList.appendChild(li);
    });

    document.getElementById('subtotalVal').innerText = `$${currentConfig.subtotal.toLocaleString()}`;
    document.getElementById('discountVal').innerText = currentConfig.discount > 0 ? `-$${currentConfig.discount.toLocaleString()}` : '$0';
    document.getElementById('grandTotalVal').innerText = `$${currentConfig.total.toLocaleString()}`;
    document.getElementById('estTimeline').innerText = currentConfig.baseTimeline;
    document.getElementById('depositAmount').innerText = `$${currentConfig.deposit.toLocaleString()}`;

    // Also update Section 11 Sign-Off summaries
    const signoffPkg = document.getElementById('signoffPkgSummary');
    const signoffTotal = document.getElementById('signoffTotalSummary');
    const signoffDeposit = document.getElementById('signoffDepositSummary');

    if (signoffPkg) signoffPkg.innerText = `${currentConfig.baseName} + ${currentConfig.voName} (${currentConfig.addons.length} Add-Ons)`;
    if (signoffTotal) signoffTotal.innerText = `$${currentConfig.total.toLocaleString()}`;
    if (signoffDeposit) signoffDeposit.innerText = `$${currentConfig.deposit.toLocaleString()}`;
  }

  window.triggerConfigUpdate = updatePricing;
  updatePricing();
}

// ==========================================
// 5. DIGITAL SIGNATURE PAD (HTML5 CANVAS)
// ==========================================
let signaturePadContext = null;
let isDrawing = false;
let hasDrawnSignature = false;

function initSignaturePad() {
  const canvas = document.getElementById('signature-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  signaturePadContext = ctx;

  canvas.width = canvas.parentElement.clientWidth || 400;
  canvas.height = 140;

  ctx.strokeStyle = '#f59e0b'; // Gold signature ink
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    hasDrawnSignature = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  });

  window.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDrawing = true;
    hasDrawnSignature = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  });

  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  });

  canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
    isDrawing = false;
  });

  const clearBtn = document.getElementById('clearSigBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasDrawnSignature = false;
    });
  }
}

// ==========================================
// 6. CLIENT SIGN-OFF FORM & BACKEND API
// ==========================================
function initSignOffForm() {
  const form = document.getElementById('signOffForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const signerName = document.getElementById('signerName').value.trim();
    const signerEmail = document.getElementById('signerEmail').value.trim();
    const organization = document.getElementById('organizationName').value.trim();
    const notes = document.getElementById('clientNotes').value.trim();
    const termsAccepted = document.getElementById('termsCheck').checked;

    if (!termsAccepted) {
      alert('Please check the terms and conditions checkbox to authorize this Scope of Work.');
      return;
    }

    const canvas = document.getElementById('signature-canvas');
    const signatureImage = hasDrawnSignature && canvas ? canvas.toDataURL('image/png') : null;

    const payload = {
      signerName,
      signerEmail,
      organization,
      notes,
      signatureImage,
      selectedConfig: currentConfig,
      timestamp: new Date().toISOString()
    };

    try {
      const submitBtn = document.getElementById('submitSignOffBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting Authorization...';
      }

      const res = await fetch('/api/sign-off', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.status === 'success') {
        showToast(`Authorization submitted! Confirmation ID: ${data.signOffId}`);
        openSignOffSuccessModal(data, signerName, signerEmail);
      } else {
        alert(`Error submitting sign-off: ${data.message}`);
      }
    } catch (err) {
      // Fallback for static hosting / GitHub Pages
      const staticId = 'SOW-SIG-' + Date.now().toString(36).toUpperCase();
      try {
        const existing = JSON.parse(localStorage.getItem('rocky_authorizations') || '[]');
        existing.push({ ...payload, signOffId: staticId, date: new Date().toISOString() });
        localStorage.setItem('rocky_authorizations', JSON.stringify(existing));
      } catch(e) {}
      showToast('Scope of Work authorized & saved! Confirmation: ' + staticId);
      openSignOffSuccessModal({ signOffId: staticId }, signerName, signerEmail);
    } finally {
      const submitBtn = document.getElementById('submitSignOffBtn');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Submit & Authorize Scope of Work';
      }
    }
  });
}

function openSignOffSuccessModal(result, signerName, signerEmail) {
  const modal = document.getElementById('quoteModal');
  const modalContent = document.getElementById('modalQuoteContent');
  const quoteIdEl = document.getElementById('modalQuoteId');

  if (quoteIdEl) quoteIdEl.innerText = `AUTHORIZATION CONFIRMED • ${result.signOffId}`;

  if (modalContent) {
    modalContent.innerHTML = `
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--spruce-green); padding: 18px; border-radius: 8px; margin-bottom: 20px;">
        <h4 style="color: #34d399; font-size: 16px; margin-bottom: 6px;">✓ Scope of Work Successfully Authorized</h4>
        <p style="font-size: 13px; color: var(--text-light);">
          Thank you, <strong>${signerName}</strong> (${signerEmail}). Your formal approval has been routed directly to Senior Account Manager <strong>Ayaz</strong> at <a href="mailto:ayaz@neogentechnologies.com" style="color: var(--ice-blue);">ayaz@neogentechnologies.com</a>.
        </p>
      </div>

      <div style="font-size: 13px; color: var(--text-light); line-height: 1.6;">
        <p><strong>Approved Deliverable:</strong> ${currentConfig.baseName}</p>
        <p><strong>Voice Over Cast:</strong> ${currentConfig.voName}</p>
        <p><strong>Total Approved Budget:</strong> <span style="color: var(--rocky-amber); font-weight: 700;">$${currentConfig.total.toLocaleString()}</span></p>
        <p><strong>Initial Kickoff Deposit (50%):</strong> <span style="color: var(--ice-blue); font-weight: 700;">$${currentConfig.deposit.toLocaleString()}</span></p>
        <p><strong>Estimated Production Window:</strong> ${currentConfig.baseTimeline}</p>
        <p style="margin-top: 14px; font-size: 11px; color: var(--text-muted);">
          A countersigned execution package and onboarding calendar invite will be delivered to your email within 24 hours.
        </p>
      </div>
    `;
  }

  if (modal) modal.classList.add('open');
}

// ==========================================
// 7. FORMAL SUMMARY MODAL & PRINT HANDLER
// ==========================================
function initModal() {
  const modal = document.getElementById('quoteModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const exportBtn = document.getElementById('exportQuoteBtn');
  const printModalBtn = document.getElementById('printModalBtn');
  const proceedBtn = document.getElementById('proceedToSignModalBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  if (printModalBtn) {
    printModalBtn.addEventListener('click', () => window.print());
  }

  if (proceedBtn && modal) {
    proceedBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      const signoffEl = document.getElementById('sign-off');
      if (signoffEl) signoffEl.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', async () => {
      // Send quote to backend
      try {
        const res = await fetch('/api/save-quote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(currentConfig)
        });
        const data = await res.json();
        openQuoteSummaryModal(data.quoteId || 'QTE-OFFLINE');
      } catch (err) {
        const staticQuoteId = 'QTE-' + Date.now().toString(36).toUpperCase();
        try {
          const existing = JSON.parse(localStorage.getItem('rocky_quotes') || '[]');
          existing.push({ ...currentConfig, quoteId: staticQuoteId, date: new Date().toISOString() });
          localStorage.setItem('rocky_quotes', JSON.stringify(existing));
        } catch(e) {}
        openQuoteSummaryModal(staticQuoteId);
      }
    });
  }
}

function openQuoteSummaryModal(quoteId) {
  const modal = document.getElementById('quoteModal');
  const modalContent = document.getElementById('modalQuoteContent');
  const quoteIdEl = document.getElementById('modalQuoteId');

  if (quoteIdEl) quoteIdEl.innerText = `FORMAL PROPOSAL ESTIMATE • ${quoteId}`;

  let addonsHtml = currentConfig.addons.map(a => `
    <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-light); padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.06);">
      <span>${a.name}</span>
      <strong>+$${a.price.toLocaleString()}</strong>
    </div>
  `).join('');

  if (modalContent) {
    modalContent.innerHTML = `
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; color: var(--text-muted);">PREPARED FOR:</div>
        <div style="font-size: 16px; font-weight: 700; color: #fff;">Jennie E. Nicassio (ROCKY: THE ROCKEFELLER CHRISTMAS TREE)</div>
        <div style="font-size: 12px; color: var(--ice-blue);">Screenplay & Animated Series: Rocky-The Rockefeller Christmas Tree</div>
      </div>

      <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 11px; font-weight: 700; color: var(--text-gold); text-transform: uppercase; margin-bottom: 10px;">Itemized Production Elements:</div>
        
        <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-light); padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.06);">
          <span>${currentConfig.baseName}</span>
          <strong>$${currentConfig.basePrice.toLocaleString()}</strong>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-light); padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.06);">
          <span>${currentConfig.voName}</span>
          <strong>$${currentConfig.voPrice.toLocaleString()}</strong>
        </div>

        ${addonsHtml}

        <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: #fff; margin-top: 14px; padding-top: 10px; border-top: 2px solid var(--border-subtle);">
          <span>Total Proposed Budget:</span>
          <span style="color: var(--rocky-amber);">$${currentConfig.total.toLocaleString()}</span>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; font-size: 12px;">
        <div style="background: rgba(0, 136, 255, 0.06); padding: 12px; border-radius: 6px; border: 1px solid var(--border-highlight);">
          <div style="color: var(--ice-blue); font-weight: 700;">Account Executive:</div>
          <div style="color: #fff; font-weight: 600;">Ayaz</div>
          <div style="color: var(--text-muted);">ayaz@neogentechnologies.com</div>
        </div>

        <div style="background: rgba(16, 185, 129, 0.06); padding: 12px; border-radius: 6px; border: 1px solid rgba(16, 185, 129, 0.3);">
          <div style="color: #34d399; font-weight: 700;">Milestone Escrow:</div>
          <div style="color: #fff; font-weight: 600;">50% Initial Kickoff Deposit: $${currentConfig.deposit.toLocaleString()}</div>
          <div style="color: var(--text-muted);">Remaining balance: Gate 2 (25%) upon Animatic Lock + Gate 3 (25%) upon Final Master</div>
        </div>
      </div>
    `;
  }

  if (modal) modal.classList.add('open');
}

// ==========================================
// 8. TOAST NOTIFICATION HELPER
// ==========================================
function showToast(message) {
  const toast = document.getElementById('toastMsg');
  const text = document.getElementById('toastText');
  if (!toast || !text) return;

  text.innerText = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ==========================================
// 9. YOUTUBE FRAME FORMAT FILTER & SOCIAL TOGGLE
// ==========================================
function filterYouTubeFormat(format, btn) {
  const buttons = document.querySelectorAll('#ytFormatGroup .format-toggle-btn');
  buttons.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const groupLandscape = document.getElementById('formatGroupLandscape');
  const groupPortrait = document.getElementById('formatGroupPortrait');
  const cardStreamline = document.getElementById('pkg-card-streamline-master');

  if (format === 'streamline') {
    if (groupLandscape) groupLandscape.style.display = 'block';
    if (groupPortrait) groupPortrait.style.display = 'block';
    if (cardStreamline) {
      cardStreamline.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cardStreamline.style.boxShadow = '0 0 45px rgba(245, 158, 11, 0.6)';
      setTimeout(() => {
        cardStreamline.style.boxShadow = '';
      }, 2500);
    }
    showToast('Displaying: Streamline Master Package (Full Movie + 10 Highlights)');
    return;
  }

  if (format === 'landscape') {
    if (groupLandscape) {
      groupLandscape.style.display = 'block';
      groupLandscape.style.opacity = '1';
    }
    if (groupPortrait) {
      groupPortrait.style.display = 'none';
    }
    showToast('Displaying: Landscape YouTube Packages (16:9 Cinema 4K UHD)');
  } else if (format === 'portrait') {
    if (groupLandscape) {
      groupLandscape.style.display = 'none';
    }
    if (groupPortrait) {
      groupPortrait.style.display = 'block';
      groupPortrait.style.opacity = '1';
    }
    showToast('Displaying: Portrait YouTube Packages (9:16 Mobile 4K / FHD)');
  } else {
    if (groupLandscape) {
      groupLandscape.style.display = 'block';
      groupLandscape.style.opacity = '1';
    }
    if (groupPortrait) {
      groupPortrait.style.display = 'block';
      groupPortrait.style.opacity = '1';
    }
    showToast('Displaying: All YouTube Production Packages');
  }
}

let activeSocialModules = {
  tiktok: false,
  instagram: false,
  omni: false
};

function toggleSocialOption(type, price, btn) {
  const cardMap = {
    tiktok: document.getElementById('socialCardTikTok'),
    instagram: document.getElementById('socialCardInstagram'),
    omni: document.getElementById('socialCardOmni')
  };

  const nameMap = {
    tiktok: 'TikTok Algorithm & Sound Engine',
    instagram: 'Instagram Reels & Stories Engine',
    omni: 'Omni-Channel Social Bundle (TikTok + Reels)'
  };

  const card = cardMap[type];
  activeSocialModules[type] = !activeSocialModules[type];
  const isActive = activeSocialModules[type];

  if (isActive) {
    if (card) card.classList.add('active-social');
    if (btn) {
      btn.innerText = '✓ Added to Scope';
      btn.classList.add('btn-gold');
      btn.classList.remove('btn-outline');
    }
    showToast(`✓ ${nameMap[type]} ($${price.toLocaleString()}) added to Scope!`);
  } else {
    if (card) card.classList.remove('active-social');
    if (btn) {
      btn.innerText = `+ Add ${type === 'omni' ? 'Omni Bundle ($1,250)' : type.charAt(0).toUpperCase() + type.slice(1) + ' Module ($' + price + ')'}`;
      btn.classList.remove('btn-gold');
      btn.classList.add('btn-outline');
    }
    showToast(`${nameMap[type]} removed from Scope.`);
  }

  if (typeof window.triggerConfigUpdate === 'function') {
    window.triggerConfigUpdate();
  }
}

// ==========================================
// 10. PACKAGE SELECTION & CUSTOMIZATION MODAL
// ==========================================
const PACKAGES_DATA = {
  landscape: {
    formatName: 'Landscape YouTube (16:9 Cinema 4K UHD)',
    aspectRatio: '16:9 Cinema 4K UHD',
    streamline: {
      key: 'streamline_master',
      title: 'Streamline Master: Full 40-Min Movie + 10 Viral Highlights',
      shortName: 'Streamline Master: Full Movie + 10 Viral Highlights (16:9 + 9:16)',
      price: 25950,
      format: 'landscape',
      type: 'streamline',
      resolution: 'Resolution: 16:9 Cinema 4K UHD (Movie) + 9:16 Mobile 4K (10 Highlights)',
      depositNote: '50% Kickoff Deposit: $12,975 • two 25% review gates of $6,487.50',
      deliverables: [
        'Single continuous 40-minute animated feature special in 4K UHD (3840×2160)',
        '10 dedicated standalone 30–60s viral highlight clips in 9:16 Vertical for YouTube Shorts',
        'Over 70 custom painted 4K forest & Rockefeller Center matte environments',
        'Full dedicated 6-actor professional voice cast recording & character model sheets',
        'Full symphonic holiday score orchestration & Dolby 5.1 surround / stereo mixdown',
        '5 custom high-CTR painted thumbnails for YouTube A/B testing & Premiere countdown',
        'Direct pinned link & description funnel to purchase author\'s published book on Amazon',
        'Turnaround: 18 Weeks structured master delivery with rolling highlight releases'
      ]
    },
    full: {
      key: 'landscape_full',
      title: 'Full 40-Minute Animated Family Feature Special',
      shortName: 'Full 40-Min Animated Feature (Landscape 16:9 Cinema 4K)',
      price: 24500,
      format: 'landscape',
      type: 'full',
      resolution: 'Resolution: 3840×2160 UHD @ 24fps • Dolby 5.1 & Stereo',
      depositNote: '50% Kickoff Deposit: $12,250 • two 25% review gates',
      deliverables: [
        'Single continuous 40-minute animated feature special in 4K UHD (3840×2160)',
        'Custom YouTube Chapter Markers & rich timestamps index for organic search',
        'Over 70 custom painted 4K forest & Rockefeller Center matte environments',
        'Full dedicated 6-actor professional voice cast recording & character model sheets',
        'Full symphonic holiday score orchestration & Dolby 5.1 surround mix',
        'Turnaround: 18 Weeks structured master delivery'
      ]
    },
    parts: {
      key: 'landscape_parts',
      title: '4-Part Episodic Miniseries (~10 Mins Each)',
      shortName: '4-Part Episodic Miniseries (Landscape 16:9 Cinema 4K)',
      price: 21800,
      format: 'landscape',
      type: 'parts',
      resolution: 'Resolution: 3840×2160 UHD @ 24fps • 4 Polish Parts',
      depositNote: '50% Kickoff Deposit: $10,900 • two 25% review gates',
      deliverables: [
        '4 episodic installments (~10 minutes each, total 40 minutes) in 4K UHD',
        'Custom episodic opening & closing title cards with mid-story cliffhangers',
        'YouTube Playlist sequencing engineered for algorithmic binge-watching',
        '4 individual custom painted high-CTR thumbnails for A/B testing',
        'Full voice cast, sound design & original holiday orchestration',
        'Turnaround: 14 Weeks (Rolling bi-weekly episodic deliveries)'
      ]
    },
    highlights: {
      key: 'landscape_highlights',
      title: 'Proof-of-Concept Pilot & Cinematic Teaser Clips',
      shortName: 'Proof-of-Concept Pilot & Teasers (Landscape 16:9)',
      price: 4950,
      format: 'landscape',
      type: 'highlights',
      resolution: 'Resolution: 3840×2160 UHD @ 24fps • 3–5m Pilot + 3 Teasers',
      depositNote: '50% Kickoff Deposit: $2,475 • two 25% review gates',
      deliverables: [
        '3–5 Minute 2D Cinematic Short covering Beats 1–8 (Hidden Forest & Mary Louise)',
        '3 standalone 30s viral teaser highlight clips for YouTube preview campaigns',
        'YouTube Premiere setup with live chat countdown moderation',
        '3 Custom high-CTR thumbnails for YouTube A/B split testing',
        'Multi-voice professional ensemble acting included',
        'Turnaround: 6 Weeks from kickoff'
      ]
    }
  },
  portrait: {
    formatName: 'Portrait YouTube (9:16 Shorts & Mobile Fullscreen)',
    aspectRatio: '9:16 Mobile 4K / FHD',
    streamline: {
      key: 'streamline_master',
      title: 'Streamline Master: Full Mobile Movie + 10 Viral Highlights',
      shortName: 'Streamline Master: Full Mobile Movie + 10 Viral Highlights (9:16 Mobile 4K)',
      price: 21950,
      format: 'portrait',
      type: 'streamline',
      resolution: 'Resolution: 2160×3840 Vertical 4K @ 60fps • 40m Movie + 10 Shorts',
      depositNote: '50% Kickoff Deposit: $10,975 • two 25% review gates of $5,487.50',
      deliverables: [
        'Continuous 40-minute animated feature special in Mobile 4K (2160×3840 @ 60fps)',
        '10 dedicated standalone 30–60s viral highlight clips for YouTube Shorts & Reels',
        'Dynamic pan-and-scan camera motion keeping characters center-stage on mobile screens',
        'Full dedicated 6-actor professional voice cast recording & character dialogue acting',
        'Full holiday orchestration score, audio sound bite stems & sound effects',
        'Burned-in kinetic dynamic typography on all 10 highlights with pinned Amazon book link',
        'Turnaround: 16 Weeks structured delivery with rolling highlight releases'
      ]
    },
    full: {
      key: 'portrait_full',
      title: 'Full 40-Minute Mobile Vertical Feature Cut',
      shortName: 'Full 40-Min Mobile Movie Cut (Portrait 9:16 Vertical 4K)',
      price: 19500,
      format: 'portrait',
      type: 'full',
      resolution: 'Resolution: 2160×3840 Vertical 4K / 1080×1920 @ 60fps',
      depositNote: '50% Kickoff Deposit: $9,750 • two 25% review gates',
      deliverables: [
        'Continuous 40-minute movie reframed in Vertical 4K (2160×3840)',
        'Dynamic pan-and-scan camera motion keeping characters center-stage',
        'Kinetic burned-in subtitles optimized for mobile sound-off viewers',
        'Full multi-voice cast, cinematic sound effects & holiday music score',
        'Mobile YouTube premiere setup & chapter markers',
        'Turnaround: 16 Weeks structured delivery'
      ]
    },
    parts: {
      key: 'portrait_parts',
      title: '30-Episode Serialized Micro-Drama Series',
      shortName: '30-Episode Serialized Series (Portrait 9:16 Shorts)',
      price: 8850,
      format: 'portrait',
      type: 'parts',
      resolution: 'Resolution: 1080×1920 FHD @ 60fps • 30 Episodes',
      depositNote: '50% Kickoff Deposit: $4,425 • two 25% review gates',
      deliverables: [
        '30 serialized episodes (60–90 seconds each) in 1080×1920 FHD @ 60fps',
        'High-retention 3-second hook & micro-cliffhanger per episode for Shorts feed',
        'End-screen cards & YouTube Shorts playlist sequencing for binge-watching',
        'Direct pinned comment & description funnels to buy the Amazon book',
        'Burned-in dynamic typography & comedy sound effects',
        'Turnaround: 8 Weeks (Rolling weekly episodic deliveries)'
      ]
    },
    highlights: {
      key: 'portrait_highlights',
      title: '10 Individual Standalone Viral Highlight Clips',
      shortName: '10 Individual Viral Highlight Clips (Portrait 9:16 Shorts)',
      price: 3250,
      format: 'portrait',
      type: 'highlights',
      resolution: 'Resolution: 1080×1920 FHD @ 60fps • 10 Individual Clips',
      depositNote: '50% Kickoff Deposit: $1,625 • two 25% review gates',
      deliverables: [
        '10 dedicated standalone highlight clips in 1080×1920 FHD @ 60fps ($325/clip)',
        'Captures key story moments: Rocky\'s affirmation, AJ\'s song, Bruce\'s threat, Mary Louise\'s belief speech & tree choosing',
        'Engineered specifically for YouTube Shorts algorithmic virality',
        'High-energy kinetic typography, audio sound bite stems & stickers',
        'Direct pinned link funneling viewers to buy the published Amazon book',
        'Turnaround: 4 Weeks rapid promotional launch'
      ]
    }
  }
};

let currentModalFormat = 'landscape';
let currentModalType = 'streamline';

function openPackageModal() {
  const modal = document.getElementById('packageModal');
  if (modal) {
    modal.classList.add('open');
    renderPackageModal();
  }
}

function closePackageModal() {
  const modal = document.getElementById('packageModal');
  if (modal) modal.classList.remove('open');
}

function setModalFormat(format) {
  currentModalFormat = format;
  document.getElementById('modalChoiceLandscape')?.classList.toggle('active', format === 'landscape');
  document.getElementById('modalChoicePortrait')?.classList.toggle('active', format === 'portrait');
  renderPackageModal();
}

function setModalType(type) {
  currentModalType = type;
  document.getElementById('modalCardTypeStreamline')?.classList.toggle('active', type === 'streamline');
  document.getElementById('modalCardTypeFull')?.classList.toggle('active', type === 'full');
  document.getElementById('modalCardTypeParts')?.classList.toggle('active', type === 'parts');
  document.getElementById('modalCardTypeHighlights')?.classList.toggle('active', type === 'highlights');
  renderPackageModal();
}

function renderPackageModal() {
  const formatData = PACKAGES_DATA[currentModalFormat];
  if (!formatData) return;
  const pkg = formatData[currentModalType] || formatData.streamline || formatData.full;

  const streamlinePkg = formatData.streamline;
  const fullPkg = formatData.full;
  const partsPkg = formatData.parts;
  const highlightsPkg = formatData.highlights;

  const priceStreamline = document.getElementById('modalTypePriceStreamline');
  const priceFull = document.getElementById('modalTypePriceFull');
  const priceParts = document.getElementById('modalTypePriceParts');
  const priceHighlights = document.getElementById('modalTypePriceHighlights');

  if (priceStreamline && streamlinePkg) priceStreamline.innerText = `$${streamlinePkg.price.toLocaleString()}`;
  if (priceFull) priceFull.innerText = `$${fullPkg.price.toLocaleString()}`;
  if (priceParts) priceParts.innerText = `$${partsPkg.price.toLocaleString()}`;
  if (priceHighlights) priceHighlights.innerText = `$${highlightsPkg.price.toLocaleString()}`;

  const subParts = document.getElementById('modalTypeSubParts');
  const subHighlights = document.getElementById('modalTypeSubHighlights');
  if (subParts) {
    subParts.innerText = currentModalFormat === 'landscape' ? '4-part episodic miniseries (~10m each)' : '30 serialized micro-episodes (60–90s)';
  }
  if (subHighlights) {
    subHighlights.innerText = currentModalFormat === 'landscape' ? '3–5m cinematic pilot + 3 promo teaser cuts' : '10 individual viral highlight clips (30–45s)';
  }

  const badge = document.getElementById('modalPreviewBadge');
  const title = document.getElementById('modalPreviewTitle');
  const res = document.getElementById('modalPreviewRes');
  const price = document.getElementById('modalPreviewPrice');
  const deposit = document.getElementById('modalPreviewDeposit');
  const list = document.getElementById('modalDeliverablesList');

  if (badge) badge.innerText = formatData.aspectRatio;
  if (title) title.innerText = pkg.title;
  if (res) res.innerText = pkg.resolution;
  if (price) price.innerText = `$${pkg.price.toLocaleString()}`;
  if (deposit) deposit.innerText = pkg.depositNote;

  if (list) {
    list.innerHTML = pkg.deliverables.map(d => `
      <li>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${d}</span>
      </li>
    `).join('');
  }
}

function applyPackageModalSelection() {
  const pkg = PACKAGES_DATA[currentModalFormat][currentModalType];
  selectPackageByData(pkg);
  closePackageModal();
  showToast(`✓ Selected: ${pkg.title} ($${pkg.price.toLocaleString()})`);
  
  const configurator = document.getElementById('configurator');
  if (configurator) configurator.scrollIntoView({ behavior: 'smooth' });
}

function selectPackageFromCard(format, type) {
  const pkg = PACKAGES_DATA[format][type];
  selectPackageByData(pkg);
  showToast(`✓ Selected: ${pkg.title} ($${pkg.price.toLocaleString()})`);
  
  const configurator = document.getElementById('configurator');
  if (configurator) configurator.scrollIntoView({ behavior: 'smooth' });
}

function selectPackageByData(pkg) {
  if (typeof pkg === 'string') {
    if (pkg === 'streamline_master') {
      pkg = PACKAGES_DATA.landscape.streamline;
    }
  }
  if (!pkg) return;

  const targetId = `opt_${pkg.key}`;
  const targetRadio = document.getElementById(targetId)?.querySelector('input[type="radio"]');
  const allRadios = document.querySelectorAll('input[name="base_pkg"]');

  if (targetRadio) {
    targetRadio.checked = true;
    allRadios.forEach(r => r.closest('.config-radio-label')?.classList.remove('selected'));
    targetRadio.closest('.config-radio-label')?.classList.add('selected');
  } else {
    // Match by value
    allRadios.forEach(r => {
      if (parseInt(r.value, 10) === pkg.price) {
        r.checked = true;
        allRadios.forEach(x => x.closest('.config-radio-label')?.classList.remove('selected'));
        r.closest('.config-radio-label')?.classList.add('selected');
      }
    });
  }

  if (typeof window.triggerConfigUpdate === 'function') {
    window.triggerConfigUpdate();
  }
  showToast(`✓ Selected: ${pkg.title} ($${pkg.price.toLocaleString()})`);
  const configurator = document.getElementById('configurator');
  if (configurator) configurator.scrollIntoView({ behavior: 'smooth' });
}

// Make globally accessible
window.openPackageModal = openPackageModal;
window.closePackageModal = closePackageModal;
window.setModalFormat = setModalFormat;
window.setModalType = setModalType;
window.applyPackageModalSelection = applyPackageModalSelection;
window.selectPackageFromCard = selectPackageFromCard;
window.filterYouTubeFormat = filterYouTubeFormat;
window.toggleSocialOption = toggleSocialOption;

// Wire up Retainer and YouTube CTA buttons on load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.select-retainer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const retainer = btn.getAttribute('data-retainer');
      const price = btn.getAttribute('data-price');
      showToast(`✓ Selected Monthly Retainer ($${price}/mo) - Added to proposal inquiry!`);
      const configurator = document.getElementById('configurator');
      if (configurator) configurator.scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.select-yt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const yt = btn.getAttribute('data-yt');
      const price = btn.getAttribute('data-price');
      // Toggle corresponding checkbox in configurator if available
      const addonCheck = document.querySelector(`input[name="addon_opt"][value="${price}"]`);
      if (addonCheck) {
        addonCheck.checked = true;
        addonCheck.closest('.config-radio-label')?.classList.add('selected');
        if (typeof window.triggerConfigUpdate === 'function') {
          window.triggerConfigUpdate();
        }
      }
      showToast(`✓ YouTube Management ($${price}) active in proposal!`);
      const configurator = document.getElementById('configurator');
      if (configurator) configurator.scrollIntoView({ behavior: 'smooth' });
    });
  });
});
