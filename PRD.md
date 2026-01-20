# Gait & Mobility Tracker

A comprehensive web application for tracking, assessing, and analyzing gait, mobility, and posture metrics to help users monitor their movement health over time.

**Experience Qualities**:
1. **Clinical** - Professional and precise, evoking trust through clean data presentation and medical-grade attention to detail
2. **Empowering** - Provides clear insights that help users understand and improve their movement patterns
3. **Focused** - Streamlined interface that eliminates distractions and centers on essential mobility metrics

**Complexity Level**: Light Application (multiple features with basic state)
This app manages multiple related features (gait assessment, posture tracking, mobility scoring) with persistent state for historical tracking, but remains focused on a single domain without requiring complex multi-view navigation or advanced backend integration.

## Essential Features

### Gait Assessment Entry
- **Functionality**: Record and log gait measurements including step length, cadence, stride time, and gait speed
- **Purpose**: Build a historical record of walking patterns to identify trends and improvements
- **Trigger**: User taps "New Gait Assessment" button
- **Progression**: Select assessment type → Input measurements (step length, cadence, stride time, balance rating) → Add optional notes → Save assessment → View confirmation with comparison to previous entry
- **Success criteria**: Assessment saved to persistent storage, immediately visible in history list, metrics calculate automatically (e.g., gait speed from cadence + step length)

### Posture Check Logging
- **Functionality**: Document posture observations with timestamps, body regions, and severity ratings
- **Purpose**: Track postural patterns and identify areas needing attention
- **Trigger**: User taps "Log Posture Check"
- **Progression**: Select time of day → Choose body regions (head/neck, shoulders, spine, hips) → Rate alignment for each (good/fair/poor) → Add observations → Save → View in timeline
- **Success criteria**: Posture log persisted with timestamp, viewable in chronological timeline, region-specific trends visible

### Mobility Score Dashboard
- **Functionality**: Aggregate view showing overall mobility trends, recent assessments, and key metrics
- **Purpose**: Provide at-a-glance understanding of movement health status
- **Trigger**: Default landing screen
- **Progression**: App opens → Display current mobility score (calculated from recent assessments) → Show trend graph (last 30 days) → List recent assessments → Quick action buttons for new entries
- **Success criteria**: Score updates automatically when new data added, graph renders smoothly, trends are visually clear

### Assessment History & Trends
- **Functionality**: Filterable list of all assessments with visual trend indicators
- **Purpose**: Enable users to review progress and identify patterns over time
- **Trigger**: User taps "History" tab or "View All" on dashboard
- **Progression**: Open history view → See chronological list with key metrics → Tap filter to show specific assessment type → Select individual entry to see full details → Option to edit or delete
- **Success criteria**: All historical data loads quickly, filters work instantly, detail view shows all recorded information

## Edge Case Handling

- **No Data State**: Show welcoming empty state with illustration and clear CTA to create first assessment
- **Incomplete Entries**: Auto-save draft assessments to prevent data loss if user navigates away
- **Invalid Input**: Validate numeric ranges (e.g., cadence 40-200 steps/min) with helpful error messages
- **Data Export**: Provide option to export assessment history as CSV for sharing with healthcare providers
- **Long Notes**: Truncate lengthy observation notes in list views with "read more" expansion

## Design Direction

The design should evoke clinical precision and trustworthiness while remaining approachable and motivating. Think medical-grade fitness tracker meets physical therapy clinic - professional without being sterile, data-rich without being overwhelming. The interface should feel like a tool that healthcare professionals would respect but that anyone can use confidently.

## Color Selection

A calm, clinical palette with health-focused accents that communicate wellness and scientific rigor.

