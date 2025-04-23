
import { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Accessible React Applications",
    slug: "building-accessible-react-applications",
    description: "A comprehensive guide to creating accessible React applications for all users, including those with disabilities.",
    content: `
# Building Accessible React Applications

Web accessibility is a crucial aspect of modern web development. In this post, we'll explore how to make React applications accessible to everyone, including users with disabilities.

## Why Accessibility Matters

Accessibility ensures that all users, regardless of their abilities or disabilities, can access and use your web application. This includes people with:

- Visual impairments
- Hearing impairments
- Motor disabilities
- Cognitive disabilities

## Key Accessibility Principles

### 1. Semantic HTML

Always use the appropriate HTML elements for their intended purpose:

\`\`\`jsx
// Bad
<div onClick={handleClick}>Click me</div>

// Good
<button onClick={handleClick}>Click me</button>
\`\`\`

### 2. Keyboard Navigation

Ensure your application can be fully navigated and used with a keyboard alone:

\`\`\`jsx
function AccessibleButton() {
  return (
    <button 
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      Click or Press Enter
    </button>
  );
}
\`\`\`

### 3. ARIA Attributes

Use ARIA (Accessible Rich Internet Applications) attributes when necessary:

\`\`\`jsx
function ExpandableSection({ title, children, isExpanded, onToggle }) {
  return (
    <div>
      <button 
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls="content-id"
      >
        {title}
      </button>
      <div 
        id="content-id"
        hidden={!isExpanded}
      >
        {children}
      </div>
    </div>
  );
}
\`\`\`

## Tools and Testing

To ensure your React applications are accessible, use these tools:

1. **ESLint plugins**: \`eslint-plugin-jsx-a11y\` can catch many accessibility issues during development.
2. **Lighthouse**: Run accessibility audits in Chrome DevTools.
3. **axe DevTools**: Browser extension for accessibility testing.
4. **Screen readers**: Test with screen readers like NVDA, JAWS, or VoiceOver.

## Conclusion

Building accessible React applications is not just a legal requirement in many countries but also a moral obligation. By following these best practices, you'll create applications that are usable by everyone, regardless of their abilities.

Remember, accessibility is not a feature—it's a necessity.
`,
    coverImage: "/placeholder.svg",
    date: "2023-12-01",
    readTime: 6,
    tags: ["React", "Accessibility", "Frontend"]
  },
  {
    id: "2",
    title: "Optimizing React Performance with Memo and useCallback",
    slug: "optimizing-react-performance",
    description: "Learn how to improve your React application's performance using memoization techniques.",
    content: `
# Optimizing React Performance with Memo and useCallback

Performance optimization is a critical aspect of building smooth, responsive React applications. In this post, we'll explore how to use React.memo and useCallback to prevent unnecessary re-renders and improve overall application performance.

## Understanding React's Rendering Behavior

React components re-render in these scenarios:
1. When their state changes
2. When their props change
3. When their parent component re-renders

Unnecessary re-renders can lead to performance issues, especially in large applications.

## React.memo for Component Memoization

React.memo is a higher-order component that memoizes your component, preventing re-renders if props haven't changed:

\`\`\`jsx
import React from 'react';

function ExpensiveComponent({ data }) {
  console.log('Rendering ExpensiveComponent');
  // Expensive calculation or rendering
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// Memoized version
export default React.memo(ExpensiveComponent);
\`\`\`

## useCallback for Function Memoization

When passing functions as props, useCallback prevents new function references on every render:

\`\`\`jsx
import React, { useState, useCallback } from 'react';
import ExpensiveComponent from './ExpensiveComponent';

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([/* some data */]);
  
  // Without useCallback, this creates a new function every render
  // const handleItemClick = (id) => {
  //   console.log('Item clicked:', id);
  // };
  
  // With useCallback, the function reference stays the same
  const handleItemClick = useCallback((id) => {
    console.log('Item clicked:', id);
  }, []); // Empty dependency array means function never changes
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent 
        data={data}
        onItemClick={handleItemClick}
      />
    </div>
  );
}
\`\`\`

## When to Use (and When Not to Use)

These optimization techniques aren't always necessary. Use them when:

1. You have expensive calculations or rendering
2. You have deep component trees
3. You're experiencing noticeable performance issues

Don't use them prematurely - they add complexity and might not provide significant benefits for simple components.

## Custom Comparison Functions

For complex props, you can provide a custom comparison function to React.memo:

\`\`\`jsx
function areEqual(prevProps, nextProps) {
  // Return true if props are equal (no re-render)
  // Return false if props are not equal (re-render)
  return prevProps.data.id === nextProps.data.id;
}

export default React.memo(ExpensiveComponent, areEqual);
\`\`\`

## Conclusion

Strategic use of React.memo and useCallback can significantly improve your application's performance. Remember to:

1. Identify actual performance bottlenecks before optimizing
2. Use React DevTools Profiler to measure improvements
3. Apply these techniques where they provide real benefits

By following these guidelines, you'll create React applications that remain responsive even as they grow in complexity.
`,
    coverImage: "/placeholder.svg",
    date: "2023-11-15",
    readTime: 8,
    tags: ["React", "Performance", "JavaScript"]
  },
  {
    id: "3",
    title: "Getting Started with Three.js in React",
    slug: "getting-started-with-threejs-in-react",
    description: "A beginner's guide to implementing 3D graphics in React applications using Three.js and React Three Fiber.",
    content: `
# Getting Started with Three.js in React

Three.js is a powerful JavaScript library that makes it possible to create stunning 3D graphics in the browser. When combined with React, you can build interactive 3D experiences that integrate seamlessly with your application. In this tutorial, we'll explore how to get started with Three.js in React using React Three Fiber.

## What is React Three Fiber?

React Three Fiber is a React renderer for Three.js, allowing you to express Three.js scenes declaratively using React components. It handles the Three.js boilerplate code and provides a more intuitive API for React developers.

## Installation

First, install the necessary packages:

\`\`\`bash
npm install three @react-three/fiber @react-three/drei
# or
yarn add three @react-three/fiber @react-three/drei
\`\`\`

## Creating Your First 3D Scene

Let's create a simple scene with a rotating cube:

\`\`\`jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function RotatingCube() {
  const meshRef = useRef();
  
  // This function runs on every animation frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#6495ED" />
    </mesh>
  );
}

function ThreeScene() {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingCube />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default ThreeScene;
\`\`\`

## Understanding the Key Components

1. **Canvas**: The container for your Three.js scene
2. **mesh**: A 3D object that can be rendered
3. **geometry**: Defines the shape of the mesh
4. **material**: Defines how the surface looks
5. **lights**: Illuminate your scene
6. **OrbitControls**: Allows camera rotation and zoom with mouse

## Adding Interaction

Let's add some interactivity to our cube:

\`\`\`jsx
function InteractiveCube() {
  const meshRef = useRef();
  const [active, setActive] = useState(false);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh 
      ref={meshRef}
      onClick={() => setActive(!active)}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
      scale={active ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={active ? "#ff6347" : "#6495ED"} />
    </mesh>
  );
}
\`\`\`

## Using Textures

To add textures to your 3D objects:

\`\`\`jsx
import { useTexture } from '@react-three/drei';

function TexturedCube() {
  const texture = useTexture('/path/to/your/texture.jpg');
  
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
\`\`\`

## Loading 3D Models

You can load external 3D models using the useGLTF hook:

\`\`\`jsx
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/path/to/your/model.glb');
  
  return <primitive object={scene} scale={0.5} position={[0, -1, 0]} />;
}
\`\`\`

## Conclusion

This is just the beginning of what you can achieve with Three.js and React. You can create complex 3D visualizations, games, product configurators, and much more. As you become more comfortable with these technologies, explore:

- Physics with react-three-rapier
- Post-processing effects
- Shaders for custom materials
- Animation systems

Remember that 3D in the browser can be performance-intensive, so always test on different devices and optimize your scenes accordingly.

Happy coding in the third dimension!
`,
    coverImage: "/placeholder.svg",
    date: "2023-10-22",
    readTime: 10,
    tags: ["Three.js", "React", "3D Graphics"]
  },
  {
    id: "4",
    title: "Building a Design System with Tailwind CSS",
    slug: "design-system-with-tailwind",
    description: "Learn how to create a consistent and scalable design system for your applications using Tailwind CSS.",
    content: `
# Building a Design System with Tailwind CSS

A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications. In this guide, we'll explore how to create a comprehensive design system using Tailwind CSS.

## Why Build a Design System?

Design systems provide numerous benefits:

1. **Consistency**: Ensures a cohesive look and feel across all applications
2. **Efficiency**: Speeds up development by providing pre-built components
3. **Scalability**: Makes it easier to maintain and update designs across multiple projects
4. **Collaboration**: Improves communication between designers and developers

## Setting Up Your Tailwind Configuration

The foundation of your design system starts with a well-configured tailwind.config.js file:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          // Your secondary color palette
        },
        success: {
          // Success color palette
        },
        warning: {
          // Warning color palette
        },
        error: {
          // Error color palette
        },
        neutral: {
          // Neutral color palette
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      spacing: {
        // Custom spacing system
      },
      borderRadius: {
        none: '0',
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
      boxShadow: {
        // Custom shadow system
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
\`\`\`

## Creating Component Abstractions

Next, build React components that utilize your Tailwind configuration:

### Button Component

\`\`\`jsx
// components/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
        outline: 'bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50',
        ghost: 'bg-transparent text-primary-600 hover:bg-primary-50',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
\`\`\`

### Card Component

\`\`\`jsx
// components/Card.tsx
import React from 'react';
import { cn } from '../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-lg border border-neutral-200 bg-white shadow-sm',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('px-6 py-4 border-b border-neutral-200', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        className={cn('font-semibold text-lg', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('px-6 py-4', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('px-6 py-4 border-t border-neutral-200', className)}
        ref={ref}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardContent, CardFooter };
\`\`\`

## Documentation with Storybook

Document your components using Storybook:

\`\`\`jsx
// Button.stories.tsx
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['default', 'secondary', 'outline', 'ghost'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export const Default = {
  args: {
    variant: 'default',
    size: 'md',
    children: 'Button',
  },
};

export const Sizes = () => (
  <div className="flex flex-col space-y-4">
    <Button size="sm">Small Button</Button>
    <Button size="md">Medium Button</Button>
    <Button size="lg">Large Button</Button>
  </div>
);

export const Variants = () => (
  <div className="flex flex-col space-y-4">
    <Button variant="default">Default Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="outline">Outline Button</Button>
    <Button variant="ghost">Ghost Button</Button>
  </div>
);
\`\`\`

## Creating Design Tokens

Extract design tokens for improved maintainability:

\`\`\`javascript
// design-tokens.js
module.exports = {
  colors: {
    primary: {
      50: '#f0f9ff',
      // ...more colors
    },
    // ...other color palettes
  },
  spacing: {
    // Your spacing scale
  },
  // Other tokens
};
\`\`\`

Then import these tokens into your Tailwind config:

\`\`\`javascript
// tailwind.config.js
const tokens = require('./design-tokens');

module.exports = {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      // Other token imports
    },
  },
  // ...rest of config
};
\`\`\`

## Consuming the Design System

With your design system in place, consuming it in your applications becomes simple:

\`\`\`jsx
import { Button } from './design-system/components/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './design-system/components/Card';

function ProductCard({ product }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-600">{product.description}</p>
        <div className="mt-4">
          <span className="text-lg font-bold">${product.price}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="default">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}
\`\`\`

## Conclusion

A well-crafted design system with Tailwind CSS provides a solid foundation for building consistent, maintainable, and scalable applications. By investing time in your design system upfront, you'll save countless hours throughout the development process and ensure a consistent user experience across your products.

Remember that a design system is never "done" - it should evolve along with your products and design language. Regularly review and refine your components and tokens to ensure they continue to meet your team's needs.
`,
    coverImage: "/placeholder.svg",
    date: "2023-09-18",
    readTime: 12,
    tags: ["Tailwind CSS", "Design Systems", "Frontend"]
  }
];
