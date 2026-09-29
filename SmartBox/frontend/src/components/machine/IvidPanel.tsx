import { ExternalLink, Video } from "lucide-react";
import type { Machine } from "../../features/machines/types/machine";

type IVidPanelProps = {
  machine: Machine;
};

function IVidPanel({ machine }: IVidPanelProps) {
  const hasCameras = machine.cameras.length > 0;

  return (
    <section className="rounded-xl border bg-white p-6 lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            iVid
          </h2>

          <p className="text-sm text-gray-500">
            Machine camera feeds
          </p>
        </div>

        <Video size={22} />
      </div>

      {!hasCameras ? (
        <div className="mt-6 rounded-lg bg-gray-50 p-8 text-center">
          <Video
            size={32}
            className="mx-auto mb-3 text-gray-400"
          />

          <p className="font-medium">
            iVid is not available
          </p>

          <p className="mt-1 text-sm text-gray-500">
            No camera configuration is available for
            this machine.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {machine.cameras.map((camera) => (
              <div
                key={camera.id}
                className="overflow-hidden rounded-lg border"
              >
                <div className="flex aspect-video items-center justify-center bg-gray-100">
                  <Video
                    size={32}
                    className="text-gray-400"
                  />
                </div>

                <div className="p-3">
                  <p className="font-medium">
                    {camera.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {camera.id}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-5 inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Go to iVid
            <ExternalLink size={16} />
          </button>
        </>
      )}
    </section>
  );
}

export default IVidPanel;