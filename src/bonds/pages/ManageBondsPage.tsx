import LayoutWithSidebar from "@/shared/layouts/LayoutWithSidebar";
import { useState } from "react";
import type { BondRequest } from "../model/request/bond.request";
import type { UpdateBondRequest } from "../model/request/update-bond.request";
import { useManageBonds } from "../hooks/useManageBonds";
import { BondListComponent } from "../components/manage-bonds/BondListComponent";
import { EditBondModalComponent } from "../components/manage-bonds/EditBondModalComponent";
import { ConfirmationModalComponent } from "../components/manage-bonds/ConfirmationModalComponent";
import type { BondResponse } from "../model/response/bond.response";

export const ManageBondsPage: React.FC = () => {
  const { bonds, isLoading, error, actionLoading, fetchBonds, deleteBond, updateBond } = useManageBonds();

  const [confirm, setConfirm] = useState<{ show: boolean; bond: BondResponse | null }>({ show: false, bond: null });
  const [edit, setEdit] = useState<{ show: boolean; bond: BondResponse | null }>({ show: false, bond: null });

  if (isLoading) return <LayoutWithSidebar>...loading...</LayoutWithSidebar>;

  return (
    <LayoutWithSidebar activeItem="manage-bonds">
      {/* Título y error */}
      <div className="p-10">
        <BondListComponent
          bonds={bonds}
          actionLoading={actionLoading}
          onEdit={(b) => setEdit({ show: true, bond: b })}
          onDelete={(b) => setConfirm({ show: true, bond: b })}
        />
        <ConfirmationModalComponent
          open={confirm.show}
          title="Confirmar eliminación"
          onClose={() => setConfirm({ show: false, bond: null })}
          onConfirm={() => { deleteBond(confirm.bond!.id); setConfirm({ show: false, bond: null }); }}
        >
          ¿Eliminar bono «{confirm.bond?.name}»?
        </ConfirmationModalComponent>
        <EditBondModalComponent
          open={edit.show}
          bond={edit.bond && { ...edit.bond, id: edit.bond.id! }} // Aseguras que tenga id
          onCancel={() => setEdit({ show: false, bond: null })}
          onSave={(id, data) => {
            updateBond(id, data);
            setEdit({ show: false, bond: null });
          }}
        />
      </div>
    </LayoutWithSidebar>
  );
};
