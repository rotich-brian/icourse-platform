import React, { useState } from 'react';
import { 
  HiSearch, 
  HiFilter,
  HiPlus,
  HiDownload,
  HiExternalLink,
  HiHeart,
  HiBookmark,
  HiShare,
  HiTag,
  HiCollection,
  HiPlay,
  HiDocument,
  HiGlobe,
  HiBookOpen
} from 'react-icons/hi';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ResourcesPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const resourcesData = {
    featured: [
      {
        id: 1,
        title: 'Complete React Development Guide',
        type: 'ebook',
        format: 'PDF',
        author: 'Tech Academy',
        price: '$29.99',
        rating: 4.8,
        downloads: 1200,
        course: 'React Development',
        tags: ['Frontend', 'React', 'JavaScript'],
        thumbnail: '/api/placeholder/240/135'
      },
      {
        id: 2,
        title: 'Database Design Fundamentals',
        type: 'video',
        format: 'MP4',
        author: 'SQL Masters',
        price: 'Free',
        rating: 4.5,
        views: 15000,
        course: 'Database Design',
        tags: ['SQL', 'Database', 'Backend'],
        thumbnail: '/api/placeholder/240/135'
      },
      {
        id: 3,
        title: 'Complete React Development Guide',
        type: 'ebook',
        format: 'PDF',
        author: 'Tech Academy',
        price: '$9.99',
        rating: 4.8,
        downloads: 1200,
        course: 'React Development',
        tags: ['Frontend', 'React', 'JavaScript'],
        thumbnail: '/api/placeholder/240/135'
      },
      {
        id: 4,
        title: 'Database Design Fundamentals',
        type: 'video',
        format: 'MP4',
        author: 'SQL Masters',
        price: 'Free',
        rating: 4.5,
        views: 15000,
        course: 'Database Design',
        tags: ['SQL', 'Database', 'Backend'],
        thumbnail: '/api/placeholder/240/135'
      }
    ],
    myUploads: [
      {
        id: 3,
        title: 'JavaScript Best Practices Cheatsheet',
        type: 'document',
        format: 'PDF',
        uploadDate: '2024-11-15',
        downloads: 350,
        course: 'JavaScript Fundamentals',
        status: 'Approved'
      }
    ],
    savedResources: [
      {
        id: 4,
        title: 'UI/UX Design Principles',
        type: 'blogpost',
        author: 'Design Weekly',
        savedDate: '2024-11-20',
        course: 'UI/UX Design'
      }
    ]
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'ebook':
        return HiBookOpen;
      case 'video':
        return HiPlay;
      case 'document':
        return HiDocument;
      case 'blogpost':
        return HiGlobe;
      default:
        return HiCollection;
    }
  };

  const AddResourceDialog = () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <HiPlus className="w-5 h-5 mr-2" />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
          <DialogDescription>
            Share your learning materials with the community
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input id="title" placeholder="Enter resource title" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="type" className="text-sm font-medium">
              Resource Type
            </label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ebook">E-Book</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="blogpost">Blog Post</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Add more form fields as needed */}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Learning Resources
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Discover and share learning materials for your courses
            </p>
          </div>
          <AddResourceDialog />
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ebook">E-Books</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="blogpost">Blog Posts</SelectItem>
              </SelectContent>
            </Select>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <HiFilter className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Resources</SheetTitle>
                </SheetHeader>
                {/* Add filter options */}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Featured Resources</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourcesData.featured.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <img 
                      src={resource.thumbnail} 
                      alt={resource.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        resource.price === 'Free' ? 'bg-green-600' : 'bg-indigo-600'
                      }`}
                    >
                      {resource.price}
                    </Badge>
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      {React.createElement(getResourceIcon(resource.type), {
                        className: "w-5 h-5 text-gray-600 mr-2"
                      })}
                      <Badge variant="outline">{resource.format}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <HiHeart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <HiBookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <HiShare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    By {resource.author}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm text-gray-600">{resource.rating}</span>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      {resource.price === 'Free' ? (
                        <>
                          <HiDownload className="w-4 h-4 mr-2" />
                          Download
                        </>
                      ) : (
                        <>
                          <HiExternalLink className="w-4 h-4 mr-2" />
                          Get Access
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Uploads */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">My Uploads</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourcesData.myUploads.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {React.createElement(getResourceIcon(resource.type), {
                      className: "w-5 h-5 text-gray-600"
                    })}
                    <Badge 
                      variant="outline" 
                      className="text-green-600"
                    >
                      {resource.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Uploaded on {resource.uploadDate}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      {resource.downloads} downloads
                    </span>
                    <Button variant="outline">
                      Manage Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Saved Resources */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Saved Resources</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourcesData.savedResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {React.createElement(getResourceIcon(resource.type), {
                      className: "w-5 h-5 text-gray-600 mr-2"
                    })}
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    By {resource.author}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Saved on {resource.savedDate}
                    </span>
                    <Button variant="outline">
                      View Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;