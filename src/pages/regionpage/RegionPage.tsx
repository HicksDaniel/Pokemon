import { Button } from "primereact/button";
import { useState } from "react";
import "./regionpage.css";
import { OverlayPanel } from "primereact/overlaypanel";
import CustomCarousel from "../../components/carousel/Carousel";

export default function RegionPage() {
  return (
    <div className="flex flex-col h-screen justify-start p-4 gap-4">
      <div className="flex justify-center align-center h-1/16">Title of Page</div>

      <div className="flex justify-center h-9/16">
        <CustomCarousel />
      </div>

      <div className="flex justify-center items-center h-1/16">Region "Intro" goes here</div>
      <div className="flex flex-row justify-center gap-2 h-1/16">
        <Button className="w-1/4" label="Route Guide" icon="pi pi-map" />
        <Button className="w-1/4" label="Regional Info" icon="pi pi-info-circle" />
        <Button className="w-1/4" label="Regonal Pokemon" icon="pi pi-globe" />
      </div>
      <div> SHOW POKEMON HERE</div>
    </div>
  );
}
