import loadable from "@loadable/component";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppConfig } from "./AppConfig";
import GlobalLoading from "./components/global-loading/GlobalLoading";
import AuthGuard from "./guard/AuthGuard";
import GuestGuard from "./guard/GuestGuard";
import DashBoardLayout from "./layout/Dashboard";
import NotAuthorized from "./pages/401";
import NotFound from "./pages/404";

const Dashboard = loadable(() => import("./pages/dashboard"));
const Account = loadable(() => import("./pages/account"));
const Login = loadable(() => import("./pages/login"));
const Team = loadable(() => import("./pages/team"));
const DurationTime = loadable(() => import("./pages/duration-time"));
function App() {
  return (
    <div className="App">
      <BrowserRouter basename={AppConfig.routerBase}>
        <Suspense fallback={<GlobalLoading />}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/layout-guard-roles" element={<NotAuthorized />} />

            <Route path="/" element={<Navigate replace to="/dashboard" />} />

            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Dashboard />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/account"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Account />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />

            <Route
              path="/team"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <Team />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/duration-time"
              element={
                <AuthGuard>
                  <DashBoardLayout>
                    <DurationTime />
                  </DashBoardLayout>
                </AuthGuard>
              }
            />
            <Route
              path="/login"
              element={
                <GuestGuard>
                  <Login />
                </GuestGuard>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
