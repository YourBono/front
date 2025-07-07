// src/shared/data/sidebar-items.ts
import type { SidebarItem } from "../model/sidebar/sidebar-item";

const icons = {
  home: '🏠',
  data: '📊',
  movements: '📈',
  history: '📋',
  operations: '⚙️',
  reports: '📄',
  valuation: '💰',
  analysis: '📊',
  plan: '📝',
  settings: '⚙️',
  profile: '👤'
};

export const sidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: icons.home
  },
  {
    id: 'operaciones',
    label: 'Operaciones',
    icon: icons.operations,
    children: [
      {
        id: 'new-bond',
        label: 'Añadir bono'
      },
      {
        id: 'manage-bonds',
        label: 'Control de bonos'
      },
    ]
  },
  {
    id: 'perfil',
    label: 'Mi Perfil',
    icon: icons.profile
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: icons.settings
  }
];