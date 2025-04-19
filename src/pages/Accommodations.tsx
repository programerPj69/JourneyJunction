import React, { useState } from 'react';
import { Hotel, Star, MapPin, Users, IndianRupee } from 'lucide-react';

const accommodations = [
  {
    id: 1,
    name: 'Himalayan Heights Resort',
    location: 'Mussoorie',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    rating: 4.8,
    price: 5000,
    type: 'Resort',
    amenities: ['WiFi', 'Restaurant', 'Spa', 'Mountain View'],
    capacity: '2-4'
  },
  {
    id: 2,
    name: 'Riverside Camping',
    location: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed',
    rating: 4.5,
    price: 2000,
    type: 'Camp',
    amenities: ['Bonfire', 'Adventure Activities', 'Restaurant', 'River View'],
    capacity: '2-3'
  },
  {
    id: 3,
    name: 'Lake View Hotel',
    location: 'Nainital',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    rating: 4.6,
    price: 4000,
    type: 'Hotel',
    amenities: ['WiFi', 'Restaurant', 'Lake View', 'Room Service'],
    capacity: '2-4'
  },
  {
    id: 4,
    name: 'Mountain Retreat',
    location: 'Auli',
    image: 'https://images.unsplash.com/photo-1518733057094-95b53143d2a7',
    rating: 4.7,
    price: 6000,
    type: 'Resort',
    amenities: ['Ski Equipment', 'Restaurant', 'Spa', 'Mountain View'],
    capacity: '2-4'
  },
  {
    id: 5,
    name: 'Heritage Homestay',
    location: 'Almora',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    rating: 4.4,
    price: 3000,
    type: 'Homestay',
    amenities: ['Home Cooked Food', 'Garden', 'Cultural Activities', 'Valley View'],
    capacity: '2-6'
  }
];

function AccommodationCard({ accommodation }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img src={accommodation.image} alt={accommodation.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{accommodation.name}</h3>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{accommodation.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-yellow-600 mr-1" />
            <span className="text-yellow-800">{accommodation.rating}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Hotel className="h-4 w-4 mr-2" />
            <span>{accommodation.type}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Users className="h-4 w-4 mr-2" />
            <span>Capacity: {accommodation.capacity} persons</span>
          </div>
          <div className="flex items-center text-gray-700">
            <IndianRupee className="h-4 w-4 mr-2" />
            <span>₹{accommodation.price} per night</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Amenities:</h4>
          <div className="flex flex-wrap gap-2">
            {accommodation.amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <button className="mt-6 w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition">
          Book Now
        </button>
      </div>
    </div>
  );
}

function Accommodations() {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState(10000);

  const locations = ['all', ...new Set(accommodations.map(acc => acc.location))];
  const types = ['all', ...new Set(accommodations.map(acc => acc.type))];

  const filteredAccommodations = accommodations.filter(acc => {
    const locationMatch = selectedLocation === 'all' || acc.location === selectedLocation;
    const typeMatch = selectedType === 'all' || acc.type === selectedType;
    const priceMatch = acc.price <= priceRange;
    return locationMatch && typeMatch && priceMatch;
  });

  return (
    <div className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Find Your Perfect Stay</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover comfortable accommodations across Uttarakhand that fit your needs and budget
        </p>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range: ₹{priceRange}
              </label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccommodations.map((accommodation) => (
            <AccommodationCard key={accommodation.id} accommodation={accommodation} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Accommodations;