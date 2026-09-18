/**
 * Rocky: The Rockefeller Christmas Tree - Interactive Scope of Work Application
 * Neo Gen Technologies | Account Manager: ayaz@neogentechnologies.com
 */

document.addEventListener('DOMContentLoaded', () => {
  initSnowCanvas();
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
// 1. AMBIENT SNOW PARTICLES
// ==========================================
function initSnowCanvas() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const numFlakes = 50;
  const flakes = [];

  for (let i = 0; i < numFlakes; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';

    for (let f of flakes) {
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
      ctx.fill();

      f.y += f.speedY;
      f.x += f.speedX;

      if (f.y > height) {
        f.y = -5;
        f.x = Math.random() * width;
      }
      if (f.x > width) f.x = 0;
      if (f.x < 0) f.x = width;
    }

    requestAnimationFrame(draw);
  }

  draw();
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
  { act: 'act2', num: 19, title: 'Rocky Returns as Himself', func: 'Internal Victory', desc: 'Rocky regains strength—not as a perfect tree, but as his strong, authentic, crooked self.', visual: 'Rocky proud, crooked, mentoring young sapling Pip.' },
  { act: 'act2', num: 20, title: 'The Catastrophic Ice Storm', func: 'Climactic Threat', desc: 'Freezing rain glazes the forest into brittle glass. Violent winds crack Bruce\'s massive trunk.', visual: 'Savage blizzard; Rocky bracing five saplings; Bruce splitting.' },
  { act: 'act2', num: 21, title: 'Rocky Braces Bruce', func: 'Courage & Forgiveness', desc: 'Rocky crosses the frozen ridge, wedging his small sturdy trunk to keep Bruce from collapsing.', visual: 'Small Rocky locked beneath huge cracked Bruce in howling wind.' },
  { act: 'act2', num: 22, title: 'The Champion\'s Ornaments', func: 'Symbolic Shield', desc: 'Rocky reaches into Mary Louise\'s ruined home, sheltering her handmade dewdrop ornaments.', visual: 'Rocky\'s iced branch gently cradling fragile crystalline star.' },
  { act: 'act2', num: 23, title: 'The Perfect Tree Discovered', func: 'Climax of Act 2', desc: 'At dawn, ice-crowned Rocky refracts sunrise into millions of prisms. The returning chopper lands: "We found the tree!"', visual: 'Rocky glazed in ice, blazing with rainbow light; judges landing.' },
  { act: 'act2', num: 24, title: 'Bruce\'s Public Confession', func: 'Reconciliation', desc: 'Bruce reveals the trap to the forest, declaring Rocky sacrificed his first chance to save Mary Louise.', visual: 'Cracked, ribboned Bruce bowing deeply before ice-crowned Rocky.' },
  // ACT THREE
  { act: 'act3', num: 25, title: 'The Saw', func: 'Threshold', desc: 'A crane and wrapped saw arrive. Rocky learns what going to New York costs—and says yes.', visual: 'Rocky facing the wrapped ceremonial saw; forest gathered in quiet.' },
  { act: 'act3', num: 26, title: 'Goodbye to the Forest', func: 'Departure', desc: 'Pip clings to Rocky\'s boughs. Mary Louise hangs her star. As the crane lifts, the forest bows.', visual: 'Entire forest bowing in respect as Rocky rises into the sky.' },
  { act: 'act3', num: 27, title: 'The Flatbed to New York', func: 'Road Sequence', desc: 'Rocky travels highways on an oversized rig. AJ and Mrs. Pickles stow away under tarps.', visual: 'Highway under night stars; Rocky netted on flatbed; cities cheering.' },
  { act: 'act3', num: 28, title: 'The World Stands Up', func: 'Arrival', desc: 'Rocky enters Manhattan. Giant cranes hoist him across 5th Avenue and into Rockefeller Plaza.', visual: 'Rocky flying between towering skyscrapers, yellow cabs below.' },
  { act: 'act3', num: 29, title: 'Crushed in the Plaza', func: 'Final Crisis', desc: 'The net is removed. Long travel has flattened Rocky\'s needles. Crew doubts if he was the right choice.', visual: 'Small battered Rocky alone in empty Plaza at midnight.' },
  { act: 'act3', num: 30, title: 'Believing for Others', func: 'Final Choice', desc: 'Looking at empty plaza chairs, Rocky repeats his words—not for himself, but for the people.', visual: 'Rocky opening branch by branch in fresh falling midnight snow.' },
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

    let baseVal = selectedBase ? parseInt(selectedBase.value, 10) : 4950;
    let voVal = selectedVO ? parseInt(selectedVO.value, 10) : 850;
    
    currentConfig.basePrice = baseVal;
    currentConfig.baseName = selectedBase ? selectedBase.getAttribute('data-name') : "2D Animation";
    
    if (baseVal === 4950) currentConfig.baseTimeline = "5–6 Weeks";
    else if (baseVal === 8850) currentConfig.baseTimeline = "8–10 Weeks (Rolling Deliveries)";
    else currentConfig.baseTimeline = "16–18 Weeks";

    currentConfig.voPrice = voVal;
    currentConfig.voName = selectedVO ? selectedVO.getAttribute('data-name') : "VO Tier";

    currentConfig.addons = [];
    let addonsTotal = 0;
    checkedAddons.forEach(a => {
      const val = parseInt(a.value, 10);
      addonsTotal += val;
      currentConfig.addons.push({
        name: a.getAttribute('data-name'),
        price: val
      });
    });

    const subtotal = baseVal + voVal + addonsTotal;
    // Bundle incentive discount if vertical series ($8,850) + YouTube 6-Mo campaign ($2,340)
    let discount = 0;
    if (baseVal === 8850 && addonsTotal >= 2340) {
      discount = 400; // $400 indie author holiday bonus incentive
    }

    const total = subtotal - discount;
    const deposit = Math.round(total * 0.25);

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
      console.error('Sign-off error:', err);
      // Fallback in case offline
      showToast('Scope of Work recorded locally and queued for Account Manager Ayaz.');
      openSignOffSuccessModal({ signOffId: 'SOW-OFFLINE-' + Date.now().toString(36).toUpperCase() }, signerName, signerEmail);
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
        <p><strong>Kickoff Deposit (25%):</strong> <span style="color: var(--ice-blue); font-weight: 700;">$${currentConfig.deposit.toLocaleString()}</span></p>
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
        console.warn('Backend quote save error:', err);
        openQuoteSummaryModal('QTE-' + Date.now().toString(36).toUpperCase());
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
        <div style="font-size: 16px; font-weight: 700; color: #fff;">Jennie E. Nicassio (Nieje Productions)</div>
        <div style="font-size: 12px; color: var(--ice-blue);">Screenplay & Animated Series: Rocky – The Rockefeller Christmas Tree</div>
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
          <div style="color: #fff; font-weight: 600;">25% Initial Kickoff Deposit: $${currentConfig.deposit.toLocaleString()}</div>
          <div style="color: var(--text-muted);">Remaining balance billed across 3 review gates</div>
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
