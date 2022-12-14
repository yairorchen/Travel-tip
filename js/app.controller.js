import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanToPlace = onPanToPlace
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGetGeoCode = onGetGeoCode
window.onRemovePlace = onRemovePlace

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker(pos) {
  console.log('Adding a marker')
  console.log('pos', pos)
  mapService.addMarker(pos)
}

function onGetLocs() {
  locService.getLocs().then(renderPlaces)
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log('User position is:', pos.coords)
      mapService.panTo(pos.coords.latitude, pos.coords.longitude)
      mapService.addMarker({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      })
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(git, 139.6917)
}

function onPanToPlace(id) {
  console.log('Panning the Map')
  const place = locService.getPlaceById(id)
  console.log('place', place)
  mapService.panTo(place.lat, place.lng)
  mapService.addMarker({ lat: place.lat, lng: place.lng })
  // mapService.panTo(35.6895, 139.6917)
}

//////

function renderPlaces(places) {
  console.log('places', places)
  const elList = document.querySelector('.place-list')
  const strHtmls = places
    .map(({ id, name }) => {
      return `
        <li class="flex justify-between clean-list list-item">
        <h3>${name}</h3>
        <button class="btn go-btn" onclick="onPanToPlace('${id}')">GO</button>
        <button class="btn x-btn" onclick="onRemovePlace('${id}')">X</button>
      </li>
        `
    })
    .join('')
  // console.log('strHtmls', strHtmls);
  elList.innerHTML = strHtmls
}

function onRemovePlace(placeId) {
  console.log('placeId', placeId)
  locService.removePlace(placeId)
  locService.getLocs().then(renderPlaces)
}

function onGetGeoCode() {
  var searchKey = document.querySelector('.type-search').value
  mapService.getGeoCode(searchKey).then(getLocName)
}
function getLocName(name) {
  document.querySelector('.location-name').innerHTML = name
}
