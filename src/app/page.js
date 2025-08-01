'use client';

import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Link from 'next/link';

export default function AllCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [popularCoupons, setPopularCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Food & Dining',
    'Travel',
    'Health & Beauty',
    'Home & Garden',
    'Sports',
    'Books',
    'Gaming'
  ];

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons');
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
        // Set first 5 coupons as popular (in real app, this would be based on usage/views)
        setPopularCoupons(data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (couponCode) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      // You could add a toast notification here
      alert('Coupon code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.couponCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coupon.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || coupon.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <Navigation />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover Amazing Deals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Save money with the best coupons and discount codes
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for coupons, stores, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 text-lg text-gray-900 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Coupons Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedCategory === 'All' ? 'All Coupons' : `${selectedCategory} Coupons`}
              </h2>
              <p className="text-gray-600">
                {filteredCoupons.length} coupon{filteredCoupons.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {filteredCoupons.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No coupons found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCoupons.map((coupon) => (
                  <div key={coupon._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                    {/* Coupon Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
                      {coupon.image ? (
                        <Link
                        href={`/${coupon.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <img
                          src={coupon.image}
                          alt={coupon.title}
                          className="w-full h-full object-cover"
                        />
                        </Link>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Link
                          href={`/${coupon.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          </Link>
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {coupon.category}
                        </span>
                      </div>
                    </div>

                    {/* Coupon Content */}
                    <div className="p-6">
                    <Link
                          href={`/${coupon.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {coupon.title}
                      </h3>
                      </Link>
                      {coupon.offerTagline && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {coupon.offerTagline}
                        </p>
                      )}

                      {/* Coupon Code */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Coupon Code:</span>
                          <button
                            onClick={() => copyToClipboard(coupon.couponCode)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <code className="text-lg font-mono font-bold text-green-600 bg-green-50 px-3 py-1 rounded">
                            {coupon.couponCode}
                          </code>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Published: {formatDate(coupon.publishDate)}</span>
                        <Link
                          href={`/${coupon.slug}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Popular Coupons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Coupons</h3>
              <div className="space-y-4">
                {popularCoupons.map((coupon) => (
                  <div key={coupon._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                                         <Link href={`/${coupon.slug}`} className="block hover:bg-gray-50 rounded-lg p-2 -m-2">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                          {coupon.image ? (
                            <img src={coupon.image} alt={coupon.title} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {coupon.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <code className="text-xs font-mono text-green-600 bg-green-50 px-2 py-1 rounded">
                              {coupon.couponCode}
                            </code>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                copyToClipboard(coupon.couponCode);
                              }}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 