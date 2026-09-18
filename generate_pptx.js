const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createMasterPresentation() {
  console.log("Generating Rocky: The Rockefeller Christmas Tree Master PowerPoint Deck (Fixed & Polished)...");

  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9'; // 10 x 5.625 inches
  pres.author = 'Neo Gen Technologies';
  pres.company = 'Neo Gen Technologies';
  pres.title = 'Scope of Work: Rocky-The Rockefeller Christmas Tree';
  pres.subject = 'Executive 2D Animation & Viral Vertical Series Master Proposal';

  // Core Brand Color Palette
  const C_BG = '070B12';          // Ultra-dark background
  const C_CARD = '0D1524';        // Primary card surface
  const C_CARD_2 = '111D33';      // Alternate card surface
  const C_CARD_HEADER = '14233D'; // Accent pill background
  const C_GOLD = 'F59E0B';        // Primary Rocky Gold
  const C_AMBER = 'FBBF24';       // Bright Amber
  const C_GOLD_LIGHT = 'FDE68A';  // Light Gold text
  const C_BLUE = '0088FF';        // Neo Gen Tech Blue
  const C_ICE = '38BDF8';         // Sky/Ice Blue
  const C_SPRUCE = '10B981';      // Forest Spruce Green
  const C_SPRUCE_BG = '0A241A';   // Dark Green Pill
  const C_WHITE = 'FFFFFF';       // Pure White
  const C_TEXT = 'CBD5E1';        // Primary body text
  const C_MUTED = '94A3B8';       // Secondary muted text
  const C_BORDER = '24334C';      // Subtle card border

  // Asset paths
  const coverImg = path.join(__dirname, 'assets', 'rocky_front_cover.png');
  const rockyCharImg = path.join(__dirname, 'assets', 'rocky_character_spotlight.png');
  const logoRocky = path.join(__dirname, 'assets', 'rocky_cover_title_clean.png');

  // Universal Modern Font Families
  const FONT_TITLE = 'Segoe UI';
  const FONT_BODY = 'Segoe UI';

  // Standard Header Generator
  function addSlideHeader(slide, category, title, slideNum) {
    slide.background = { color: C_BG };

    // Top subtle divider line
    slide.addShape(pres.ShapeType.rect, {
      x: 0.6, y: 0.35, w: 8.8, h: 0.015,
      fill: { color: C_BORDER }
    });

    // Category Breadcrumb
    slide.addText(category.toUpperCase(), {
      x: 0.6, y: 0.42, w: 6.8, h: 0.22,
      fontSize: 8, fontFace: FONT_BODY, bold: true,
      color: C_ICE, letterSpacing: 1.5, valign: 'middle'
    });

    // Main Slide Heading
    slide.addText(title, {
      x: 0.6, y: 0.68, w: 7.2, h: 0.45,
      fontSize: 17, fontFace: FONT_TITLE, bold: true,
      color: C_WHITE, valign: 'middle'
    });

    // Top Right Studio Pill (replaces clunky image box)
    slide.addShape(pres.ShapeType.roundRect, {
      x: 7.8, y: 0.45, w: 1.6, h: 0.32, r: 0.05,
      fill: { color: C_CARD }, line: { color: C_BORDER, width: 1 }
    });
    slide.addText("NEO GEN STUDIOS", {
      x: 7.8, y: 0.45, w: 1.6, h: 0.32,
      fontSize: 7.5, fontFace: FONT_BODY, bold: true,
      color: C_AMBER, align: 'center', valign: 'middle', letterSpacing: 1
    });

    // Slide Number & Running Footer
    slide.addText(`NEO GEN TECHNOLOGIES  |  ROCKY: THE ROCKEFELLER CHRISTMAS TREE  |  EXECUTIVE SOW  |  SLIDE ${slideNum}`, {
      x: 0.6, y: 5.32, w: 8.8, h: 0.2,
      fontSize: 7.5, fontFace: FONT_BODY,
      color: C_MUTED, valign: 'middle'
    });
  }

  // =========================================================================
  // SLIDE 1: MASTER TITLE & EXECUTIVE COVER
  // =========================================================================
  {
    const s1 = pres.addSlide();
    s1.background = { color: C_BG };

    // Gold Top Accent Line
    s1.addShape(pres.ShapeType.rect, {
      x: 0.8, y: 0.45, w: 8.4, h: 0.03,
      fill: { color: C_GOLD }
    });

    // Top Meta Line
    s1.addText("NEO GEN TECHNOLOGIES  •  CREATIVE & 2D ANIMATION DIVISION", {
      x: 0.8, y: 0.6, w: 5.0, h: 0.25,
      fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C_ICE, letterSpacing: 1.5, valign: 'middle'
    });

    s1.addText("CONFIDENTIAL MASTER PROPOSAL  |  NGT-SOW-2026-ROCKY-V1", {
      x: 4.8, y: 0.6, w: 4.4, h: 0.25,
      fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C_AMBER, align: 'right', letterSpacing: 1, valign: 'middle'
    });

    // Left Column: Main Title & Proposal Brief
    s1.addText("Official Scope of Work & Production Agreement", {
      x: 0.8, y: 1.25, w: 5.2, h: 0.3,
      fontSize: 12, fontFace: FONT_BODY, color: C_ICE, bold: true, valign: 'middle'
    });

    s1.addText("ROCKY: THE ROCKEFELLER CHRISTMAS TREE", {
      x: 0.8, y: 1.55, w: 5.2, h: 0.8,
      fontSize: 22, fontFace: FONT_TITLE, bold: true, color: C_AMBER, valign: 'top'
    });

    s1.addText("2D Animated Master Movie & 10 Viral Highlights Series Adaptation", {
      x: 0.8, y: 2.35, w: 5.2, h: 0.35,
      fontSize: 11, fontFace: FONT_BODY, color: C_WHITE, bold: true, valign: 'middle'
    });

    s1.addText("A comprehensive broadcast-grade production and digital distribution plan engineered by Neo Gen Technologies for creator and screenwriter Jennie E. Nicassio. Delivering 16:9 Cinema 4K animation, high-retention 9:16 vertical series adaptation, dedicated 6-actor voice cast, bespoke sound design, and turnkey YouTube channel management.", {
      x: 0.8, y: 2.75, w: 5.0, h: 0.95,
      fontSize: 9, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
    });

    // Project Stakeholders Card
    s1.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: 3.85, w: 5.0, h: 1.35, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_BORDER, width: 1 }
    });

    s1.addText([
      { text: "IP Creator & Client: ", options: { bold: true, color: C_WHITE, fontSize: 8.5 } },
      { text: "Jennie E. Nicassio (Author, Creator & Screenwriter)\n", options: { color: C_GOLD_LIGHT, fontSize: 8.5 } },
      { text: "Book Title: ", options: { bold: true, color: C_WHITE, fontSize: 8.5 } },
      { text: "Rocky: The Rockefeller Christmas Tree (ISBN 979-8-218-55830-7)\n", options: { color: C_TEXT, fontSize: 8.5 } },
      { text: "Production Agency: ", options: { bold: true, color: C_WHITE, fontSize: 8.5 } },
      { text: "Neo Gen Technologies\n", options: { color: C_ICE, fontSize: 8.5 } },
      { text: "Executive Producer & AM: ", options: { bold: true, color: C_WHITE, fontSize: 8.5 } },
      { text: "Ayaz (ayaz@neogentechnologies.com)", options: { color: C_WHITE, fontSize: 8.5 } }
    ], { x: 1.0, y: 3.95, w: 4.6, h: 1.15, fontFace: FONT_BODY, lineSpacingMultiple: 1.25, valign: 'middle' });

    // Right Column: Artwork Showcase Frame
    s1.addShape(pres.ShapeType.roundRect, {
      x: 6.1, y: 1.25, w: 3.1, h: 3.95, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_GOLD, width: 1.5 }
    });

    if (fs.existsSync(logoRocky)) {
      s1.addImage({ path: logoRocky, x: 6.3, y: 1.45, w: 2.7, h: 0.65, sizing: { type: 'contain' } });
    }

    if (fs.existsSync(coverImg)) {
      s1.addImage({ path: coverImg, x: 6.25, y: 2.25, w: 1.35, h: 2.2, sizing: { type: 'cover' } });
    }

    if (fs.existsSync(rockyCharImg)) {
      s1.addImage({ path: rockyCharImg, x: 7.7, y: 2.25, w: 1.35, h: 2.2, sizing: { type: 'cover' } });
    }

    s1.addText("Original Published Book IP & Official Proofs", {
      x: 6.1, y: 4.75, w: 3.1, h: 0.25,
      fontSize: 7.5, fontFace: FONT_BODY, color: C_MUTED, align: 'center', bold: true, valign: 'middle'
    });
  }

  // =========================================================================
  // SLIDE 2: EXECUTIVE BRIEF & STRATEGIC VISION (CLEAN ROUNDED CARDS)
  // =========================================================================
  {
    const s2 = pres.addSlide();
    addSlideHeader(s2, "Executive Brief & Partnership Memorandum", "Strategic Vision: From Book to Global Holiday Classic", 2);

    const pillars = [
      {
        badge: "NARRATIVE ARCHITECTURE",
        title: "From Storybook to Living Classic",
        desc: "Transforming Jennie Nicassio's acclaimed holiday literature into an animated holiday classic. Rocky's journey of sacrifice, self-worth, and resilience is engineered to become an annual holiday viewing tradition across families worldwide.",
        highlight: "Demographic: Multi-Generational Family Co-Viewing",
        color: C_GOLD,
        bgColor: '1E1708'
      },
      {
        badge: "DISTRIBUTION ARCHITECTURE",
        title: "The Dual-Audience Engine",
        desc: "Pairing a prestige 16:9 cinematic master (for streaming acquisitions and festivals) with 9:16 vertical serialized micro-dramas. Captures traditional family viewing while dominating algorithmic feeds on YouTube Shorts, TikTok, and Instagram.",
        highlight: "Format: 16:9 Cinema 4K + 9:16 Vertical Shorts",
        color: C_BLUE,
        bgColor: '08172E'
      },
      {
        badge: "COMMERCIAL FLYWHEEL",
        title: "Multi-Platform Monetization",
        desc: "Every animated release functions as an active sales funnel driving directly to the published book on Amazon. Built-in Content ID audio/visual fingerprinting guarantees 100% of global AdSense and licensing royalties flow directly to creator Jennie Nicassio.",
        highlight: "Ownership: 100% Client IP & AdSense Revenue",
        color: C_SPRUCE,
        bgColor: C_SPRUCE_BG
      }
    ];

    pillars.forEach((p, idx) => {
      const cardX = 0.6 + idx * 2.95;
      const cardY = 1.35;
      const cardW = 2.85;
      const cardH = 3.8;

      // Clean single rounded card with colored border (NO OVERLAPPING FLAT RECTANGLE)
      s2.addShape(pres.ShapeType.roundRect, {
        x: cardX, y: cardY, w: cardW, h: cardH, r: 0.08,
        fill: { color: C_CARD }, line: { color: p.color, width: 1.5 }
      });

      // Top Integrated Accent Pill
      s2.addShape(pres.ShapeType.roundRect, {
        x: cardX + 0.15, y: cardY + 0.16, w: cardW - 0.3, h: 0.28, r: 0.04,
        fill: { color: p.bgColor }, line: { color: p.color, width: 0.8 }
      });
      s2.addText(p.badge, {
        x: cardX + 0.15, y: cardY + 0.16, w: cardW - 0.3, h: 0.28,
        fontSize: 7.5, fontFace: FONT_BODY, bold: true, color: p.color, align: 'center', valign: 'middle', letterSpacing: 1
      });

      // Card Title
      s2.addText(p.title, {
        x: cardX + 0.18, y: cardY + 0.52, w: cardW - 0.36, h: 0.55,
        fontSize: 13, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
      });

      // Card Body Paragraph
      s2.addText(p.desc, {
        x: cardX + 0.18, y: cardY + 1.15, w: cardW - 0.36, h: 1.95,
        fontSize: 8.8, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.3, valign: 'top'
      });

      // Bottom Metric / Highlight Pill
      s2.addShape(pres.ShapeType.roundRect, {
        x: cardX + 0.15, y: cardY + 3.25, w: cardW - 0.3, h: 0.38, r: 0.05,
        fill: { color: C_CARD_HEADER }, line: { color: C_BORDER, width: 0.8 }
      });
      s2.addText(p.highlight, {
        x: cardX + 0.15, y: cardY + 3.25, w: cardW - 0.3, h: 0.38,
        fontSize: 7.5, fontFace: FONT_BODY, color: C_AMBER, bold: true, align: 'center', valign: 'middle'
      });
    });
  }

  // =========================================================================
  // SLIDE 3: STORY BIBLE & CORE CHARACTER CAST
  // =========================================================================
  {
    const s3 = pres.addSlide();
    addSlideHeader(s3, "Story Engine & Character Architecture", "The Core Cast & Dramatic Ensemble", 3);

    const characters = [
      { name: "Rocky", role: "Lead Protagonist", color: C_GOLD, desc: "Small, resilient evergreen tree with big dreams. Sacrifices his needles to shield tiny sapling Pip from the brutal winter ice storm.", quote: "\"I will grow strong and tall!\"" },
      { name: "Bruce Spruce", role: "The Towering Rival", color: C_BLUE, desc: "Arrogant 85-foot Norwegian spruce boasting flawless symmetry, who learns humility and respect when Rocky's heart shines brighter.", quote: "\"Look upon perfection, little twig!\"" },
      { name: "Mary Louise", role: "The Forest Fairy", color: C_ICE, desc: "Ancient guardian living in a teapot cottage. Tests Rocky's courage and rewards true devotion with transformative resilience.", quote: "\"True splendor is never measured in height.\"" },
      { name: "AJ the Squirrel", role: "Comic Foil & Ally", color: C_AMBER, desc: "Acrobatic, rapid-tempo singer who mocks Rocky with rhymes before realizing true courage and stowing away to NYC.", quote: "\"You'll never make Rockefeller Plaza!\"" },
      { name: "Mrs. Pickles", role: "The Skunk Diva", color: 'EC4899', desc: "Melodramatic vanity diva obsessing over her silver mirror, who places it face-down in solemn solidarity with Rocky.", quote: "\"Nobody look at me until my tail is fluffed!\"" },
      { name: "Old Oak & Pip", role: "Chorus & Legacy", color: C_SPRUCE, desc: "Old Oak holds the ancient history of chosen trees; young sapling Pip carries Rocky's legend into future generations.", quote: "\"Where do chosen trees go? Into homes of families.\"" }
    ];

    characters.forEach((char, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const x = 0.6 + col * 2.95;
      const y = 1.35 + row * 1.9;
      const w = 2.85;
      const h = 1.78;

      s3.addShape(pres.ShapeType.roundRect, {
        x: x, y: y, w: w, h: h, r: 0.07,
        fill: { color: C_CARD }, line: { color: char.color, width: 1.2 }
      });

      // Role Pill
      s3.addText(char.role.toUpperCase(), {
        x: x + 0.15, y: y + 0.12, w: w - 0.3, h: 0.2,
        fontSize: 7, fontFace: FONT_BODY, color: char.color, bold: true, letterSpacing: 1, valign: 'middle'
      });

      // Name
      s3.addText(char.name, {
        x: x + 0.15, y: y + 0.32, w: w - 0.3, h: 0.3,
        fontSize: 11, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
      });

      // Description
      s3.addText(char.desc, {
        x: x + 0.15, y: y + 0.65, w: w - 0.3, h: 0.72,
        fontSize: 7.8, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.2, valign: 'top'
      });

      // Quote
      s3.addText(char.quote, {
        x: x + 0.15, y: y + 1.42, w: w - 0.3, h: 0.26,
        fontSize: 7.2, fontFace: FONT_BODY, italic: true, color: C_MUTED, valign: 'middle'
      });
    });
  }

  // =========================================================================
  // SLIDE 4: 33-BEAT SCREENPLAY MATRIX
  // =========================================================================
  {
    const s4 = pres.addSlide();
    addSlideHeader(s4, "Screenplay Beat Board", "33 Sequential Story Beats (Acts 1, 2 & 3)", 4);

    const acts = [
      {
        badge: "ACT 1: THE HOLLOW",
        beats: "Beats 01–08 (Setup & Call)",
        color: C_ICE,
        bgColor: '08172E',
        items: [
          "01. The Little Tree with Big Dreams (Opening)",
          "02. The Song of the Forest (AJ's taunts)",
          "03. The Legend of the Plaza (Old Oak's tale)",
          "04. Bruce Spruce's Grand Shadow (Rivalry)",
          "05. Mary Louise's Whisper (Inciting Incident)",
          "06. The Measure of Grandeur (First Trial)",
          "07. Warning from the Winds (Foreshadowing)",
          "08. Crossing the First Ridge (Act 1 Climax)"
        ]
      },
      {
        badge: "ACT 2: THE SACRIFICE & ICE",
        beats: "Beats 09–24 (Conflict & Choice)",
        color: C_GOLD,
        bgColor: '1E1708',
        items: [
          "09. The Freezing Night (Rising Tension)",
          "11. Protecting Young Pip (The Big Choice)",
          "13. Breaking Branches (The Core Sacrifice)",
          "16. The Dawn After the Storm (All is Lost)",
          "19. The Helicopters Arrive (Selection Day)",
          "21. The Selection Crew Judges the Forest",
          "23. Mrs. Pickles' Mirror Solidifies Belief",
          "24. The Red Ribbon on Rocky (Act 2 Climax)"
        ]
      },
      {
        badge: "ACT 3: NEW YORK CITY",
        beats: "Beats 25–33 (Climax & Legacy)",
        color: C_AMBER,
        bgColor: '1E1708',
        items: [
          "25. The Flatbed Highway Journey to Manhattan",
          "27. Entering 5th Avenue & Cheering Crowds",
          "28. Hoisted into Rockefeller Center Plaza",
          "29. Midnight Despair (The Flat Needles)",
          "30. Believing for Others (Selfless Heart)",
          "31. 50,000 Bulb Illumination (Grand Climax)",
          "32. One More Gift (Timber Builds a Home)",
          "33. Eternal Legend (North Pole Finale)"
        ]
      }
    ];

    acts.forEach((act, idx) => {
      const x = 0.6 + idx * 2.95;
      const y = 1.35;
      const w = 2.85;
      const h = 3.8;

      s4.addShape(pres.ShapeType.roundRect, {
        x: x, y: y, w: w, h: h, r: 0.08,
        fill: { color: C_CARD }, line: { color: act.color, width: 1.2 }
      });

      // Top Act Pill
      s4.addShape(pres.ShapeType.roundRect, {
        x: x + 0.15, y: y + 0.16, w: w - 0.3, h: 0.28, r: 0.04,
        fill: { color: act.bgColor }, line: { color: act.color, width: 0.8 }
      });
      s4.addText(act.badge, {
        x: x + 0.15, y: y + 0.16, w: w - 0.3, h: 0.28,
        fontSize: 7.5, fontFace: FONT_BODY, bold: true, color: act.color, align: 'center', valign: 'middle', letterSpacing: 1
      });

      s4.addText(act.beats, {
        x: x + 0.15, y: y + 0.5, w: w - 0.3, h: 0.25,
        fontSize: 8, fontFace: FONT_BODY, bold: true, color: C_WHITE, align: 'center', valign: 'middle'
      });

      const beatLines = act.items.map(item => `•  ${item}`).join('\n\n');
      s4.addText(beatLines, {
        x: x + 0.15, y: y + 0.85, w: w - 0.3, h: 2.8,
        fontSize: 7.6, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.22, valign: 'top'
      });
    });
  }

  // =========================================================================
  // SLIDE 5: DUAL-TRACK PRODUCTION STRATEGY (CLEAN BALANCED 2-COL)
  // =========================================================================
  {
    const s5 = pres.addSlide();
    addSlideHeader(s5, "Distribution Architecture & Format Strategy", "The Dual-Track Methodology: Cinema 4K + Viral 9:16 Shorts", 5);

    // Track A: Prestige Cinema
    const cardYA = 1.35;
    s5.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: cardYA, w: 4.3, h: 3.8, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_BLUE, width: 1.5 }
    });

    s5.addShape(pres.ShapeType.roundRect, {
      x: 0.8, y: cardYA + 0.18, w: 3.9, h: 0.28, r: 0.04,
      fill: { color: '08172E' }, line: { color: C_BLUE, width: 0.8 }
    });
    s5.addText("TRACK A: PRESTIGE HORIZONTAL MASTER", {
      x: 0.8, y: cardYA + 0.18, w: 3.9, h: 0.28,
      fontSize: 8, fontFace: FONT_BODY, bold: true, color: C_ICE, align: 'center', valign: 'middle', letterSpacing: 1
    });

    s5.addText("16:9 Cinema 4K UHD Feature / Pilot", {
      x: 0.8, y: cardYA + 0.55, w: 3.9, h: 0.4,
      fontSize: 14, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
    });

    s5.addText("A classically animated widescreen master engineered for prestigious family co-viewing, international film festival circuits, and streaming licensing acquisitions.", {
      x: 0.8, y: cardYA + 1.0, w: 3.9, h: 0.65,
      fontSize: 8.8, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
    });

    const specsA = [
      "Aspect Ratio: 16:9 Cinema 4K UHD (3840×2160) @ 24fps Native",
      "Visual Style: Rich textured storybook aesthetic with volumetric lighting",
      "Sound Mix: Full 5.1 surround sound + broadcast stereo master",
      "Color Grade: DaVinci Resolve Academy Color Encoding (ACES)",
      "Target Outlets: YouTube Prestige Premieres, Amazon Prime, Film Festivals"
    ];
    s5.addText(specsA.map(s => `✓  ${s}`).join('\n\n'), {
      x: 0.8, y: cardYA + 1.75, w: 3.9, h: 1.9,
      fontSize: 8.4, fontFace: FONT_BODY, color: C_WHITE, lineSpacingMultiple: 1.25, valign: 'top'
    });

    // Track B: 9:16 Vertical Series
    s5.addShape(pres.ShapeType.roundRect, {
      x: 5.1, y: cardYA, w: 4.3, h: 3.8, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_GOLD, width: 1.5 }
    });

    s5.addShape(pres.ShapeType.roundRect, {
      x: 5.3, y: cardYA + 0.18, w: 3.9, h: 0.28, r: 0.04,
      fill: { color: '1E1708' }, line: { color: C_GOLD, width: 0.8 }
    });
    s5.addText("TRACK B: VIRAL MOBILE-FIRST SERIES", {
      x: 5.3, y: cardYA + 0.18, w: 3.9, h: 0.28,
      fontSize: 8, fontFace: FONT_BODY, bold: true, color: C_AMBER, align: 'center', valign: 'middle', letterSpacing: 1
    });

    s5.addText("9:16 Vertical Viral Highlights Series", {
      x: 5.3, y: cardYA + 0.55, w: 3.9, h: 0.4,
      fontSize: 14, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
    });

    s5.addText("Engineered directly to Jennie Nicassio's vertical drama storytelling expertise, converting viewers into dedicated fans and direct Amazon book buyers.", {
      x: 5.3, y: cardYA + 1.0, w: 3.9, h: 0.65,
      fontSize: 8.8, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
    });

    const specsB = [
      "Aspect Ratio: 9:16 Fullscreen Mobile (1080×1920) High-Retention",
      "Algorithmic Virality: 3-second visual hook, fast cliffhanger per episode",
      "Shorts Remixing: Extracted highlights mapped to trending holiday audio",
      "Direct Funnel: Pinned comment driving directly to Amazon book purchases",
      "Distribution: YouTube Shorts, Instagram Reels, TikTok syndication"
    ];
    s5.addText(specsB.map(s => `✓  ${s}`).join('\n\n'), {
      x: 5.3, y: cardYA + 1.75, w: 3.9, h: 1.9,
      fontSize: 8.4, fontFace: FONT_BODY, color: C_WHITE, lineSpacingMultiple: 1.25, valign: 'top'
    });
  }

  // =========================================================================
  // SLIDE 6: 2D ANIMATION PRODUCTION PIPELINE (EVENLY FILLED COLUMNS)
  // =========================================================================
  {
    const s6 = pres.addSlide();
    addSlideHeader(s6, "Studio Workflow & Quality Control", "The 5-Phase 2D Animation Production Engine", 6);

    const phases = [
      {
        num: "01",
        title: "Pre-Production",
        weeks: "Weeks 1–4",
        items: [
          "Script Breakdown & Acts",
          "360° Model Sheets",
          "Color Script & Lighting",
          "33-Beat Animatic Pass",
          "Scratch Voice Sync"
        ]
      },
      {
        num: "02",
        title: "Backgrounds",
        weeks: "Weeks 5–8",
        items: [
          "Hidden Forest Valley",
          "Rocky's Snowy Hollow",
          "5th Avenue NYC Skyline",
          "Rockefeller Plaza Night",
          "Props & Ice Crystals"
        ]
      },
      {
        num: "03",
        title: "2D Animation",
        weeks: "Weeks 9–14",
        items: [
          "Rigging & Character Physics",
          "Phoneme Lip-Sync Pass",
          "Secondary Needle Motion",
          "Snow & Wind Dynamics",
          "Clean Line Art Cleanup"
        ]
      },
      {
        num: "04",
        title: "Compositing",
        weeks: "Weeks 15–16",
        items: [
          "Multiplane Parallax Depth",
          "50,000 Bulb Glow Effects",
          "Atmospheric Snow VFX",
          "Searchlight Volumetrics",
          "DaVinci Color Grading"
        ]
      },
      {
        num: "05",
        title: "Sound & Master",
        weeks: "Weeks 17–18",
        items: [
          "Broadcast Voice Track Master",
          "Foley & Custom Sound FX",
          "Original Holiday Score",
          "5.1 Surround & Stereo Mix",
          "ProRes 4444 XQ Masters"
        ]
      }
    ];

    phases.forEach((p, idx) => {
      const x = 0.6 + idx * 1.76;
      const y = 1.35;
      const w = 1.68;
      const h = 3.25;

      s6.addShape(pres.ShapeType.roundRect, {
        x: x, y: y, w: w, h: h, r: 0.07,
        fill: { color: C_CARD }, line: { color: C_BORDER, width: 1 }
      });

      // Top Phase Header Pill
      s6.addShape(pres.ShapeType.roundRect, {
        x: x + 0.1, y: y + 0.12, w: w - 0.2, h: 0.24, r: 0.04,
        fill: { color: C_CARD_HEADER }
      });
      s6.addText(`PHASE ${p.num}`, {
        x: x + 0.1, y: y + 0.12, w: w - 0.2, h: 0.24,
        fontSize: 7.5, fontFace: FONT_BODY, bold: true, color: C_ICE, align: 'center', valign: 'middle'
      });

      // Phase Title
      s6.addText(p.title, {
        x: x + 0.1, y: y + 0.42, w: w - 0.2, h: 0.32,
        fontSize: 9.5, fontFace: FONT_TITLE, bold: true, color: C_WHITE, align: 'center', valign: 'middle'
      });

      // Phase Weeks
      s6.addText(p.weeks, {
        x: x + 0.1, y: y + 0.74, w: w - 0.2, h: 0.22,
        fontSize: 7.5, fontFace: FONT_BODY, bold: true, color: C_AMBER, align: 'center', valign: 'middle'
      });

      // Subtle Divider
      s6.addShape(pres.ShapeType.rect, {
        x: x + 0.15, y: y + 1.02, w: w - 0.3, h: 0.015,
        fill: { color: C_BORDER }
      });

      // Deliverable Bullets (Distributed evenly from top to bottom)
      const bullets = p.items.map(i => `• ${i}`).join('\n\n');
      s6.addText(bullets, {
        x: x + 0.1, y: y + 1.15, w: w - 0.2, h: 1.95,
        fontSize: 7.5, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
      });
    });

    // Tech Software Bar at bottom
    s6.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 4.72, w: 8.8, h: 0.5, r: 0.06,
      fill: { color: C_CARD }, line: { color: C_GOLD, width: 1 }
    });

    s6.addText("INDUSTRY-STANDARD PIPELINE:  Toon Boom Harmony 22  •  Storyboard Pro  •  DaVinci Resolve Studio  •  Pro Tools HD  •  ProRes 4444 XQ Masters", {
      x: 0.8, y: 4.72, w: 8.4, h: 0.5,
      fontSize: 8, fontFace: FONT_BODY, color: C_WHITE, bold: true, align: 'center', valign: 'middle'
    });
  }

  // =========================================================================
  // SLIDE 7: VOICE-OVER ARCHITECTURE & SCRIPT AUDIT
  // =========================================================================
  {
    const s7 = pres.addSlide();
    addSlideHeader(s7, "Audio Engineering & Voice Cast", "Voice-Over Matrix & Registered Script Breakdown", 7);

    // Official Audit Callout Banner
    s7.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 1.35, w: 8.8, h: 0.45, r: 0.06,
      fill: { color: C_SPRUCE_BG }, line: { color: C_SPRUCE, width: 1.2 }
    });

    s7.addText("OFFICIAL SCREENPLAY AUDIT (CTXu001371329):  40 Script Pages  |  172 Speech Cues  |  305 Exact Lines  |  1,364 Words  |  14.5 Studio Hours", {
      x: 0.8, y: 1.35, w: 8.4, h: 0.45,
      fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: '6EE7B7', align: 'center', valign: 'middle'
    });

    // Voice Over Table
    const voRows = [
      [
        { text: "Character Role", options: { bold: true, fill: C_CARD_HEADER, color: C_GOLD } },
        { text: "Vocal Archetype", options: { bold: true, fill: C_CARD_HEADER, color: C_GOLD } },
        { text: "Cues", options: { bold: true, fill: C_CARD_HEADER, color: C_GOLD } },
        { text: "Lines", options: { bold: true, fill: C_CARD_HEADER, color: C_GOLD } },
        { text: "Words", options: { bold: true, fill: C_CARD_HEADER, color: C_GOLD } },
        { text: "Studio Hours", options: { bold: true, fill: C_CARD_HEADER, color: C_GOLD } }
      ],
      ["Rocky (Lead Protagonist)", "Youthful, tender, determined child or teen sound", "55 Cues", "78 Lines", "313 Words", "3.0 Hours"],
      ["Old Oak / Narrator", "Warm, resonant storybook grandfatherly baritone", "25 Cues", "66 Lines", "340 Words", "2.5 Hours"],
      ["AJ the Squirrel", "Rapid comic tenor, acrobat, musical rhymes", "26 Cues", "40 Lines", "151 Words", "2.0 Hours"],
      ["Mary Louise (Forest Fairy)", "Bright soprano, witty authority, magical shimmer", "19 Cues", "36 Lines", "155 Words", "2.0 Hours"],
      ["Bruce Spruce (The Rival)", "Booming, pompous resonant baritone", "12 Cues", "30 Lines", "172 Words", "1.5 Hours"],
      ["Mrs. Pickles (The Skunk)", "Prim, melodramatic diva alto with comedic timing", "8 Cues", "20 Lines", "89 Words", "1.0 Hours"],
      ["Pip / Young Saplings", "Inquisitive, enthusiastic child voice", "13 Cues", "15 Lines", "62 Words", "1.0 Hours"],
      ["Forest Wildlife & Crowd", "Blue Jay, chipmunk, selection crew crowd ADR", "14 Cues", "20 Lines", "82 Words", "1.5 Hours"]
    ];

    s7.addTable(voRows, {
      x: 0.6, y: 1.95, w: 8.8,
      colW: [1.9, 3.4, 0.85, 0.85, 0.9, 0.9],
      fontSize: 7.8, fontFace: FONT_BODY,
      color: C_WHITE,
      border: { color: C_BORDER, pt: 0.5 },
      fill: C_CARD,
      align: 'left',
      valign: 'middle'
    });

    // Included Callout Box at bottom
    s7.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 4.75, w: 8.8, h: 0.45, r: 0.06,
      fill: { color: '1E1708' }, line: { color: C_GOLD, width: 1 }
    });
    s7.addText("INCLUDED BENEFIT: Dedicated 6-actor ensemble voice cast and bespoke sound effects (SFX & Foley) are 100% included ($0 extra) in the Flagship Streamline Master Suite.", {
      x: 0.8, y: 4.75, w: 8.4, h: 0.45,
      fontSize: 8.2, fontFace: FONT_BODY, bold: true, color: C_AMBER, align: 'center', valign: 'middle'
    });
  }

  // =========================================================================
  // SLIDE 8: PRODUCTION PACKAGES & STREAMLINE MASTER SUITE
  // =========================================================================
  {
    const s8 = pres.addSlide();
    addSlideHeader(s8, "Master Investment Architecture", "Production Packages & Milestone Investment Flow", 8);

    // Flagship Streamline Master Card
    s8.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 1.35, w: 8.8, h: 2.15, r: 0.08,
      fill: { color: '0F1D33' }, line: { color: C_GOLD, width: 2 }
    });

    s8.addText("FLAGSHIP MASTER PRODUCTION SUITE  |  RECOMMENDED ALL-IN-ONE SOLUTION", {
      x: 0.85, y: 1.5, w: 5.5, h: 0.22,
      fontSize: 7.5, fontFace: FONT_BODY, bold: true, color: C_AMBER, letterSpacing: 1, valign: 'middle'
    });

    s8.addText("Streamline Master: Full Movie + 10 Viral Highlights", {
      x: 0.85, y: 1.74, w: 5.5, h: 0.38,
      fontSize: 14, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
    });

    s8.addText("Combines the full 33-beat animated cinema feature (16:9 Cinema 4K UHD) with 10 high-velocity viral short-drama highlight clips (9:16 vertical). Complete turn-key package engineered to capture both prestige family co-viewing and algorithmic mobile dominance.", {
      x: 0.85, y: 2.15, w: 5.5, h: 0.65,
      fontSize: 8.2, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
    });

    s8.addText("✓ 6-Actor Ensemble Voice Cast: INCLUDED ($0)\n✓ Bespoke Sound Effects, Foley & Orchestral Mix: INCLUDED ($0)\n✓ Full 16:9 Cinema 4K UHD Master + 10 Vertical 9:16 Shorts", {
      x: 0.85, y: 2.82, w: 5.5, h: 0.58,
      fontSize: 8, fontFace: FONT_BODY, color: '6EE7B7', bold: true, lineSpacingMultiple: 1.25, valign: 'middle'
    });

    // Price Box on Right
    s8.addShape(pres.ShapeType.roundRect, {
      x: 6.6, y: 1.55, w: 2.6, h: 1.75, r: 0.08,
      fill: { color: C_BG }, line: { color: C_GOLD, width: 1.2 }
    });

    s8.addText("TOTAL SOW INVESTMENT", {
      x: 6.6, y: 1.7, w: 2.6, h: 0.2,
      fontSize: 7.5, fontFace: FONT_BODY, bold: true, color: C_AMBER, align: 'center', valign: 'middle'
    });

    s8.addText("$25,950", {
      x: 6.6, y: 1.9, w: 2.6, h: 0.6,
      fontSize: 26, fontFace: FONT_TITLE, bold: true, color: C_AMBER, align: 'center', valign: 'middle'
    });

    s8.addText("50% Inception Kickoff: $12,975\nTwo 25% Review Gates: $6,487.50 each", {
      x: 6.6, y: 2.52, w: 2.6, h: 0.45,
      fontSize: 7.5, fontFace: FONT_BODY, color: C_ICE, align: 'center', lineSpacingMultiple: 1.25, valign: 'middle'
    });

    // Structured 3-Gate Flow
    const gates = [
      { pct: "50%", amount: "$12,975", title: "Gate 1: Inception & Pre-Production", desc: "Script breakdown, character model turnarounds, 33-beat animatic, scratch voice audio sync." },
      { pct: "25%", amount: "$6,487.50", title: "Gate 2: Animation & Rough Cut Review", desc: "Mid-point review, character rigging, lip-sync animation, background painting passes." },
      { pct: "25%", amount: "$6,487.50", title: "Gate 3: Final Master & YouTube Delivery", desc: "4K color grading, 5.1 sound mix, ProRes 4444 delivery, YouTube channel launch." }
    ];

    gates.forEach((g, idx) => {
      const x = 0.6 + idx * 2.95;
      s8.addShape(pres.ShapeType.roundRect, {
        x: x, y: 3.68, w: 2.85, h: 1.5, r: 0.07,
        fill: { color: C_CARD }, line: { color: C_BORDER, width: 1 }
      });

      s8.addText(`${g.pct}  |  ${g.amount}`, {
        x: x + 0.15, y: 3.82, w: 2.55, h: 0.25,
        fontSize: 10, fontFace: FONT_TITLE, bold: true, color: C_AMBER, valign: 'middle'
      });

      s8.addText(g.title, {
        x: x + 0.15, y: 4.1, w: 2.55, h: 0.3,
        fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C_WHITE, valign: 'middle'
      });

      s8.addText(g.desc, {
        x: x + 0.15, y: 4.42, w: 2.55, h: 0.65,
        fontSize: 7.5, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
      });
    });
  }

  // =========================================================================
  // SLIDE 9: MONTHLY SOCIAL MEDIA RETAINERS
  // =========================================================================
  {
    const s9 = pres.addSlide();
    addSlideHeader(s9, "Post-Launch Growth & Audience Retention", "Monthly Social Media Management & Syndication", 9);

    const retainers = [
      {
        tier: "Starter Launch",
        price: "$1,250",
        period: "/ month",
        desc: "Essential post-launch social distribution for consistent holiday visibility.",
        items: [
          "12 Vertical Shorts / Reels / TikToks per month",
          "Custom holiday cover thumbnail design",
          "Audience reply management & comment pinning",
          "Weekly performance and retention report"
        ],
        accent: C_BLUE,
        bgColor: '08172E'
      },
      {
        tier: "Growth Accelerator",
        price: "$2,400",
        period: "/ month",
        desc: "High-velocity distribution designed to trigger YouTube & TikTok recommendation algorithms.",
        items: [
          "20 Vertical Shorts / Reels / TikToks per month",
          "Native A/B thumbnail testing & title iteration",
          "YouTube Community Tab polls & story posts",
          "Amazon book conversion tracking & optimization",
          "Monthly 1-on-1 strategy call with Producer Ayaz"
        ],
        accent: C_GOLD,
        bgColor: '1E1708'
      },
      {
        tier: "Omnichannel Syndicate",
        price: "$3,800",
        period: "/ month",
        desc: "Dominant holiday campaign running full multi-platform publishing and rights enforcement.",
        items: [
          "Daily Publishing (30+ Short-form videos / mo)",
          "Content ID anti-piracy audio/video fingerprinting",
          "Podcast and audio excerpt syndication",
          "Dedicated Social Account Producer on 24/7 Slack",
          "Influencer holiday duet and remix management"
        ],
        accent: C_SPRUCE,
        bgColor: C_SPRUCE_BG
      }
    ];

    retainers.forEach((r, idx) => {
      const x = 0.6 + idx * 2.95;
      const y = 1.35;
      const w = 2.85;
      const h = 3.8;

      s9.addShape(pres.ShapeType.roundRect, {
        x: x, y: y, w: w, h: h, r: 0.08,
        fill: { color: C_CARD }, line: { color: r.accent, width: 1.5 }
      });

      // Top Tier Pill
      s9.addShape(pres.ShapeType.roundRect, {
        x: x + 0.15, y: y + 0.16, w: w - 0.3, h: 0.28, r: 0.04,
        fill: { color: r.bgColor }, line: { color: r.accent, width: 0.8 }
      });
      s9.addText(r.tier.toUpperCase(), {
        x: x + 0.15, y: y + 0.16, w: w - 0.3, h: 0.28,
        fontSize: 8, fontFace: FONT_BODY, bold: true, color: r.accent, align: 'center', valign: 'middle', letterSpacing: 1
      });

      // Price
      s9.addText(r.price, {
        x: x + 0.18, y: y + 0.52, w: 1.4, h: 0.45,
        fontSize: 18, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
      });
      s9.addText(r.period, {
        x: x + 1.45, y: y + 0.6, w: 1.2, h: 0.3,
        fontSize: 8.5, fontFace: FONT_BODY, color: C_MUTED, valign: 'middle'
      });

      // Description
      s9.addText(r.desc, {
        x: x + 0.18, y: y + 1.05, w: w - 0.36, h: 0.55,
        fontSize: 7.8, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.2, valign: 'top'
      });

      // Items
      const bullets = r.items.map(i => `✓  ${i}`).join('\n\n');
      s9.addText(bullets, {
        x: x + 0.18, y: y + 1.68, w: w - 0.36, h: 1.6,
        fontSize: 7.5, fontFace: FONT_BODY, color: C_WHITE, lineSpacingMultiple: 1.2, valign: 'top'
      });

      // Platform Pills at Bottom
      s9.addShape(pres.ShapeType.roundRect, {
        x: x + 0.15, y: y + 3.32, w: w - 0.3, h: 0.35, r: 0.05,
        fill: { color: C_CARD_HEADER }
      });
      s9.addText("PLATFORMS:  TikTok  •  Instagram  •  Facebook", {
        x: x + 0.15, y: y + 3.32, w: w - 0.3, h: 0.35,
        fontSize: 7.2, fontFace: FONT_BODY, bold: true, color: C_AMBER, align: 'center', valign: 'middle'
      });
    });
  }

  // =========================================================================
  // SLIDE 10: YOUTUBE PUBLISHING & RIGHTS MANAGEMENT
  // =========================================================================
  {
    const s10 = pres.addSlide();
    addSlideHeader(s10, "Turn-Key Channel Operations", "8-Point YouTube Publishing Engine & Rights Protection", 10);

    const points = [
      { num: "01", title: "Content ID Audio/Visual Fingerprinting", desc: "Automated digital fingerprinting prevents piracy and unauthorized reposts, ensuring all global AdSense flows directly to Jennie Nicassio." },
      { num: "02", title: "Native A/B Thumbnail Optimization", desc: "Multi-variant visual thumbnails deployed concurrently to maximize click-through rates across family and animation fan audiences." },
      { num: "03", title: "Community Tab & Fan Cultivation", desc: "Weekly behind-the-scenes concept art, character trivia, and polls building active subscriber loyalty prior to the winter premiere." },
      { num: "04", title: "Shorts Remixing & Sound Virality", desc: "Key emotional scenes and musical moments packaged into native YouTube Shorts to tap into algorithmic recommendations." },
      { num: "05", title: "SEO Metadata & Semantic Tagging", desc: "Search-optimized titles, comprehensive holiday descriptions, chapter timestamps, and closed-caption transcripts." },
      { num: "06", title: "Amazon Holiday Book Conversion", desc: "Pinned cards, end-screens, and tracked bio links engineered to convert video viewers into verified Amazon book purchases." },
      { num: "07", title: "Multi-Format Master Archival", desc: "Master files archived in ProRes 4444, stereo broadcast, and 5.1 surround ready for instant festival or broadcast submission." },
      { num: "08", title: "Monthly Strategy Calls with Producer Ayaz", desc: "Direct video conference reviews analyzing watch time, viewer retention graphs, and upcoming seasonal holiday pushes." }
    ];

    points.forEach((pt, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 0.6 + col * 4.45;
      const y = 1.35 + row * 0.95;

      s10.addShape(pres.ShapeType.roundRect, {
        x: x, y: y, w: 4.35, h: 0.88, r: 0.06,
        fill: { color: C_CARD }, line: { color: C_BORDER, width: 1 }
      });

      s10.addText(`${pt.num}. ${pt.title}`, {
        x: x + 0.15, y: y + 0.1, w: 4.05, h: 0.25,
        fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C_AMBER, valign: 'middle'
      });

      s10.addText(pt.desc, {
        x: x + 0.15, y: y + 0.38, w: 4.05, h: 0.45,
        fontSize: 7.2, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.2, valign: 'top'
      });
    });
  }

  // =========================================================================
  // SLIDE 11: 18-WEEK ROADMAP & 24/7 CLIENT SLA
  // =========================================================================
  {
    const s11 = pres.addSlide();
    addSlideHeader(s11, "Timeline & Studio Governance", "18-Week Production Master Timeline & 24/7 SLA", 11);

    const timeline = [
      { week: "Weeks 1–4", phase: "Phase 1: Inception", tasks: "Script breakdown, character model turnarounds, color scripts, 33-beat animatic." },
      { week: "Weeks 5–8", phase: "Phase 2: Assets", tasks: "Background environment paintings, Rocky hollow, Rockefeller Plaza, character rigs." },
      { week: "Weeks 9–14", phase: "Phase 3: Animation", tasks: "Full 2D animation, phoneme lip-sync, secondary needle dynamics, pencil cleanup." },
      { week: "Weeks 15–16", phase: "Phase 4: Compositing", tasks: "Lighting passes, 50,000 bulb illumination glow, atmospheric snow, color grading." },
      { week: "Weeks 17–18", phase: "Phase 5: Mix & Master", tasks: "5.1 sound mastering, final orchestral mix, 4K ProRes archival, YouTube publishing." }
    ];

    timeline.forEach((t, idx) => {
      const x = 0.6 + idx * 1.76;
      const y = 1.35;
      const w = 1.68;
      const h = 1.85;

      s11.addShape(pres.ShapeType.roundRect, {
        x: x, y: y, w: w, h: h, r: 0.06,
        fill: { color: C_CARD }, line: { color: C_GOLD, width: 1 }
      });

      s11.addText(t.week, {
        x: x + 0.1, y: y + 0.12, w: w - 0.2, h: 0.22,
        fontSize: 7.5, fontFace: FONT_BODY, bold: true, color: C_AMBER, align: 'center', valign: 'middle'
      });

      s11.addText(t.phase, {
        x: x + 0.1, y: y + 0.36, w: w - 0.2, h: 0.32,
        fontSize: 8.5, fontFace: FONT_TITLE, bold: true, color: C_WHITE, align: 'center', valign: 'middle'
      });

      s11.addText(t.tasks, {
        x: x + 0.1, y: y + 0.72, w: w - 0.2, h: 1.05,
        fontSize: 7.2, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.2, valign: 'top'
      });
    });

    // 24/7 SLA & Support Cards at bottom
    s11.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 3.35, w: 4.3, h: 1.8, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_BLUE, width: 1.2 }
    });

    s11.addText("24/7 PRODUCTION SLA & DIRECT ACCESS", {
      x: 0.8, y: 3.48, w: 3.9, h: 0.22,
      fontSize: 8, fontFace: FONT_BODY, bold: true, color: C_ICE, letterSpacing: 1, valign: 'middle'
    });

    s11.addText("Direct Account Management with Producer Ayaz", {
      x: 0.8, y: 3.72, w: 3.9, h: 0.35,
      fontSize: 11, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
    });

    s11.addText("• Dedicated private Slack/Discord studio channel for real-time production queries\n• Weekly synchronous sprint video reviews with screen-share animatics\n• Maximum 4-hour response SLA on all production feedback and inquiries\n• Direct email access: ayaz@neogentechnologies.com", {
      x: 0.8, y: 4.12, w: 3.9, h: 0.95,
      fontSize: 7.5, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
    });

    s11.addShape(pres.ShapeType.roundRect, {
      x: 5.1, y: 3.35, w: 4.3, h: 1.8, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_SPRUCE, width: 1.2 }
    });

    s11.addText("REVISION GATES & CLIENT CREATIVE CONTROL", {
      x: 5.3, y: 3.48, w: 3.9, h: 0.22,
      fontSize: 8, fontFace: FONT_BODY, bold: true, color: '6EE7B7', letterSpacing: 1, valign: 'middle'
    });

    s11.addText("Guaranteed Milestone Approvals", {
      x: 5.3, y: 3.72, w: 3.9, h: 0.35,
      fontSize: 11, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
    });

    s11.addText("• Two comprehensive revision rounds included per milestone phase\n• No work progresses to subsequent phase without Jennie Nicassio's formal sign-off\n• Complete intellectual property ownership retained 100% by the creator\n• All raw source files (Toon Boom, Pro Tools, DaVinci) provided upon master delivery", {
      x: 5.3, y: 4.12, w: 3.9, h: 0.95,
      fontSize: 7.5, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'top'
    });
  }

  // =========================================================================
  // SLIDE 12: FORMAL SOW COUNTERSIGNATURE & AUTHORIZATION
  // =========================================================================
  {
    const s12 = pres.addSlide();
    addSlideHeader(s12, "Executive Acceptance & Binding Agreement", "Official Scope of Work Authorization & Sign-Off", 12);

    s12.addText("This document represents the formal Scope of Work and Production Master Agreement between Jennie E. Nicassio and Neo Gen Technologies. Upon mutual countersignature, production will initiate in accordance with the 18-week master schedule.", {
      x: 0.6, y: 1.35, w: 8.8, h: 0.45,
      fontSize: 8.2, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.25, valign: 'middle'
    });

    // Client Block
    s12.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y: 1.9, w: 4.3, h: 3.2, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_GOLD, width: 1.2 }
    });

    s12.addText("CLIENT AUTHORIZATION & ACCEPTANCE", {
      x: 0.85, y: 2.05, w: 3.8, h: 0.25,
      fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C_AMBER, letterSpacing: 1, valign: 'middle'
    });

    s12.addShape(pres.ShapeType.rect, { x: 0.85, y: 3.25, w: 3.8, h: 0.015, fill: { color: '4B5563' } });
    s12.addText("Authorized Signature Line", { x: 0.85, y: 3.3, w: 3.8, h: 0.2, fontSize: 7, fontFace: FONT_BODY, color: C_MUTED, valign: 'middle' });

    s12.addText("Jennie E. Nicassio", {
      x: 0.85, y: 3.6, w: 3.8, h: 0.35,
      fontSize: 12, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
    });

    s12.addText("Author, Creator & Screenwriter\nROCKY: THE ROCKEFELLER CHRISTMAS TREE\nDirect Email: Jennie3963@gmail.com\nDate: ____________________________________", {
      x: 0.85, y: 4.0, w: 3.8, h: 0.95,
      fontSize: 8, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.3, valign: 'top'
    });

    // Agency Block
    s12.addShape(pres.ShapeType.roundRect, {
      x: 5.1, y: 1.9, w: 4.3, h: 3.2, r: 0.08,
      fill: { color: C_CARD }, line: { color: C_BLUE, width: 1.2 }
    });

    s12.addText("AGENCY COUNTERSIGNATURE & ACCEPTANCE", {
      x: 5.35, y: 2.05, w: 3.8, h: 0.25,
      fontSize: 8.5, fontFace: FONT_BODY, bold: true, color: C_ICE, letterSpacing: 1, valign: 'middle'
    });

    s12.addShape(pres.ShapeType.rect, { x: 5.35, y: 3.25, w: 3.8, h: 0.015, fill: { color: '4B5563' } });
    s12.addText("Producer Countersignature Line", { x: 5.35, y: 3.3, w: 3.8, h: 0.2, fontSize: 7, fontFace: FONT_BODY, color: C_MUTED, valign: 'middle' });

    s12.addText("Ayaz", {
      x: 5.35, y: 3.6, w: 3.8, h: 0.35,
      fontSize: 12, fontFace: FONT_TITLE, bold: true, color: C_WHITE, valign: 'middle'
    });

    s12.addText("Senior Account Manager & Producer\nNeo Gen Technologies (Creative & Animation Division)\nDirect Email: ayaz@neogentechnologies.com\nDate: ____________________________________", {
      x: 5.35, y: 4.0, w: 3.8, h: 0.95,
      fontSize: 8, fontFace: FONT_BODY, color: C_TEXT, lineSpacingMultiple: 1.3, valign: 'top'
    });
  }

  // Save to disk
  const outPathRoot = path.join(__dirname, 'Rocky_The_Rockefeller_Christmas_Tree_Master_Proposal.pptx');
  const outPathPublic = path.join(__dirname, 'public', 'Rocky_The_Rockefeller_Christmas_Tree_Master_Proposal.pptx');

  await pres.writeFile({ fileName: outPathRoot });
  console.log(`Saved polished master PowerPoint presentation to: ${outPathRoot}`);

  fs.copyFileSync(outPathRoot, outPathPublic);
  console.log(`Copied polished master PowerPoint presentation to public: ${outPathPublic}`);
}

createMasterPresentation()
  .then(() => console.log("Polished PowerPoint deck successfully regenerated!"))
  .catch(err => {
    console.error("Error generating PowerPoint deck:", err);
    process.exit(1);
  });
