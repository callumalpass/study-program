import { describe, expect, it } from 'vitest';
import {
  BRICK_BASE,
  brickBody,
  glasses,
  glassesGlint,
  eyesBlink,
  eyesUpRight,
  eyesScan,
  eyesHappy,
  eyesClosed,
  eyesSquint,
  eyesSpiral,
  mouthNeutral,
  mouthSmile,
  mouthThink,
  mouthFrown,
  mouthBigSmile,
  mouthSleep,
  mouthWavy,
  mouthOpen,
  mouthYawn,
  mouthGrit,
  sweatDrops,
  sunglasses,
  browsFurrowed,
  Mascots,
  getMascot,
} from '../src/components/mascots';

describe('mascots', () => {
  describe('BRICK_BASE constants', () => {
    it('has correct default dimensions', () => {
      expect(BRICK_BASE.width).toBe(64);
      expect(BRICK_BASE.height).toBe(64);
    });

    it('has correct viewBox', () => {
      expect(BRICK_BASE.viewBox).toBe('0 0 64 64');
    });

    it('viewBox matches width and height', () => {
      const [, , width, height] = BRICK_BASE.viewBox.split(' ').map(Number);
      expect(width).toBe(BRICK_BASE.width);
      expect(height).toBe(BRICK_BASE.height);
    });
  });

  describe('SVG component strings', () => {
    describe('brickBody', () => {
      it('contains a rect element', () => {
        expect(brickBody).toContain('<rect');
      });

      it('contains a line element for top edge', () => {
        expect(brickBody).toContain('<line');
      });

      it('uses brick-fill class', () => {
        expect(brickBody).toContain('class="brick-fill"');
      });

      it('uses brick-stroke class', () => {
        expect(brickBody).toContain('class="brick-stroke"');
      });
    });

    describe('glasses', () => {
      it('contains two circles for lenses', () => {
        const circleMatches = glasses.match(/<circle/g);
        expect(circleMatches).toHaveLength(2);
      });

      it('contains a path for bridge', () => {
        expect(glasses).toContain('<path');
      });

      it('uses brick-glasses class', () => {
        expect(glasses).toContain('class="brick-glasses"');
      });
    });

    describe('glassesGlint', () => {
      it('contains two circles for glint effect', () => {
        const circleMatches = glassesGlint.match(/<circle/g);
        expect(circleMatches).toHaveLength(2);
      });

      it('uses brick-glint class', () => {
        expect(glassesGlint).toContain('class="brick-glint"');
      });
    });

    describe('eyes variants', () => {
      it('eyesBlink contains two circles for pupils', () => {
        const circleMatches = eyesBlink.match(/<circle/g);
        expect(circleMatches).toHaveLength(2);
      });

      it('eyesBlink uses brick-blink class', () => {
        expect(eyesBlink).toContain('class="brick-blink"');
      });

      it('eyesBlink uses brick-pupils class', () => {
        expect(eyesBlink).toContain('class="brick-pupils"');
      });

      it('eyesUpRight contains two circles', () => {
        const circleMatches = eyesUpRight.match(/<circle/g);
        expect(circleMatches).toHaveLength(2);
      });

      it('eyesScan uses brick-eyes-scan class', () => {
        expect(eyesScan).toContain('class="brick-eyes-scan"');
      });

      it('eyesHappy contains two arc paths', () => {
        const pathMatches = eyesHappy.match(/<path/g);
        expect(pathMatches).toHaveLength(2);
      });

      it('eyesClosed contains two arc paths', () => {
        const pathMatches = eyesClosed.match(/<path/g);
        expect(pathMatches).toHaveLength(2);
      });

      it('eyesSquint contains two paths', () => {
        const pathMatches = eyesSquint.match(/<path/g);
        expect(pathMatches).toHaveLength(2);
      });

      it('eyesSpiral uses brick-eyes-spiral class', () => {
        expect(eyesSpiral).toContain('class="brick-eyes-spiral"');
      });
    });

    describe('mouth variants', () => {
      it('mouthNeutral is a straight line path', () => {
        expect(mouthNeutral).toContain('<path');
        expect(mouthNeutral).toContain('d="M29 44h6"');
      });

      it('mouthSmile is a curved path', () => {
        expect(mouthSmile).toContain('<path');
        expect(mouthSmile).toContain('q'); // quadratic curve
      });

      it('mouthThink is a circle', () => {
        expect(mouthThink).toContain('<circle');
      });

      it('mouthFrown is a curved path', () => {
        expect(mouthFrown).toContain('<path');
      });

      it('mouthBigSmile has a larger curve', () => {
        expect(mouthBigSmile).toContain('<path');
        expect(mouthBigSmile).toContain('q5 4 10 0'); // wider smile
      });

      it('mouthSleep is a curved path', () => {
        expect(mouthSleep).toContain('<path');
      });

      it('mouthWavy contains a wavy path', () => {
        expect(mouthWavy).toContain('<path');
        // Wavy mouth uses cubic curves
        expect(mouthWavy).toContain('c');
      });

      it('mouthOpen is a circle', () => {
        expect(mouthOpen).toContain('<circle');
        expect(mouthOpen).toContain('r="3"');
      });

      it('mouthYawn is an ellipse', () => {
        expect(mouthYawn).toContain('<ellipse');
      });

      it('mouthGrit is a rectangle', () => {
        expect(mouthGrit).toContain('<rect');
      });
    });

    describe('special elements', () => {
      it('sweatDrops contains two sweat drop paths', () => {
        const pathMatches = sweatDrops.match(/<path/g);
        expect(pathMatches).toHaveLength(2);
      });

      it('sweatDrops uses specific color', () => {
        expect(sweatDrops).toContain('fill="#a29bfe"');
      });

      it('sunglasses contains dark filled circles', () => {
        expect(sunglasses).toContain('fill="#2d3436"');
      });

      it('sunglasses uses brick-sunglasses class', () => {
        expect(sunglasses).toContain('class="brick-sunglasses"');
      });

      it('browsFurrowed contains two eyebrow paths', () => {
        const pathMatches = browsFurrowed.match(/<path/g);
        expect(pathMatches).toHaveLength(2);
      });
    });
  });

  describe('Mascots object', () => {
    it('contains all expected mascot variants', () => {
      const expectedMascots = [
        'Pensive',
        'Confident',
        'Stressed',
        'Determined',
        'Confused',
        'Shocked',
        'Sleeping',
        'Kinetic',
        'Zen',
        'Pondering',
        'Reading',
        'Delighted',
        'Dizzy',
        'Favicon',
      ];

      expectedMascots.forEach((name) => {
        expect(Mascots).toHaveProperty(name);
      });
    });

    it('returns 14 mascot variants', () => {
      expect(Object.keys(Mascots)).toHaveLength(14);
    });

    describe('each mascot is valid SVG', () => {
      Object.entries(Mascots).forEach(([name, svg]) => {
        it(`${name} starts with <svg> tag`, () => {
          expect(svg.trim()).toMatch(/^<svg/);
        });

        it(`${name} ends with </svg> tag`, () => {
          expect(svg.trim()).toMatch(/<\/svg>$/);
        });

        it(`${name} has xmlns attribute`, () => {
          expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
        });

        it(`${name} has width attribute`, () => {
          expect(svg).toMatch(/width="\d+"/);
        });

        it(`${name} has height attribute`, () => {
          expect(svg).toMatch(/height="\d+"/);
        });

        it(`${name} has viewBox attribute`, () => {
          expect(svg).toContain('viewBox=');
        });
      });
    });

    describe('mascot-specific elements', () => {
      it('Pensive contains neutral mouth', () => {
        expect(Mascots.Pensive).toContain(mouthNeutral);
      });

      it('Confident contains sunglasses', () => {
        expect(Mascots.Confident).toContain('brick-sunglasses');
      });

      it('Stressed contains sweat drops', () => {
        expect(Mascots.Stressed).toContain('#a29bfe'); // sweat drop color
      });

      it('Determined contains furrowed brows', () => {
        expect(Mascots.Determined).toContain('M22 32l6 2');
      });

      it('Confused has rotated glasses', () => {
        expect(Mascots.Confused).toContain('rotate(-5, 32, 37)');
      });

      it('Shocked has translated glasses', () => {
        expect(Mascots.Shocked).toContain('translate(0, -3)');
      });

      it('Sleeping contains snooze effects', () => {
        expect(Mascots.Sleeping).toContain('brick-snooze');
      });

      it('Kinetic contains brick-kinetic class', () => {
        expect(Mascots.Kinetic).toContain('brick-kinetic');
      });

      it('Zen contains glasses glint', () => {
        expect(Mascots.Zen).toContain('brick-glint');
      });

      it('Pondering contains think mouth', () => {
        expect(Mascots.Pondering).toContain(mouthThink);
      });

      it('Reading contains scan eyes', () => {
        expect(Mascots.Reading).toContain('brick-eyes-scan');
      });

      it('Delighted contains big smile', () => {
        expect(Mascots.Delighted).toContain(mouthBigSmile);
      });

      it('Dizzy contains spiral eyes', () => {
        expect(Mascots.Dizzy).toContain('brick-eyes-spiral');
      });

      it('Favicon has zoomed viewBox', () => {
        expect(Mascots.Favicon).toContain('viewBox="16 26 32 24"');
      });
    });
  });

  describe('getMascot function', () => {
    describe('returns mascot with default size', () => {
      it('returns mascot SVG when no size specified', () => {
        const result = getMascot('Pensive');
        expect(result).toContain('<svg');
        expect(result).toContain('</svg>');
      });

      it('uses default size of 64', () => {
        const result = getMascot('Pensive');
        expect(result).toContain('width="64"');
        expect(result).toContain('height="64"');
      });
    });

    describe('returns mascot with custom size', () => {
      it('replaces width and height with custom size', () => {
        const result = getMascot('Pensive', 128);
        expect(result).toContain('width="128"');
        expect(result).toContain('height="128"');
      });

      it('does not contain original size', () => {
        const result = getMascot('Pensive', 128);
        expect(result).not.toContain('width="64"');
        expect(result).not.toContain('height="64"');
      });

      it('works with small sizes', () => {
        const result = getMascot('Confident', 16);
        expect(result).toContain('width="16"');
        expect(result).toContain('height="16"');
      });

      it('works with large sizes', () => {
        const result = getMascot('Zen', 512);
        expect(result).toContain('width="512"');
        expect(result).toContain('height="512"');
      });

      it('works with decimal sizes', () => {
        const result = getMascot('Pondering', 32.5);
        expect(result).toContain('width="32.5"');
        expect(result).toContain('height="32.5"');
      });
    });

    describe('works with all mascot types', () => {
      const mascotNames = Object.keys(Mascots) as Array<keyof typeof Mascots>;

      mascotNames.forEach((name) => {
        it(`getMascot('${name}', 100) returns valid SVG`, () => {
          const result = getMascot(name, 100);
          expect(result).toContain('width="100"');
          expect(result).toContain('height="100"');
          expect(result).toContain('<svg');
          expect(result).toContain('</svg>');
        });
      });
    });

    describe('preserves SVG content', () => {
      it('preserves viewBox attribute', () => {
        const result = getMascot('Pensive', 100);
        expect(result).toContain('viewBox="0 0 64 64"');
      });

      it('preserves internal SVG structure for Favicon', () => {
        const result = getMascot('Favicon', 32);
        // Favicon has special viewBox
        expect(result).toContain('viewBox="16 26 32 24"');
      });

      it('preserves stroke-linecap attribute', () => {
        const result = getMascot('Stressed', 48);
        expect(result).toContain('stroke-linecap="round"');
      });

      it('preserves stroke-linejoin attribute', () => {
        const result = getMascot('Stressed', 48);
        expect(result).toContain('stroke-linejoin="round"');
      });

      it('preserves fill="none" attribute', () => {
        const result = getMascot('Dizzy', 48);
        expect(result).toContain('fill="none"');
      });
    });

    describe('edge cases', () => {
      it('handles size of 0', () => {
        const result = getMascot('Pensive', 0);
        expect(result).toContain('width="0"');
        expect(result).toContain('height="0"');
      });

      it('handles very large sizes', () => {
        const result = getMascot('Pensive', 10000);
        expect(result).toContain('width="10000"');
        expect(result).toContain('height="10000"');
      });

      it('handles size equal to BRICK_BASE dimensions', () => {
        const result = getMascot('Pensive', BRICK_BASE.width);
        expect(result).toContain(`width="${BRICK_BASE.width}"`);
        expect(result).toContain(`height="${BRICK_BASE.height}"`);
      });
    });
  });

  describe('mascot CSS class organization', () => {
    it('each mascot has a unique wrapper class', () => {
      const wrapperClasses = [
        'brick-pensive',
        'brick-confident',
        'brick-stressed',
        'brick-determined',
        'brick-confused',
        'brick-shocked',
        'brick-sleeping',
        'brick-kinetic',
        'brick-zen',
        'brick-pondering',
        'brick-reading',
        'brick-delighted',
        'brick-dizzy',
      ];

      const mascotEntries = Object.entries(Mascots).filter(
        ([name]) => name !== 'Favicon'
      );

      wrapperClasses.forEach((className, index) => {
        expect(mascotEntries[index][1]).toContain(`class="${className}"`);
      });
    });

    it('Favicon uses pensive wrapper class', () => {
      expect(Mascots.Favicon).toContain('class="brick-pensive"');
    });
  });
});
