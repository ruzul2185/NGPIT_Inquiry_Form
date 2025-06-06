import { createBrowserRouter, RouterProvider } from "react-router";

import InquiryPage from "../pages/InquiryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World</div>,
  },
  {
    path: "/inquiry",
    element: <InquiryPage />,
  },
  // Add a catch-all route for 404 Not Found
    { path: '*', element: <div>404 Not Found</div> },
]);

const Navigation = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default Navigation;