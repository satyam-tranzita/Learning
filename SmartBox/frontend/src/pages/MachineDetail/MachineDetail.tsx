import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { globalData } from "../../mocks/data/globalData";
import { normalizeMachineData } from "../../features/machines/utils/normalizeMachineData";
import MachineStatus from "../../components/machine/MachineStatus";
import IVidPanel from "../../components/machine/IvidPanel";
function MachineDetail() {
  const { machineId } = useParams();
  const navigate = useNavigate();

  const machines = useMemo(
    () => normalizeMachineData(globalData),
    []
  );

  const machine = machines.find(
    (item) => item.id === machineId
  );

  if (!machine) {
    return (
      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Machine Not Found
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 rounded-lg bg-black px-5 py-2 text-sm text-white"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {machine.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Display {machine.location.display} · Row{" "}
              {machine.location.row} · Cluster{" "}
              {machine.location.cluster}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                machine.status === "RUNNING"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />

            <span className="font-medium">
              {machine.status}
            </span>
          </div>
        </div>
      </div>

  
      <div className="grid gap-6 lg:grid-cols-3">
  <MachineStatus machine={machine} />
  <IVidPanel machine={machine} />
</div>
    </main>
  );
}

export default MachineDetail;