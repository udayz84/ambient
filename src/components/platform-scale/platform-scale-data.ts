export type GpxProduct = {
  id: string;
  label: string;
  description: string;
};

export const GPX_PRODUCTS: GpxProduct[] = [
  {
    id: "gpx-1",
    label: "GPX 1",
    description:
      "GPX1 delivers ultra-efficient AI inference for the smallest edge devices, enabling always-on sensing and microwatt-class intelligence in space-constrained products.",
  },
  {
    id: "gpx-5",
    label: "GPX 5",
    description:
      "GPX5 scales embedded AI performance for mid-tier edge systems, balancing power efficiency with richer on-device models for voice, vision, and sensor fusion.",
  },
  {
    id: "gpx-10",
    label: "GPX 10",
    description:
      "GPX10 is the best-in-class processor for always-on embedded AI applications on power constrained edge devices for sensor-fusion, always-on voice detection and low frequency vision applications.",
  },
  {
    id: "gpx-32",
    label: "GPX 32",
    description:
      "GPX32 extends Ambient compute density for high-throughput edge and near-cloud workloads, packing more intelligence into the same footprint without legacy power tradeoffs.",
  },
  {
    id: "gpx-64",
    label: "GPX 64",
    description:
      "GPX64 is built for hyperscaler-scale AI fabric, delivering programmable high-density compute for datacenter and server-grid deployments across your product roadmap.",
  },
];

export const DEFAULT_GPX_INDEX = 2;
