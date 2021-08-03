const leafletMap = L.map('leaflet-map').setView([48.8847, -124.3661], 13)
const tileLayerOptions = {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoibGV2aW13aWxsaWFtc29uIiwiYSI6ImNrcnY0Y3N5MzAzMHkyb24wNW9mMnhsN3EifQ.JnuBDAaykgIF24NJmdbi6A'
}
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', tileLayerOptions).addTo(leafletMap)
