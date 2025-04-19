import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Navigation2, Hotel, Camera, Star, Coffee } from 'lucide-react';
import { format } from 'date-fns';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// This would typically come from a database or API
const uttarakhandPlaces = [
  { id: 1, name: 'Dehradun', lat: 30.3165, lng: 78.0322, type: 'City' },
  { id: 2, name: 'Mussoorie', lat: 30.4598, lng: 78.0644, type: 'Hill Station' },
  { id: 3, name: 'Rishikesh', lat: 30.0869, lng: 78.2676, type: 'Spiritual' },
  { id: 4, name: 'Haridwar', lat: 29.9457, lng: 78.1642, type: 'Spiritual' },
  { id: 5, name: 'Nainital', lat: 29.3919, lng: 79.4542, type: 'Lake City' },
  { id: 6, name: 'Almora', lat: 29.5892, lng: 79.6467, type: 'Hill Station' },
  { id: 7, name: 'Kedarnath', lat: 30.7346, lng: 79.0669, type: 'Temple' },
  { id: 8, name: 'Badrinath', lat: 30.7433, lng: 79.4938, type: 'Temple' },
  { id: 9, name: 'Auli', lat: 30.5417, lng: 79.5666, type: 'Ski Resort' },
  { id: 10, name: 'Jim Corbett', lat: 29.5300, lng: 78.7747, type: 'National Park' }
];

const touristAttractions = [
  {
    name: "Robber's Cave",
    lat: 30.3255,
    lng: 78.0436,
    type: 'Natural Formation',
    description: 'A unique river cave formation',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23'
  },
  {
    name: 'Sahastradhara',
    lat: 30.3841,
    lng: 78.1283,
    type: 'Waterfall',
    description: 'Thousand-fold spring with therapeutic waters',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220'
  },
  {
    name: 'Tapkeshwar Temple',
    lat: 30.3397,
    lng: 78.0173,
    type: 'Temple',
    description: 'Ancient cave temple dedicated to Lord Shiva',
    image: 'https://images.unsplash.com/photo-1626714356232-7c0c1bc3d233'
  }
];

