import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiArrowLeft, HiDownload, HiPlay, HiClock, HiAcademicCap } from 'react-icons/hi';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CourseDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course, type } = location.state || {};

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <p className="text-center text-gray-600">Course not found</p>
            <Button 
              className="w-full mt-4"
              onClick={() => navigate('/dashboard/courses')}
            >
              <HiArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderCourseContent = () => {
    switch (type) {
      case 'finished':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Grade Achieved</span>
                  <Badge className="text-lg">{course.grade}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completion Date</span>
                  <span>{course.completionDate}</span>
                </div>
                <Button className="w-full">
                  <HiDownload className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'enrolled':
      case 'continuing':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={course.progress} />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{course.progress}% Complete</span>
                  <span>Last accessed: {course.lastAccessed}</span>
                </div>
                <Button className="w-full">
                  <HiPlay className="mr-2 h-4 w-4" />
                  Resume Course
                </Button>
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
                  <span>{course.applicationDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-yellow-500">{course.status}</Badge>
                </div>
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
          onClick={() => navigate('/dashboard/courses')}
        >
          <HiArrowLeft className="mr-2 h-4 w-4" />
          Back to Courses
        </Button>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h1>
                  <p className="text-gray-600">
                    Instructor: {course.instructor}
                  </p>
                </div>
                <Badge className="mt-2 md:mt-0">
                  {course.category}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <HiClock className="mr-2 h-5 w-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <HiAcademicCap className="mr-2 h-5 w-5" />
                  <span>{course.status || (type === 'finished' ? 'Completed' : '')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {renderCourseContent()}
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;