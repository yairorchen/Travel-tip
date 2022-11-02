import { utils } from './util.service.js'
import { storage } from './storage.service.js'
export const locService = {
    getLocs,
    addPlace,
    getPlaceById,
    removePlace,
}

const STORAGE_KEY_PLACES = 'places'

var locs = [
    {
        id: utils.makeId(),
        name: 'Greatplace',
        lat: 32.047104,
        lng: 34.832384,
        weather: null,
        createdAt: null,
        updatedAt: null,
    },
    {
        id: utils.makeId(),
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
        }, 500)
    })
}

function _createPlace(
    name = 'puki land',
    lat,
    lng,
    zoom,
    createdAt = Date.now(),
    updatedAt = null
) {
    return { id: utils.makeId(), lat, lng, name, zoom, createdAt, updatedAt }
}

function removePlace(placeId) {
    console.log('placeId',placeId);
    locs = locs.filter((p) => p.id !== placeId)
    _savePlacesToStorage()
}

function addPlace(name, lat, lng, zoom) {
    //{ id: makeId(), lat, lng, name, zoom }
    let createdAt = Date.now()
    locs.unshift({ id: utils.makeId(), lat, lng, name, zoom, createdAt })
    _savePlacesToStorage()
    console.log(locs)
}

function getPlaceById(placeId) {
    return locs.find((p) => p.id === placeId)
}

function _createPlaces() {
    const places = loadFromStorage(STORAGE_KEY_PLACES) || []
    if (!places || !places.length) {
        for (let i = 0; i < 3; i++) {
            const placeName = 'DemoPlace' + (i + 1)
            places.push(_createPlace(placeName, 33 + i, 35 + i, 10))
        }
    }
    locs = places
    _savePlacesToStorage()
}

function _savePlacesToStorage() {
    storage.save(STORAGE_KEY_PLACES, locs)
}
