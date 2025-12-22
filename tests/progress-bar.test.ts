import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  renderProgressBar,
  renderCircularProgress,
  renderProgressGrid,
} from '../src/components/progress-bar';

describe('progress-bar', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('renderProgressBar', () => {
    describe('basic rendering', () => {
      it('should render a progress bar with default options', () => {
        renderProgressBar(container, 50);

        expect(container.classList.contains('progress-bar-container')).toBe(true);
        expect(container.querySelector('.progress-track')).toBeTruthy();
        expect(container.querySelector('.progress-fill')).toBeTruthy();
      });

      it('should set the fill width to the given percentage', () => {
        renderProgressBar(container, 75);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        expect(fill.style.width).toBe('75%');
      });

      it('should display the percentage by default', () => {
        renderProgressBar(container, 42);

        const percentText = container.querySelector('.progress-percentage');
        expect(percentText?.textContent).toBe('42%');
      });

      it('should round the percentage to nearest integer', () => {
        renderProgressBar(container, 33.7);

        const percentText = container.querySelector('.progress-percentage');
        expect(percentText?.textContent).toBe('34%');
      });
    });

    describe('percentage clamping', () => {
      it('should clamp percentage at 0 for negative values', () => {
        renderProgressBar(container, -50);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        const percentText = container.querySelector('.progress-percentage');

        expect(fill.style.width).toBe('0%');
        expect(percentText?.textContent).toBe('0%');
      });

      it('should clamp percentage at 100 for values over 100', () => {
        renderProgressBar(container, 150);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        const percentText = container.querySelector('.progress-percentage');

        expect(fill.style.width).toBe('100%');
        expect(percentText?.textContent).toBe('100%');
      });

      it('should handle 0% correctly', () => {
        renderProgressBar(container, 0);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        const percentText = container.querySelector('.progress-percentage');

        expect(fill.style.width).toBe('0%');
        expect(percentText?.textContent).toBe('0%');
      });

      it('should handle 100% correctly', () => {
        renderProgressBar(container, 100);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        const percentText = container.querySelector('.progress-percentage');

        expect(fill.style.width).toBe('100%');
        expect(percentText?.textContent).toBe('100%');
      });
    });

    describe('label option', () => {
      it('should render a custom label when provided', () => {
        renderProgressBar(container, 50, 'Progress');

        const labelDiv = container.querySelector('.progress-label');
        expect(labelDiv?.textContent).toContain('Progress');
      });

      it('should render both label and percentage', () => {
        renderProgressBar(container, 65, 'Loading');

        const labelDiv = container.querySelector('.progress-label');
        expect(labelDiv?.textContent).toContain('Loading');
        expect(labelDiv?.textContent).toContain('65%');
      });
    });

    describe('showPercentage option', () => {
      it('should hide percentage when showPercentage is false', () => {
        renderProgressBar(container, 50, undefined, { showPercentage: false });

        const percentText = container.querySelector('.progress-percentage');
        expect(percentText).toBeNull();
      });

      it('should show percentage by default', () => {
        renderProgressBar(container, 50);

        const percentText = container.querySelector('.progress-percentage');
        expect(percentText).toBeTruthy();
      });

      it('should not render label div if no label and showPercentage is false', () => {
        renderProgressBar(container, 50, undefined, { showPercentage: false });

        const labelDiv = container.querySelector('.progress-label');
        expect(labelDiv).toBeNull();
      });
    });

    describe('color option', () => {
      it('should apply custom background color to the fill', () => {
        renderProgressBar(container, 50, undefined, { color: '#ff0000' });

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        expect(fill.style.backgroundColor).toBe('rgb(255, 0, 0)');
      });

      it('should not set background color when not specified', () => {
        renderProgressBar(container, 50);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        expect(fill.style.backgroundColor).toBe('');
      });
    });

    describe('height option', () => {
      it('should apply custom height to the track', () => {
        renderProgressBar(container, 50, undefined, { height: '20px' });

        const track = container.querySelector('.progress-track') as HTMLElement;
        expect(track.style.height).toBe('20px');
      });

      it('should not set height when not specified', () => {
        renderProgressBar(container, 50);

        const track = container.querySelector('.progress-track') as HTMLElement;
        expect(track.style.height).toBe('');
      });
    });

    describe('animated option', () => {
      it('should add animated class when animated is true', () => {
        renderProgressBar(container, 50, undefined, { animated: true });

        const fill = container.querySelector('.progress-fill');
        expect(fill?.classList.contains('animated')).toBe(true);
      });

      it('should not add animated class by default', () => {
        renderProgressBar(container, 50);

        const fill = container.querySelector('.progress-fill');
        expect(fill?.classList.contains('animated')).toBe(false);
      });
    });

    describe('container clearing', () => {
      it('should clear previous content before rendering', () => {
        container.innerHTML = '<div class="old-content">Old</div>';

        renderProgressBar(container, 50);

        expect(container.querySelector('.old-content')).toBeNull();
        expect(container.querySelector('.progress-track')).toBeTruthy();
      });
    });
  });

  describe('renderCircularProgress', () => {
    describe('basic rendering', () => {
      it('should render a circular progress indicator', () => {
        renderCircularProgress(container, 50);

        expect(container.classList.contains('circular-progress-container')).toBe(true);
        expect(container.querySelector('.circular-progress-svg')).toBeTruthy();
      });

      it('should create an SVG with circles', () => {
        renderCircularProgress(container, 50);

        const svg = container.querySelector('svg');
        const circles = svg?.querySelectorAll('circle');

        expect(svg).toBeTruthy();
        expect(circles?.length).toBe(2); // Background + progress circle
      });

      it('should display percentage label by default', () => {
        renderCircularProgress(container, 75);

        const percentText = container.querySelector('.circular-progress-percent');
        expect(percentText?.textContent).toBe('75%');
      });
    });

    describe('percentage clamping', () => {
      it('should clamp percentage at 0 for negative values', () => {
        renderCircularProgress(container, -25);

        const percentText = container.querySelector('.circular-progress-percent');
        expect(percentText?.textContent).toBe('0%');
      });

      it('should clamp percentage at 100 for values over 100', () => {
        renderCircularProgress(container, 200);

        const percentText = container.querySelector('.circular-progress-percent');
        expect(percentText?.textContent).toBe('100%');
      });

      it('should handle 0% correctly', () => {
        renderCircularProgress(container, 0);

        const percentText = container.querySelector('.circular-progress-percent');
        expect(percentText?.textContent).toBe('0%');
      });

      it('should handle 100% correctly', () => {
        renderCircularProgress(container, 100);

        const percentText = container.querySelector('.circular-progress-percent');
        expect(percentText?.textContent).toBe('100%');
      });
    });

    describe('size option', () => {
      it('should use default size of 120', () => {
        renderCircularProgress(container, 50);

        const svg = container.querySelector('svg');
        expect(svg?.getAttribute('width')).toBe('120');
        expect(svg?.getAttribute('height')).toBe('120');
      });

      it('should apply custom size', () => {
        renderCircularProgress(container, 50, { size: 200 });

        const svg = container.querySelector('svg');
        expect(svg?.getAttribute('width')).toBe('200');
        expect(svg?.getAttribute('height')).toBe('200');
      });
    });

    describe('strokeWidth option', () => {
      it('should use default strokeWidth of 8', () => {
        renderCircularProgress(container, 50);

        const circle = container.querySelector('circle');
        expect(circle?.getAttribute('stroke-width')).toBe('8');
      });

      it('should apply custom strokeWidth', () => {
        renderCircularProgress(container, 50, { strokeWidth: 12 });

        const circle = container.querySelector('circle');
        expect(circle?.getAttribute('stroke-width')).toBe('12');
      });
    });

    describe('color options', () => {
      it('should use default progress color #3b82f6', () => {
        renderCircularProgress(container, 50);

        const progressCircle = container.querySelector('.progress-circle');
        expect(progressCircle?.getAttribute('stroke')).toBe('#3b82f6');
      });

      it('should apply custom progress color', () => {
        renderCircularProgress(container, 50, { color: '#ff0000' });

        const progressCircle = container.querySelector('.progress-circle');
        expect(progressCircle?.getAttribute('stroke')).toBe('#ff0000');
      });

      it('should use default background color #e5e7eb', () => {
        renderCircularProgress(container, 50);

        const circles = container.querySelectorAll('circle');
        const backgroundCircle = circles[0]; // First circle is background
        expect(backgroundCircle?.getAttribute('stroke')).toBe('#e5e7eb');
      });

      it('should apply custom background color', () => {
        renderCircularProgress(container, 50, { backgroundColor: '#000000' });

        const circles = container.querySelectorAll('circle');
        const backgroundCircle = circles[0];
        expect(backgroundCircle?.getAttribute('stroke')).toBe('#000000');
      });
    });

    describe('showLabel option', () => {
      it('should show label by default', () => {
        renderCircularProgress(container, 50);

        const label = container.querySelector('.circular-progress-label');
        expect(label).toBeTruthy();
      });

      it('should hide label when showLabel is false', () => {
        renderCircularProgress(container, 50, { showLabel: false });

        const label = container.querySelector('.circular-progress-label');
        expect(label).toBeNull();
      });
    });

    describe('label option', () => {
      it('should display custom label text', () => {
        renderCircularProgress(container, 50, { label: 'Complete' });

        const labelText = container.querySelector('.circular-progress-text');
        expect(labelText?.textContent).toBe('Complete');
      });

      it('should not render label text div when no label provided', () => {
        renderCircularProgress(container, 50);

        const labelText = container.querySelector('.circular-progress-text');
        expect(labelText).toBeNull();
      });
    });

    describe('SVG calculations', () => {
      it('should calculate correct viewBox', () => {
        renderCircularProgress(container, 50, { size: 100 });

        const svg = container.querySelector('svg');
        expect(svg?.getAttribute('viewBox')).toBe('0 0 100 100');
      });

      it('should center circles correctly', () => {
        renderCircularProgress(container, 50, { size: 100 });

        const circle = container.querySelector('circle');
        expect(circle?.getAttribute('cx')).toBe('50');
        expect(circle?.getAttribute('cy')).toBe('50');
      });

      it('should calculate correct radius based on size and strokeWidth', () => {
        // With size=100 and strokeWidth=8 (default), radius = (100 - 8) / 2 = 46
        renderCircularProgress(container, 50, { size: 100 });

        const circle = container.querySelector('circle');
        expect(circle?.getAttribute('r')).toBe('46');
      });

      it('should apply rotation transform for progress circle', () => {
        renderCircularProgress(container, 50, { size: 100 });

        const progressCircle = container.querySelector('.progress-circle');
        expect(progressCircle?.getAttribute('transform')).toBe('rotate(-90 50 50)');
      });
    });

    describe('container clearing', () => {
      it('should clear previous content before rendering', () => {
        container.innerHTML = '<div class="old-content">Old</div>';

        renderCircularProgress(container, 50);

        expect(container.querySelector('.old-content')).toBeNull();
        expect(container.querySelector('svg')).toBeTruthy();
      });
    });
  });

  describe('renderProgressGrid', () => {
    const sampleItems = [
      { label: 'Item 1', percent: 25 },
      { label: 'Item 2', percent: 50 },
      { label: 'Item 3', percent: 75 },
    ];

    describe('basic rendering', () => {
      it('should render a grid container', () => {
        renderProgressGrid(container, sampleItems);

        expect(container.className).toBe('progress-grid');
      });

      it('should render all items', () => {
        renderProgressGrid(container, sampleItems);

        const items = container.querySelectorAll('.progress-grid-item');
        expect(items.length).toBe(3);
      });

      it('should use 3 columns by default', () => {
        renderProgressGrid(container, sampleItems);

        expect(container.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
      });
    });

    describe('columns option', () => {
      it('should allow custom column count', () => {
        renderProgressGrid(container, sampleItems, { columns: 2 });

        expect(container.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
      });

      it('should support single column layout', () => {
        renderProgressGrid(container, sampleItems, { columns: 1 });

        expect(container.style.gridTemplateColumns).toBe('repeat(1, 1fr)');
      });
    });

    describe('type option', () => {
      it('should render linear progress bars by default', () => {
        renderProgressGrid(container, sampleItems);

        const progressBars = container.querySelectorAll('.progress-bar-container');
        expect(progressBars.length).toBe(3);
      });

      it('should render circular progress when type is circular', () => {
        renderProgressGrid(container, sampleItems, { type: 'circular' });

        const circularProgress = container.querySelectorAll('.circular-progress-container');
        expect(circularProgress.length).toBe(3);
      });
    });

    describe('onClick handlers', () => {
      it('should add clickable class when onClick is provided', () => {
        const itemsWithClick = [
          { label: 'Clickable', percent: 50, onClick: vi.fn() },
        ];

        renderProgressGrid(container, itemsWithClick);

        const item = container.querySelector('.progress-grid-item');
        expect(item?.classList.contains('clickable')).toBe(true);
      });

      it('should not add clickable class when onClick is not provided', () => {
        renderProgressGrid(container, sampleItems);

        const items = container.querySelectorAll('.progress-grid-item');
        items.forEach(item => {
          expect(item.classList.contains('clickable')).toBe(false);
        });
      });

      it('should call onClick when item is clicked', () => {
        const onClick = vi.fn();
        const itemsWithClick = [
          { label: 'Clickable', percent: 50, onClick },
        ];

        renderProgressGrid(container, itemsWithClick);

        const item = container.querySelector('.progress-grid-item') as HTMLElement;
        item.click();

        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('color option per item', () => {
      it('should pass color to individual progress bars', () => {
        const itemsWithColor = [
          { label: 'Red', percent: 50, color: '#ff0000' },
        ];

        renderProgressGrid(container, itemsWithColor);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        expect(fill.style.backgroundColor).toBe('rgb(255, 0, 0)');
      });

      it('should pass color to circular progress', () => {
        const itemsWithColor = [
          { label: 'Blue', percent: 50, color: '#0000ff' },
        ];

        renderProgressGrid(container, itemsWithColor, { type: 'circular' });

        const progressCircle = container.querySelector('.progress-circle');
        expect(progressCircle?.getAttribute('stroke')).toBe('#0000ff');
      });
    });

    describe('empty items array', () => {
      it('should render empty grid when items array is empty', () => {
        renderProgressGrid(container, []);

        expect(container.className).toBe('progress-grid');
        const items = container.querySelectorAll('.progress-grid-item');
        expect(items.length).toBe(0);
      });
    });

    describe('container clearing', () => {
      it('should clear previous content before rendering', () => {
        container.innerHTML = '<div class="old-content">Old</div>';

        renderProgressGrid(container, sampleItems);

        expect(container.querySelector('.old-content')).toBeNull();
        expect(container.querySelectorAll('.progress-grid-item').length).toBe(3);
      });
    });

    describe('circular progress in grid', () => {
      it('should use size 100 for circular progress in grid', () => {
        renderProgressGrid(container, sampleItems, { type: 'circular' });

        const svg = container.querySelector('svg');
        expect(svg?.getAttribute('width')).toBe('100');
        expect(svg?.getAttribute('height')).toBe('100');
      });

      it('should display labels in circular progress within grid', () => {
        renderProgressGrid(container, sampleItems, { type: 'circular' });

        const labels = container.querySelectorAll('.circular-progress-text');
        expect(labels.length).toBe(3);
        expect(labels[0]?.textContent).toBe('Item 1');
        expect(labels[1]?.textContent).toBe('Item 2');
        expect(labels[2]?.textContent).toBe('Item 3');
      });
    });
  });

  describe('edge cases', () => {
    describe('decimal percentages', () => {
      it('should handle decimal percentages in linear progress', () => {
        renderProgressBar(container, 33.333);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        const percentText = container.querySelector('.progress-percentage');

        expect(fill.style.width).toBe('33.333%');
        expect(percentText?.textContent).toBe('33%'); // Rounded for display
      });

      it('should handle decimal percentages in circular progress', () => {
        renderCircularProgress(container, 66.666);

        const percentText = container.querySelector('.circular-progress-percent');
        expect(percentText?.textContent).toBe('67%'); // Rounded for display
      });
    });

    describe('extreme values', () => {
      it('should handle very large negative numbers', () => {
        renderProgressBar(container, -1000000);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        expect(fill.style.width).toBe('0%');
      });

      it('should handle very large positive numbers', () => {
        renderProgressBar(container, 1000000);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        expect(fill.style.width).toBe('100%');
      });

      it('should handle NaN gracefully (browser rejects invalid CSS)', () => {
        renderProgressBar(container, NaN);

        const fill = container.querySelector('.progress-fill') as HTMLElement;
        // NaN comparison: Math.max(0, Math.min(100, NaN)) = NaN
        // Browser rejects invalid CSS values, resulting in empty string
        expect(fill.style.width).toBe('');
      });
    });

    describe('special label characters', () => {
      it('should handle labels with special characters', () => {
        renderProgressBar(container, 50, '<script>alert("xss")</script>');

        const labelDiv = container.querySelector('.progress-label');
        // Check it doesn't execute script (text content should contain the literal)
        expect(labelDiv?.textContent).toContain('<script>');
      });

      it('should handle empty string labels', () => {
        renderProgressBar(container, 50, '');

        // Empty string is falsy, so label text won't be rendered, but percentage will
        const labelDiv = container.querySelector('.progress-label');
        expect(labelDiv).toBeTruthy();
        expect(labelDiv?.querySelector('.progress-percentage')).toBeTruthy();
      });
    });
  });
});
