import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Liked from "./pages/Liked";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import MyConfigProvider from "./components/MyConfigProvider";

const queryClient = new QueryClient();

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/movie/:id",
      element: (
        <>
          <Header />
          <Details />
          <Footer />
        </>
      ),
    },
    {
      path: "/liked",
      element: (
        <>
          <Header />
          <Liked />
          <Footer />
        </>
      ),
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <MyConfigProvider>
        <RouterProvider router={router} />
      </MyConfigProvider>
    </QueryClientProvider>
  );
}
