import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

import { Map, MapMouseEvent, IControl } from "mapbox-gl";
import mapboxgl from "mapbox-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { MyMap } from "@/types/posts";
import { Button } from "./ui/button";

type GeolocateResult = {
  coords: {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp: number;
};

const MapComponent = ({ userMarkers, setUserMarkers }: MyMap) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  const [longitude, setLongitude] = useState<number>(-0.142297);
  const [latitude, setLatitude] = useState<number>(51.564719);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_TOKEN;

    if (!mapContainerRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken || "",
      collapsed: true,
    });

    const map = (mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [longitude, latitude],
      zoom: 13,
      maxZoom: 18,
    }));
    mapRef.current = map;

    map.addControl(geocoder as unknown as IControl, "top-left");

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      }),
      "bottom-right"
    );

    map.addControl(new mapboxgl.FullscreenControl(), "bottom-left");

    map.on("geolocate", (e: GeolocateResult) => {
      setLatitude(e.coords.latitude);
      setLongitude(e.coords.longitude);
    });

    const newMarker = map.on("click", (e: MapMouseEvent) => {
      if (markersRef.current.length) {
        markersRef.current.forEach((mark) => mark.remove());
        setUserMarkers([]);
      }

      const { lng, lat } = e.lngLat;

      const addedMarker = new mapboxgl.Marker({
        color: "#efeded",
      })
        .setLngLat([lng, lat])
        .addTo(map);
      markersRef.current.push(addedMarker);

      setUserMarkers((markers) => [...markers, { lng, lat }]);
    });

    return () => map.remove();
  }, []);

  const handleReset = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    setUserMarkers([]);
    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: 15,
    });
  };

  return (
    <>
      <div
        style={{ height: "450px", width: "100%" }}
        ref={mapContainerRef}
        className="map-container"
      />
      <Button
        className="underline underline-offset-1 px-0 self-start"
        variant="ghost"
        onClick={(e) => {
          e.preventDefault();
          handleReset();
        }}
      >
        Reset Map
      </Button>
    </>
  );
};

export default MapComponent;
