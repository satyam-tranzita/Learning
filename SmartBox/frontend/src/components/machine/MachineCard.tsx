import { Activity, AlertTriangle, CheckCircle } from "lucide-react";
import type { Machine } from "../../features/machines/types/machine";


//MachineCard is called when pass machine object and a function
type MachineCardProps = {
  machine: Machine;
  onClick: () => void;
};

function MachineCard({ machine, onClick }: MachineCardProps) {
  const isRunning = machine.status === "RUNNING";

  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl border bg-white p-5 text-left shadow-sm transition hover:shadow-md"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {machine.name}
        </h3>

        <div className="flex items-center gap-2">
          <span
            className={`h-3 w-3 rounded-full ${
              isRunning ? "bg-green-500" : "bg-red-500"
            }`}
          />

          <span className="text-sm font-medium">
            {machine.status}
          </span>
        </div>
      </div>

      {/* Production */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-gray-500">
            Good Parts
          </p>

          <p className="text-xl font-semibold">
            {machine.production.goodParts}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Bad Parts
          </p>

          <p className="text-xl font-semibold">
            {machine.production.badParts}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Throughput
          </p>

          <p className="text-xl font-semibold">
            {machine.production.throughput}%
          </p>
        </div>
      </div>

      {/* PR Status */}
      <div className="mt-5 flex items-center gap-2 border-t pt-4">
        {machine.prStatus === "PR_IN" ? (
          <>
            <CheckCircle size={18} />
            <span className="text-sm">
              PR In
            </span>
          </>
        ) : (
          <>
            <AlertTriangle size={18} />
            <span className="text-sm">
              PR Out
            </span>
          </>
        )}
      </div>
    </button>
  );
}

export default MachineCard;

