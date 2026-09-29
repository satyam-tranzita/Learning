import { useNavigate } from "react-router-dom";
import { ArrowRight, Factory } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <section className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-sm">
          <Factory size={40} />
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Machine Monitoring Dashboard
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-gray-500">
          Monitor machine production, operational status,
          camera feeds, and manufacturing performance from
          a centralized dashboard.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          Go To Dashboard
          <ArrowRight size={18} />
        </button>
      </section>
    </main>
  );
}

export default Home;