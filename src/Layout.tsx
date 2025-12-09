import { useState } from "react";
import { Outlet } from "react-router-dom";
import MiniDrawer from "./components/minidrawer/MiniDrawer";
import useStore from "./store";

export default function Layout({ children }: any) {
  const content = children || <Outlet />;

  return (
    <div className="flex justify-center align-center h-full">
      <MiniDrawer />

      <div className={`flex-1 h-full max-w-[70%] overflow-hidden`}>{content}</div>
    </div>
  );
}
