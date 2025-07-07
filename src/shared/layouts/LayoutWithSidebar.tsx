import React from 'react';
import { SidebarComponent } from '@/shared/components/SidebarComponent';
import { sidebarItems } from '@/shared/data/sidebar-items';

interface LayoutWithSidebarProps {
  children: React.ReactNode;
  activeItem?: string;
}

export const LayoutWithSidebar: React.FC<LayoutWithSidebarProps> = ({
  children,
  activeItem
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarComponent
        title="YourBono"
        items={sidebarItems}
        activeItem={activeItem}
      />
      <main className="flex-1 overflow-y-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default LayoutWithSidebar;