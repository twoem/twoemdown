import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { useToast } from '../hooks/use-toast';
import { Plus, Upload, FileText, Heart, Trash2, Calendar, Eye, Users, BarChart3, Download, AlertCircle } from 'lucide-react';
import { mockDocuments, mockEulogies } from '../mock/data';

const Dashboard = () => {
  const [documents, setDocuments] = useState(mockDocuments);
  const [eulogies, setEulogies] = useState(mockEulogies);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEulogyDialogOpen, setIsEulogyDialogOpen] = useState(false);
  const { toast } = useToast();

  // Form states
  const [documentForm, setDocumentForm] = useState({
    title: '',
    file: null
  });
  
  const [eulogyForm, setEulogyForm] = useState({
    title: '',
    deceased: '',
    dateOfService: '',
    description: '',
    file: null
  });

  useEffect(() => {
    document.title = 'TWOEM | DASHBOARD';
  }, []);

  const validateFileSize = (file, maxSizeMB, fileType) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast({
        title: "File Too Large",
        description: `${fileType} file size must not exceed ${maxSizeMB}MB. Current file: ${(file.size / (1024 * 1024)).toFixed(1)}MB`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleDocumentUpload = (e) => {
    e.preventDefault();
    
    if (!documentForm.title || !documentForm.file) {
      toast({
        title: "Error",
        description: "Please fill all fields and select a file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size for documents (general limit)
    if (!validateFileSize(documentForm.file, 10, "Document")) {
      return;
    }

    const newDocument = {
      id: Date.now().toString(),
      title: documentForm.title,
      type: 'public',
      fileUrl: URL.createObjectURL(documentForm.file),
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(documentForm.file.size / (1024 * 1024)).toFixed(1)} MB`
    };

    setDocuments([...documents, newDocument]);
    setDocumentForm({ title: '', file: null });
    setIsUploadDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Document uploaded successfully",
    });
  };

  const handleEulogyUpload = (e) => {
    e.preventDefault();
    
    if (!eulogyForm.title || !eulogyForm.deceased || !eulogyForm.dateOfService || !eulogyForm.file) {
      toast({
        title: "Error",
        description: "Please fill all fields and select a PDF file",
        variant: "destructive"
      });
      return;
    }

    // Validate file type
    if (eulogyForm.file.type !== 'application/pdf') {
      toast({
        title: "Invalid File Type",
        description: "Eulogy must be a PDF file",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (13MB limit for eulogies)
    if (!validateFileSize(eulogyForm.file, 13, "Eulogy PDF")) {
      return;
    }

    const newEulogy = {
      id: Date.now().toString(),
      title: eulogyForm.title,
      deceased: eulogyForm.deceased,
      dateOfService: eulogyForm.dateOfService,
      description: eulogyForm.description || `Memorial service for ${eulogyForm.deceased}`,
      fileUrl: URL.createObjectURL(eulogyForm.file),
      uploadDate: new Date().toISOString().split('T')[0],
      size: `${(eulogyForm.file.size / (1024 * 1024)).toFixed(1)} MB`
    };

    setEulogies([...eulogies, newEulogy]);
    setEulogyForm({ title: '', deceased: '', dateOfService: '', description: '', file: null });
    setIsEulogyDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Eulogy PDF uploaded successfully",
    });
  };

  const handleDeleteDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Success",
      description: "Document deleted successfully",
    });
  };

  const handleDeleteEulogy = (id) => {
    setEulogies(eulogies.filter(eulogy => eulogy.id !== id));
    toast({
      title: "Success",
      description: "Eulogy deleted successfully",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Manage documents and eulogies for TWOEM Online Productions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Documents</p>
                  <p className="text-3xl font-bold">{documents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Eulogies</p>
                  <p className="text-3xl font-bold">{eulogies.length}</p>
                </div>
                <Heart className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Views</p>
                  <p className="text-3xl font-bold">1,234</p>
                </div>
                <Eye className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Families Served</p>
                  <p className="text-3xl font-bold">156</p>
                </div>
                <Users className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleDocumentUpload} className="space-y-4">
                <div>
                  <Label htmlFor="doc-title">Document Title</Label>
                  <Input
                    id="doc-title"
                    value={documentForm.title}
                    onChange={(e) => setDocumentForm({...documentForm, title: e.target.value})}
                    placeholder="Enter document title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="doc-file">Select File</Label>
                  <Input
                    id="doc-file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setDocumentForm({...documentForm, file: e.target.files[0]})}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Max size: 10MB</p>
                </div>
                <Button type="submit" className="w-full">
                  Upload Document
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={isEulogyDialogOpen} onOpenChange={setIsEulogyDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Upload Eulogy PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Upload New Eulogy PDF</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEulogyUpload} className="space-y-4">
                <div>
                  <Label htmlFor="eulogy-title">Eulogy Title</Label>
                  <Input
                    id="eulogy-title"
                    value={eulogyForm.title}
                    onChange={(e) => setEulogyForm({...eulogyForm, title: e.target.value})}
                    placeholder="e.g., John Doe Memorial"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="deceased">Deceased Name</Label>
                  <Input
                    id="deceased"
                    value={eulogyForm.deceased}
                    onChange={(e) => setEulogyForm({...eulogyForm, deceased: e.target.value})}
                    placeholder="Full name of the deceased"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="service-date">Date of Service</Label>
                  <Input
                    id="service-date"
                    type="date"
                    value={eulogyForm.dateOfService}
                    onChange={(e) => setEulogyForm({...eulogyForm, dateOfService: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="eulogy-description">Brief Description (Optional)</Label>
                  <Textarea
                    id="eulogy-description"
                    value={eulogyForm.description}
                    onChange={(e) => setEulogyForm({...eulogyForm, description: e.target.value})}
                    placeholder="Brief description for preview..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="eulogy-file">Select PDF File</Label>
                  <Input
                    id="eulogy-file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setEulogyForm({...eulogyForm, file: e.target.files[0]})}
                    required
                  />
                  <div className="flex items-center mt-2 text-sm text-amber-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    <span>Max size: 13MB | PDF files only</span>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Upload Eulogy PDF
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Documents Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <FileText className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Public Documents</h2>
            <Badge className="ml-3 bg-blue-100 text-blue-700">{documents.length}</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((document) => (
              <Card key={document.id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      PDF
                    </Badge>
                    <span className="text-sm text-gray-500">{document.size}</span>
                  </div>
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(document.uploadDate)}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(document.fileUrl, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteDocument(document.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Eulogies Section */}
        <section>
          <div className="flex items-center mb-6">
            <Heart className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Eulogy PDFs</h2>
            <Badge className="ml-3 bg-purple-100 text-purple-700">{eulogies.length}</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eulogies.map((eulogy) => (
              <Card key={eulogy.id} className="hover:shadow-lg transition-shadow border-0 shadow-md bg-gradient-to-br from-white to-purple-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      PDF Memorial
                    </Badge>
                    <span className="text-sm text-gray-500">{eulogy.size}</span>
                  </div>
                  <CardTitle className="text-lg">{eulogy.title}</CardTitle>
                  <p className="text-sm text-purple-600 font-medium">
                    {eulogy.deceased}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(eulogy.dateOfService)}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {eulogy.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => window.open(`/eulogy/${eulogy.id}`, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteEulogy(eulogy.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;