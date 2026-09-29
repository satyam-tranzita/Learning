import type { Machine } from "../../features/machines/types/machine";
import MachineCard from "./MachineCard";

type DisplaySectionProps = {
  displayNumber: number;
  machines: Machine[];
  onMachineClick: (machineId: string) => void;
};

function DisplaySection({
  displayNumber,
  machines,
  onMachineClick,
}: DisplaySectionProps) {
  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">
          Display {displayNumber}
        </h2>

        <p className="text-sm text-gray-500">
          {machines.length} machines
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {machines.map((machine) => (
          <MachineCard
            key={machine.id}
            machine={machine}
            onClick={() => onMachineClick(machine.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default DisplaySection;