'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function SplitTextReveal({
  children,
  trigger = false,
  delay = 0,
  type = 'chars',
  as: Component = 'div',
  style = {},
}) {
  const textRef = useRef(null);
  const splitRef = useRef(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (!textRef.current) return;

    // Create the split
    splitRef.current = new SplitText(textRef.current, {
      type: type === 'chars' ? 'chars,words' : 'words',
    });

    // Set initial state
    const targets = type === 'chars' ? splitRef.current.chars : splitRef.current.words;
    gsap.set(targets, {
      opacity: 0,
      filter: 'blur(8px)',
      y: 10,
    });

    return () => {
      if (splitRef.current) {
        splitRef.current.revert();
      }
    };
  }, [type]);

  useEffect(() => {
    if (!trigger || !splitRef.current || animatedRef.current) return;
    animatedRef.current = true;

    const targets = type === 'chars' ? splitRef.current.chars : splitRef.current.words;
    gsap.to(targets, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      duration: 0.6,
      stagger: type === 'chars' ? 0.02 : 0.05,
      delay: delay,
      ease: 'power2.out',
    });
  }, [trigger, type, delay]);

  return (
    <Component ref={textRef} style={style}>
      {children}
    </Component>
  );
}
