import React, { Suspense, useState } from "react";
import Website from "./Pages/Website";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Properties from "./Pages/Properties/Properties.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import Property from "./Pages/Property/Property";
import UserDetailContext from "./Context/UserDetailsContext";
import Bookings from "./Pages/Bookings/Bookings.jsx";
import Favourites from "./Pages/Favourites/Favourites.jsx";
import MyProperties from "./Pages/MyProperties/MyProperties.jsx";

function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favourites: [],
    bookings: [],
    token: null,
  });
  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>...Loading Please Wait</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Website />} />
                <Route path="/properties">
                  <Route index element={<Properties />} />
                  <Route path=":propertyId" element={<Property />} />
                </Route>
                <Route path="/my-properties" element={<MyProperties />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/favourites" element={<Favourites />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  );
}

export default App;