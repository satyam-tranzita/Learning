import { Outlet, Link, useLocation } from "react-router-dom";
import { Factory, LayoutDashboard, Home } from "lucide-react";
function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo / Brand */}
          {/* //it provides client side Navigation */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <Factory size={28} />

            <div>
              <h1 className="font-semibold">
                Machine Monitoring
              </h1>

              <p className="text-xs text-gray-500">
                Production Control Center
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${
                location.pathname === "/"
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <Home size={17} />
              Home
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm ${
                location.pathname.startsWith("/dashboard")
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={17} />
              Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;