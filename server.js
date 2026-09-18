const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Serve static assets from root and public
app.use(express.static(__dirname));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));

// Quote storage file
const QUOTES_FILE = path.join(__dirname, 'quotes_storage.json');
const APPROVALS_FILE = path.join(__dirname, 'approvals_storage.json');

// Initialize data files if not present
if (!fs.existsSync(QUOTES_FILE)) {
  fs.writeFileSync(QUOTES_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(APPROVALS_FILE)) {
  fs.writeFileSync(APPROVALS_FILE, JSON.stringify([], null, 2));
}

// API: Project & SOW Data
app.get('/api/sow-data', (req, res) => {
  res.json({
    status: 'success',
    project: {
      title: "Rocky - The Rockefeller Christmas Tree: The Little Tree with Big Dreams",
      author: "Jennie E. Nicassio",
      productionCompany: "Nieje Productions",
      agency: "Neo Gen Technologies",
      accountManager: {
        name: "Ayaz",
        title: "Senior Technical Account Manager & Production Director",
        email: "ayaz@neogentechnologies.com",
        phone: "+1 (800) 555-NEOGEN",
        department: "Creative Media & Animation Production"
      },
      documentDate: "September 18, 2026",
      proposalRef: "NGT-SOW-2026-ROCKY-V1",
      validityDays: 30
    },
    packages: [
      {
        id: "pilot_2d",
        name: "Festival & Proof-of-Concept 2D Pilot",
        subtitle: "3–5 Minute Cinematic Teaser / Festival Short (Beats 1–8)",
        basePrice: 4950,
        timelineWeeks: 6,
        recommended: false,
        summary: "High-impact animated pilot covering Rocky's origin, the Hidden Forest rivalry with Bruce Spruce, and Mary Louise's challenge. Designed to win film festivals and pitch networks at an affordable indie budget."
      },
      {
        id: "vertical_series",
        name: "30-Episode Vertical Micro-Drama Series",
        subtitle: "9:16 Format for TikTok, YouTube Shorts & IG Reels (60–90s / Ep)",
        basePrice: 8850,
        timelineWeeks: 8,
        recommended: true,
        summary: "Capitalizes directly on Jennie Nicassio's vertical short-drama expertise. 30 high-hook episodic installments ($295/ep) with cliffhangers, rapid pacing, and viral social hooks."
      },
      {
        id: "full_special",
        name: "Full 40-Minute 2D Animated Family Special",
        subtitle: "Complete 40-Page Screenplay & 33-Beat Narrative Arc",
        basePrice: 24500,
        timelineWeeks: 18,
        recommended: false,
        summary: "The definitive holiday masterpiece: full screenplay production, 5-phase animation pipeline, orchestral holiday score, multi-character VO, and 4K theatrical master."
      }
    ],
    retainers: [
      {
        id: "retainer_silver",
        name: "Silver Monthly Production",
        monthlyPrice: 1450,
        deliverables: "4 vertical episodes/mo + 2 social teasers + YouTube basic scheduling"
      },
      {
        id: "retainer_gold",
        name: "Gold Monthly Growth (Recommended)",
        monthlyPrice: 2650,
        deliverables: "8 vertical episodes/mo + 1 horizontal vignette + full YouTube channel SEO & community management"
      },
      {
        id: "retainer_platinum",
        name: "Platinum Dedicated Studio Pod",
        monthlyPrice: 4500,
        deliverables: "Dedicated full-time animation pod delivering continuous serialized production & multi-platform releases"
      }
    ],
    youtubePlans: [
      {
        id: "yt_launch",
        name: "Channel Foundation & Launch (3 Months)",
        price: 1350,
        monthly: 450,
        features: ["Channel Art & Branding", "Weekly Upload Management", "Holiday SEO Keywords", "Custom 4K Thumbnails"]
      },
      {
        id: "yt_growth",
        name: "Holiday Dominance Campaign (6 Months)",
        price: 2340,
        monthly: 390,
        features: ["All Launch features", "A/B Thumbnail Testing", "Community Tab & Fan Polls", "Content ID & Amazon Link Monetization", "Weekly Analytics Reports"]
      }
    ]
  });
});

// API: Save Generated Quote Configuration
app.post('/api/save-quote', (req, res) => {
  try {
    const quoteData = req.body;
    quoteData.id = 'QTE-' + Date.now().toString(36).toUpperCase();
    quoteData.savedAt = new Date().toISOString();

    const existing = JSON.parse(fs.readFileSync(QUOTES_FILE, 'utf8') || '[]');
    existing.unshift(quoteData);
    fs.writeFileSync(QUOTES_FILE, JSON.stringify(existing.slice(0, 50), null, 2));

    res.json({
      status: 'success',
      quoteId: quoteData.id,
      message: 'Custom Scope of Work quote generated and stored successfully.',
      quote: quoteData
    });
  } catch (err) {
    console.error('Error saving quote:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// API: Submit Approval & Sign-Off
app.post('/api/sign-off', (req, res) => {
  try {
    const { signerName, signerEmail, organization, signatureImage, notes, selectedConfig, timestamp } = req.body;

    if (!signerName || !signerEmail) {
      return res.status(400).json({ status: 'error', message: 'Name and email are required for sign-off.' });
    }

    const signOffRecord = {
      id: 'SOW-SIGN-' + Date.now().toString(36).toUpperCase(),
      signerName,
      signerEmail,
      organization: organization || 'Nieje Productions',
      signatureImage: signatureImage || null,
      notes: notes || '',
      selectedConfig: selectedConfig || {},
      accountManager: 'ayaz@neogentechnologies.com',
      signedAt: timestamp || new Date().toISOString(),
      status: 'Countersignature Pending Account Manager Review'
    };

    const existing = JSON.parse(fs.readFileSync(APPROVALS_FILE, 'utf8') || '[]');
    existing.unshift(signOffRecord);
    fs.writeFileSync(APPROVALS_FILE, JSON.stringify(existing.slice(0, 50), null, 2));

    res.json({
      status: 'success',
      signOffId: signOffRecord.id,
      signedAt: signOffRecord.signedAt,
      message: 'Scope of Work successfully submitted and authorized for Account Manager review.',
      accountManager: 'ayaz@neogentechnologies.com'
    });
  } catch (err) {
    console.error('Error in sign-off:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Fallback route to index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`\n=============================================================`);
  console.log(` Neo Gen Technologies - SOW Web Application Server Running`);
  console.log(` Project: Rocky - The Rockefeller Christmas Tree`);
  console.log(` Account Manager: ayaz@neogentechnologies.com`);
  console.log(` URL: http://localhost:${PORT}`);
  console.log(`=============================================================\n`);
});
