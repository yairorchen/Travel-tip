import { locService } from './loc.service.js'
import { api } from './secret-file.js'
export const mapService = {
  initMap,
  addMarker,
  panTo,
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log('InitMap')
  return _connectGoogleApi().then(() => {
    console.log('google available')
    gMap = new google.maps.Map(document.querySelector('#map'), {
      center: { lat, lng },
      zoom: 15,
    })
    console.log('Map!', gMap)
    getClickedLoc()
  })
}

function getClickedLoc() {
  gMap.addListener('click', (ev) => {
    const lat = ev.latLng.lat()
    const lng = ev.latLng.lng()
    console.log('lat, lng', lat, lng)
    let name = 'moamar kadafi'
    locService.addPlace(name, lat, lng, gMap.getZoom())
    setCenterToUserLoc(lat, lng)
  })
}

function setCenterToUserLoc(lat, lng) {
  gMap.setCenter({ lat, lng })
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${api.GOOGLE_MAP_API}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}
