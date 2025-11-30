# Bible360 Project - Local Claude Instructions

## Architecture Decisions

### Data Structure Principles (CRITICAL)
- **Single Source of Truth**: Each reading provider data MUST be stored in `src/data/reading-providers/[provider-name].ts`
- **NEVER place reading plan data in lib/stores/ - stores are for state management only**
- **Historical Context Integration**: Context MUST be embedded within daily reading data, not in separate columns
- **Provider Files**: Each provider (Blue Letter Bible, Logos Academic, Biblehub, Apocrypha) must have complete data in their respective files

### File Organization Rules
```
✅ CORRECT: src/data/reading-providers/blue-letter-bible.ts
✅ CORRECT: src/data/reading-providers/logos-academic.ts
✅ CORRECT: src/data/reading-providers/biblehub-chronological.ts
✅ CORRECT: src/data/reading-providers/apocrypha-chronological.ts

❌ WRONG: src/lib/data/consolidated-reading-plans.ts
❌ WRONG: src/lib/stores/[provider-data].ts
❌ WRONG: Reading plan data in components
```

### Data Structure Requirements
Each daily reading MUST include:
```typescript
{
  day: number,
  date: string,
  passages: Array<{
    book: string,
    chapterStart: number,
    chapterEnd?: number,
    testament: 'old' | 'new' | 'apocryphal'
  }>,
  historicalContext: {
    period: string,
    approximateDate: string,
    description: string  // Rich theological and historical insight
  },
  readingTimeMinutes: number
}
```

### Historical Context Integration
- **Context displays WITH daily readings** (not in separate Historical Context column)
- **Theological depth**: Include spiritual insights, Christological connections, practical applications
- **Historical accuracy**: Conservative evangelical scholarship with proper dating
- **Educational value**: Context helps users understand biblical significance

### Provider Class Structure
Each provider file must contain:
```typescript
export class [ProviderName]Provider {
  async loadReadingPlan(): Promise<ReadingPlan>
  private convertToReadingPlan(): ReadingPlan
  private getCompleteReadingPlan(): ParsedReadingPlan
  // Helper methods for passages, context, etc.
}
```

## Technical Requirements

### TypeScript Standards
- Update `ParsedReadingPlan` interface to include `historicalContext` in daily readings
- Maintain type safety across all provider files
- Ensure no compilation errors

### Development Workflow
- Use `npm run dev` for development server
- Hot module reload should work with all data changes
- Test historical context display after each data migration

### User Experience Goals
- **Remove separate Historical Context column**
- **Display context within provider cells**
- **Enhanced educational value through integrated context**
- **Smooth navigation and performance**

## Quality Standards

### KISS/DRY Principles
- Single source of truth for each provider
- No data duplication across files
- Simple, maintainable file structure
- Clear separation of concerns

### Testing Requirements
- Verify historical context displays with daily readings
- Ensure all providers load data from proper files
- Test navigation and performance after data migration
- Validate type safety and compilation

### Documentation
- All status reports saved to `docs/status_reports/` with timestamp format: `$(date +'%Y-%m-%dT%H.%M%z')_<brief_summary>.md`
- Technical decisions documented in this file
- Progress tracking through todo items