export const globalData = {
  FDH: {
    YBMH_KR7: {
      goodParts: 1250,
      badParts: 32,
      throughput: 96.8,
      scrapThreshold: 4,
    },

    YBMH_KR8: {
      goodParts: 1180,
      badParts: 67,
      throughput: 91.2,
      scrapThreshold: 4,
    },

    YBMH_KR9: {
      goodParts: 1420,
      badParts: 21,
      throughput: 98.5,
      scrapThreshold: 4,
    },
  },

  "I-Vid": {
    YBMH_KR7: {
      display: 1,
      row: 1,
      cluster: 1,
      cameras: [
        {
          id: "CAM-01",
          name: "Front Camera",
          thumbnailUrl: "/mock/camera-front.jpg",
        },
        {
          id: "CAM-02",
          name: "Side Camera",
          thumbnailUrl: "/mock/camera-side.jpg",
        },
      ],
    },

    YBMH_KR8: {
      display: 1,
      row: 1,
      cluster: 2,
      cameras: [],
    },

    YBMH_KR9: {
      display: 2,
      row: 1,
      cluster: 1,
      cameras: [
        {
          id: "CAM-03",
          name: "Production Camera",
          thumbnailUrl: "/mock/camera-production.jpg",
        },
      ],
    },
  },

  PR_Data: {
    YBMH_KR7: {
      status: "PR_IN",
    },

    YBMH_KR8: {
      status: "PR_OUT",
    },

    YBMH_KR9: {
      status: "PR_IN",
    },
  },

  Time_Graph: {
    YBMH_KR7: {
      cycleTime: 12.4,
      injectionTime: 4.2,
      screwVolume: 45.3,
    },

    YBMH_KR8: {
      cycleTime: 14.1,
      injectionTime: 5.1,
      screwVolume: 42.8,
    },
  },
};



// FDH
//  ↓
// Production information

// I-Vid
//  ↓
// Location + cameras

// PR_Data
//  ↓
// PR status

// Time_Graph
//  ↓
// Detailed metrics