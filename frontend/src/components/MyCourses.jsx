import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiAcademicCap,
  HiClock,
  HiCheckCircle,
  HiPlay,
  HiPause,
  HiMenu,
  HiSearch,
  HiBookOpen
} from 'react-icons/hi';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useOutletContext } from 'react-router-dom';

const MyCoursesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('enrolled');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { userData, loading, error } = useOutletContext();
  const coursesData = userData.courses;

  const handleCourseClick = (course, type) => {
    navigate(`details/${course.title}`, {
      state: { course, type }
    });
  };
  const handleBrowseClick = () => {
    navigate('browse');
  };

  const EmptyState = ({ type }) => {
    const emptyStateContent = {
      enrolled: {
        icon: HiBookOpen,
        title: "No Enrolled Courses",
        description: "Start your learning journey by browsing our available courses",
        buttonText: "Browse Courses"
      },
      applied: {
        icon: HiSearch,
        title: "No Course Applications",
        description: "Explore and apply for courses that match your interests",
        buttonText: "Discover Courses"
      },
      continuing: {
        icon: HiPlay,
        title: "No Courses in Progress",
        description: "Continue your education by enrolling in our courses",
        buttonText: "Find Courses"
      },
      finished: {
        icon: HiCheckCircle,
        title: "No Completed Courses",
        description: "Complete courses to earn certificates and track your progress",
        buttonText: "Start Learning"
      }
    };

    const content = emptyStateContent[type];
    const Icon = content.icon;

    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="rounded-full bg-indigo-100 p-4 mb-4">
            <Icon className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {content.title}
          </h3>
          <p className="text-sm text-gray-600 text-center mb-6 max-w-sm">
            {content.description}
          </p>
          <Button className="flex items-center gap-2">
            <HiSearch className="h-4 w-4" />
            {content.buttonText}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const MobileTabNavigation = () => (
    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <HiMenu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[400px] rounded-t-2xl">
        <SheetHeader className="mb-4">
          <SheetTitle>Course Categories</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4">
          {['enrolled', 'applied', 'continuing', 'finished'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'default' : 'outline'}
              onClick={() => {
                setActiveTab(tab);
                setIsMobileMenuOpen(false);
              }}
              className="w-full capitalize"
            >
              {tab}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );

  const CourseCard = ({ course, type }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
            <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
          </div>
          <Badge className={`
            ${type === 'enrolled' || type === 'continuing' ? 'bg-indigo-600' : 
              type === 'applied' ? 'bg-yellow-500' : 
              'bg-green-600'} text-white
          `}>
            {course.status || (type === 'finished' ? 'Completed' : '')}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center text-gray-600">
              <HiClock className="mr-2" />
              {course.duration}
            </span>
            <Badge variant="outline">{course.category}</Badge>
          </div>

          {(type === 'enrolled' || type === 'continuing') && (
            <div className="space-y-2">
              <Progress value={course.progress} />
              <div className="flex justify-between text-sm text-gray-600">
                <span>{course.progress}% Complete</span>
                <span>Last accessed: {course.lastAccessed}</span>
              </div>
            </div>
          )}

          {type === 'applied' && (
            <p className="text-sm text-gray-600">
              Application Date: {course.applicationDate}
            </p>
          )}

          {type === 'finished' && (
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Completed: {course.completionDate}</span>
              <span className="flex items-center">
                Grade: {course.grade}
                {course.certificate && (
                  <HiCheckCircle className="ml-2 text-green-600" />
                )}
              </span>
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              className="flex-1" 
              variant={type === 'finished' ? 'outline' : 'default'}
              onClick={() => handleCourseClick(course, type)}
            >
              {type === 'enrolled' || type === 'continuing' ? (
                <>
                  <HiPlay className="mr-2" />
                  Continue
                </>
              ) : type === 'applied' ? (
                'View Application'
              ) : (
                'View Certificate'
              )}
            </Button>
            {(type === 'enrolled' || type === 'continuing') && (
              <Button variant="outline">
                <HiPause className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const BrowseCoursesButton = () => (
    <Button 
      size="lg"
      className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      onClick={handleBrowseClick}
    >
      <HiSearch className="h-5 w-5" />
      Browse Courses
    </Button>
  );

  const MobileBrowseButton = () => (
    <Button 
      size="sm"
      className="sm:hidden flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-800"
    >
      <HiSearch className="h-4 w-4" />
      Browse
    </Button>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              My Courses
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage and track your learning progress
            </p>
          </div>
          <div className="flex items-center gap-4">
            <BrowseCoursesButton />
            <MobileBrowseButton />
            <MobileTabNavigation />
          </div>
        </div>

        <div className="hidden sm:block">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="enrolled">Enrolled ({coursesData.enrolled.length})</TabsTrigger>
              <TabsTrigger value="applied">Applied ({coursesData.applied.length})</TabsTrigger>
              <TabsTrigger value="continuing">Continuing ({coursesData.continuing.length})</TabsTrigger>
              <TabsTrigger value="finished">Finished ({coursesData.finished.length})</TabsTrigger>
            </TabsList>

            {Object.entries(coursesData).map(([type, courses]) => (
              <TabsContent key={type} value={type}>
                {courses.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map(course => (
                      <CourseCard key={course.id} course={course} type={type} />
                    ))}
                  </div>
                ) : (
                  <EmptyState type={type} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="sm:hidden">
          {coursesData[activeTab].length > 0 ? (
            <div className="grid gap-4">
              {coursesData[activeTab].map(course => (
                <CourseCard key={course.id} course={course} type={activeTab} />
              ))}
            </div>
          ) : (
            <EmptyState type={activeTab} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;