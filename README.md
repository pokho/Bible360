# Bible360

Chronological Bible reading plans with multi-provider support, comparing different approaches to biblical chronology. Compare ESV, Logos, and Blue Letter Bible methodologies with optional Apocrypha integration.

## Features

### 🔄 Multi-Provider Comparison
- **ESV Chronological**: Young-earth creationism, literal historical approach
- **Logos Chronological**: Conservative dating with configurable parameters
- **Blue Letter Bible**: Conservative evangelical scholarship
- **Side-by-side table view** comparing all providers day-by-day

### 📚 Comprehensive Apocrypha Integration
- **Old Testament Apocrypha**: Deuterocanonical books (1-2 Maccabees, Tobit, Judith, Wisdom of Solomon, etc.)
- **New Testament Apocrypha**: Gospel of Thomas, Didache, 1-2 Clement, Shepherd of Hermas
- **Toggle functionality**: Enable/disable Apocrypha with real-time filtering
- **Denominational preferences**: Catholic, Orthodox, Anglican support

### ⚖️ Logos Configuration Panel
- **Dating System**: Young-earth, Conservative, Academic
- **Job Placement**: Patriarchal, Chronological, Thematic
- **Gospel Integration**: Historical, Parallel, Thematic
- **Psalms Distribution**: Historical, Thematic, Chronological
- **Apocrypha Settings**: Granular control over inclusion

### 📊 Table-Based Interface
- **All days by default**: Complete year-long reading plan in scrollable table
- **Current day highlighting**: Visual indicator for progress tracking
- **Historical context**: Period information and approximate dates
- **Source attribution**: Direct links to provider websites for verification

### 📱 Modern Web Interface
- **StencilJS + TypeScript**: Modern web component architecture
- **Responsive design**: Works seamlessly on mobile and desktop
- **Real-time filtering**: Instant Apocrypha toggle functionality
- **Progress tracking**: Visual indicators for completed readings

## Technology Stack

- **Framework**: StencilJS + TypeScript
- **Build Tool**: Stencil CLI
- **Components**: Custom web components
- **PDF Parsing**: pdf-parse for Blue Letter Bible plan extraction
- **Styling**: CSS with custom properties

## Project Structure

```
src/
├── components/
│   ├── app-root/                    # Main application component
│   ├── provider-selector/           # Provider selection and comparison
│   ├── reading-interface/           # Daily reading display and Apocrypha settings
│   ├── timeline-tools/              # Chronological visualization
│   └── progress-tracker/            # Multi-provider progress tracking
├── services/
│   ├── chronology-service.ts        # Date conversion and reconciliation
│   ├── bible-api-service.ts         # Bible text integration
│   ├── pdf-parser.service.ts        # PDF text extraction
│   └── apocrypha-service.ts         # Deuterocanonical management
├── data/
│   └── reading-providers/           # Provider implementations
├── types/                           # TypeScript definitions
└── utils/                          # Utility functions
```

## Chronological Methodology Comparison

### Blue Letter Bible
- **Dating System**: Young-earth creationist (~4004 BC)
- **Job Placement**: Days 24-26 with Genesis 1-11
- **Gospel Integration**: Starts Day 1 (Luke 1)
- **Apocrypha**: Optional Deuterocanonical support

### ESV (Crossway)
- **Dating System**: Conservative evangelical scholarship
- **Job Placement**: Contextual patriarchal period
- **Gospel Integration**: Historical sequence placement
- **Apocrypha**: Optional chronological placement

### Logos Academic
- **Dating System**: Academic flexibility with multiple options
- **Job Placement**: User-selectable based on dating system
- **Gospel Integration**: User-customizable patterns
- **Apocrypha**: Comprehensive scholarly integration

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/bible360.git
cd bible360
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

### Development

The development server will start at `http://localhost:3335` with hot reloading enabled.

**Note**: StencilJS automatically selects available ports. If port 3335 is occupied, it will use the next available port.

### Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test.watch
```

## Usage

1. **Launch Application**: Open `http://localhost:3335` in your browser
2. **View Comparison Table**: See all 365 days of reading plans for all providers side-by-side
3. **Toggle Apocrypha**: Use the Apocrypha ON/OFF button to filter Deuterocanonical and NT Apocrypha passages
4. **Configure Logos**: Click "Logos Config" to customize dating systems, job placement, and other parameters
5. **Navigate Days**: Use day controls to jump to specific days in the reading plan
6. **Verify Sources**: Click provider links to verify plans against original sources

## Implementation Details

### Current Status
✅ **Fully Functional**: Complete StencilJS application with working comparison table
✅ **Multi-Provider Support**: ESV, Logos, and Blue Letter Bible implementations
✅ **Apocrypha Integration**: Toggle functionality with real-time filtering
✅ **Logos Configuration**: Comprehensive parameter configuration panel
✅ **Source Attribution**: Direct links to provider websites for verification

### Source Verification
All reading plans include direct links to their original sources for verification:

- **ESV Chronological**: https://www.esv.org/resources/reading-plans/chronological/
- **Logos Chronological**: https://www.logos.com/resources/reading-plans/chronological/
- **Blue Letter Bible**: https://www.blueletterbible.org/study/reading/DBRP.php

These links are available both in the application header and in the comparison table for easy access.

### Project Structure
```
src/
├── components/
│   └── app-root/                    # Main application component with all functionality
├── data/
│   └── reading-providers/           # Provider data and implementations
├── services/                       # Background services (PDF parsing, etc.)
├── types/                          # TypeScript interfaces
└── assets/                         # Icons and static resources
```

### Key Features Implemented
- **Table-based comparison view** showing all days by default
- **Real-time Apocrypha filtering** with toggle button
- **Comprehensive Logos configuration** with all researched parameters
- **Source verification links** for ESV, Logos, and Blue Letter Bible
- **Responsive design** for mobile and desktop
- **TypeScript interfaces** for type safety

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

MIT License - see LICENSE file for details.

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