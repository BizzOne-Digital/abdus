"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  AttributionControl,
} from "react-leaflet";
import L from "leaflet";
import type { FeatureCollection, Geometry } from "geojson";
import "leaflet/dist/leaflet.css";
import "./WardMap.css";

type Props = {
  className?: string;
  geoJsonUrl?: string;
};

type WardGeo = FeatureCollection<Geometry> | Geometry;

function FitBounds({ data }: { data: WardGeo }) {
  const map = useMap();
  useEffect(() => {
    const layer = L.geoJSON(data as Geometry);
    try {
      map.fitBounds(layer.getBounds(), { padding: [36, 36], maxZoom: 12 });
    } catch {
      map.setView([43.94, -78.87], 11);
    }
  }, [data, map]);
  return null;
}

const wardStyle: L.PathOptions = {
  color: "#06152f",
  weight: 3,
  opacity: 1,
  fillColor: "#c47a4a",
  fillOpacity: 0.38,
  lineJoin: "round",
  lineCap: "round",
};

export function WardMap({
  className = "",
  geoJsonUrl = "/data/ward1.geojson",
}: Props) {
  const [data, setData] = useState<WardGeo | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(geoJsonUrl)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json as WardGeo);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [geoJsonUrl]);

  if (!data) {
    return (
      <div className={`ward-map ward-map--loading ${className}`}>
        <p>Loading Ward 1 map…</p>
      </div>
    );
  }

  return (
    <div className={`ward-map ${className}`}>
      <MapContainer
        center={[43.94, -78.87]}
        zoom={11}
        scrollWheelZoom={false}
        attributionControl={false}
        className="ward-map__canvas"
      >
        <AttributionControl prefix="Leaflet" position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={data} style={() => wardStyle} />
        <FitBounds data={data} />
      </MapContainer>
      <p className="ward-map__credit">
        Data: City of Oshawa GIS (Wards &amp; Polls)
      </p>
    </div>
  );
}
