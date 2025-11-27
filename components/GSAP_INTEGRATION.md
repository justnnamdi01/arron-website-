# GSAP Integration Guide

## Overview
This document explains the GSAP (GreenSock Animation Platform) integration in the ParallaxSection component.

## What's New

### GSAP Features Implemented

1. **ScrollTrigger Plugin**
   - Smooth scroll-based animations
   - Pin the section while scrolling through content
   - Progress-based image transitions
   - Automatic section detection

2. **Timeline Animations**
   - Coordinated image fade-in/fade-out sequences
   - Smooth scale and position transitions
   - Staggered text animations

3. **Text Change Animations**
   - Fade out old content
   - Fade in new content
   - Smooth stagger effect on text elements

4. **Parallax Effects**
   - Images move at different speeds
   - Floating elements with rotation
   - Grid lines animation

## Key Improvements Over Vanilla JS

### Before (Vanilla JS)
- Manual scroll event listeners
- requestAnimationFrame for smooth updates
- Custom easing functions
- Manual state management for scroll position

### After (GSAP)
- Built-in ScrollTrigger for optimized scroll handling
- Hardware-accelerated animations
- Professional easing functions
- Automatic cleanup and performance optimization
- Smoother transitions with less code

## Usage

```tsx
import { ParallaxSectionGSAP } from "@/components/parallax-section-gsap"

export default function Home() {
  return (
    <main>
      <ParallaxSectionGSAP />
    </main>
  )
}
```

## Animation Breakdown

### 1. Image Transitions (0-100% scroll)
- **0-33%**: Image 1 visible, scales and moves
- **33-50%**: Transition from Image 1 to Image 2
- **50-66%**: Image 2 visible, scales and moves
- **66-83%**: Transition from Image 2 to Image 3
- **83-100%**: Image 3 visible, scales and moves

### 2. Text Animations
- Fade out: 300ms with power2.in easing
- Content swap: Instant
- Fade in: 400ms with power2.out easing
- Stagger: 50ms between elements

### 3. Floating Elements
- Continuous parallax movement
- Rotation based on scroll progress
- Opacity changes for depth

## Performance Benefits

1. **Hardware Acceleration**: GSAP uses CSS transforms (translateZ) for GPU acceleration
2. **Optimized Scroll Handling**: ScrollTrigger uses RAF and throttling internally
3. **Automatic Cleanup**: Context-based cleanup prevents memory leaks
4. **Reduced Repaints**: Batch DOM updates for better performance

## Customization Options

### Adjust Animation Speed
```tsx
scrollTrigger: {
  scrub: 1, // Change to 0.5 for faster, 2 for slower
}
```

### Change Auto-Progression Timing
```tsx
const interval = setInterval(() => {
  // Change logic here
}, 5000) // Change to 3000 for 3 seconds, etc.
```

### Modify Easing
```tsx
tl.to(element, {
  // Use any GSAP easing:
  // "power1", "power2", "power3", "power4"
  // "back", "elastic", "bounce", "circ", "expo", "sine"
  ease: "power2.out",
})
```

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Optimized for touch devices

## Dependencies
```json
{
  "gsap": "^3.x.x"
}
```

## Additional Resources
- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)

