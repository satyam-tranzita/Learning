// This imports only the TypeScript type.

// It does not import any runtime JavaScript.

export type MachineStatus = "RUNNING" | "STOPPED";

export type PRStatus = "PR_IN" | "PR_OUT";

export type Camera = {
  id: string;
  name: string;
  thumbnailUrl: string;
};

export type MachineMetrics = {
  cycleTime: number;
  injectionTime: number;
  screwVolume: number;
};

export type Machine = {
  id: string;
  name: string;

  location: {
    display: number;
    row: number;
    cluster: number;
  };

  status: MachineStatus;

  production: {
    goodParts: number;
    badParts: number;
    throughput: number;
  };

  prStatus: PRStatus;

  cameras: Camera[];

  metrics?: MachineMetrics;
};