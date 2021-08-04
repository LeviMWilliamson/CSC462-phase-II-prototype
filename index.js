const caycuseMap = L.map('caycuse-map').setView([48.8847, -124.3661], 13)
const tileLayerOptions = {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1,
	accessToken: 'pk.eyJ1IjoibGV2aW13aWxsaWFtc29uIiwiYSI6ImNrcnY0Y3N5MzAzMHkyb24wNW9mMnhsN3EifQ.JnuBDAaykgIF24NJmdbi6A'
}
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', tileLayerOptions).addTo(caycuseMap)

function generateRandomSensorDataList(centre, dimensions, intensityRange, count) {
	const [centreX, centreY] = centre
	const [width, height] = dimensions
	const [intensityStart, intensityEnd] = intensityRange

	const sensorDataList = []
	for(let i = 0; i < count; ++i){
		x = centreX - width / 2 + Math.random() * width,	// set the generated number to a variable so we can check them
		y = centreY - height / 2 + Math.random() * height	// same as x
		if (inWater(i,x,y)==true) {								// call inWater function to check if the expected point is in water, if it is move it down 20 pixels
			x = x-0.020
		}
		sensorDataList.push({
			position: [x,y],
			intensity: intensityStart + Math.random() * (intensityEnd - intensityStart) * 50
		})
	}
	return sensorDataList
}

const sensorDataList = generateRandomSensorDataList(
	[48.8847, -124.3661],
	[0.1, 0.1],
	[0, 1],
	33
)

for(let index in sensorDataList) {
	const { position, intensity } = sensorDataList[index]
	L.marker(position)
		.addTo(caycuseMap)
		.bindPopup(`<b>Sensor ${index}</b>: <i>${intensity}</i>`)
		.openPopup()
	console.log(`Added marker:\n\t[${position[0]}, ${position[1]}]\n\t${intensity}`)
}

const sensorHeatMap = L.heatLayer(
	sensorDataList.map(({ position: [x, y], intensity }) => [x, y, intensity] ),
	{ minOpacity: 0.5 }
).addTo(caycuseMap)

function inWater(i,x,y) {
	//console.log(i+": " + x + ", " + y + "\n")
	return false
}