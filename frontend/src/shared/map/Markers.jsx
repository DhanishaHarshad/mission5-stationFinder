import { useEffect, useRef } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { useNavigate } from "react-router-dom";

export default function Markers({ map, stations = [] }) {
  const navigate = useNavigate();
  const markerRef = useRef([]);
  const clusterRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const renderMarkers = async () => {
      // ____ LOAD THE ADVANCED MARKER ELEMENT FROM THE GOOGLE MAPS LIBRARY _____
      //___ THIS GIVES US ACCESS TO CUSTOM DOM-BASED MARKERS WITH FULL STYLING CONTROL _____
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      //___ CLEAR PREVIOUSLY RENDERED MARKERS AND CLUSTERS ___
      //___ THIS PREVENTS OLD MARKERS FROM LINGERING WHEN THE MAP OR DATA CHANGES ___
      markerRef.current.forEach((m) => (m.map = null));
      markerRef.current = [];

      if (clusterRef.current) {
        clusterRef.current.setMap(null);
        clusterRef.current = null;
      }

      //____ CREATE NEW MARKERS FOR ALL STATIONS ____
      //___ STATIONS MARKERS ARE POSITIONED DYNAMICALLY BY USING THE STATION DATAS COORDINATES. 
      //____ CLICK EVENT SAVES THE STATION DETAILS NAVIGATES TO THE /DIRECTIONS PAGE WITH THE DETAILS.
  
      const markers = stations.map((station) => {
        const marker = new AdvancedMarkerElement({
          map,
          position: { lat: station.latitude, lng: station.longitude },
          content: createCustomPin(),
        });

        marker.addListener("click", () => {
          navigate("/directions", { state: { station } });
        });

        return marker;
      });

      markerRef.current = markers;

      //____ CREATE NEW DOM ELEMENT (CLUSTER) _____
      //__ THIS ALLOWS US TO GROUP SINGLE MARKERS AND DISPLAY WITH A NEW ELEMENT.
      //__ THE LIBRARY IS USED TO DYNAMICALLYRENDER CLUSTERS 
      clusterRef.current = new MarkerClusterer({
        map,
        markers,

        //___ CUSTOM RENDERER FOR CLUSTER MARKERS ____ 
        //... THIS WILL RENDER AN IMAGE FROM MY ASSETS FOLDER INSIDE OF A CONTAINER, WITH A LABEL 
        //... THAT OVERLAYS AND DISPLAYS THE NUMBER OF MARKER PINS IN THE CLUSTER 
        renderer: {
          render: ({ count, position, markers }) => {
            const container = document.createElement("div");
            container.className = "custom-cluster";

            const img = document.createElement("img");
            img.src = "/assets/icons/map/ClusterOrange.png";
            img.style.width = "40px";
            img.style.height = "40px";
            img.style.position = "absolute";

            const label = document.createElement("div");
            label.className = "cluster-count";
            label.textContent = count.toString();

            //___ THIS OVERLAYS THE LABEL ON TOP OF THE IMAGE ____
            container.appendChild(img);
            container.appendChild(label);

            const clusterMarker = new AdvancedMarkerElement({
              position,
              content: container,
            });

            //____ THIS ON CLICK EVENT ZOOMS YOU INTO THE MAP MARKERS WITHIN THE CLUSTER AREA _____
            //... IF THERE IS A SINGEL MARKER, PAN TO IT OR IF THERES MULTIPLE FIT THE MAP BOUNDARIES TO INCLUDE ALL THE MARKERS ___
            clusterMarker.addListener("click", () => {
              if (markers.length === 1) {
                map.panTo(markers[0].position);
                map.setZoom(10);
              } else {
                const bounds = new google.maps.LatLngBounds();
                markers.forEach((m) => bounds.extend(m.position));
                map.fitBounds(bounds);
              }
            });

            return clusterMarker;
          }
        }
      });
    };

    //___ TRIGGER THE MARKER RENDERING WHEN MAP OR STATION DATA CHANGES _____
    renderMarkers();
  }, [map, stations, navigate]);

  return null;
}

//____ THIS CREATES A CUSTOMER MAP PIN FROM AN IMAGE IN THE ASSETS FOLDER ____
function createCustomPin() {
  const img = document.createElement("img");
  img.src = "/assets/icons/map/MapMarker.png";
  img.style.width = "40px";
  img.style.height = "40px";
  return img;
}
