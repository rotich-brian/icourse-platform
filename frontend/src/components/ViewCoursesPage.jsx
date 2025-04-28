import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

const ViewCoursesPage = () => {
  const [filter, setFilter] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'frontend', label: 'Front-End' },
    { value: 'backend', label: 'Back-End' },
    { value: 'cybersecurity', label: 'Cyber Security' },
    { value: 'dataanalytics', label: 'Data Analytics' },
  ];

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Using fetch
        fetch('http://localhost:3000/courses')
            .then((response) => response.json())
            .then((data) => {
                setCourses(data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Failed to fetch courses');
                setLoading(false);
            });

        // Alternatively, you can use axios
        /*
        axios.get('http://localhost:3000/courses')
            .then(response => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch courses');
                setLoading(false);
            });
        */
    }, []);

    console.log(courses)

    if (loading) {
        return <div className="min-h-screen bg-gray-50"><LoadingSpinner /></div>;
    }

    if (error) {
        return <div>{error}</div>;
    }



  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">

        <div className='mx-auto max-w-7xl lg:px-8'>
            {/* Hero Section with refined title */}
            <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-semibold text-gray-900">
                Available Courses
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Explore our comprehensive collection of courses designed to help you master new skills and advance your career.
            </p>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                type="text"
                placeholder="Search courses..."
                className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
            </div>
            <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full sm:w-[240px]">
                <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                    {category.label}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            </div>

            {/* Course Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden">
                <div className="relative">
                    <img
                    src={course.image}
                    alt={course.title}
                    className="h-48 w-full object-cover"
                    />
                    {course.discount && (
                    <Badge className="absolute right-2 top-2 bg-indigo-600">
                        {course.discount}% OFF
                    </Badge>
                    )}
                </div>
                <CardContent className="p-4">
                    <div className="mb-2 text-sm font-medium text-indigo-600">
                    {course.type || course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    {course.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        Ksh {course.price}
                    </span>
                    {course.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                        Ksh {course.originalPrice}
                        </span>
                    )}
                    </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 p-4">
                  <Link to="/login">
                      {course.status === 'apply' && (
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                          Apply Now
                      </Button>
                      )}
                      {course.status === 'enroll' && (
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                          Enrol Now
                      </Button>
                      )}
                      {course.status === 'coming' && (
                      <Button variant="secondary" className="w-full" disabled>
                          Coming Soon
                      </Button>
                      )}
                    </Link>
                </CardFooter>
                </Card>
            ))}
            </div>

        </div>

      </div>
    </div>
  );
};

const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              className="h-12 w-12 text-indigo-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-700">
            Loading Courses...
          </p>
        </div>
      </div>
    );
  };
  

export default ViewCoursesPage;