import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuthentication } from "@/auth/components/RequireAuthentication";
import { SignInPage } from "@/auth/pages/SignInPage";
import { SignUpPage } from "@/auth/pages/SignUpPage";
import { HomePage } from "@/public/pages/HomePage";
import { ManageBondsPage } from "@/bonds/pages/ManageBondsPage";
import { NewBondPage } from "@/bonds/pages/NewBondPage";
import { ProfilePage } from "@/auth/pages/ProfilePage";


import { NotFoundPage } from "../pages/NotFoundPage";
import { BondCashFlowPage } from "@/bonds/pages/BondCashFlowPage";

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Navigate to="/home" replace />}/>
    <Route path='/sign-in' element={<SignInPage />}/>
    <Route path='/sign-up' element={<SignUpPage />}/>
    <Route path="*" element={<NotFoundPage />} />
    
    {/* Protected Routes */}
    <Route element={<RequireAuthentication />}>
      <Route path='/home' element={<HomePage />}/>
      <Route path='/new-bond' element={<NewBondPage />}/>
      <Route path='/manage-bonds' element={<ManageBondsPage />}/>
      <Route path='/profile' element={<ProfilePage />}/>
      <Route path="/bond/:id/cash-flow" element={<BondCashFlowPage />} />
    </Route>
  </Routes>
);

