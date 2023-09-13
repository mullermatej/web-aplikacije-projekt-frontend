<template>
    <v-main>
        <div>
            <!-- Your HTML content here -->
            <div id="map"></div>
            <!-- <div id="cross-mark"></div> -->
        </div>
    </v-main>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import {
    route1Coordinates,
    route2Coordinates,
    route3Coordinates,
} from '../routeCoordinates.js';

export default {
    data() {
        return {
            lastCoordinates: [],
            name: '',
        };
    },
    mounted() {
        // Import Mapbox and set access token
        mapboxgl.accessToken =
            'pk.eyJ1IjoibXVsbGVybWF0ZWoxOCIsImEiOiJjbGt3ZjdqZHEwdnBvM2twbTRrZDlodWpxIn0.LwbRQW9Up-KStWz9Jp3J5A';

        // Create a new map instance
        var map = new mapboxgl.Map({
            container: 'map', // Use the ID of the div where you want to display the map
            style: 'mapbox://styles/mullermatej18/clkxpusvp005m01p83bzb9x0z',
            center: [13.859928, 44.860742], // starting position
            zoom: 12, // starting zoom,
            scrollZoom: true,
            // minZoom: 13.5,
            maxZoom: 18,
        });
        function updateCoordinatesConsole(lngLat) {
            // Store the last written coordinates in the data property
            this.lastCoordinates = [
                ...this.lastCoordinates,
                [lngLat.lng, lngLat.lat],
            ];

            console.log(
                `[${lngLat.lng.toFixed(6)}, ${lngLat.lat.toFixed(6)}],`
            );
        }
        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
            })
        );
        map.addControl(new mapboxgl.NavigationControl());
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: true,
            })
        );

        const createRouteGeojson = (coordinates) => ({
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: coordinates,
            },
        });

        const addRoute = (map, routeId, geojson) => {
            map.addSource(routeId, {
                type: 'geojson',
                data: geojson,
            });

            map.addLayer({
                id: routeId,
                type: 'line',
                source: routeId,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#49A7B1',
                    'line-width': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        12,
                        1,
                        14,
                        8,
                    ],
                },
            });
        };

        map.on('load', () => {
            const routes = [
                { id: 'route1', coordinates: route1Coordinates },
                { id: 'route2', coordinates: route2Coordinates },
                { id: 'route3', coordinates: route3Coordinates },
            ];

            routes.forEach(({ id, coordinates }) => {
                const geojson = createRouteGeojson(coordinates);
                addRoute(map, id, geojson);
            });
        });

        // Create cross mark element
        const crossMarkEl = document.createElement('div');
        crossMarkEl.className = 'cross-mark';
        document.getElementById('map').appendChild(crossMarkEl);
        // Update coordinates in console
        function updateCoordinatesConsole(lngLat) {
            let koordinate = [lngLat.lng.toFixed(6), lngLat.lat.toFixed(6)];
            console.log(koordinate);
            // Pokusavanje spremanja koordinata u localstorage
            localStorage.setItem('koordinate', JSON.stringify(koordinate));
        }

        // Get the map center and print coordinates in console
        // updateCoordinatesConsole(map.getCenter());

        // Listen for map move event to print coordinates in console
        // map.on('move', () => {
        //     updateCoordinatesConsole(map.getCenter());
        // });

        // Add markers and popups for each route
        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.80434, 44.861243],
                    },
                    properties: {
                        title: `Galebove stijene`,
                        subtitle: `Route end`,
                        description:
                            'Experience this 40.9-km loop trail near Pula - Pola, Istra. Generally considered a moderately challenging route. This is a popular trail for road biking and bike touring, but you can still enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful to visit anytime.',
                        distance: '15km',
                        duration: '50min',
                        difficulty: 'hard',
                        displayPopup: true,
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.810527, 44.861883],
                    },
                    properties: {
                        title: `Galebove stijene`,
                        subtitle: `Route start`,
                        description:
                            'Experience this 40.9-km loop trail near Pula - Pola, Istra. Generally considered a moderately challenging route. This is a popular trail for road biking and bike touring, but you can still enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful to visit anytime.',
                        distance: '15km',
                        duration: '50min',
                        difficulty: 'hard',
                        displayPopup: true,
                    },
                },
                // Druga ruta na stoji -v
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.796076, 44.875828],
                    },
                    properties: {
                        title: `Ruta "Rt Kumpare" - kraj`,
                        description:
                            "Check out this 6.1-km loop trail near Pula - Pola, Istra. Generally considered an easy route, it takes an average of 1 h 31 min to complete. This is a very popular area for birding, hiking, and mountain biking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome and may be off-leash in some areas.",
                        distance: '10km',
                        duration: '30min',
                        difficulty: 'easy',
                        displayPopup: true,
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.810914, 44.864681],
                    },
                    properties: {
                        title: `Ruta "Rt Kumpare" - pocetak`,
                        description:
                            "Check out this 6.1-km loop trail near Pula - Pola, Istra. Generally considered an easy route, it takes an average of 1 h 31 min to complete. This is a very popular area for birding, hiking, and mountain biking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome and may be off-leash in some areas.",
                        distance: '10km',
                        duration: '30min',
                        difficulty: 'easy',
                        displayPopup: true,
                    },
                },
                // Treca ruta -v
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.835495, 44.846476],
                    },
                    properties: {
                        title: `Ruta "Lungomare" - pocetak`,
                        description:
                            'Get to know this 7.6-km out-and-back trail near Pula - Pola, Istra. Generally considered an easy route, it takes an average of 1 h 37 min to complete. This is a popular trail for birding, hiking, and running, but you can still enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.',
                        distance: '20km',
                        duration: '65min',
                        difficulty: 'medium',
                        displayPopup: true,
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.830626, 44.835106],
                    },
                    properties: {
                        title: `Ruta "Lungomare" - kraj`,
                        description:
                            'Get to know this 7.6-km out-and-back trail near Pula - Pola, Istra. Generally considered an easy route, it takes an average of 1 h 37 min to complete. This is a popular trail for birding, hiking, and running, but you can still enjoy some solitude during quieter times of day. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.',
                        distance: '20km',
                        duration: '65min',
                        difficulty: 'medium',
                        displayPopup: true,
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.835546, 44.842806],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.835546, 44.842806],
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.82882, 44.83841],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.82882, 44.83841],
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.807482, 44.860033],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.807482, 44.860033],
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.807919, 44.86671],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.807919, 44.86671],
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.804655, 44.870341],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.804655, 44.870341],
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.798351, 44.874504],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.798351, 44.874504],
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.799861, 44.87474],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.799861, 44.87474],
                    },
                },
                // klupica
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.82814, 44.835677],
                    },
                    properties: {
                        title: 'Klupica',
                        coordinates: [13.82814, 44.835677],
                    },
                },

                // stol
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.832329, 44.839291],
                    },
                    properties: {
                        title: 'Stol',
                    },
                }, // stol
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [13.804047, 44.872615],
                    },
                    properties: {
                        title: 'Stol',
                    },
                },
            ],
        };

        for (const feature of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');

            // Check if the marker's coordinates match the specific coordinates
            if (feature.properties.title === 'Klupica') {
                el.className = 'marker-klupica';
                // Attach a click event listener to the marker
                el.addEventListener('click', () => {
                    if (feature.properties.coordinates) {
                        const [lng, lat] = feature.properties.coordinates;
                        const link = `http://www.google.com/maps/place/${lat},${lng}`;
                        window.open(link, '_blank');
                    }
                });
            } else if (feature.properties.title === 'Stol') {
                el.className = 'marker-stol';
            } else {
                el.className = 'marker';
            }

            // Check if the marker's coordinates match the specific coordinates
            if (
                (feature.geometry.coordinates[0] === 13.80434 &&
                    feature.geometry.coordinates[1] === 44.861243) ||
                (feature.geometry.coordinates[0] === 13.796076 &&
                    feature.geometry.coordinates[1] === 44.875828) ||
                (feature.geometry.coordinates[0] === 13.830626 &&
                    feature.geometry.coordinates[1] === 44.835106)
            ) {
                el.className = 'marker-krajRute'; // Use .marker-krajRute style for this marker
            } else if (feature.properties.title === 'Znamenitost 1') {
                el.className = 'marker-znamenitost';
            } else if (feature.properties.title === 'Plaza') {
                el.className = 'marker-plaza';
            } else if (feature.properties.title === 'Klupica') {
                el.className = 'marker-klupica';
            } else if (feature.properties.title === 'Stol') {
                el.className = 'marker-stol';
            } else {
                el.className = 'marker'; // Use .marker style for other markers
            }

            // create a popup for each feature
            if (feature.properties.displayPopup) {
                // create a popup for each feature
                const popup = new mapboxgl.Popup({
                    offset: 25,
                    maxWidth: 'none',
                    closeButton: false,
                }).setHTML(
                    `
                <div class="gornjiDioProzora">

<h3 class="popupNaslov" style="font-family: 'Alegreya Sans SC', sans-serif;">${feature.properties.title} &nbsp; <a href="/rute/ruta"><i class="fa-regular fa-circle-question" style="color: #000000; font-size: 18px;"></i></a> </h3>
<h4 style="font-family: 'Alegreya Sans SC'; font-size: 18px; margin: 0 0 0 0;">${feature.properties.subtitle}</h4>
</div>
<br>
  <div class="icon-container" style="font-family: 'Alegreya Sans SC';">
    <div class="icon-with-text">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
      </svg>
      <p>${feature.properties.distance}</p>
    </div>
    <div class="icon-with-text">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>${feature.properties.duration}</p>
    </div>
    <div class="icon-with-text">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      <p>${feature.properties.difficulty}</p>
    </div>
  </div>
 
`
                );

                // make a marker for each feature, set popup, and add to the map
                new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .setPopup(popup)
                    .addTo(map);
            } else {
                // If displayPopup is false, only create the marker without a popup
                new mapboxgl.Marker(el)
                    .setLngLat(feature.geometry.coordinates)
                    .addTo(map);
            }
        }

        // Dodaj kontrole za navigaciju po mapi i zoom
        const markerTypes = [
            'marker',
            'marker-krajRute',
            'marker-klupica',
            'marker-stol',
        ];

        map.on('zoom', () => {
            const zoomLevel = map.getZoom();
            const markerSizeClass =
                zoomLevel <= 12 ? 'marker-small' : 'marker-large';

            for (const type of markerTypes) {
                const markers = document.getElementsByClassName(type);
                for (const marker of markers) {
                    marker.classList.remove('marker-small', 'marker-large');
                    marker.classList.add(markerSizeClass);
                }
            }
        });

        let koordinate = localStorage.getItem('koordinate');
        console.log(koordinate);
    },
    methods: {},
};
</script>

