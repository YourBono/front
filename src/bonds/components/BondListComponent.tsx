import { useState } from "react";
import type { BondResponse } from "../model/response/bond.response";
import { BondCardComponent } from "./BondCardComponent";

export const BondListComponent: React.FC<{
  bonds: BondResponse[];
  actionLoading?: number;
  onEdit: (bond: BondResponse) => void;
  onDelete: (bond: BondResponse) => void;
}> = ({ bonds, actionLoading, onEdit, onDelete }) => {
  const [page, _setPage] = useState(1);
  const perPage = 5;

  const paginated = bonds.slice((page-1)*perPage, page*perPage);
  const total = Math.ceil(bonds.length / perPage);

  return (
    <>
      <div className="grid gap-6">{paginated.map(b =>
        <BondCardComponent
          key={b.id}
          bond={b}
          onEdit={() => onEdit(b)}
          onDelete={() => onDelete(b)}
          deleting={actionLoading === b.id}
        />
      )}</div>
      {/* Botones de paginación */}
    </>
  );
};
