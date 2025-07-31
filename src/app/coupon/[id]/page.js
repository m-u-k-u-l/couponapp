'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navigation from '../../components/Navigation';
import Link from 'next/link';

export default function CouponDetail() {
  const params = useParams();
  const [coupon, setCoupon] = useState(null);
  const [relatedCoupons, setRelatedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCoupon();
    fetchRelatedCoupons();
  }, [params.id]);

  const fetchCoupon = async () => {
    try {
      const response = await fetch(`/api/coupons/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCoupon(data);
      }
    } catch (error) {
      console.error('Error fetching coupon:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedCoupons = async () => {
    try {
      const response = await fetch('/api/coupons');
      if (response.ok) {
        const data = await response.json();
        // Filter related coupons (same category, excluding current coupon)
        const related = data
          .filter(c => c._id !== params.id)
          .slice(0, 5);
        setRelatedCoupons(related);
      }
    } catch (error) {
      console.error('Error fetching related coupons:', error);
    }
  };

  const copyToClipboard = async (couponCode) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      alert('Coupon code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!coupon) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Coupon not found</h1>
            <p className="mt-2 text-gray-600">The coupon you're looking for doesn't exist.</p>
            <Link href="/all-coupons" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
              Browse all coupons →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                  <Link href="/" className="hover:text-gray-700">Home</Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link href="/all-coupons" className="hover:text-gray-700">All Coupons</Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-900">{coupon.title}</li>
              </ol>
            </nav>

            {/* Coupon Header */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-50 to-indigo-100">
                {coupon.image ? (
                  <img
                    src={coupon.image}
                    alt={coupon.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {coupon.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Published: {formatDate(coupon.publishDate)}
                  </span>
                </div>
              </div>

              {/* Coupon Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{coupon.title}</h1>
                
                {coupon.offerTagline && (
                  <p className="text-xl text-gray-600 mb-6">{coupon.offerTagline}</p>
                )}

                {/* Coupon Code Section */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Coupon Code</h3>
                    <button
                      onClick={() => copyToClipboard(coupon.couponCode)}
                      className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-blue-600 font-medium">Copy Code</span>
                    </button>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-dashed border-green-300">
                    <code className="text-2xl md:text-3xl font-mono font-bold text-green-600 text-center block">
                      {coupon.couponCode}
                    </code>
                  </div>
                </div>

                {/* Description */}
                {coupon.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <div 
                      className="prose prose-lg max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{ __html: coupon.description }}
                    />
                  </div>
                )}

                {/* Coupon Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Category</h4>
                    <p className="text-gray-600">{coupon.category}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Author</h4>
                    <p className="text-gray-600">{coupon.author}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Published Date</h4>
                    <p className="text-gray-600">{formatDate(coupon.publishDate)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Last Updated</h4>
                    <p className="text-gray-600">{formatDate(coupon.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Coupons */}
            {relatedCoupons.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Coupons</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedCoupons.map((relatedCoupon) => (
                    <Link
                      key={relatedCoupon._id}
                      href={`/coupon/${relatedCoupon._id}`}
                      className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                          {relatedCoupon.image ? (
                            <img src={relatedCoupon.image} alt={relatedCoupon.title} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {relatedCoupon.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <code className="text-xs font-mono text-green-600 bg-green-50 px-2 py-1 rounded">
                              {relatedCoupon.couponCode}
                            </code>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                copyToClipboard(relatedCoupon.couponCode);
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
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Coupons</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search coupons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-2.5">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <Link
                href={`/all-coupons?search=${encodeURIComponent(searchTerm)}`}
                className="mt-3 inline-block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </Link>
            </div>

            {/* Featured Coupons */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured Coupons</h3>
              <div className="space-y-4">
                {relatedCoupons.slice(0, 3).map((featuredCoupon) => (
                  <div key={featuredCoupon._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <Link href={`/coupon/${featuredCoupon._id}`} className="block hover:bg-gray-50 rounded-lg p-2 -m-2">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                          {featuredCoupon.image ? (
                            <img src={featuredCoupon.image} alt={featuredCoupon.title} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
                            {featuredCoupon.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <code className="text-xs font-mono text-green-600 bg-green-50 px-2 py-1 rounded">
                              {featuredCoupon.couponCode}
                            </code>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                copyToClipboard(featuredCoupon.couponCode);
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

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/all-coupons"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Coupons
                </Link>
                <button
                  onClick={() => copyToClipboard(coupon.couponCode)}
                  className="block w-full text-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Copy This Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 