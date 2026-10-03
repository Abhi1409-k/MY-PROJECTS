# RouteMaster — Smart Route & Trip Planner

A web app that finds the shortest route using **Dijkstra's Algorithm**, compares transport modes (flight, train, bus, car, ship), and shows real-time fuel prices for multiple countries.

## Features
- Shortest path via Dijkstra (min-heap, O(E log V))
- Real-time fuel prices (India + international)
- Multi-modal trip planner (air, rail, road, sea)
- Interactive map with route visualization
- Cross-border and cross-continent routing logic
- Fully responsive design

## Tech Stack
- HTML, Tailwind CSS (CDN)
- Leaflet + MapLibre GL for maps
- Nominatim (geocoding), OSRM (routing), OpenFreeMap (tiles)
- Vanilla JavaScript

## How to Run
Open `index.html` in any modern browser. No build step needed.

## Live Demo
https://routemastter.netlify.app
