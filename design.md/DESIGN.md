---
name: Canarinho Nocturnal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bdcab9'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#879484'
  outline-variant: '#3e4a3d'
  surface-tint: '#65df76'
  primary: '#65df76'
  on-primary: '#003911'
  primary-container: '#23a646'
  on-primary-container: '#00320d'
  inverse-primary: '#006e27'
  secondary: '#fff9ed'
  on-secondary: '#393000'
  secondary-container: '#fddc00'
  on-secondary-container: '#706000'
  tertiary: '#ffb1c2'
  on-tertiary: '#66002b'
  tertiary-container: '#ed6089'
  on-tertiary-container: '#590025'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#81fc90'
  primary-fixed-dim: '#65df76'
  on-primary-fixed: '#002107'
  on-primary-fixed-variant: '#00531c'
  secondary-fixed: '#ffe24b'
  secondary-fixed-dim: '#e3c600'
  on-secondary-fixed: '#211b00'
  on-secondary-fixed-variant: '#524600'
  tertiary-fixed: '#ffd9df'
  tertiary-fixed-dim: '#ffb1c2'
  on-tertiary-fixed: '#3f0018'
  on-tertiary-fixed-variant: '#8b1040'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -1px
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-md:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.5px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
This design system transition shifts from a bright, civic-focused aesthetic to a high-performance, dark-mode environment. The brand personality remains authoritative and efficient but adopts a more sophisticated, "pro-tools" atmosphere. 

The design style utilizes **Modern Corporate** principles with a focus on **Tonal Layering**. By using deep charcoal and obsidian surfaces instead of pure black, the UI maintains a sense of depth and reduces eye strain. The primary green accent is preserved as a signal of action and vitality, cutting through the dark interface to guide the user's attention. The target audience includes citizens and professionals who require high-clarity information density in various lighting conditions.

## Colors
The palette is anchored by a deep obsidian background to ensure the primary green (#009739) retains its vibrance without causing chromatic aberration. 

- **Primary Green:** Reserved for primary actions, success states, and critical branding elements.
- **Secondary Yellow:** Used sparingly for warnings or high-priority highlights to maintain the national identity.
- **Surface Hierarchy:** Depth is communicated through increasing brightness. The lowest level is `#0A0A0A`, while elevated components (cards, modals) use `#1E1E1E` or `#2C2C2C`.
- **Contrast:** Text colors are strictly controlled. High-emphasis text uses pure white (87-100% opacity), while secondary information uses a muted silver-grey to manage visual hierarchy.

## Typography
The typography utilizes **Public Sans** to maintain an institutional yet accessible feel. In dark mode, font weights are slightly adjusted to compensate for "ink spread" (the visual phenomenon where light text on dark backgrounds appears thicker).

Headlines use a bold weight to establish clear section breaks. Body text is kept at a medium-light weight to ensure maximum legibility against dark surfaces. Tracking is slightly increased for smaller labels to prevent letters from bleeding together.

## Layout & Spacing
This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile devices. 

The spacing rhythm is based on a 4px baseline grid. On dark interfaces, generous white space (or "dark space") is essential to prevent the UI from feeling claustrophobic. Gutters are fixed at 24px to provide clear breathing room between data-heavy containers. Elements should align strictly to the grid to maintain the "Corporate Modern" sense of order and reliability.

## Elevation & Depth
In this dark theme, elevation is expressed through **Tonal Layers** rather than heavy shadows. 

1. **Level 0 (Background):** The base layer is the darkest color (#0A0A0A).
2. **Level 1 (Cards/Lists):** Surface color #1E1E1E. These elements use a subtle 1px border (#333333) to define edges.
3. **Level 2 (Popovers/Modals):** Surface color #2C2C2C. These use a soft, large-radius black shadow with 40% opacity to create a "lift" effect.
4. **Interaction:** Hover states on dark surfaces should involve a slight lightening of the surface color (approx. 5-8% increase in lightness) rather than a shadow change.

## Shapes
The shape language is **Soft (Level 1)**, utilizing a 0.25rem (4px) base radius. This creates a professional, disciplined appearance that feels modern without being overly "bubbly" or playful. 

- **Small Components (Inputs, Tags):** 4px radius.
- **Medium Components (Cards, Buttons):** 8px radius.
- **Large Components (Modals):** 12px radius.

## Components
Consistent component styling for the dark interface:

- **Buttons:** Primary buttons use the accent green (#009739) with white text. Secondary buttons use a transparent background with a 1px white or light-grey border.
- **Input Fields:** Containers use the Surface-2 tone (#2C2C2C) with a subtle bottom border. Focus states must trigger the Primary Green border (2px) to ensure accessibility.
- **Chips/Tags:** Used for status indicators. Success chips use a dark green fill with light green text; neutral tags use the Surface-3 tone.
- **Cards:** Cards should have no shadow by default; instead, use a consistent 1px border (#2C2C2C) to separate them from the background.
- **Lists:** Use dividers sparingly. A 1px line in #2C2C2C is sufficient. Ensure high contrast for primary list text and "On-Surface-Variant" for secondary metadata.
- **Checkboxes/Radios:** When selected, these components fill with Primary Green. The "unselected" state should be a high-contrast outline to remain visible on dark surfaces.