// src/shared/components/SidebarComponent.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthenticationStore } from '@/auth/services/authentication.store';
import type { SidebarItem } from '../model/sidebar/sidebar-item';
import { SidebarItemComponent } from './SidebarItemComponent';

interface SidebarProps {
  title?: string;
  items: SidebarItem[];
  activeItem?: string;
}

export const SidebarComponent: React.FC<SidebarProps> = ({
                                                           title,
                                                           items,
                                                           activeItem
                                                         }) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['operaciones']);
  const navigate = useNavigate();
  const { signOut, username } = useAuthenticationStore();

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
        prev.includes(itemId)
            ? prev.filter(id => id !== itemId)
            : [...prev, itemId]
    );
  };

  const handleLogout = () => {
    signOut(navigate);
  };

  return (
      <aside className="w-64 bg-(--secondary-color) h-full overflow-y-auto flex flex-col">
        <div className="p-4 border-b text-(--sidebar-text-color)">
          <h2 className="text-lg font-semibold">{title}</h2>
          {username && (
              <p className="text-sm text-(--sidebar-text-color) opacity-80 mt-1">
                {username}
              </p>
          )}
        </div>

        <nav className="p-2 flex-1">
          <div className="mb-4">
            <h3 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-(--sidebar-text-color)">
              PRINCIPAL
            </h3>
            {items.map((item) => (
                <SidebarItemComponent
                    key={item.id}
                    item={item}
                    level={0}
                    isExpanded={expandedItems.includes(item.id)}
                    isActive={activeItem === item.id}
                    onToggle={toggleExpand}
                    expandedItems={expandedItems}
                />
            ))}
          </div>
        </nav>

        {/* Botón de logout en la parte inferior */}
        <div className="p-4 border-t">
          <button
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 rounded-md text-(--sidebar-text-color) hover:bg-(--secondary-color-hover) transition-colors"
          >
            <span className="mr-3 text-sm">🚪</span>
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>
  );
};