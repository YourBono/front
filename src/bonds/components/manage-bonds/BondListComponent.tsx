import { useState } from "react";
import type { BondResponse } from "../../model/response/bond.response";
import { BondCardComponent } from "./BondCardComponent";

export const BondListComponent: React.FC<{
  bonds: BondResponse[];
  actionLoading?: number;
  onEdit: (bond: BondResponse) => void;
  onDelete: (bond: BondResponse) => void;
}> = ({ bonds, actionLoading, onEdit, onDelete }) => {
  const [page, setPage] = useState(1);
  const perPage = 6; // 2 columnas * 2 filas por página
  const totalPages = Math.ceil(bonds.length / perPage);

  const paginated = bonds.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {paginated.map((b) => (
          <BondCardComponent
            key={b.id}
            bond={b}
            onEdit={() => onEdit(b)}
            onDelete={() => onDelete(b)}
            deleting={actionLoading === b.id}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            ⬅ Anterior
          </button>
          <span className="self-center text-sm text-gray-600">
            Página {page} de {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente ➡
          </button>
        </div>
      )}
    </div>
  );
};
