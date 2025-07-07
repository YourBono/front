// components/SidebarItemComponent.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { SidebarItem } from '../model/sidebar/sidebar-item';

interface SidebarItemProps {
  item: SidebarItem;
  level: number;
  isExpanded: boolean;
  isActive: boolean;
  onToggle: (itemId: string) => void;
  expandedItems: string[];
}

export const SidebarItemComponent: React.FC<SidebarItemProps> = ({
  item,
  level,
  isExpanded,
  isActive,
  onToggle,
  expandedItems
}) => {
  const navigate = useNavigate();
  const hasChildren = !!item.children?.length;

  const handleClick = () => {
    if (hasChildren) {
      onToggle(item.id);
      return;
    }
    if (!isActive) {
      navigate(`/${item.id}`);
    }
  };

  return (
    <>
      <div
        className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
          isActive
            ? 'bg-(--secondary-color-hover) text-(--sidebar-text-color-hover)'
            : 'text-(--sidebar-text-color) hover:bg-(--secondary-color-hover)'
        }`}
        onClick={handleClick}
        style={{ paddingLeft: `${12 + level * 16}px` }}
      >
        {item.icon && <span className="mr-3 text-sm">{item.icon}</span>}
        <span className="flex-1 text-sm font-medium">{item.label}</span>
        {hasChildren && (
          <span className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`}>
            ▶
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-2">
          {item.children!.map((child) => (
            <SidebarItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              isExpanded={expandedItems.includes(child.id)}
              isActive={false}
              onToggle={onToggle}
              expandedItems={expandedItems}
            />
          ))}
        </div>
      )}
    </>
  );
};
