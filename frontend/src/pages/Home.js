import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, FileText, Users, MapPin, Mail, Phone, Shield, Clock, Star } from 'lucide-react';
import { contactInfo } from '../mock/data';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg'
  ];

  useEffect(() => {
    document.title = 'TWOEM | HOME';
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: 'Document Management',
      description: 'Secure and organized document storage with easy access for your important files.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Eulogy Services',
      description: 'Beautiful digital presentation of eulogies with elegant design and respectful display.'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Secure Access',
      description: 'Protected admin access ensuring your documents are safe and confidential.'
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: '24/7 Availability',
      description: 'Access your documents and services anytime, anywhere with our online platform.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 transition-opacity duration-1000">
          <img
            src={heroImages[currentImageIndex]}
            alt="TWOEM Productions"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            TWOEM
            <span className="block text-4xl md:text-5xl font-light mt-2 text-blue-200">
              ONLINE PRODUCTIONS
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed animate-fade-in-up animation-delay-300">
            Professional document management and digital eulogy services
            <br />
            <span className="text-lg">Preserving memories, organizing documents with dignity and care</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-600">
            <Link to="/downloads">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Download className="w-5 h-5 mr-2" />
                Browse Downloads
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="#contact">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg shadow-2xl backdrop-blur-sm transition-all duration-300 transform hover:scale-105">
                Contact Us
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-slide-down"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive digital solutions for document management and memorial services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg hover:shadow-blue-500/10">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="mb-4">
                <Star className="w-12 h-12 mx-auto mb-2 text-yellow-300 group-hover:animate-pulse" />
                <div className="text-4xl font-bold mb-2">500+</div>
                <p className="text-blue-100">Documents Managed</p>
              </div>
            </div>
            <div className="group">
              <div className="mb-4">
                <Users className="w-12 h-12 mx-auto mb-2 text-green-300 group-hover:animate-pulse" />
                <div className="text-4xl font-bold mb-2">200+</div>
                <p className="text-blue-100">Families Served</p>
              </div>
            </div>
            <div className="group">
              <div className="mb-4">
                <Shield className="w-12 h-12 mx-auto mb-2 text-purple-300 group-hover:animate-pulse" />
                <div className="text-4xl font-bold mb-2">100%</div>
                <p className="text-blue-100">Secure & Private</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-gray-600">
              Get in touch with our professional team
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600 leading-relaxed">{contactInfo.location}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-green-600 hover:text-green-700 font-medium">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone / WhatsApp</h3>
                  <a href={`tel:${contactInfo.phone}`} className="text-purple-600 hover:text-purple-700 font-medium">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/955402/pexels-photo-955402.jpeg"
                alt="Professional Service"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold">TWOEM ONLINE PRODUCTIONS</span>
          </div>
          <p className="text-gray-400 mb-6">
            Professional document management and digital eulogy services
          </p>
          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              © 2024 TWOEM Online Productions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;