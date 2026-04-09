'use client';

import { useRef } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Defines the left-to-right spatial order for directional slides
const PAGE_ORDER = ['/map', '/gallery', '/about'];

function getDirection(from: string, to: string): number {
  const fi = PAGE_ORDER.indexOf(from);
  const ti = PAGE_ORDER.indexOf(to);
  if (fi === -1 || ti === -1) return 0; // fade for any transition involving '/'
  return ti > fi ? 1 : -1;
}

// Variant functions receive `custom` (= direction) at animation time, not render time.
// This means the exit variant always uses the direction of the *current* navigation,
// even if the exiting page was rendered during a previous navigation.
const variants: Variants = {
  enter: (d: number) => ({
    x: d === 0 ? 0 : `${d * 100}%`,
    opacity: d === 0 ? 0 : 1,
  }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({
    x: d === 0 ? 0 : `${-d * 100}%`,
    opacity: d === 0 ? 0 : 1,
  }),
};

export default function LayoutTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const directionRef = useRef(0);

  // Compute synchronously so d is ready before AnimatePresence reads the key change
  if (prevPathRef.current !== pathname) {
    directionRef.current = getDirection(prevPathRef.current, pathname);
    prevPathRef.current = pathname;
  }

  const d = directionRef.current;

  return (
    // custom on AnimatePresence is passed to exit variants of departing children,
    // ensuring the exit slide direction matches the current navigation intent
    <AnimatePresence mode="wait" custom={d}>
      <motion.div
        key={pathname}
        custom={d}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        style={{ minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
