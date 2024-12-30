// Initialize map
const map = L.map('map').setView([38.7169, -9.1399], 13); // Lisbon coordinates
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Create a layer for user drawings
const drawnItems = new L.FeatureGroup().addTo(map);

// Add drawing controls
const drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: { polygon: true, rectangle: true, circle: false, marker: true, polyline: false }
});
map.addControl(drawControl);

// Add new drawings to the layer
map.on(L.Draw.Event.CREATED, function (e) {
    drawnItems.addLayer(e.layer);
});

// Save marked areas to localStorage
document.getElementById('save').addEventListener('click', () => {
    const data = JSON.stringify(drawnItems.toGeoJSON());
    localStorage.setItem('markedAreas', data);
    alert('Marked areas saved!');
});

// Load marked areas from localStorage
document.getElementById('load').addEventListener('click', () => {
    const data = localStorage.getItem('markedAreas');
    if (data) {
        const geojsonLayer = L.geoJSON(JSON.parse(data));
        geojsonLayer.eachLayer(layer => drawnItems.addLayer(layer));
        alert('Marked areas loaded!');
    } else {
        alert('No saved areas found.');
    }

// Initialize map
const map = L.map('map').setView([38.7169, -9.1399], 13); // Lisbon coordinates
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Create a layer for user drawings
const drawnItems = new L.FeatureGroup().addTo(map);

// Add drawing controls
const drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems, // Layer to manage drawn items
        remove: true // Allow users to delete shapes
    },
    draw: {
        polygon: true,       // Enable polygon drawing
        rectangle: true,     // Enable rectangle drawing
        circle: false,       // Disable circles
        marker: true,        // Enable marker placement
        polyline: false      // Disable polylines
    }
});
map.addControl(drawControl);

// Handle the creation of new shapes
map.on(L.Draw.Event.CREATED, function (e) {
    const layer = e.layer;
    drawnItems.addLayer(layer); // Add the new layer to the drawn items group
});

});
