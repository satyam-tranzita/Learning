import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { globalData } from "../../mocks/data/globalData";
import { normalizeMachineData } from "../../features/machines/utils/normalizeMachineData";

import DisplaySection from "../../components/machine/DisplaySection";

function Dashboard() {
  const navigate = useNavigate();

  //no dependencies so calculate this once and reuse again
  const machines = useMemo(
    () => normalizeMachineData(globalData),
    []
  );


//display1---> machine belonging to display groups....like display1-->has machine1,machine2,machine4
  const displays = useMemo(() => {
    return machines.reduce<Record<number, typeof machines>>(
      (acc, machine) => {
        const display = machine.location.display;
        if (!acc[display]) {
          acc[display] = [];
        }

        acc[display].push(machine);

        return acc;
      },
      {}
    );
  }, [machines]);


  
  const handleMachineClick = (machineId: string) => {
    navigate(`/dashboard/machine/${machineId}`);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">
          Machine Dashboard
        </h1>

        <p className="mt-1 text-gray-500">
          Production monitoring overview
        </p>
      </header>

      {/* Displays */}
      {Object.entries(displays).map(
        ([displayNumber, displayMachines]) => (
          <DisplaySection
            key={displayNumber}
            displayNumber={Number(displayNumber)}
            machines={displayMachines}
            onMachineClick={handleMachineClick}
          />
        )
      )}
    </main>
  );
}

export default Dashboard;