---
name: Technical Focus OS
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#c7c4d6'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#918f9f'
  outline-variant: '#464554'
  surface-tint: '#c2c1ff'
  primary: '#c2c1ff'
  on-primary: '#1c0b9f'
  primary-container: '#5856d6'
  on-primary-container: '#e7e4ff'
  inverse-primary: '#4f4ccd'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#915b00'
  on-tertiary-container: '#ffe1c2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c2c1ff'
  on-primary-fixed: '#0c006a'
  on-primary-fixed-variant: '#3631b4'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is engineered as a high-density, low-friction operating system for competitive examination aspirants and engineering students. The interface acts as an unyielding, distraction-free cockpit designed to support grueling 8-to-12 hour study blocks. 

The aesthetic marries **Technical Minimalism** with **Instrumental Utility**:
- **Tone & Demeanor**: Rigorous, quiet, deterministic, and razor-sharp. It removes all juvenile gamification in favor of empirical mastery metrics, cognitive speed, and systematic clarity.
- **Visual Rhythm**: High legibility, mathematical precision, mono-spaced data alignment, and quiet surfaces punctuated by calculated bursts of high-signal color.
- **Emotional Response**: Grounded calm, acute focus, unclouded competence, and total command over cognitive workload.

## Colors

The palette establishes an aggressive dark-mode bias to minimize ocular fatigue during extended nighttime problem-solving sessions.

- **Primary (`#5856D6` Electric Indigo)**: Reserved strictly for core actions, dynamic progress states, active timers, and cursor-level interactive targets.
- **Secondary (`#10B981` Emerald Green)**: Communicates absolute mastery, verified formula retention, and correct test assertions. Used sparingly to ensure its psychological reward value remains high.
- **Tertiary (`#F59E0B` Amber)**: Denotes "Fragile" retention states, spaced-repetition decay, pending revisions, and critical time-budget warnings.
- **Neutral & Surfaces (`#121316` Deep Charcoal)**: The foundation layer. Layered tiers extend upward:
  - Base Canvas: `#121316`
  - Container / Surface: `#181A1F`
  - Elevated Container / Hover: `#202329`
  - Subdued Borders & Structural Dividers: `#2D3139` (derived from Muted Slate at 20–40% alpha)
- **Content Hierarchy**:
  - High Emphasis: `#F3F4F6` (Crisp Off-White) for headings, active equations, and input states.
  - Medium Emphasis: `#8E8E93` (Muted Slate) for labels, metadata, shortcuts, and axes.
  - Low Emphasis: `#52525B` for inactive icons, disabled states, and structural track guides.

## Typography

The typographic hierarchy prioritizes technical legibility under cognitive strain. **Geist** delivers crisp geometric neutrals for textual discourse, conceptual notes, and hierarchy headers. **JetBrains Mono** takes over for quantitative artifacts: timestamps, retention percentages, formula tags, percentile ranks, and command-line style shortcuts.

- Set numerical parameters with tabular figures (`tnum`) across all instances to prevent layout shifting during active countdowns.
- Mathematical notations, index markers, and state indicators default to `label-*` tokens to reinforce the system's analytical posture.
- Maintain high contrast: body text must never dip below `#D1D5DB` against charcoal backdrops.

## Layout & Spacing

The structural layout utilizes a strict 12-column adaptive fluid grid engineered for rapid scanning:

- **Breakpoints**:
  - Compact (Mobile: 360px – 767px): 4-column layout, `margin` = `1rem`, `gutter` = `1rem`. Dense single-column feed optimizing thumb reach for mock test reviews.
  - Medium (Tablet: 768px – 1023px): 8-column layout, `margin-tablet` = `1.5rem`, `gutter` = `1rem`. Split split-pane focus view (question paper left, scratchpad right).
  - Expanded (Desktop: 1024px – 1440px+): 12-column layout, `margin-desktop` = `2.5rem`, `gutter-desktop` = `1.5rem`. Maximum cockpit mode: Left persistent navigation (64px collapsed / 240px expanded), central workspace (columns 1–8), and diagnostic telemetry sidebar (columns 9–12).
- **Rhythm**: All paddings and component internal distributions lock strictly to multiples of `0.25rem` (4px baseline).

## Elevation & Depth

This design system avoids blurry skeuomorphic drop-shadows and chaotic blurs. Visual separation is accomplished through **Tonal Layers** and **Low-Contrast Technical Outlines**:

- **Layer 0 (Base Canvas)**: `#121316`. Passive backdrop.
- **Layer 1 (Cards, Modules, Sidebars)**: `#181A1F` bordered by a 1px continuous hairline rule (`#2D3139`).
- **Layer 2 (Focus Modals, Tooltips, Command Palettes)**: `#202329` with a 1px border of `#3E434D` paired with an ultra-subtle directional ambient shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.6)`.
- **Active Focus States**: Border illumination shifts from slate to Electric Indigo (`#5856D6`) at 100% opacity, accompanied by an interior 1px pseudo-inset stroke. No noisy colored halos.

## Shapes

The geometric signature is **Soft-Technical** (`roundedness: 1`):
- Base interactive targets, inputs, and modular cards receive `0.25rem` (4px) corner radii.
- Larger diagnostic modules and floating review panes scale to `rounded-lg` (`0.5rem` / 8px).
- Status indicator tags, flashcard decay markers, and test question pills utilize strict rectangular boundaries with clipped or compact 2px–4px chamfered corners, maintaining an instrumental, lab-equipment feel.

## Components

### Buttons
- **Primary**: Background `#5856D6`, foreground `#FFFFFF`, border none, radius `0.25rem`. Active/pressed shifts to `#4B48B8`. Typography: `label-md`.
- **Secondary / Ghost**: Background transparent, border 1px solid `#2D3139`, foreground `#F3F4F6`. Hover triggers background `#202329` and border `#3E434D`.
- **Destructive / Caution**: Bordered with `#F59E0B` low-alpha tints for session abandonment or timing resets.

### Status Pills & Mastery Indicators
- **Mastered Pill**: Background `rgba(16, 185, 129, 0.12)`, text `#10B981`, border 1px solid `rgba(16, 185, 129, 0.3)`. Text set in `label-sm` (uppercase).
- **Fragile Pill**: Background `rgba(245, 158, 11, 0.12)`, text `#F59E0B`, border 1px solid `rgba(245, 158, 11, 0.3)`.
- **Neutral / Unattempted**: Background `#181A1F`, text `#8E8E93`, border 1px solid `#2D3139`.

### Cards & Focus Containers
- Background `#181A1F`, border 1px solid `#2D3139`. Padding strictly conforms to `space-md` (`1rem`) on mobile and `space-lg` (`1.5rem`) on desktop.
- Header bars within cards are separated by a 1px bottom divider `#2D3139` with integrated metadata metrics rendered in `label-md`.

### Form Controls & Inputs
- **Text Inputs**: Background `#121316`, border 1px solid `#2D3139`, font `Geist` or `JetBrains Mono` depending on numerical mode. Focus ring switches border color to `#5856D6` without diffuse shadows.
- **Checkboxes & Radios**: 16px square/circle, `#181A1F` fill, 1px border `#3E434D`. Checked state fills `#5856D6` with a high-contrast white glyph.

### Specialized OS Modules
- **Timer / Speedhud**: High-density numerical display utilizing `JetBrains Mono` and `headline-lg`. Flips amber (`#F59E0B`) when standard question allocation time is exceeded.
- **Formula Inspector**: Code-block format container featuring `#121316` fill, left accent bar in `#5856D6` (2px width), and instant keyboard shortcut badges (`label-sm`).