const hotels = [
  {
    name: 'Mountain View Resort',
    lat: 30.3265,
    lng: 78.0456,
    rating: 4.5,
    priceRange: '₹3000-5000',
    amenities: ['Restaurant', 'WiFi', 'Parking', 'Mountain View'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945'
  },
  {
    name: 'Riverside Retreat',
    lat: 30.3841,
    lng: 78.1173,
    rating: 4.2,
    priceRange: '₹2500-4000',
    amenities: ['Pool', 'Restaurant', 'Spa', 'River View'],
    image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed'
  }
];

const restaurants = [
  {
    name: 'Himalayan Flavors',
    lat: 30.3275,
    lng: 78.0446,
    rating: 4.6,
    cuisine: 'Local Uttarakhand',
    priceRange: '₹500-1500',
    image: 'https://images.unsplash.com/photo-1589010588553-46e8e7c21788'
  },
  {
    name: 'Mountain Spice',
    lat: 30.3851,
    lng: 78.1163,
    rating: 4.4,
    cuisine: 'North Indian',
    priceRange: '₹800-2000',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950'
  }
];

interface Attraction {
  name: string;
  type: string;
  description: string;
  image: string;
}

interface Hotel {
  name: string;
  rating: number;
  priceRange: string;
  amenities: string[];
  image: string;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
}

function TripPlanner() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([30.3165, 78.0322]); // Default to Dehradun
  const [mapZoom, setMapZoom] = useState(8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);

    const sourcePlace = uttarakhandPlaces.find(place => place.name === source);
    if (sourcePlace) {
      setMapCenter([sourcePlace.lat, sourcePlace.lng]);
      setMapZoom(10);
    }
  };

  const sourcePlace = uttarakhandPlaces.find(place => place.name === source);
  const destPlace = uttarakhandPlaces.find(place => place.name === destination);

  const distance = sourcePlace && destPlace
    ? calculateDistance(sourcePlace.lat, sourcePlace.lng, destPlace.lat, destPlace.lng)
    : null;

  const routeCoordinates = sourcePlace && destPlace
    ? [[sourcePlace.lat, sourcePlace.lng], [destPlace.lat, destPlace.lng]]
    : [];

  return (
    <div className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Plan Your Uttarakhand Journey</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Enter your travel details to discover the perfect route with recommended stops and stays
        </p>

        {/* Trip Planning Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Starting Point</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select starting point</option>
                  {uttarakhandPlaces.map(place => (
                    <option key={place.id} value={place.name}>{place.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                >
                  <option value="">Select destination</option>
                  {uttarakhandPlaces.map(place => (
                    <option key={place.id} value={place.name}>{place.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center"
            >
              <Navigation2 className="h-5 w-5 mr-2" />
              Plan My Trip
            </button>
          </form>
        </div>

        {/* Results Section */}
        {showResults && source && destination && date && (
          <div className="space-y-8">
            {/* Trip Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Trip Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-semibold">{distance} kilometers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-500">Travel Date</p>
                    <p className="font-semibold">{format(new Date(date), 'dd MMM yyyy')}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Navigation2 className="h-6 w-6 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-500">Route</p>
                    <p className="font-semibold">{source} → {destination}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Interactive Route Map</h2>
              <div className="h-[500px] rounded-lg overflow-hidden">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Source and Destination Markers */}
                  {sourcePlace && (
                    <Marker position={[sourcePlace.lat, sourcePlace.lng]}>
                      <Popup>
                        <b>Start: {source}</b>
                      </Popup>
                    </Marker>
                  )}
                  {destPlace && (
                    <Marker position={[destPlace.lat, destPlace.lng]}>
                      <Popup>
                        <b>Destination: {destination}</b>
                      </Popup>
                    </Marker>
                  )}

                  {/* Route Line */}
                  {routeCoordinates.length > 0 && (
                    <Polyline
                      positions={routeCoordinates}
                      color="blue"
                      weight={3}
                      opacity={0.7}
                    />
                  )}

                  {/* Tourist Attractions */}
                  {touristAttractions.map((attraction, index) => (
                    <Marker
                      key={index}
                      position={[attraction.lat, attraction.lng]}
                      icon={new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })}
                    >
                      <Popup>
                        <div className="text-sm">
                          <b>{attraction.name}</b>
                          <p className="text-gray-600">{attraction.type}</p>
                          <p>{attraction.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Hotels */}
                  {hotels.map((hotel, index) => (
                    <Marker
                      key={index}
                      position={[hotel.lat, hotel.lng]}
                      icon={new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })}
                    >
                      <Popup>
                        <div className="text-sm">
                          <b>{hotel.name}</b>
                          <p>Rating: {hotel.rating}⭐</p>
                          <p>{hotel.priceRange}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                  {/* Restaurants */}
                  {restaurants.map((restaurant, index) => (
                    <Marker
                      key={index}
                      position={[restaurant.lat, restaurant.lng]}
                      icon={new L.Icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                      })}
                    >
                      <Popup>
                        <div className="text-sm">
                          <b>{restaurant.name}</b>
                          <p>Rating: {restaurant.rating}⭐</p>
                          <p>{restaurant.cuisine}</p>
                          <p>{restaurant.priceRange}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">Route</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Attractions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Hotels</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Restaurants</span>
                </div>
              </div>
            </div>

            {/* Attractions Along the Way */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                <Camera className="h-6 w-6 inline-block mr-2 text-yellow-600" />
                Attractions Along the Way
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {touristAttractions.map((attraction, index) => (
                  <div key={index} className="flex space-x-4">
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{attraction.name}</h3>
                      <p className="text-sm text-yellow-600 mb-1">{attraction.type}</p>
                      <p className="text-sm text-gray-600">{attraction.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Hotels */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                <Hotel className="h-6 w-6 inline-block mr-2 text-yellow-600" />
                Recommended Stays
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotels.map((hotel, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex space-x-4">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{hotel.name}</h3>
                        <div className="flex items-center text-yellow-600 mb-1">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{hotel.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{hotel.priceRange}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hotel.amenities.map((amenity, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Restaurants */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">
                <Coffee className="h-6 w-6 inline-block mr-2 text-yellow-600" />
                Recommended Restaurants
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restaurants.map((restaurant, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex space-x-4">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{restaurant.name}</h3>
                        <div className="flex items-center text-yellow-600 mb-1">
                          <Star className="h-4 w-4 mr-1" />
                          <span>{restaurant.rating}</span>
                        </div>
                        <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                        <p className="text-sm text-gray-600">{restaurant.priceRange}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TripPlanner;