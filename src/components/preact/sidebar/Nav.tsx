import { h } from 'preact';
import { Icons } from '@/components/icons';

interface NavProps {
  currentPath: string;
}

interface NavLink {
  route: string;
  icon: string;
  label: string;
}

const navLinks: NavLink[] = [
  { route: '/dashboard', icon: Icons.Dashboard, label: 'Dashboard' },
  { route: '/curriculum', icon: Icons.Curriculum, label: 'Curriculum' },
  { route: '/progress', icon: Icons.Progress, label: 'Progress' },
  { route: '/export', icon: Icons.Export, label: 'Export PDF' },
  { route: '/settings', icon: Icons.Settings, label: 'Settings' },
];

function isActiveRoute(currentPath: string, route: string): boolean {
  // Dashboard is special - matches root
  if (route === '/dashboard') {
    return currentPath === '/' || currentPath === '/dashboard';
  }
  return currentPath === route;
}

export function Nav({ currentPath }: NavProps) {
  return (
    <nav class="sidebar-nav">
      {navLinks.map(({ route, icon, label }) => {
        const isActive = isActiveRoute(currentPath, route);
        const href = route === '/dashboard' ? '#/' : `#${route}`;

        return (
          <a
            key={route}
            href={href}
            class={`sidebar-nav-link ${isActive ? 'active' : ''}`}
          >
            <span class="nav-icon" dangerouslySetInnerHTML={{ __html: icon }} />
            <span class="nav-label">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
