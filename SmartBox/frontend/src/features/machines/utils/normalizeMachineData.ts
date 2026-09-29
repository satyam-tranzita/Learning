import type { Machine } from "../types/machine";

export function normalizeMachineData(data: any): Machine[] {
  const machineNames = Object.keys(data.FDH);

  return machineNames.map((name) => {
    const production = data.FDH[name];
    const config = data["I-Vid"][name];
    const pr = data.PR_Data[name];
    const metrics = data.Time_Graph[name];

    return {
      id: name,
      name,

      location: {
        display: config.display,
        row: config.row,
        cluster: config.cluster,
      },

      status: production.throughput > 0
        ? "RUNNING"
        : "STOPPED",

      production: {
        goodParts: production.goodParts,
        badParts: production.badParts,
        throughput: production.throughput,
      },

      prStatus: pr?.status ?? "PR_OUT",

      cameras: config.cameras ?? [],

      metrics,
    };
  });
}