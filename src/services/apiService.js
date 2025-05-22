// This is a mock service that would be replaced with actual API calls
// in a production environment

// Mock data for services
const MOCK_SERVICES = {
  plumber: [
    {
      id: '1',
      name: 'John Plumbing Services',
      rating: 4.7,
      reviewCount: 128,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859',
      distance: '1.2',
      category: 'plumber',
      description: 'Professional plumbing services with 10+ years of experience. Specializing in pipe repairs, installations, and emergency services.',
      services: [
        'Pipe repair and replacement',
        'Drain cleaning',
        'Water heater installation',
        'Emergency plumbing',
      ],
      address: '123 Service St, Your City',
      phone: '+1234567890',
      email: 'john.plumbing@example.com',
      location: {
        latitude: 9.0820,
        longitude: 8.6753,
      },
    },
  ],
  electrician: [
    {
      id: '2',
      name: 'Bright Electric',
      rating: 4.9,
      reviewCount: 245,
      price: '$$$',
      image: 'https://images.unsplash.com/photo-1604081192412-7e56f7141923',
      distance: '0.8',
      category: 'electrician',
      description: 'Certified electricians providing top-notch electrical services for residential and commercial properties.',
      services: [
        'Wiring and rewiring',
        'Circuit breaker repair',
        'Lighting installation',
        'Electrical inspections',
      ],
      address: '456 Electric Ave, Your City',
      phone: '+1987654321',
      email: 'contact@brightelectric.com',
      location: {
        latitude: 9.0830,
        longitude: 8.6760,
      },
    },
  ],
  carpenter: [
    {
      id: '3',
      name: 'Master Woodworks',
      rating: 4.6,
      reviewCount: 87,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1601564921647-b446839a013a',
      distance: '2.1',
      category: 'carpenter',
      description: 'Expert carpentry services for all your woodworking needs. Specializing in custom furniture, repairs, and installations.',
      services: [
        'Custom furniture making',
        'Cabinet installation',
        'Wood repairs',
        'Door and window fitting'
      ],
      address: '789 Woodwork Lane, Your City',
      phone: '+2347012345678',
      email: 'info@masterwoodworks.com',
      location: {
        latitude: 9.0810,
        longitude: 8.6740,
      },
    },
  ],
  cleaner: [
    {
      id: '4',
      name: 'Sparkle Cleaning Services',
      rating: 4.8,
      reviewCount: 156,
      price: '$',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952',
      distance: '1.5',
      category: 'cleaner',
      description: 'Professional cleaning services for homes and offices. Thorough, reliable, and eco-friendly cleaning solutions.',
      services: [
        'Home deep cleaning',
        'Office cleaning',
        'Post-construction cleanup',
        'Regular maintenance cleaning'
      ],
      address: '101 Clean Street, Your City',
      phone: '+2348098765432',
      email: 'book@sparkleclean.com',
      location: {
        latitude: 9.0840,
        longitude: 8.6770,
      },
    },
  ],
  mechanic: [
    {
      id: '5',
      name: 'Swift Auto Repairs',
      rating: 4.5,
      reviewCount: 203,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1599256871679-6a3e7e036d60',
      distance: '3.2',
      category: 'mechanic',
      description: 'Reliable auto repair services with certified mechanics. Fast service and quality parts guaranteed.',
      services: [
        'Engine diagnostics and repair',
        'Brake system service',
        'Oil changes',
        'Tire replacement and balancing'
      ],
      address: '456 Motor Avenue, Your City',
      phone: '+2349023456789',
      email: 'service@swiftauto.com',
      location: {
        latitude: 9.0790,
        longitude: 8.6720,
      },
    },
  ],
  beautician: [
    {
      id: '6',
      name: 'Glamour Beauty Salon',
      rating: 4.9,
      reviewCount: 178,
      price: '$$$',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
      distance: '0.7',
      category: 'beautician',
      description: 'Premium beauty salon offering a range of services from hair styling to nail care and makeup.',
      services: [
        'Hair cutting and styling',
        'Manicure and pedicure',
        'Facial treatments',
        'Professional makeup'
      ],
      address: '202 Beauty Boulevard, Your City',
      phone: '+2347087654321',
      email: 'appointments@glamourbeauty.com',
      location: {
        latitude: 9.0835,
        longitude: 8.6765,
      },
    },
  ],
  painter: [
    {
      id: '7',
      name: 'ColorMaster Painting',
      rating: 4.7,
      reviewCount: 92,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09',
      distance: '2.8',
      category: 'painter',
      description: 'Professional painting services for interior and exterior walls. Quality paints and expert application.',
      services: [
        'Interior painting',
        'Exterior painting',
        'Decorative finishes',
        'Color consultation'
      ],
      address: '303 Paint Street, Your City',
      phone: '+2348034567890',
      email: 'info@colormaster.com',
      location: {
        latitude: 9.0805,
        longitude: 8.6730,
      },
    },
  ],
  gardener: [
    {
      id: '8',
      name: 'Green Thumb Gardens',
      rating: 4.6,
      reviewCount: 75,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1599629954294-14df9f8291b7',
      distance: '4.1',
      category: 'gardener',
      description: 'Professional gardening and landscaping services. Creating and maintaining beautiful outdoor spaces.',
      services: [
        'Garden design and installation',
        'Lawn maintenance',
        'Tree and shrub pruning',
        'Irrigation system setup'
      ],
      address: '404 Garden Road, Your City',
      phone: '+2349056789012',
      email: 'care@greenthumb.com',
      location: {
        latitude: 9.0780,
        longitude: 8.6710,
      },
    },
  ]
};

