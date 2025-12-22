import { h, Fragment } from 'preact';
import { useEffect, useState, useRef, useCallback } from 'preact/hooks';
import * as Mascots from '@/components/mascots';

export type MascotMood = keyof typeof Mascots.Mascots;

interface InteractiveMascotProps {
  mood: MascotMood;
  size?: number;
  /** Called when mascot triggers a contextual event */
  onEvent?: (event: MascotEvent) => void;
}

export type MascotEvent =
  | { type: 'click' }
  | { type: 'double-click' }
  | { type: 'konami' }
  | { type: 'idle' }
  | { type: 'wake' }
  | { type: 'dizzy' }
  | { type: 'boredom'; level: BoredomLevel }
  | { type: 'annoyed' };

// Boredom escalation levels
export type BoredomLevel = 'awake' | 'yawning' | 'sleeping' | 'snoring' | 'dreaming' | 'gone';

// Boredom timing thresholds (in ms)
const BOREDOM_THRESHOLDS = {
  yawning: 9000,    // 9s
  sleeping: 12000,  // 12s (after yawn starts)
  snoring: 30000,   // 30s
  dreaming: 60000,  // 60s
  gone: 120000,     // 2min - float off screen
};

// Dream icons for thought bubbles - weird and surreal
const DREAM_ICONS = [
  '🦑', '🧀', '👁️', '🌀', '🦷', '🪺', '🫠', '🔮', '🪼', '🧲',
  '🦔', '🫧', '🪬', '🍄', '🐙', '🦴', '🧿', '🪞', '🛰️', '🧬',
  '🕳️', '🧯', '🪚', '🧫', '🗝️', '🧱', '🧪', '🪐', '🧻', '🦠',
  '🫥', '🪁', '🧭', '🧵', '🪡', '🧶', '🦇', '🦉', '🦚', '🪅',
  '🪆', '🪤', '🧺', '🪣', '🪧', '🪢', '🪠', '🧠', '🫀', '🫁',
  '🫦', '🧟', '🧌', '🧜', '🧛', '🧞', '🧚', '🧙', '🗿', '🗼',
  '🧩', '🧨', '🧮', '🫙', '🫗', '🫖', '🫕', '🫔', '🫒', '🫐',
  '🫑', '🫛', '🫜', '🪸', '🪱', '🪲', '🪳', '🪰', '🪴', '🪹',
  '🪿', '🪵', '🪨', '🪶', '🦝', '🦥', '🦦', '🦭', '🦩', '🦬',
  '🦣', '🐝', '🐌', '🐛', '🦋', '🐢', '🐍', '🦂', '🕷️', '🕸️',
  '🐜', '🧊', '🧋', '🧃', '🧉', '🥽', '🧷', '🧹', '🧼', '🧴',
  '🧽', '🪥', '🪒', '🧸', '🪗', '🪕', '🪘', '🪇', '🪈', '🎛️',
  '🎚️', '🎲', '🛸', '🧰', '🔢', '🔣', '📐', '📏', '📈', '📉',
  '📊', '➕', '➖', '✖️', '➗', '🏁', '🏳️‍🌈', '🏴‍☠️', '🇬🇧', '🇺🇸',
  '🇯🇵', '🇮🇳', '🇧🇷', '🇿🇦', '🇳🇿', '🇰🇪', '🇲🇽'
];

// Konami code sequence
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// Spring physics configuration
const SPRING_CONFIG = {
  stiffness: 0.15,
  damping: 0.75,
};

/**
 * Interactive Mascot Component
 *
 * Features:
 * - Smooth state transitions via CSS opacity
 * - Interactive eye tracking with spring physics
 * - Randomized idle animations (blinking)
 * - Scroll awareness
 * - Hover reactions (lean + squint)
 * - Dynamic shadow and reflections
 * - Particle effects (sparkles, sweat)
 * - Easter eggs (Konami code, double-click spin)
 */
