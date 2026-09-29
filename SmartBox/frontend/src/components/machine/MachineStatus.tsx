import { Activity } from "lucide-react";
import type { Machine } from "../../features/machines/types/machine";

type MachineStatusProps = {
  machine: Machine;
};
function MachineStatus({ machine }: MachineStatusProps) {
  const running = machine.status === "RUNNING";

  return (
    <div className="rounded-xl border bg-white p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            running ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Activity size={20} />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Machine Status
          </p>

          <p className="font-semibold">
            {machine.status}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            PR Status
          </span>

          <span className="font-medium">
            {machine.prStatus === "PR_IN"
              ? "PR In"
              : "PR Out"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MachineStatus;