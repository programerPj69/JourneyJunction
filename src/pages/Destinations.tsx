import React from 'react';
import { MapPin, Navigation2 } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Kedarnath Temple',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
    description: 'Ancient Shiva temple amidst snow-capped peaks',
    location: 'Rudraprayag District',
    bestTime: 'May to June & September to October',
    activities: ['Temple Visit', 'Trekking', 'Photography', 'Meditation'],
    altitude: '3,583 meters'
  },
  {
    id: 2,
    name: 'Rishikesh',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220',
    description: "World's yoga capital and adventure sports hub",
    location: 'Dehradun District',
    bestTime: 'March to April & September to November',
    activities: ['Yoga', 'River Rafting', 'Bungee Jumping', 'Camping'],
    altitude: '372 meters'
  },
  {
    id: 3,
    name: 'Nainital',
    image: 'https://images.unsplash.com/photo-1626714356232-7c0c1bc3d233',
    description: 'Beautiful lake city surrounded by mountains',
    location: 'Nainital District',
    bestTime: 'March to June & September to November',
    activities: ['Boating', 'Cable Car Ride', 'Shopping', 'Lake View'],
    altitude: '2,084 meters'
  },
  {
    id: 4,
    name: 'Valley of Flowers',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d',
    description: 'UNESCO World Heritage Site known for its meadows of endemic alpine flowers',
    location: 'Chamoli District',
    bestTime: 'July to September',
    activities: ['Trekking', 'Nature Photography', 'Bird Watching', 'Flora Exploration'],
    altitude: '3,658 meters'
  },
  {
    id: 5,
    name: 'Auli',
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b',
    description: 'Premier ski resort destination with panoramic Himalayan views',
    location: 'Chamoli District',
    bestTime: 'November to March for skiing, May to October for other activities',
    activities: ['Skiing', 'Cable Car Ride', 'Trekking', 'Mountain Views'],
    altitude: '2,800 meters'
  },
  {
    id: 6,
    name: 'Mussoorie',
    image: 'https://images.unsplash.com/photo-1626714356232-7c0c1bc3d233',
    description: 'Queen of Hills with colonial charm and mountain views',
    location: 'Dehradun District',
    bestTime: 'March to June & September to November',
    activities: ['Mall Road Walk', 'Cable Car', 'Waterfalls', 'Adventure Sports'],
    altitude: '2,005 meters'
  }
];

function DestinationCard({ destination }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img src={destination.image} alt={destination.name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">{destination.name}</h3>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{destination.location}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{destination.description}</p>
        <div className="space-y-3">
          <div className="flex items-center text-gray-700">
            <Navigation2 className="h-5 w-5 mr-2" />
            <span>Altitude: {destination.altitude}</span>
          </div>
          <div>
            <span className="font-semibold">Best Time to Visit:</span>
            <p className="text-gray-600">{destination.bestTime}</p>
          </div>
          <div>
            <span className="font-semibold">Activities:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {destination.activities.map((activity, index) => (
                <span
                  key={index}
                  className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Destinations() {
  return (
    <div className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Explore Uttarakhand</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover the most beautiful destinations in Uttarakhand, from sacred temples to adventure spots
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destinations;