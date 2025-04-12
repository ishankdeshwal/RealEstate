import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "../GeoCodermarker/GeoCoderMarker";

function Map({address, city, country}) {
  return (
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={[53.35, 18.8]}
        zoom={2}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoCoderMarker address={`${address} ${city} ${country}`} />
      </MapContainer>
    </div>
  );
}

export default Map;
