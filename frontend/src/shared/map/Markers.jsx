import { useEffect } from "react";

export default function Markers({ map, stations = [] }) {
  useEffect(() => {
    const renderMarkers = async () => {
      if (!map || stations.length === 0) return;

      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      stations.forEach(({ latitude, longitude }) => {
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: latitude, lng: longitude },
          content: createCustomPin(),
        });
      });
    };

    renderMarkers();
  }, [map, stations]);

  return null;
}

function createCustomPin() {
  const img = document.createElement("img");
  img.src = "/assets/icons/map/MapMarker.png";
  img.style.width = "40px";
  img.style.height = "40px";
  return img;
}

