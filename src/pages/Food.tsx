import React, { useState } from 'react';
import { Search, UtensilsCrossed, MapPin, Star } from 'lucide-react';

const foods = [
  {
    id: 1,
    name: 'Kafuli',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950',
    description: 'Traditional Garhwali dish made from green leafy vegetables',
    category: 'Vegetarian',
    region: 'Garhwal',
    rating: 4.8,
    price: '₹150',
    restaurants: ['Garhwal Kitchen', 'Hill View Restaurant']
  },
  {
    id: 2,
    name: 'Bhang Ki Chutney',
    image: 'https://images.unsplash.com/photo-1589010588553-46e8e7c21788',
    description: 'Spicy hemp seed chutney, a local favorite',
    category: 'Condiment',
    region: 'Kumaon',
    rating: 4.6,
    price: '₹50',
    restaurants: ['Local Flavors', 'Mountain Spice']
  },
  {
    id: 3,
    name: 'Aloo ke Gutke',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b',
    description: 'Spiced potato dish with local herbs',
    category: 'Vegetarian',
    region: 'Kumaon',
    rating: 4.7,
    price: '₹120',
    restaurants: ['Kumaon Kitchen', 'Heritage Foods']
  },
  {
    id: 4,
    name: 'Mandua ki Roti',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df',
    description: 'Nutritious flatbread made from finger millet',
    category: 'Bread',
    region: 'All Regions',
    rating: 4.5,
    price: '₹40',
    restaurants: ['Traditional Tastes', 'Mountain View']
  },
  {
    id: 5,
    name: 'Bal Mithai',
    image: 'https://images.unsplash.com/photo-1589010588553-46e8e7c21788',
    description: 'Traditional chocolate-like fudge with white sugar balls',
    category: 'Dessert',
    region: 'Almora',
    rating: 4.9,
    price: '₹400/kg',
    restaurants: ['Almora Sweets', 'Heritage Confectionery']
  }
];

function FoodCard({ food }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{food.name}</h3>
          <div className="flex items-center bg-yellow-100 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-yellow-600 mr-1" />
            <span className="text-yellow-800">{food.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{food.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-gray-700">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{food.region}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">{food.category}</span>
            <span className="font-semibold">{food.price}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Where to try:</h4>
          <div className="space-y-1">
            {food.restaurants.map((restaurant, index) => (
              <div key={index} className="text-gray-600">
                • {restaurant}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Food() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const categories = ['all', ...new Set(foods.map(food => food.category))];
  const regions = ['all', ...new Set(foods.map(food => food.region))];

  const filteredFoods = foods.filter(food => {
    const searchMatch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory === 'all' || food.category === selectedCategory;
    const regionMatch = selectedRegion === 'all' || food.region === selectedRegion;
    return searchMatch && categoryMatch && regionMatch;
  });

  return (
    <div className="py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Local Cuisine Guide</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover the authentic flavors of Uttarakhand's traditional cuisine
        </p>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Categories</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Regions</option>
                {regions.filter(reg => reg !== 'all').map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFoods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No dishes found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default Food;