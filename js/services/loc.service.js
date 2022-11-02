export const locService = {
  getLocs,
}

function _createPlace(
  name = 'puki land',
  lat,
  lng,
  zoom,
  createdAt = Date.now(),
  updatedAt = null
) {
  return { id: makeId(), lat, lng, name, zoom, createdAt, updatedAt }
}

function removePlace(placeId) {
  gPlaces = gPlaces.filter((p) => p.id !== placeId)
  _savePlacesToStorage()
}

function addPlace(name, lat, lng, zoom) {
  //{ id: makeId(), lat, lng, name, zoom }
  gPlaces.unshift({ id: makeId(), lat, lng, name, zoom })
  _savePlacesToStorage()
}
function getPlaceById(placeId) {
  return gPlaces.find((p) => p.id === placeId)
}
function _createPlaces() {
  const places = loadFromStorage(STORAGE_KEY_PLACES) || []
  if (!places || !places.length) {
    for (let i = 0; i < 3; i++) {
      const placeName = 'DemoPlace' + (i + 1)
      places.push(_createPlace(placeName, 33 + i, 35 + i, 10))
    }
  }
  gPlaces = places
  _savePlacesToStorage()
}

function _savePlacesToStorage() {
  saveToStorage(STORAGE_KEY_PLACES, gPlaces)
}
const locs = [
  {
    id: 1,
    name: 'Greatplace',
    lat: 32.047104,
    lng: 34.832384,
    weather: null,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 2,
    name: 'Neveragain',
    lat: 32.047201,
    lng: 34.832581,
    weather: null,
    createdAt: null,
    updatedAt: null,
  },
]

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}
