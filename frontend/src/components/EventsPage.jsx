import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiCalendar, 
  HiFilter,
  HiClock,
  HiLocationMarker,
  HiCurrencyDollar,
  HiUser,
  HiTag,
  HiSearch
} from 'react-icons/hi';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useOutletContext } from 'react-router-dom';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('available');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  const { userData, loading, error } = useOutletContext();

  // Sample data
  const eventsData = {
    availableEvents: [
      {
        id: 1,
        title: 'React Development Workshop',
        date: '2024-12-05',
        time: '10:00 AM - 2:00 PM',
        location: 'Virtual',
        category: 'Workshop',
        price: 'Free',
        speaker: 'Sarah Mitchell',
        spots: '45/100',
        tags: ['Frontend', 'React', 'Beginner Friendly'],
        description: 'A comprehensive workshop covering React fundamentals and advanced concepts.',
        deadline: '2024-12-01',
        prerequisites: 'Basic JavaScript knowledge'
      },
      {
        id: 2,
        title: 'Web Security Conference',
        date: '2024-12-15',
        time: '9:00 AM - 6:00 PM',
        location: 'Tech Hub, New York',
        category: 'Conference',
        price: '$199',
        speaker: 'John Smith',
        spots: '85/200',
        tags: ['Security', 'Advanced'],
        description: 'Explore the latest trends and best practices in web security.',
        deadline: '2024-12-10',
        prerequisites: 'Security fundamentals'
      },
      {
        id: 3,
        title: 'Database Design Masterclass',
        date: '2024-12-20',
        time: '3:00 PM - 6:00 PM',
        location: 'Virtual',
        category: 'Masterclass',
        price: '$49',
        speaker: 'Maria Garcia',
        spots: '25/50',
        tags: ['Database', 'SQL', 'Intermediate'],
        description: 'Master the art of database design and optimization.',
        deadline: '2024-12-18',
        prerequisites: 'Basic SQL knowledge'
      }
    ],
    appliedEvents: userData.appliedEvents,
    pastEvents: userData.pastEvents
  };

  const handleNavigateToDetails = (event, type) => {
    navigate(`/dashboard/events/details/${event.title}`, {
      state: { event, type }
    });
  };

  const handleApplyNow = (event) => {
    // In a real application, you might want to show a confirmation dialog
    // or handle the application process before navigation
    handleNavigateToDetails(event, 'available');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Learning Events
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Discover workshops, conferences, and learning opportunities
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 bg-indigo-600 hover:bg-indigo-700">
            Browse All Events
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search events..." 
                className="pl-10"
              />
            </div>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <HiFilter className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Events</SheetTitle>
                </SheetHeader>
                {/* Add filter options here */}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="available">Available Events</TabsTrigger>
            <TabsTrigger value="applied">Applied Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="available">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventsData.availableEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleNavigateToDetails(event, 'available')}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-indigo-600">{event.category}</Badge>
                      <Badge variant="outline" className="text-green-600">
                        {event.price}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {event.title}
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <HiCalendar className="w-4 h-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <HiClock className="w-4 h-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <HiLocationMarker className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <HiUser className="w-4 h-4 mr-2" />
                        {event.speaker}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-600">
                        Spots: {event.spots}
                      </span>
                      <Button 
                        className="bg-indigo-600 hover:bg-indigo-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyNow(event);
                        }}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applied">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventsData.appliedEvents.length > 0 ? eventsData.appliedEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleNavigateToDetails(event, 'applied')}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-indigo-600">{event.category}</Badge>
                      <Badge variant="outline" className="text-yellow-600">
                        {event.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <HiCalendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigateToDetails(event, 'applied');
                      }}
                    >
                      View Application
                    </Button>
                  </CardContent>
                </Card>
              )) : <div>No events applied</div>}
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {eventsData.pastEvents.length > 0 ? eventsData.pastEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleNavigateToDetails(event, 'past')}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge className="bg-gray-600">{event.category}</Badge>
                      {event.certificate && (
                        <Badge variant="outline" className="text-green-600">
                          Certificate Earned
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <HiCalendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm text-gray-600">{event.rating}/5.0</span>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavigateToDetails(event, 'past');
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )) : <div>No events attended</div>}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EventsPage;