// Mock API functions
export const getServicesByCategory = async (category, location) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, you would make an API call here
  // const response = await fetch(`YOUR_API_URL/services?category=${category}&lat=${location.latitude}&lng=${location.longitude}`);
  // const data = await response.json();
  
  // For now, return mock data
  return MOCK_SERVICES[category] || [];
};

export const getServiceById = async (serviceId, category) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real app, you would make an API call here
  // const response = await fetch(`YOUR_API_URL/services/${serviceId}`);
  // const data = await response.json();
  
  // For now, find the service in our mock data
  const services = MOCK_SERVICES[category] || [];
  return services.find(service => service.id === serviceId) || null;
};

export const submitRating = async (serviceId, rating, review) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, you would make an API call here
  // const response = await fetch(`YOUR_API_URL/services/${serviceId}/ratings`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ rating, review }),
  // });
  // const data = await response.json();
  
  // For now, just return a success response
  return { success: true, message: 'Rating submitted successfully' };
};

// Mock reviews data
const MOCK_REVIEWS = {
  '1': [
    {
      id: 'r1',
      userId: 'u1',
      userName: 'Sarah Johnson',
      userImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 5,
      comment: 'Excellent service! John was professional, punctual, and fixed our plumbing issues quickly. Highly recommended!',
      date: '2 weeks ago',
      helpful: 12
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: 'Michael Smith',
      userImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4,
      comment: 'Good work on our bathroom plumbing. Completed on time and within budget.',
      date: '1 month ago',
      helpful: 8
    }
  ],
  '2': [
    {
      id: 'r3',
      userId: 'u3',
      userName: 'David Williams',
      userImage: 'https://randomuser.me/api/portraits/men/68.jpg',
      rating: 5,
      comment: 'Bright Electric installed new lighting in our kitchen and living room. The work was excellent and they were very knowledgeable.',
      date: '2 months ago',
      helpful: 5
    }
  ]
};

// Get reviews for a service
export const getServiceReviews = async (serviceId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, you would make an API call here
  // const response = await fetch(`YOUR_API_URL/services/${serviceId}/reviews`);
  // const data = await response.json();
  
  // For now, return mock reviews
  return MOCK_REVIEWS[serviceId] || [];
};

// Book a service
export const bookService = async (serviceId, bookingDetails) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // In a real app, you would make an API call here
  // const response = await fetch(`YOUR_API_URL/services/${serviceId}/bookings`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(bookingDetails),
  // });
  // const data = await response.json();
  
  // Generate a booking reference
  const bookingReference = 'BK' + Math.floor(100000 + Math.random() * 900000);
  
  // For now, just return a success response with a booking reference
  return { 
    success: true, 
    message: 'Booking submitted successfully', 
    bookingReference,
    bookingDetails: {
      ...bookingDetails,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  };
};

// Get user favorites
export const getUserFavorites = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, you would make an API call here
  // const response = await fetch('YOUR_API_URL/user/favorites');
  // const data = await response.json();
  
  // For now, return mock favorites data
  const MOCK_FAVORITES = [
    {
      id: '1',
      name: 'John\'s Plumbing',
      category: 'Plumbing',
      rating: 4.8,
      reviewCount: 24,
      location: 'Lagos, Nigeria',
      image: 'https://images.unsplash.com/photo-1606093310360-6bbf1f60cf36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: '2',
      name: 'Bright Electricals',
      category: 'Electrician',
      rating: 4.5,
      reviewCount: 18,
      location: 'Accra, Ghana',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: '4',
      name: 'CleanPro Services',
      category: 'Cleaning',
      rating: 4.7,
      reviewCount: 32,
      location: 'Cape Town, South Africa',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80'
    }
  ];
  
  return MOCK_FAVORITES;
};

