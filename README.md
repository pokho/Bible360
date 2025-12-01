# Bible360

Complete chronological Bible reading plans with comprehensive historical context and multi-provider support. Compare different chronological approaches with rich scholarly insights and optional Apocrypha integration.

## Features

### 📖 Complete Bible Coverage
- **BibleHub Chronological**: Complete 365-day plan covering entire Bible (Genesis to Revelation)
- **Logos Academic**: Conservative evangelical scholarship with configurable parameters
- **Blue Letter Bible**: Traditional chronological reading methodology
- **Side-by-side comparison**: Compare all providers day-by-day in detailed table view

### 📚 Comprehensive Apocrypha Integration
- **365-Day Apocrypha Plan**: Complete chronological journey through 41 unique apocryphal texts
- **Deuterocanonical Books**: Tobit, Judith, Wisdom of Solomon, Sirach, Baruch, 1-2 Maccabees, etc.
- **Old Testament Pseudepigrapha**: 1 Enoch, Jubilees, Testament of the Twelve Patriarchs
- **New Testament Apocrypha**: Gospel of Thomas, Didache, 1-2 Clement, Shepherd of Hermas
- **Gnostic Texts**: Nag Hammadi Library including Gospel of Philip, Gospel of Mary
- **Priority URL System**: BibleGateway NRSVUE → Sacred Texts → Early Christian Writings

### 🏛️ Rich Historical Context
- **Scholarly Dating**: Conservative evangelical chronology throughout
- **Theological Insights**: Christological connections and spiritual applications
- **Cultural Context**: Understanding biblical events in their historical setting
- **Educational Value**: Deep dive into the meaning and significance of each passage
- **Period Classifications**: Primeval History, Patriarchal Era, United Kingdom, etc.

### 📊 Advanced Interface
- **Complete Year View**: All 365 days displayed in scrollable comparison table
- **Historical Context Integration**: Context embedded within daily readings (not separate column)
- **Working URL Generation**: Direct links to BibleGateway, Sacred Texts, and other sources
- **Responsive Design**: Optimized for mobile and desktop viewing
- **Real-time Updates**: Instant loading and filtering of reading plans

### 🎯 Academic Excellence
- **584 Timeline Events**: Complete BibleHub chronological timeline integration
- **Proper Chronological Flow**: Events distributed across manageable daily portions
- **Source Attribution**: Links to original sources for verification and deeper study
- **Denominational Sensitivity**: Respectful approach to different biblical traditions

## Technology Stack

- **Framework**: SvelteKit + TypeScript
- **Build Tool**: Vite
- **Styling**: Svelte CSS with custom properties
- **Data Management**: TypeScript stores with type safety
- **URL Generation**: Dynamic link generation for multiple Bible sources

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ComparisonTable.svelte    # Main reading plan comparison interface
│   │   └── ...                       # Other Svelte components
│   ├── stores/
│   │   └── readingPlansStore.ts      # State management for reading plans
│   ├── services/
│   │   └── pdf-parser.service.ts     # PDF parsing utilities
│   └── data/
│       └── reading-providers/        # Provider implementations
│           ├── blue-letter-bible.ts  # BLB chronological plan
│           ├── logos-academic.ts     # Logos chronological plan
│           ├── biblehub-chronological.ts # Complete Bible timeline
│           └── apocrypha-chronological.ts # Apocrypha reading plan
├── utils/
│   ├── biblehub-utils.ts             # URL generation utilities
│   └── apocrypha-links.ts            # Apocrypha URL management
└── types/
    └── reading-plans.ts              # TypeScript interfaces
```

## Reading Plan Coverage

### BibleHub Chronological (Complete Bible)
- **Days 1-25**: Primeval History & Patriarchs (Creation, Fall, Flood, Abraham, Jacob, Joseph)
- **Days 26-90**: Exodus & Wilderness (Deliverance, Sinai Covenant, Tabernacle, Wanderings)
- **Days 91-180**: Conquest & Judges (Joshua, Judges, Ruth)
- **Days 181-270**: United Kingdom (Samuel, Saul, David, Solomon)
- **Days 271-330**: Divided Kingdom & Prophets (Israel/Judah split, major/minor prophets)
- **Days 331-365**: Exile, Return & New Testament (Daniel, Ezra/Nehemiah, Christ's life)

### Apocrypha & Pseudepigrapha (365 Days)
- **Days 1-90**: Deuterocanonical Literature (Tobit, Judith, Wisdom, Sirach, Maccabees)
- **Days 91-180**: Old Testament Pseudepigrapha (1 Enoch, Jubilees, Testaments)
- **Days 181-270**: Early Christianity (Apostolic Fathers, NT Apocrypha)
- **Days 271-365**: Gnostic & Alternative Traditions (Nag Hammadi Library, Dead Sea Scrolls)

## Provider Methodologies

### Blue Letter Bible
- **Dating System**: Young-earth creationist (~4004 BC)
- **Chronological Approach**: Traditional conservative evangelical scholarship
- **Historical Context**: Basic period identification
- **URL Sources**: Direct links to BLB website

### Logos Academic
- **Dating System**: Conservative evangelical scholarship
- **Methodology**: Academic framework with historical-critical elements
- **Educational Focus**: Scholarly insights and theological connections
- **Configurability**: Multiple dating and placement options

### BibleHub Chronological
- **Dating System**: Conservative evangelical chronology
- **Timeline Integration**: 584 chronological events from BibleHub timeline
- **Complete Coverage**: Entire Bible from Genesis to Revelation
- **Historical Depth**: Rich context with scholarly dating and theological insights

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/pokho/Bible360.git
cd Bible360
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

### Development

The development server will start at `http://localhost:7777` with hot reloading enabled.

