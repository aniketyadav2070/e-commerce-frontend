import AuthGuard from "src/component/AuthGuard";
import React, { Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import NotFound from "./views/errors/NotFound";
import PageLoading from "./component/PageLoading";
import AuthContext from "src/context/Auth";
import UserContext from "src/context/User";

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <RenderRoutes data={routes} />
      </Suspense>
    </Router>
  );
};

function RenderRoutes({ data }) {
  return (
    <AuthContext>
      <UserContext>
        <Routes>
          {data.map((route, i) => {
            const Component = route.component;
            const Guard = route.guard ? AuthGuard : Fragment;
            const Layout = route.layout || Fragment;
            return (
              <Route
                key={i}
                path={route.path}
                element={
                  <Guard>
                    <Layout>
                      {route.routes ? (
                        <RenderRoutes data={route.routes} />
                      ) : (
                        <Component />
                      )}
                    </Layout>
                  </Guard>
                }
              />
            );
          })}
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>
      </UserContext>
    </AuthContext>
  )
}