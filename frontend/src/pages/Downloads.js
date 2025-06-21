import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { Download, FileText, Heart, Calendar, Eye, Sparkles } from 'lucide-react';
import { mockDocuments, mockEulogies } from '../mock/data';

const Downloads = () => {
  const [documents] = useState(mockDocuments);
  const [eulogies] = useState(mockEulogies);

  useEffect(() => {
    document.title = 'TWOEM | DOWNLOADS';
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = (document) => {
    // Mock download functionality
    const link = document.createElement('a');
    link.href = '#';
    link.download = document.title + '.pdf';
    link.click();
    
    // In real implementation, this would trigger actual file download
    alert(`Downloading: ${document.title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Downloads
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access our collection of public documents and beautifully presented eulogies
          </p>
        </div>

        {/* Public Documents Section */}
        <section className="mb-20">
          <div className="flex items-center mb-8">
            <FileText className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Public Documents</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <Card key={document.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 font-medium">
                      PDF Document
                    </Badge>
                    <span className="text-sm text-gray-500">{document.size}</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {document.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(document.uploadDate)}
                  </div>
                  
                  <Button
                    onClick={() => handleDownload(document)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Eulogies Section */}
        <section>
          <div className="flex items-center mb-8">
            <Heart className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Eulogies</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eulogies.map((eulogy) => (
              <Card key={eulogy.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50 overflow-hidden relative">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 transform translate-x-6 -translate-y-6"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-4 translate-y-4"></div>
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 font-medium">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Memorial
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(eulogy.dateOfService)}
                    </div>
                  </div>
                  <CardTitle className="text-lg text-gray-900 group-hover:text-purple-600 transition-colors">
                    {eulogy.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 font-medium">
                    In loving memory of {eulogy.deceased}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0 relative z-10">
                  <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                    {eulogy.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <FileText className="w-3 h-3 mr-1" />
                    PDF • {eulogy.size}
                  </div>
                  
                  <Link to={`/eulogy/${eulogy.id}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                      <Eye className="w-4 h-4 mr-2" />
                      View Eulogy PDF
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Empty State for Admin */}
        <div className="mt-20 text-center p-12 bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Need to Add Documents?
            </h3>
            <p className="text-gray-600 mb-6">
              Admin users can manage documents through the dashboard
            </p>
            <Link to="/login">
              <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;