// components/SidebarComponent.tsx
import React, { useState } from 'react';
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

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <aside className="w-64 bg-(--secondary-color) h-full overflow-y-auto">
      <div className="p-4 border-b text-(--sidebar-text-color)">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <nav className="p-2">
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
    </aside>
  );
};
