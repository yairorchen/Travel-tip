import { locService } from './loc.service.js'
import { api } from './secret-file.js'
export const mapService = {
  initMap,
  addMarker,
  panTo,
  getGeoCode,
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
    getClickedLoc()
  })
}

function getClickedLoc() {
  gMap.addListener('click', (ev) => {
    const lat = ev.latLng.lat()
    const lng = ev.latLng.lng()
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

<<<<<<< HEAD
// getGeoCode()
function getGeoCode(name = 'Tokyo') {
=======
_getGeoCode()
function _getGeoCode(name = 'Tokyo') {
>>>>>>> 83d8b6356c7c59547a7e2d8b89bf957543aa8ddd
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${api.GOOGLE_MAP_GEOCODE}`
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
<<<<<<< HEAD
      let name = res.results[0].formatted_address
      let lat = res.results[0].geometry.location.lat
      let lng = res.results[0].geometry.location.lng
      panTo(lat, lng)
      return name
    })
}
=======
    })
}

>>>>>>> 83d8b6356c7c59547a7e2d8b89bf957543aa8ddd