export function InteractiveMascot({ mood, size = 64, onEvent }: InteractiveMascotProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);
  const reflectionLeftRef = useRef<SVGEllipseElement>(null);
  const reflectionRightRef = useRef<SVGEllipseElement>(null);

  // State
  const [blinkState, setBlinkState] = useState(false);
  const [winkState, setWinkState] = useState<'none' | 'left' | 'right'>('none');
  const [isIdle, setIsIdle] = useState(false);
  const [isDizzy, setIsDizzy] = useState(false);
  const [distraction, setDistraction] = useState<{ x: number, y: number } | null>(null);
  const [overrideMood, setOverrideMood] = useState<MascotMood | null>(null);

  // New states
  const [isHovering, setIsHovering] = useState(false);
  const [isSquinting, setIsSquinting] = useState(false);
  const [leanAngle, setLeanAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  // Charm states
  const [headTilt, setHeadTilt] = useState(0);
  const [isYawning, setIsYawning] = useState(false);
  const [isShy, setIsShy] = useState(false);
  const [isEntering, setIsEntering] = useState(true);

  // Boredom escalation states
  const [boredomLevel, setBoredomLevel] = useState<BoredomLevel>('awake');
  const [dreamIcon, setDreamIcon] = useState(DREAM_ICONS[0]);

  // Click tracking for varied reactions
  const clickCount = useRef(0);
  const clickDecayTimer = useRef<number>();

  // Spring physics state
  const springVelocity = useRef({ x: 0, y: 0 });
  const springPosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  
  // Mouse shake detection
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastDelta = useRef({ x: 0, y: 0 });
  const shakeScore = useRef(0);
  const jumpTimerRef = useRef<number>();
  const successTimerRef = useRef<number>();
  const glanceTimerRef = useRef<number>();
  const glanceCleanupTimerRef = useRef<number>();
  const forwardGlanceTimersRef = useRef<number[]>([]);

  // Konami code tracking
  const konamiIndex = useRef(0);

  // --- Entrance Animation ---
  useEffect(() => {
    const timeout = setTimeout(() => setIsEntering(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  // --- Spring Physics Animation Loop ---
  useEffect(() => {
    const animate = () => {
      const { stiffness, damping } = SPRING_CONFIG;

      // Calculate spring force
      const dx = targetPosition.current.x - springPosition.current.x;
      const dy = targetPosition.current.y - springPosition.current.y;

      // Apply spring physics
      springVelocity.current.x += dx * stiffness;
      springVelocity.current.y += dy * stiffness;
      springVelocity.current.x *= damping;
      springVelocity.current.y *= damping;

      springPosition.current.x += springVelocity.current.x;
      springPosition.current.y += springVelocity.current.y;

      // Apply to pupils
      if (leftPupilRef.current && rightPupilRef.current) {
        const transform = `translate(${springPosition.current.x}px, ${springPosition.current.y}px)`;
        leftPupilRef.current.style.transform = transform;
        rightPupilRef.current.style.transform = transform;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // --- Randomized Blinking & Winking ---
  useEffect(() => {
    let timeoutId: number;

    const scheduleBlink = () => {
      const nextBlink = 3000 + Math.random() * 5000;

      timeoutId = window.setTimeout(() => {
        const rand = Math.random();
        
        if (rand > 0.9) {
          // Wink (10%)
          setWinkState(Math.random() > 0.5 ? 'left' : 'right');
          setTimeout(() => setWinkState('none'), 200);
        } else if (rand > 0.7) {
          // Double blink (20%)
           setBlinkState(true);
           setTimeout(() => setBlinkState(false), 150);
           setTimeout(() => {
             setBlinkState(true);
             setTimeout(() => setBlinkState(false), 150);
           }, 250);
        } else {
          // Normal blink
          setBlinkState(true);
          setTimeout(() => setBlinkState(false), 150);
        }
        
        scheduleBlink();
      }, nextBlink);
    };

    scheduleBlink();
    return () => clearTimeout(timeoutId);
  }, []);

  // --- Mouse Shake Detection (Dizzy) ---
  useEffect(() => {
    const handleShakeMove = (e: MouseEvent) => {
      const currentDx = e.clientX - lastMousePos.current.x;
      const currentDy = e.clientY - lastMousePos.current.y;
      
      const speed = Math.sqrt(currentDx*currentDx + currentDy*currentDy);

      // Only count significant movements
      if (speed > 5) {
        const prevDx = lastDelta.current.x;
        const prevDy = lastDelta.current.y;
        
        // Dot product to check for reversal (negative means opposite direction)
        const dotProduct = currentDx * prevDx + currentDy * prevDy;
        
        if (dotProduct < 0) {
          // Direction change detected!
          shakeScore.current += 1;
        } else {
           // Decay score if moving in same direction (not shaking)
           shakeScore.current = Math.max(0, shakeScore.current - 0.05);
        }
        
        lastDelta.current = { x: currentDx, y: currentDy };
      } else {
        // Decay rapidly when stopped
        shakeScore.current = Math.max(0, shakeScore.current - 0.2);
      }
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      // Threshold for "shaking" (accumulated reversals)
      if (shakeScore.current > 15 && !isDizzy && !overrideMood) {
        setIsDizzy(true);
        shakeScore.current = 0; // Reset score
        onEvent?.({ type: 'dizzy' });
        
        // Recover after 3 seconds
        setTimeout(() => {
           setIsDizzy(false);
        }, 3000);
      }
    };

    window.addEventListener('mousemove', handleShakeMove);
    return () => window.removeEventListener('mousemove', handleShakeMove);
  }, [isDizzy, overrideMood, onEvent]);

  // --- Boredom Escalation System ---
  const lastActivityRef = useRef(Date.now());

  // Reset activity on user input
  useEffect(() => {
    const resetIdle = () => {
      lastActivityRef.current = Date.now();
      const wasAsleep = boredomLevel !== 'awake';

      if (wasAsleep) {
        setBoredomLevel('awake');
        setIsYawning(false);
        setIsIdle(false);
        onEvent?.({ type: 'wake' });
      }
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('click', resetIdle);

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('click', resetIdle);
    };
  }, [boredomLevel, onEvent]);

  // Check for boredom escalation
  useEffect(() => {
    const interval = setInterval(() => {
      const timeSinceActivity = Date.now() - lastActivityRef.current;

      // Escalate boredom based on thresholds (mascot stays visible, no 'gone' state)
      if (timeSinceActivity > BOREDOM_THRESHOLDS.dreaming && boredomLevel !== 'dreaming') {
        setBoredomLevel('dreaming');
        // Cycle dream icons
        setDreamIcon(DREAM_ICONS[Math.floor(Math.random() * DREAM_ICONS.length)]);
        onEvent?.({ type: 'boredom', level: 'dreaming' });
      } else if (timeSinceActivity > BOREDOM_THRESHOLDS.snoring && boredomLevel !== 'snoring' && boredomLevel !== 'dreaming') {
        setBoredomLevel('snoring');
        onEvent?.({ type: 'boredom', level: 'snoring' });
      } else if (timeSinceActivity > BOREDOM_THRESHOLDS.sleeping && boredomLevel !== 'sleeping' && boredomLevel !== 'snoring' && boredomLevel !== 'dreaming') {
        setBoredomLevel('sleeping');
        setIsYawning(false);
        setIsIdle(true);
        onEvent?.({ type: 'idle' });
      } else if (timeSinceActivity > BOREDOM_THRESHOLDS.yawning && boredomLevel === 'awake') {
        setBoredomLevel('yawning');
        setIsYawning(true);
        onEvent?.({ type: 'boredom', level: 'yawning' });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [boredomLevel, onEvent]);


  // Transition from yawn to sleep
  useEffect(() => {
    if (isYawning && boredomLevel === 'yawning') {
      const timeout = window.setTimeout(() => {
        setIsYawning(false);
        setIsIdle(true);
        setBoredomLevel('sleeping');
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [isYawning, boredomLevel]);

  useEffect(() => {
    if (mood !== 'Pondering') {
      setDistraction(null);
    }
  }, [mood]);

  // --- Occasional Forward Glances (non-pondering) ---
  useEffect(() => {
    const clearForwardTimers = () => {
      forwardGlanceTimersRef.current.forEach((timerId) => clearTimeout(timerId));
      forwardGlanceTimersRef.current = [];
    };

    let nextTimer: number;

    const scheduleGlance = () => {
      const delay = 1400 + Math.random() * 2200;
      nextTimer = window.setTimeout(() => {
        const effectiveMood = overrideMood || (isIdle ? 'Sleeping' : mood);
        if (effectiveMood !== 'Pondering' && effectiveMood !== 'Sleeping') {
          setDistraction({ x: 0, y: 0 });
          const timerId = window.setTimeout(() => {
            setDistraction(null);
          }, 220 + Math.random() * 720);
          forwardGlanceTimersRef.current.push(timerId);
        }
        scheduleGlance();
      }, delay);
    };

    scheduleGlance();

    return () => {
      clearTimeout(nextTimer);
      clearForwardTimers();
    };
  }, [mood, overrideMood, isIdle]);

  // --- Scroll Awareness ---
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll direction and velocity
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

      // Map to eye offset (-1.5 to 1.5)
      setScrollOffset((scrollPercent - 0.5) * 3);
      // Track reading progress (0-1)
      setScrollProgress(Math.min(1, Math.max(0, scrollPercent)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Eye Tracking with Spring Physics ---
  useEffect(() => {
    const effectiveMood = overrideMood || (isIdle ? 'Sleeping' : mood);

    const trackableMoods: MascotMood[] = ['Pensive', 'Stressed', 'Determined', 'Confused', 'Shocked', 'Kinetic', 'Zen', 'Delighted', 'Favicon'];

    if (!trackableMoods.includes(effectiveMood)) {
      targetPosition.current = { x: 0, y: 0 };
      return;
    }

    if (distraction) {
      targetPosition.current = { x: distraction.x, y: distraction.y };
      return;
    }

    if (effectiveMood === 'Pondering') {
      targetPosition.current = { x: 0, y: 0 };
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const angle = Math.atan2(dy, dx);
      const distance = Math.min(2, Math.hypot(dx, dy) / 20);

      // Combine mouse tracking with scroll offset
      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance + scrollOffset;

      targetPosition.current = { x: moveX, y: Math.max(-2, Math.min(2, moveY)) };

      // Update glasses reflections based on mouse position
      if (reflectionLeftRef.current && reflectionRightRef.current) {
        const reflectX = (dx / window.innerWidth) * 2;
        const reflectY = (dy / window.innerHeight) * 1;
        reflectionLeftRef.current.style.transform = `translate(${reflectX}px, ${reflectY}px)`;
        reflectionRightRef.current.style.transform = `translate(${reflectX}px, ${reflectY}px)`;
      }

      // Check for squint (mouse very close)
      const distanceToMascot = Math.hypot(dx, dy);
      setIsSquinting(distanceToMascot < 60);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [mood, isIdle, overrideMood, distraction, scrollOffset]);

  // --- Hover Lean Effect ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !isHovering) {
        setLeanAngle(0);
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dx = e.clientX - centerX;

      // Lean toward cursor (max 8 degrees)
      const lean = Math.max(-8, Math.min(8, dx / 15));
      setLeanAngle(lean);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  // --- Curiosity Head Tilt (after 2s hover) ---
  useEffect(() => {
    let tiltTimer: number;

    if (isHovering && !isShy) {
      tiltTimer = window.setTimeout(() => {
        // Tilt opposite to lean direction for curious look
        setHeadTilt(leanAngle > 0 ? -12 : 12);
      }, 2000);
    } else {
      setHeadTilt(0);
    }

    return () => clearTimeout(tiltTimer);
  }, [isHovering, isShy, leanAngle]);

  // --- Shy Look-Away (after 4s direct stare) ---
  useEffect(() => {
    let shyTimer: number;

    if (isHovering && isSquinting) {
      // Mouse is very close (squinting), start shy timer
      shyTimer = window.setTimeout(() => {
        setIsShy(true);
        // Look down and away (bashful)
        setDistraction({ x: -1.5, y: 1.5 });

        // Reset after 2 seconds
        setTimeout(() => {
          setIsShy(false);
          setDistraction(null);
        }, 2000);
      }, 4000);
    }

    return () => clearTimeout(shyTimer);
  }, [isHovering, isSquinting]);

  // --- Konami Code Detection ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;

      if (key === KONAMI_CODE[konamiIndex.current]) {
        konamiIndex.current++;

        if (konamiIndex.current === KONAMI_CODE.length) {
          // Konami code complete!
          setKonamiActive(true);
          setOverrideMood('Confident');
          onEvent?.({ type: 'konami' });

          // Reset after 5 seconds
          setTimeout(() => {
            setKonamiActive(false);
            setOverrideMood(null);
          }, 5000);

          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onEvent]);

  // --- Click Handling with Click Count Tracking ---
  const lastClickTime = useRef(0);

  const triggerSuccessJump = useCallback(() => {
    setOverrideMood('Delighted');
    setIsJumping(true);

    if (jumpTimerRef.current) {
      clearTimeout(jumpTimerRef.current);
    }
    if (successTimerRef.current) {
      clearTimeout(successTimerRef.current);
    }

    jumpTimerRef.current = window.setTimeout(() => {
      setIsJumping(false);
    }, 650);

    successTimerRef.current = window.setTimeout(() => {
      setOverrideMood(null);
    }, 2200);
  }, []);

  useEffect(() => {
    const handleExerciseSuccess = () => {
      if (!overrideMood) {
        triggerSuccessJump();
      }
    };
    const handleExerciseReset = () => {
      setIsJumping(false);
      setOverrideMood(null);
    };

    window.addEventListener('mascot:exercise-success', handleExerciseSuccess);
    window.addEventListener('mascot:exercise-reset', handleExerciseReset);
    return () => {
      window.removeEventListener('mascot:exercise-success', handleExerciseSuccess);
      window.removeEventListener('mascot:exercise-reset', handleExerciseReset);
      if (jumpTimerRef.current) {
        clearTimeout(jumpTimerRef.current);
      }
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }
    };
  }, [overrideMood, triggerSuccessJump]);

  const handleClick = useCallback(() => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    lastClickTime.current = now;

    // Double-click detection (within 300ms)
    if (timeSinceLastClick < 300) {
      // Spin!
      setIsSpinning(true);
      onEvent?.({ type: 'double-click' });
      setTimeout(() => setIsSpinning(false), 450);
      return;
    }

    if (overrideMood) return;

    // Increment click count
    clickCount.current += 1;

    // Clear any existing decay timer
    if (clickDecayTimer.current) {
      clearTimeout(clickDecayTimer.current);
    }

    // Decay click count after 10 seconds of no clicks
    clickDecayTimer.current = window.setTimeout(() => {
      clickCount.current = Math.max(0, clickCount.current - 3);
    }, 10000);

    // Vary reaction based on click count
    let reaction: MascotMood;
    const clicks = clickCount.current;

    if (clicks >= 10) {
      // Very annoyed - just sighs, barely reacts
      reaction = 'Pensive'; // Returns to neutral quickly
      onEvent?.({ type: 'annoyed' });
      setTimeout(() => setOverrideMood(null), 300);
      return;
    } else if (clicks >= 7) {
      // Annoyed - exasperated look
      reaction = 'Stressed';
      onEvent?.({ type: 'annoyed' });
    } else if (clicks >= 4) {
      // Getting tired of it
      reaction = 'Confused';
      onEvent?.({ type: 'click' });
    } else {
      // Normal reactions for first few clicks
      reaction = Math.random() > 0.5 ? 'Shocked' : 'Kinetic';
      onEvent?.({ type: 'click' });
    }

    setOverrideMood(reaction);

    // Reaction duration also varies
    const duration = clicks >= 7 ? 1500 : 1000;
    setTimeout(() => {
      setOverrideMood(null);
    }, duration);
  }, [overrideMood, onEvent]);

  // --- Trigger Sparkles (can be called externally via ref or context) ---
  const triggerSparkles = useCallback(() => {
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1000);
  }, []);

  // Show sparkles when delighted
  useEffect(() => {
    if (mood === 'Delighted' && !showSparkles) {
      triggerSparkles();
    }
  }, [mood, showSparkles, triggerSparkles]);

  // Determine effective mood
  const activeMood = overrideMood || (isDizzy ? 'Dizzy' : (isIdle ? 'Sleeping' : mood));

  const isPensive = activeMood === 'Pensive';
  const isConfident = activeMood === 'Confident';
  const isStressed = activeMood === 'Stressed';
  const isDetermined = activeMood === 'Determined';
  const isConfused = activeMood === 'Confused';
  const isShocked = activeMood === 'Shocked';
  const isSleeping = activeMood === 'Sleeping';
  const isKinetic = activeMood === 'Kinetic';
  const isZen = activeMood === 'Zen';
  const isPondering = activeMood === 'Pondering';
  const isReading = activeMood === 'Reading';
  const isDelighted = activeMood === 'Delighted';
  const isDizzyMood = activeMood === 'Dizzy';

  // Determine which eyes to show
  const showBlinkEyes = !isDizzyMood && !isYawning && (isPensive || isConfident || isStressed || isDetermined || isConfused || isShocked || isZen || isKinetic);
  const showPonderingEyes = isPondering;
  const showStandardPupils = showBlinkEyes || showPonderingEyes;
  const pupilLeftX = showPonderingEyes ? 27 : 26;
  const pupilRightX = showPonderingEyes ? 39 : 38;
  const pupilY = showPonderingEyes ? 36 : 37;
  const showScanEyes = isReading;
  const showClosedEyes = isSleeping;
  const showHappyEyes = isDelighted;
  const showSquintEyes = isYawning;
  const showSpiralEyes = isDizzyMood;

  // Determine which mouth to show
  const showNeutralMouth = !isYawning && (isPensive || isKinetic);
  const showSleepMouth = isSleeping;
  const showSmileMouth = isConfident || isZen;
  const showBigSmileMouth = isDelighted;
  const showThinkMouth = isPondering;
  const showWavyMouth = isStressed || isConfused || isDizzyMood;
  const showOpenMouth = isShocked;
  const showGritMouth = isDetermined;
  const showYawnMouth = isYawning;

  // Reading mouth curve - interpolate from frown (-1) to smile (1.5) based on scroll
  const readingMouthCurve = -1 + (scrollProgress * 2.5);

  // Animation classes
  const isFloating = isZen || isDelighted;
  const isAnimating = isKinetic || isFloating || isPondering || isDizzyMood;
  
  const isLeftBlinking = blinkState || winkState === 'left';
  const isRightBlinking = blinkState || winkState === 'right';

  return (
    <svg
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setLeanAngle(0); setIsSquinting(false); setHeadTilt(0); setIsShy(false); }}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={Mascots.BRICK_BASE.viewBox}
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      class={`interactive-mascot mascot-${activeMood.toLowerCase()} ${isSpinning ? 'mascot-spin' : ''} ${konamiActive ? 'mascot-konami' : ''} ${isDizzyMood ? 'mascot-dizzy' : ''} ${isJumping ? 'mascot-jump' : ''}`}
      style={{
        cursor: 'pointer',
        overflow: 'visible',
      }}
    >
      {/* Main Body Group with breathing, lean, and animations */}
      <g
        class={`mascot-body-group ${isEntering ? 'mascot-entrance' : ''} ${!isAnimating && !isHovering && !isEntering ? 'mascot-breathing' : ''} ${isKinetic ? 'brick-kinetic' : ''} ${isFloating ? 'brick-float' : ''} ${isPondering ? 'brick-wobble' : ''} ${isDizzyMood ? 'brick-shake' : ''}`}
        style={{
          transform: isHovering ? `rotate(${leanAngle + headTilt}deg)` : undefined,
          transformOrigin: '32px 48px',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Base Body */}
        <g dangerouslySetInnerHTML={{ __html: Mascots.brickBody }} />

        {/* Face Group */}
        <g class={`mascot-face ${isKinetic ? 'brick-face' : ''} ${isSquinting && !isSleeping ? 'mascot-squint' : ''}`}>

          {/* Regular Glasses */}
          <g
            class="mascot-glasses"
            style={{
              opacity: isConfident ? 0 : (isSleeping ? 0.85 : 1),
              transition: 'opacity 0.3s',
              transform: isConfused || isDizzyMood ? 'rotate(-5deg)' : (isShocked ? 'translateY(-3px)' : (isSleeping ? 'translateY(1px)' : 'none')),
              transformOrigin: '32px 37px'
            }}
          >
            <g dangerouslySetInnerHTML={{ __html: Mascots.glasses }} />

            {/* Dynamic Reflections */}
            <ellipse
              ref={reflectionLeftRef}
              cx="24"
              cy="35"
              rx="1.5"
              ry="1"
              class={`mascot-reflection ${isHovering ? 'mascot-reflection-active' : ''}`}
              style={{ transition: 'transform 0.1s ease-out, opacity 0.3s' }}
            />
            <ellipse
              ref={reflectionRightRef}
              cx="36"
              cy="35"
              rx="1.5"
              ry="1"
              class={`mascot-reflection ${isHovering ? 'mascot-reflection-active' : ''}`}
              style={{ transition: 'transform 0.1s ease-out, opacity 0.3s' }}
            />
          </g>

          {/* Sunglasses (for Confident / Konami) */}
          <g
            class={`mascot-sunglasses ${konamiActive ? 'mascot-sunglasses-drop' : ''}`}
            style={{ opacity: isConfident ? 1 : 0, transition: 'opacity 0.3s' }}
            dangerouslySetInnerHTML={{ __html: Mascots.sunglasses }}
          />

          {/* Eyes: Standard + Pondering (with tracking) */}
          {showStandardPupils && (
            <g style={{ opacity: 1, transition: 'opacity 0.3s' }}>
              <circle
                ref={leftPupilRef}
                cx={pupilLeftX}
                cy={pupilY}
                r="1.2"
                class="brick-pupils"
                style={{ transform: isLeftBlinking || (showPonderingEyes && blinkState) ? 'scaleY(0.1)' : 'scaleY(1)', transformOrigin: 'center' }}
              />
              <circle
                ref={rightPupilRef}
                cx={pupilRightX}
                cy={pupilY}
                r="1.2"
                class="brick-pupils"
                style={{ transform: isRightBlinking || (showPonderingEyes && blinkState) ? 'scaleY(0.1)' : 'scaleY(1)', transformOrigin: 'center' }}
              />
            </g>
          )}

          {/* Eyes: Scan (Reading) */}
          <g style={{ opacity: showScanEyes ? 1 : 0, transition: 'opacity 0.3s' }}>
            <g class="brick-eyes-scan">
              <circle cx="25" cy="38" r="1.2" class="brick-pupils" />
              <circle cx="37" cy="38" r="1.2" class="brick-pupils" />
            </g>
          </g>
          
          {/* Eyes: Spiral (Dizzy) */}
           <g style={{ opacity: showSpiralEyes ? 1 : 0, transition: 'opacity 0.3s' }}>
             <g class="brick-rotate-eyes">
                <g dangerouslySetInnerHTML={{ __html: Mascots.eyesSpiral }} />
             </g>
           </g>

          {/* Eyes: Happy (Delighted) */}
          <g style={{ opacity: showHappyEyes ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.eyesHappy }} />

          {/* Eyes: Closed (Sleeping) */}
          <g style={{ opacity: showClosedEyes ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.eyesClosed }} />

          {/* Eyes: Squint (Yawning) */}
          <g style={{ opacity: showSquintEyes ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.eyesSquint }} />

          {/* Brows: Furrowed */}
          <g style={{ opacity: isDetermined ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.browsFurrowed }} />

          {/* Mouths */}
          <g style={{ opacity: showNeutralMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthNeutral }} />
          <g style={{ opacity: showSleepMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthSleep }} />
          <g style={{ opacity: showSmileMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthSmile }} />
          <g style={{ opacity: showBigSmileMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthBigSmile }} />
          <g style={{ opacity: showThinkMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthThink }} />
          {/* Reading mouth - curve interpolates based on scroll progress */}
          <path
            d={`M29 44q3 ${readingMouthCurve} 6 0`}
            class="brick-stroke"
            stroke-width="1.5"
            fill="none"
            style={{ opacity: isReading ? 1 : 0, transition: 'opacity 0.3s' }}
          />
          <g style={{ opacity: showWavyMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthWavy }} />
          <g style={{ opacity: showOpenMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthOpen }} />
          <g style={{ opacity: showGritMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthGrit }} />
          <g style={{ opacity: showYawnMouth ? 1 : 0, transition: 'opacity 0.3s' }} dangerouslySetInnerHTML={{ __html: Mascots.mouthYawn }} />

          {/* Blush (when shy) */}
          <ellipse cx="20" cy="40" rx="3" ry="2" class={`mascot-blush ${isShy ? 'mascot-blush-active' : ''}`} />
          <ellipse cx="44" cy="40" rx="3" ry="2" class={`mascot-blush ${isShy ? 'mascot-blush-active' : ''}`} />
        </g>

        {/* Animated Sweat Drops */}
        <g style={{ opacity: isStressed ? 1 : 0, transition: 'opacity 0.3s' }}>
          <path d="M50 30q-2 4 0 6q2-2 0-6" class="brick-stroke mascot-sweat-animated" fill="#a29bfe" stroke-width="1.5" />
          <path d="M14 32q2 4 0 6q-2-2 0-6" class="brick-stroke mascot-sweat-animated" fill="#a29bfe" stroke-width="1.5" style={{ animationDelay: '1s' }} />
        </g>

        {/* Glasses Glint */}
        <g style={{ opacity: isZen || isDelighted ? 1 : 0, transition: 'opacity 1s' }} dangerouslySetInnerHTML={{ __html: Mascots.glassesGlint }} />

        {/* Sleeping Zzzs - Basic */}
        {(boredomLevel === 'sleeping') && (
          <g>
            <path d="M46 22l4-4h-4l4-4" class="brick-stroke brick-snooze" stroke-width="1.5" opacity="0.5" />
            <path d="M40 26l3-3h-3l3-3" class="brick-stroke brick-snooze brick-snooze-delay" stroke-width="1.2" opacity="0.5" />
          </g>
        )}

        {/* Snoring - Animated bubbles */}
        {boredomLevel === 'snoring' && (
          <g class="mascot-snore-bubbles">
            <circle cx="48" cy="42" r="2" class="snore-bubble snore-bubble-1" />
            <circle cx="52" cy="36" r="3" class="snore-bubble snore-bubble-2" />
            <circle cx="54" cy="28" r="4" class="snore-bubble snore-bubble-3" />
          </g>
        )}

        {/* Dreaming - Thought bubble with icons */}
        {boredomLevel === 'dreaming' && (
          <g class="mascot-dream-bubble">
            {/* Thought bubble trail */}
            <circle cx="48" cy="22" r="2" class="dream-trail dream-trail-1" />
            <circle cx="52" cy="16" r="3" class="dream-trail dream-trail-2" />
            {/* Main thought bubble */}
            <ellipse cx="54" cy="6" rx="9" ry="7" class="dream-cloud" />
            {/* Dream content */}
            <text x="54" y="5" text-anchor="middle" dominant-baseline="middle" font-size="10" class="dream-icon">{dreamIcon}</text>
          </g>
        )}
      </g>

      {/* Sparkle Particles */}
      <g style={{ opacity: showSparkles ? 1 : 0 }}>
        <g class={`mascot-sparkle ${showSparkles ? 'mascot-sparkle-active sparkle-1' : ''}`}>
          <path d="M10 25l2-2-2-2-2 2z" fill="#ffd700" />
        </g>
        <g class={`mascot-sparkle ${showSparkles ? 'mascot-sparkle-active sparkle-2' : ''}`}>
          <path d="M54 20l2-2-2-2-2 2z" fill="#ffd700" />
        </g>
        <g class={`mascot-sparkle ${showSparkles ? 'mascot-sparkle-active sparkle-3' : ''}`}>
          <path d="M8 40l1.5-1.5-1.5-1.5-1.5 1.5z" fill="#ffd700" />
        </g>
        <g class={`mascot-sparkle ${showSparkles ? 'mascot-sparkle-active sparkle-4' : ''}`}>
          <path d="M56 35l1.5-1.5-1.5-1.5-1.5 1.5z" fill="#ffd700" />
        </g>
      </g>
    </svg>
  );
}

/**
 * Hook to control mascot from parent components
 */
export function useMascotController() {
  const [mood, setMood] = useState<MascotMood>('Pensive');

  const triggerReaction = useCallback((newMood: MascotMood, duration = 2000) => {
    setMood(newMood);
    setTimeout(() => setMood('Pensive'), duration);
  }, []);

  const handleSuccess = useCallback(() => triggerReaction('Delighted', 3000), [triggerReaction]);
  const handleError = useCallback(() => triggerReaction('Confused', 2000), [triggerReaction]);
  const handleLoading = useCallback(() => setMood('Pondering'), []);
  const handleComplete = useCallback(() => setMood('Zen'), []);

  return {
    mood,
    setMood,
    triggerReaction,
    handleSuccess,
    handleError,
    handleLoading,
    handleComplete,
  };
}