**Note**: SvelteKit uses Vite which automatically selects available ports. The default port is 5173, but may vary based on availability.

## Usage

1. **Launch Application**: Open `http://localhost:7777` (or the shown port) in your browser
2. **View Comparison Table**: See all 365 days of reading plans for all providers side-by-side
3. **Navigate Reading Plans**: Scroll through the complete year of chronological readings
4. **Access Sources**: Click provider links to verify plans against original sources
5. **Study Historical Context**: Each reading includes rich historical and theological context
6. **Explore URLs**: Click on passage links to read the actual biblical texts

## Implementation Details

### Current Status
✅ **Complete Bible Coverage**: BibleHub chronological plan covers entire Bible (Genesis to Revelation)
✅ **Comprehensive Apocrypha Plan**: 365-day chronological journey through 41 unique apocryphal texts
✅ **Multi-Provider Support**: Blue Letter Bible, Logos Academic, and BibleHub chronological plans
✅ **Rich Historical Context**: Scholarly dating and theological insights integrated throughout
✅ **Working URL Generation**: Direct links to BibleGateway, Sacred Texts, and other sources
✅ **TypeScript Implementation**: Full type safety and error handling

### Source Verification
All reading plans include direct links to their original sources for verification:

- **Blue Letter Bible**: https://www.blueletterbible.org/study/reading/DBRP.php
- **Logos Academic**: https://www.logos.com/resources/reading-plans/chronological/
- **BibleHub Timeline**: https://biblehub.com/timeline/
- **BibleGateway (Primary URL source)**: https://www.biblegateway.com/
- **Sacred Texts (Secondary source)**: https://sacred-texts.com/
- **Early Christian Writings (Backup)**: https://www.earlychristianwritings.com/

### Technical Architecture
```
src/
├── lib/
│   ├── components/
│   │   └── ComparisonTable.svelte    # Main comparison interface
│   ├── data/
│   │   └── reading-providers/        # Provider implementations with complete reading data
│   ├── stores/
│   │   └── readingPlansStore.ts      # State management for reading plans
│   ├── services/
│   │   └── pdf-parser.service.ts     # PDF parsing utilities
│   └── utils/
│       ├── biblehub-utils.ts         # BibleHub URL generation
│       └── apocrypha-links.ts        # Apocrypha URL management with priority system
└── types/
    └── reading-plans.ts              # TypeScript interfaces
```

### Key Features Implemented
- **Complete 365-day chronological reading plans** for all providers
- **Rich historical context** embedded within daily readings
- **Priority-based URL system** for reliable biblical text access
- **Comprehensive Apocrypha integration** with chronological organization
- **Responsive SvelteKit design** optimized for all devices
- **TypeScript type safety** throughout the application
- **584 timeline events** properly distributed across reading plan
- **Custom commercial-use protection license**

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

Bible360 is licensed under the **Bible360 Source Available License** by Paul Henckel.

**What this means:**
- ✅ Free for personal, educational, and religious/non-profit use
- ✅ You can study, modify, and contribute to the code
- ✅ You can share the software for non-commercial purposes
- ❌ Commercial use is strictly prohibited without written permission

**Commercial Use Definition:**
Commercial use includes selling the software, SaaS offerings, inclusion in commercial products, revenue generation activities, and enterprise use.

**For Commercial Licensing:**
Contact: bible360@travail.mozmail.com for commercial licensing inquiries.

**Important Note:**
This is a "Source Available" license, not an "Open Source" license. It is designed to allow community contribution while protecting the commercial rights of the original author.

See the [LICENSE](LICENSE) file for complete terms and conditions.

## Acknowledgments

- Blue Letter Bible for chronological reading plan structure
- Crossway for ESV translation and methodology
- Logos Bible Software for academic framework inspiration
- StencilJS team for the excellent component framework

## Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Check the documentation at `/docs`
- Join our Discord community

---

Built with ❤️ for the Bible study community