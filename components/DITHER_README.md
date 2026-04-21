# Dither Animation System

A sophisticated WebGL-based animation system that creates professional dithering effects with wave distortions for modern web applications.

## Features

- **Retro Dithering Effect**: Classic 4x4 Bayer matrix dithering for authentic retro aesthetic
- **Dynamic Wave Animation**: Perlin noise-based wave distortions with multiple octaves
- **Mouse Interaction**: Optional mouse-driven effects for enhanced interactivity  
- **Theme Awareness**: Automatic light/dark theme adaptation
- **Performance Optimization**: Device-based preset system for optimal performance
- **Accessibility Support**: Respects reduced motion preferences
- **TypeScript Support**: Full type safety with comprehensive interfaces

## Components

### Core Components

1. **Dither.tsx** - Base WebGL animation component with Three.js
2. **SmartDither.tsx** - Intelligent wrapper with theme and performance detection
3. **Dither.css** - Styling and responsive optimizations

### Configuration System

4. **lib/ditherConfig.ts** - Centralized configuration for all sections and themes

## Usage

### Basic Usage

```tsx
import SmartDither from '@/components/SmartDither'

// Automatic configuration based on section and theme
<SmartDither section="hero" />
```

### Advanced Usage

```tsx
// Force specific theme or performance preset
<SmartDither 
  section="features" 
  forceTheme="dark"
  forcePreset="quality"
  disabled={false}
/>
```

### Manual Configuration

```tsx
import Dither from '@/components/Dither'

<Dither
  intensity={0.4}
  speed={0.6}
  color="#212529"
  mouseInteraction={true}
  waveHeight={0.08}
  noiseScale={1.8}
  className="dither-hero"
/>
```

## Configuration System

### Sections Available

- `hero` - Main landing section with high visual impact
- `features` - Feature showcase sections
- `problemSolution` - Problem/solution comparison areas
- `testimonials` - Customer testimonial sections
- `services` - Service offering sections
- `benefits` - Benefits and statistics sections
- `pricing` - Pricing and investment sections
- `faq` - Frequently asked questions
- `cta` - Call-to-action sections

### Performance Presets

- `performance` - Optimized for mobile/low-end devices
- `balanced` - Good balance of visual impact and performance (default)
- `quality` - Maximum visual impact for high-end devices

### Theme Support

- `light` - Light theme with dark dithering patterns
- `dark` - Dark theme with light dithering patterns
- Automatic detection based on CSS class or system preference

## Technical Details

### Shader Architecture

The system uses custom GLSL shaders for optimal performance:

- **Vertex Shader**: Handles wave distortions using Perlin noise
- **Fragment Shader**: Implements 4x4 Bayer dithering matrix
- **Multiple Octaves**: Creates complex, natural-looking wave patterns

### Performance Features

- **Device Detection**: Automatically adjusts based on hardware capabilities
- **Reduced Motion Support**: Respects accessibility preferences
- **Dynamic Loading**: SSR-safe with Next.js dynamic imports
- **Memory Management**: Efficient cleanup and resource handling

### Browser Compatibility

- **WebGL Support**: Requires WebGL-enabled browsers
- **Fallback Loading**: Graceful degradation with loading states
- **Mobile Optimized**: Touch-friendly with optional mouse interaction

## Styling Classes

### CSS Classes Available

```css
.dither-hero          /* Hero section styling */
.dither-features      /* Feature sections */
.dither-testimonials  /* Testimonial sections */
.dither-contact       /* Contact/CTA sections */
.dither-loading       /* Loading state styling */
```

### Responsive Behavior

- **Mobile**: Reduced opacity and disabled complex interactions
- **High DPI**: Enhanced quality for retina displays
- **Touch Devices**: Optimized interaction patterns

## Performance Considerations

### Optimization Tips

1. **Use SmartDither**: Automatic performance optimization
2. **Disable on Low-End**: Set appropriate device detection
3. **Respect Motion**: Honor accessibility preferences
4. **Limit Instances**: Avoid too many simultaneous animations

### Performance Monitoring

The system automatically:
- Detects hardware concurrency
- Checks for high DPI displays
- Monitors touch capability
- Respects motion reduction preferences

## Integration Examples

### Hero Section
```tsx
<section className="hero-section">
  <SmartDither section="hero" />
  <div className="hero-content">
    <!-- Your content here -->
  </div>
</section>
```

### Features Grid
```tsx
<section className="features-section">
  <SmartDither section="features" />
  <div className="features-grid">
    <!-- Feature cards -->
  </div>
</section>
```

## Customization

### Adding New Sections

1. Add section configuration to `lib/ditherConfig.ts`:

```typescript
export const ditherSections = {
  // ... existing sections
  newSection: {
    light: {
      intensity: 0.3,
      speed: 0.8,
      color: '#333333',
      mouseInteraction: true,
      waveHeight: 0.05,
      noiseScale: 2.0,
      className: 'dither-new'
    },
    dark: {
      // Dark theme configuration
    }
  }
}
```

2. Add corresponding CSS class if needed:

```css
.dither-new {
  opacity: 0.35;
}
```

### Custom Color Schemes

Colors can be customized per section and theme:

```typescript
// Light theme uses dark colors for contrast
color: '#212529'  // Dark gray on white background

// Dark theme uses light colors
color: '#FFFFFF'  // White on dark background
```

## Troubleshooting

### Common Issues

1. **Animation Not Appearing**: Check WebGL support and console errors
2. **Performance Issues**: Use 'performance' preset or disable mouse interaction
3. **Theme Not Updating**: Verify theme detection in browser dev tools
4. **Mobile Issues**: Check touch device optimizations and reduced opacity

### Debug Mode

Enable debug information by checking browser console for:
- WebGL context creation
- Shader compilation status
- Performance preset selection
- Theme detection results

## License

Part of the WAZA website design system. See project root for license information.