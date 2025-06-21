import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Heart, Calendar, FileText, Download, AlertCircle } from 'lucide-react';
import { mockEulogies } from '../mock/data';

const EulogyViewer = () => {
  const { id } = useParams();
  const [eulogy, setEulogy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    // Find the eulogy by ID
    const foundEulogy = mockEulogies.find(e => e.id === id);
    
    if (foundEulogy) {
      document.title = `${foundEulogy.title} - TWOEM`;
      
      // Loading animation
      const loadingMessages = [
        `Hello, eulogy for ${foundEulogy.deceased} is loading`,
        'Kindly wait...',
        'Preparing memorial PDF...',
        'Almost ready...',
        'Loading complete'
      ];
      
      let messageIndex = 0;
      const interval = setInterval(() => {
        if (messageIndex < loadingMessages.length - 1) {
          setLoadingText(loadingMessages[messageIndex]);
          messageIndex++;
        } else {
          clearInterval(interval);
          setEulogy(foundEulogy);
          setIsLoading(false);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center text-white max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-300 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
              <Heart className="w-8 h-8 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-4 animate-fade-in">
            {loadingText}
          </h2>
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!eulogy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Eulogy Not Found</h1>
          <p className="text-gray-600 mb-8">The requested eulogy could not be found.</p>
          <Link to="/downloads">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Downloads
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/downloads">
            <Button variant="outline" className="hover:bg-purple-50 border-purple-200 text-purple-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Downloads
            </Button>
          </Link>
        </div>

        {/* Eulogy Content */}
        <Card className="shadow-2xl border-0 bg-white relative overflow-hidden">
          {/* Decorative Header */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
            
            {/* Floating Elements */}
            <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
            <div className="absolute top-8 left-8 w-8 h-8 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-4 right-12 w-4 h-4 bg-white/30 rounded-full"></div>
          </div>

          <CardContent className="relative -mt-8 z-10">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-purple-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {eulogy.title}
                </h1>
                <p className="text-xl text-purple-600 font-semibold mb-2">
                  In loving memory of {eulogy.deceased}
                </p>
                <div className="flex items-center justify-center text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(eulogy.dateOfService)}
                </div>
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <FileText className="w-4 h-4 mr-1" />
                  PDF Document • {eulogy.size}
                </div>
              </div>
            </div>

            {/* PDF Viewer Container */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-inner border border-purple-100">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Memorial PDF Document</h3>
                <p className="text-gray-600">{eulogy.description}</p>
              </div>
              
              {/* PDF Display Area */}
              <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-purple-200 min-h-[600px] flex flex-col items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-purple-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">
                    Eulogy PDF Document
                  </h4>
                  <p className="text-gray-600 mb-6 max-w-md">
                    This eulogy document is displayed in a fixed, non-downloadable format to preserve the sacred nature of the memorial content.
                  </p>
                  
                  {/* Mock PDF Viewer */}
                  <div className="bg-gray-100 rounded-lg p-8 max-w-2xl mx-auto shadow-inner">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 w-4/5"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-3 w-4/5"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <div className="flex items-center justify-center text-amber-700">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">
                        This document is protected and non-downloadable as requested
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-8 h-0.5 bg-purple-300 mr-2"></div>
                  <Heart className="w-6 h-6 text-purple-500" />
                  <div className="w-8 h-0.5 bg-purple-300 ml-2"></div>
                </div>
                <p className="text-gray-600 italic">
                  "Forever in our hearts, always in our memories"
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  TWOEM Online Productions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EulogyViewer;