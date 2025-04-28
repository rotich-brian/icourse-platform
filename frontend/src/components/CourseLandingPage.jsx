import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Menu, X, Star, Quote } from 'lucide-react';
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

const CourseLandingPage = () => {
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
  }, []);

  if (loading) {
    return <div><LoadingSpinner /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation (Same as before) */}
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">iCourse</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Courses</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
              <Link to="/login">
                <Button variant="outline" className="mr-2">Sign In</Button>
              </Link>
              <Link to="/new">
                <Button className="bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation (Same as before) */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-4 pb-3 pt-2">
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Courses</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-gray-900">Contact</a>
              <div className="mt-4 space-y-2">
                <Link to="/login">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/new">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transform Your Future with <br />Online Learning
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              Learn from industry experts, gain practical skills, and advance your career with our comprehensive online courses.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link to="/courses">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                  Explore Courses
                </Button>
              </Link>
              <Link to="/new">
                <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/20">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section - Updated */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our top-rated courses handpicked for your learning journey
            </p>
          </div>

          {/* Grid Layout for Courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((course) => (
              <Card key={course.id} className="w-full overflow-hidden">
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

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-gray-900">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Hear from learners who have transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Developer",
                quote: "The courses here are incredibly comprehensive and practical. I landed my dream job after completing the Front-End Development program.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "Data Analyst",
                quote: "The Data Analytics course gave me the skills and confidence to transition into a completely new career field.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Cybersecurity Specialist",
                quote: "Hands-on learning and expert instructors made my learning experience exceptional. Highly recommended!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-6 rounded-lg shadow-md relative"
              >
                <Quote className="absolute top-4 left-4 text-indigo-200 w-10 h-10" />
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section (Original) */}
      <div className="mt-16 bg-indigo-600 px-6 py-16 text-center rounded-md">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mb-8 text-lg text-indigo-100">
            Join thousands of students who have already taken the first step towards their dream career.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
              Browse All Courses
            </Button>
            <Link to="/new">
              <Button variant="outline" className="bg-neutral-800 text-white border-white hover:bg-neutral-300">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer (Original) */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <span className="text-xl font-bold text-indigo-600">iCourse</span>
              <p className="mt-4 text-sm text-gray-600">
                Empowering careers through quality education and practical skills.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Support</h3>
              <ul className="mt-4 space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Connect</h3>
              <ul className="mt-4 space-y-4 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-900">LinkedIn</a></li>
                <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-600">
              © 2024 iCourse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
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

export default CourseLandingPage;