<style>
main {
    font-family: 'Alegreya Sans SC', sans-serif;
    background-color: #fffefb;
}
/* Your component-specific styles here */
#map {
    width: 100%;
    height: 900px;
}

.marker {
    background-image: url('@/assets/CustomLogo1Walking.png');
    background-size: cover;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}
.marker-krajRute {
    background-image: url('@/assets/CustomLogo2WalkingEnd.png');
    background-size: cover;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}

.marker-klupica {
    background-image: url('@/assets/CustomLogo4Klupica.png');
    background-size: cover;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}
.marker-stol {
    background-image: url('@/assets/CustomLogo5Stol.png');
    background-size: cover;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}

.mapboxgl-popup-content {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    border-radius: 1rem;
    background-color: #fffefb;
    max-width: 320px;
}
.popupNaslov {
    margin: 10px 0px 0 0px;
}

.popupDescription {
    font-size: 15px;
    text-align: left;
}

.popupNaslovDescription {
    text-align: left;
    margin: 0 0 5px 0;
    text-transform: uppercase;
    font-size: 18px;
}

#cross-mark {
    position: absolute;
    top: 53%;
    left: 49.7%;
    width: 10px;
    height: 10px;
    background-color: #82b1ff;
    /* transform: translate(-20%, -20%); */
    pointer-events: none;
}
/* Add a CSS class for the smaller marker size */
.marker-small {
    width: 15px;
    height: 15px;
    transition: width 0.3s ease, height 0.3s ease;
}

/* Add a CSS class for the larger marker size */
.marker-large {
    width: 30px;
    height: 30px;
    transition: width 0.3s ease, height 0.3s ease;
}

.icon-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.icon-container p {
    margin: 0 0 0 0;
}

.icon-with-text {
    display: flex;
    align-items: center;
    margin-right: 20px;
}

.icon-with-text svg {
    margin-right: 5px;
}

.gornjiDioProzora {
    /* display: flex;
    justify-content: space-between;
    align-items: center; */
}
</style>