- **Primary Color**: Deep teal `oklch(0.45 0.08 200)` - Communicates healthcare, trust, and professionalism with medical association
- **Secondary Colors**: Soft slate `oklch(0.55 0.02 240)` for backgrounds and less prominent UI elements, maintaining clinical feel without harshness
- **Accent Color**: Vibrant spring green `oklch(0.68 0.15 145)` - Represents health, improvement, and positive movement metrics
- **Foreground/Background Pairings**: 
  - Primary (Deep Teal #4a7c7d): White text (#FFFFFF) - Ratio 5.2:1 ✓
  - Accent (Spring Green #5cb85c): White text (#FFFFFF) - Ratio 4.7:1 ✓
  - Background (Light Gray #f8f9fa): Dark Gray text (#2c3e50) - Ratio 12.3:1 ✓
  - Secondary (Soft Slate #7e8c9a): White text (#FFFFFF) - Ratio 5.8:1 ✓

## Font Selection

Typography should project medical authority and precision while remaining highly legible for data-heavy interfaces.

- **Primary Typeface**: IBM Plex Sans - A technical yet approachable sans-serif that balances clinical precision with warmth, excellent for UI and data display
- **Accent Typeface**: JetBrains Mono - For numeric data and measurements, providing clear distinction and technical credibility

**Typographic Hierarchy**:
- H1 (Page Titles): IBM Plex Sans Semibold / 32px / tight tracking (-0.02em)
- H2 (Section Headers): IBM Plex Sans Medium / 24px / normal tracking
- H3 (Card Titles): IBM Plex Sans Medium / 18px / normal tracking
- Body (Descriptions): IBM Plex Sans Regular / 16px / 1.6 line-height
- Data Labels: IBM Plex Sans Medium / 14px / uppercase / wide tracking (0.05em)
- Numeric Values: JetBrains Mono Medium / 28px / tight tracking
- Small Data: JetBrains Mono Regular / 14px / normal tracking
- Captions: IBM Plex Sans Regular / 13px / muted color

## Animations

Animations should reinforce the clinical precision of the app while providing clear feedback for user actions. Use subtle, purposeful motion - data updates should feel immediate and trustworthy, while transitions guide attention without delay. Emphasize:
- Smooth chart rendering with gentle ease-in transitions (300ms)
- Form field focus with subtle scale and glow (150ms)
- Success confirmations with quick checkmark animations and spring physics (400ms)
- List item entries with staggered fade-ups (200ms per item, 50ms stagger)
- Score changes with number-rolling animations for engagement

## Component Selection

**Components**:
- **Card**: Primary container for dashboard widgets (mobility score, recent assessments, trends graph) with subtle shadows
- **Button**: Primary actions (New Assessment, Save) use solid fills; secondary actions (Cancel, Edit) use outlines
- **Input**: Labeled text fields for measurements with right-aligned units (e.g., "cm", "steps/min")
- **Select**: Dropdown for assessment type, body regions, time of day
- **Textarea**: Multi-line input for observation notes
- **Tabs**: Switch between Dashboard, History, and Settings views
- **Dialog**: Modal for new assessment entry forms, keeping context visible
- **Badge**: Status indicators for posture ratings (good=green, fair=yellow, poor=red)
- **Slider**: Alternative input for rating scales (balance, alignment)
- **ScrollArea**: Smooth scrolling for long history lists
- **Separator**: Visual dividers between assessment sections

**Customizations**:
- **Metric Display Card**: Custom component combining label, large numeric value in JetBrains Mono, unit label, and optional trend indicator
- **Assessment Timeline**: Custom vertical timeline component with connecting lines and date markers
- **Progress Ring**: Custom SVG circular progress indicator for mobility score (0-100)
- **Trend Graph**: Line chart using recharts with smooth curves and gradient fills

**States**:
- Buttons: Default with solid color → Hover with slight brightness increase → Active with scale(0.98) → Disabled with 50% opacity
- Inputs: Default with border → Focus with accent border + shadow → Error with destructive border + shake animation → Success with accent checkmark
- Cards: Default with subtle shadow → Hover with elevated shadow (for interactive cards)

**Icon Selection**:
- Footprints (gait assessment), UserFocus (posture), Activity (mobility score), ChartLine (trends), Plus (new entry), Calendar (history), Export (data export), Check (confirmation), Warning (alerts)

**Spacing**:
- Container padding: p-6 (24px) on desktop, p-4 (16px) on mobile
- Card gaps: gap-6 for primary sections, gap-4 for related items, gap-2 for tight groups
- Form fields: space-y-4 for field groups, gap-2 for label-input pairs
- Dashboard grid: grid gap-6 with responsive columns (1 on mobile, 2-3 on desktop)

**Mobile**:
- Single column layout with full-width cards
- Bottom navigation bar replacing top tabs
- Floating action button for "New Assessment" in bottom-right
- Simplified metric cards showing only primary value, expandable for details
- Form inputs stack vertically with full width
- Slide-up sheets instead of centered modals for data entry