// Get user notifications
export const getUserNotifications = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In a real app, you would make an API call here
  // const response = await fetch('YOUR_API_URL/user/notifications');
  // const data = await response.json();
  
  // For now, return mock notifications data
  const MOCK_NOTIFICATIONS = [
    {
      id: '1',
      type: 'booking_confirmation',
      title: 'Booking Confirmed',
      message: 'Your booking with John\'s Plumbing for pipe repair has been confirmed for May 25, 2025 at 10:00 AM.',
      serviceId: '1',
      time: new Date('2025-05-21T15:30:00').toISOString(),
      read: false
    },
    {
      id: '2',
      type: 'booking_reminder',
      title: 'Upcoming Service',
      message: 'Reminder: Your appointment with Bright Electricals is tomorrow at 2:00 PM.',
      serviceId: '2',
      time: new Date('2025-05-21T09:15:00').toISOString(),
      read: true
    },
    {
      id: '3',
      type: 'service_rating',
      title: 'Rate Your Experience',
      message: 'How was your experience with Woodworks Ltd? Please take a moment to rate their service.',
      serviceId: '3',
      time: new Date('2025-05-20T14:45:00').toISOString(),
      read: false
    },
    {
      id: '4',
      type: 'promo',
      title: 'Special Offer',
      message: 'Get 15% off on your next cleaning service booking. Limited time offer!',
      time: new Date('2025-05-19T11:20:00').toISOString(),
      read: false
    },
    {
      id: '5',
      type: 'booking_update',
      title: 'Booking Rescheduled',
      message: 'Your appointment with AutoFix Garage has been rescheduled to June 6, 2025 at 4:00 PM.',
      serviceId: '5',
      time: new Date('2025-05-18T16:10:00').toISOString(),
      read: true
    }
  ];
  
  return MOCK_NOTIFICATIONS;
};

// Get user bookings
export const getUserBookings = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, you would make an API call here
  // const response = await fetch('YOUR_API_URL/user/bookings');
  // const data = await response.json();
  
  // For now, return mock bookings data
  const MOCK_BOOKINGS = [
    {
      id: '1',
      serviceId: '1',
      serviceName: 'Pipe Repair',
      providerName: 'John\'s Plumbing',
      serviceImage: 'https://images.unsplash.com/photo-1606093310360-6bbf1f60cf36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
      date: '2025-05-25',
      time: '10:00 AM',
      location: '123 Main St, Lagos',
      status: 'confirmed',
      reference: 'BK102938',
      isRated: false
    },
    {
      id: '2',
      serviceId: '2',
      serviceName: 'Electrical Wiring',
      providerName: 'Bright Electricals',
      serviceImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
      date: '2025-05-28',
      time: '2:00 PM',
      location: '45 Park Avenue, Accra',
      status: 'pending',
      reference: 'BK102940',
      isRated: false
    },
    {
      id: '3',
      serviceId: '3',
      serviceName: 'Furniture Assembly',
      providerName: 'Woodworks Ltd',
      serviceImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
      date: '2025-04-15',
      time: '11:30 AM',
      location: '78 Cedar Road, Nairobi',
      status: 'completed',
      reference: 'BK102901',
      isRated: true
    },
    {
      id: '4',
      serviceId: '4',
      serviceName: 'House Cleaning',
      providerName: 'CleanPro Services',
      serviceImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
      date: '2025-03-30',
      time: '9:00 AM',
      location: '15 Beach Road, Cape Town',
      status: 'cancelled',
      reference: 'BK102899',
      isRated: false
    },
    {
      id: '5',
      serviceId: '5',
      serviceName: 'Car Repair',
      providerName: 'AutoFix Garage',
      serviceImage: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80',
      date: '2025-06-05',
      time: '3:30 PM',
      location: '92 Mechanic Street, Johannesburg',
      status: 'confirmed',
      reference: 'BK102950',
      isRated: false
    }
  ];
  
  return MOCK_BOOKINGS;
};

// Get all service categories
export const getServiceCategories = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return all categories with at least one service provider
  return Object.keys(MOCK_SERVICES).map(categoryId => {
    const services = MOCK_SERVICES[categoryId];
    if (services && services.length > 0) {
      const firstService = services[0];
      return {
        id: categoryId,
        name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
        count: services.length,
        image: firstService.image
      };
    }
    return null;
  }).filter(Boolean);
};

// Get user's current location
export const getCurrentLocation = async () => {
  // Default location (Lagos, Nigeria) to use as fallback
  const defaultLocation = {
    latitude: 9.0820,
    longitude: 8.6753,
  };
  
  try {
    // Return default location for now to avoid errors
    // In a real app, this would use the device's location services
    return defaultLocation;
  } catch (error) {
    console.warn('Error getting location:', error);
    return defaultLocation;
  }
};
