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
  settings: '⚙️'
};

export const sidebarItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: icons.home
  },
  {
    id: 'mis-datos',
    label: 'Mis datos',
    icon: icons.data
  },
  {
    id: 'movimientos',
    label: 'Movimientos',
    icon: icons.movements
  },
  {
    id: 'historial',
    label: 'Historial',
    icon: icons.history
  },
  {
    id: 'operaciones',
    label: 'Operaciones',
    icon: icons.operations,
    children: [
      {
        id: 'new-bond',
        label: 'Registro'
      },
      {
        id: 'manage-bonds',
        label: 'Valoración'
      },
      {
        id: 'analisis',
        label: 'Análisis'
      },
      {
        id: 'plan-seguros',
        label: 'Plan de seguros'
      }
    ]
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: icons.settings
  }
];