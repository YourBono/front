import type { CashFlowItemResponse } from "../../model/response/cash-flow-item.response";

export const CashFlowTableComponent = ({ data }: { data: CashFlowItemResponse[] }) => (
  <div className="overflow-x-auto mt-6 text-(--text-color)">
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className=" text-sm">
          <th className="p-2">Periodo</th>
          <th className="p-2">Fecha</th>
          <th className="p-2">Saldo Inicial</th>
          <th className="p-2">Interés</th>
          <th className="p-2">Amortización</th>
          <th className="p-2">Total</th>
          <th className="p-2">Flujo Tenedor</th>
        </tr>
      </thead>
      <tbody>
        {data.map((d) => (
          <tr key={d.id} className="text-sm text-center border-t">
            <td className="p-2">{d.period}</td>
            <td className="p-2">{new Date(d.paymentDate).toLocaleDateString()}</td>
            <td className="p-2">{d.initialBalance.toFixed(2)}</td>
            <td className="p-2">{d.interest.toFixed(2)}</td>
            <td className="p-2">{d.amortization.toFixed(2)}</td>
            <td className="p-2">{d.totalPayment.toFixed(2)}</td>
            <td className="p-2">{d.bondHolderCashFlow.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
