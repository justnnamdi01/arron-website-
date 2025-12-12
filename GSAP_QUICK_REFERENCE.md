# GSAP Quick Reference Card

## 🚀 Quick Start

### Basic Animation
```tsx
gsap.to(element, {
  x: 100,
  duration: 1,
  ease: "power2.out"
})
```

### Scroll Animation
```tsx
gsap.to(element, {
  scrollTrigger: {
    trigger: element,
    start: "top center",
    end: "bottom center",
    scrub: 1
  },
  x: 100
})
```

---

## 📐 Common Properties

### Transform Properties (GPU Accelerated ⚡)
```tsx
x: 100           // Move right 100px
y: -50           // Move up 50px
scale: 1.5       // Scale to 150%
rotation: 45     // Rotate 45 degrees
opacity: 0.5     // 50% opacity
```

### Timing
```tsx
duration: 1      // 1 second
delay: 0.5       // Wait 0.5s before starting
repeat: 2        // Repeat 2 times
yoyo: true       // Reverse on repeat
```

---

## 🎯 ScrollTrigger Options

```tsx
scrollTrigger: {
  trigger: element,        // Element to watch
  start: "top center",     // When to start
  end: "bottom center",    // When to end
  scrub: 1,               // Smooth scrubbing (0-3)
  pin: true,              // Pin element
  markers: true,          // Show debug markers
  toggleActions: "play pause resume reset"
}
```

### Start/End Values
```
"top top"       // Element top hits viewport top
"top center"    // Element top hits viewport center
"top bottom"    // Element top hits viewport bottom
"center center" // Element center hits viewport center
"bottom top"    // Element bottom hits viewport top
```

---

## 🎨 Easing Functions

### Power (Most Common)
```tsx
"none"          // Linear
"power1.out"    // Gentle ease out
"power2.out"    // Medium ease out (default)
"power3.out"    // Strong ease out
"power4.out"    // Very strong ease out
```

### Special Effects
```tsx
"back.out(1.7)"      // Slight overshoot
"elastic.out(1, 0.5)" // Bouncy
"bounce.out"         // Bouncing ball
"circ.out"          // Circular
"expo.out"          // Exponential
```

### Ease Types
```tsx
".in"    // Ease in (slow start)
".out"   // Ease out (slow end)
".inOut" // Ease both ends
```

---

## 📝 Timeline Basics

### Create Timeline
```tsx
const tl = gsap.timeline({
  defaults: { duration: 1, ease: "power2.out" }
})
```

### Chain Animations
```tsx
tl.to(element1, { x: 100 })
  .to(element2, { y: 50 })
  .to(element3, { scale: 1.5 })
```

### Position Parameter
```tsx
.to(element, { x: 100 })          // After previous
.to(element, { x: 100 }, "+=1")   // 1s after previous
.to(element, { x: 100 }, "-=0.5") // 0.5s before previous ends
.to(element, { x: 100 }, "<")     // Same time as previous
.to(element, { x: 100 }, 2)       // At 2 seconds
```

---

## 🔄 Animation Methods

```tsx
gsap.to(element, {...})      // Animate TO these values
gsap.from(element, {...})    // Animate FROM these values
gsap.fromTo(element, {...}, {...}) // FROM → TO
gsap.set(element, {...})     // Set immediately (no animation)
```

---

## 🎭 Stagger Animations

### Simple Stagger
```tsx
gsap.to(".items", {
  y: 50,
  stagger: 0.1  // 0.1s between each
})
```

### Advanced Stagger
```tsx
gsap.to(".items", {
  y: 50,
  stagger: {
    amount: 1,      // Total time for all
    from: "center", // Start from center
    grid: [3, 4],   // 3x4 grid
    ease: "power2.inOut"
  }
})
```

---

## 🧹 Cleanup (React)

### Always Use Context
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All animations here
    gsap.to(element, {...})
  }, containerRef)
  
  return () => ctx.revert() // Cleanup
}, [])
```

---

## 🎯 Common Patterns

### Fade In On Scroll
```tsx
gsap.from(element, {
  scrollTrigger: {
    trigger: element,
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 1
})
```

### Parallax Effect
```tsx
gsap.to(element, {
  scrollTrigger: {
    trigger: container,
    scrub: 1
  },
  y: -100
})
```

### Pin Section
```tsx
gsap.to(element, {
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: "bottom bottom",
    pin: true,
    scrub: 1
  },
  scale: 1.5
})
```

### Magnetic Button
```tsx
const handleMouseMove = (e) => {
  const rect = button.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  gsap.to(button, {
    x: x * 0.3,
    y: y * 0.3,
    duration: 0.3
  })
}
```

### Text Reveal
```tsx
gsap.from(text, {
  opacity: 0,
  y: 20,
  stagger: 0.05,
  duration: 0.5
})
```

---

## 🐛 Debug Tips

### Show ScrollTrigger Markers
```tsx
scrollTrigger: {
  markers: true  // Shows start/end points
}
```

### Check Animation Progress
```tsx
const tween = gsap.to(element, {...})
console.log(tween.progress()) // 0 to 1
```

### Pause/Play/Reverse
```tsx
const tween = gsap.to(element, {...})
tween.pause()
tween.play()
tween.reverse()
tween.restart()
```

---

## ⚡ Performance Tips

### DO (GPU Accelerated)
```tsx
x, y, z          // Transforms
scale, scaleX, scaleY
rotation, rotationX, rotationY
opacity
```

### DON'T (CPU Intensive)
```tsx
width, height    // Use scaleX/scaleY instead
top, left        // Use x/y instead
margin, padding  // Use transforms
```

---

## 📱 Mobile Considerations

### Reduce Motion
```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

if (prefersReducedMotion) {
  gsap.config({ force3D: false })
}
```

### Touch-Friendly
```tsx
scrollTrigger: {
  scrub: 0.5  // Faster response on mobile
}
```

---

## 🔗 Useful Links

- [GSAP Docs](https://greensock.com/docs/)
- [ScrollTrigger](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [Easing Visualizer](https://greensock.com/ease-visualizer/)
- [Cheat Sheet](https://greensock.com/cheatsheet/)

---

## 💡 Pro Tips

1. Use `scrub: 1` for smooth scroll animations
2. Always cleanup with `gsap.context()`
3. Use transform properties for best performance
4. Test on actual mobile devices
5. Use `markers: true` during development
6. Batch similar animations in timelines
7. Use `defaults` in timelines to avoid repetition

---

**Print this and keep it handy! 📌**











