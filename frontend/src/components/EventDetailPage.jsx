import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  HiArrowLeft, 
  HiDownload, 
  HiCalendar, 
  HiClock,
  HiLocationMarker,
  HiUser,
  HiTag,
  HiCurrencyDollar
} from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EventDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, type } = location.state || {};

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-gray-600">Event not found</p>
            <Button 
              className="w-full mt-4"
              onClick={() => navigate('/dashboard/events')}
            >
              <HiArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderEventContent = () => {
    switch (type) {
      case 'past':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Completion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Rating Given</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="text-gray-900">{event.rating}/5.0</span>
                  </div>
                </div>
                {event.certificate && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Certificate Status</span>
                      <Badge className="bg-green-600">Certificate Earned</Badge>
                    </div>
                    <Button className="w-full">
                      <HiDownload className="mr-2 h-4 w-4" />
                      Download Certificate
                    </Button>
                  </>
                )}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Your Feedback</h4>
                  <p className="text-gray-600">
                    {event.feedback || "No feedback provided"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'applied':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Application Date</span>
                  <span>{event.applicationDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-yellow-500">{event.status}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Payment Status</span>
                  <Badge variant="outline" className="text-green-600">
                    {event.paymentStatus || 'Pending'}
                  </Badge>
                </div>
                {event.status === 'Approved' && (
                  <Button className="w-full">
                    Complete Registration
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'available':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registration Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Available Spots</span>
                  <span className="font-medium">{event.spots}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Registration Deadline</span>
                  <span>{event.deadline || 'Open'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Prerequisites</span>
                  <span>{event.prerequisites || 'None'}</span>
                </div>
                <Button className="w-full">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/dashboard/events')}
        >
          <HiArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <HiUser className="mr-2 h-4 w-4" />
                    <span>{event.speaker}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-col gap-2">
                  <Badge className="bg-indigo-600">
                    {event.category}
                  </Badge>
                  <Badge variant="outline" className="text-green-600">
                    {event.price}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <HiCalendar className="mr-2 h-5 w-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiClock className="mr-2 h-5 w-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiLocationMarker className="mr-2 h-5 w-5" />
                  <span>{event.location}</span>
                </div>
              </div>

              {event.tags && (
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {renderEventContent()}

          <Card>
            <CardHeader>
              <CardTitle>Event Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {event.description || 'No description available'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;