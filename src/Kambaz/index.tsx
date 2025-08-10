/* eslint-disable @typescript-eslint/no-explicit-any */
import Account from "./Account";
import { Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";
import Dashboard from "./Dashboard.tsx";
import KambazNavigation from "./Navigation.tsx";
import Courses from "./Courses";
import "./style.css";
import ProtectedRoute from "./Account/ProtectedRoute.tsx";
import Session from "./Account/session.tsx";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./enrollmentClient.ts";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [coursesReady, setCoursesReady] = useState<boolean>(false); // UPDATED
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const defaultCourse = {
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  };
  const [course, setCourse] = useState<any>(defaultCourse);

  const fetchCourses = async () => {
    try {
      const mine = await userClient.findMyCourses();
      setCourses(mine);
    } catch (error) {
      console.error(error);
      setCourses([]); // UPDATED (fallback so UI still works)
    } finally {
      setCoursesReady(true); // UPDATED
    }
  };

  const fetchAllCourses = async () => {
    try {
      const allAvailableCourses = await courseClient.fetchAllCourses();
      setAllCourses(allAvailableCourses);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // UPDATED: only fetch "my courses" after user is known
    if (currentUser) {
      setCoursesReady(false); // UPDATED
      fetchCourses();         // requires session cookie
    } else {
      setCourses([]);         // UPDATED (clear on logout)
      setCoursesReady(true);  // UPDATED (nothing to wait for)
    }
    fetchAllCourses();        // public; can run anytime
  }, [currentUser]);

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
    setAllCourses([...allCourses, newCourse]);
    setCourse(defaultCourse);
  };

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((c) => c._id !== courseId));
    setAllCourses(allCourses.filter((c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    setAllCourses(allCourses.map((c) => (c._id === course._id ? course : c)));
  };

  const enroll = async (courseId: string) => {
    await enrollmentClient.enrollInCourse({ userId: currentUser._id, courseId });
    const found = allCourses.find((c: any) => c._id === courseId);
    if (found) setCourses([...courses, found]);
  };

  const unEnroll = async (courseId: string) => {
    await enrollmentClient.unEnrollInCourse({ userId: currentUser._id, courseId });
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    allCourses={allCourses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enroll={enroll}
                    unEnroll={unEnroll}
                  />
                </ProtectedRoute>
              }
            />
            {/* UPDATED: re-guard Courses and pass enrolled IDs + readiness */}
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute
                  requireEnrollment
                  enrolledCourseIds={courses.map((c: any) => c._id)} // UPDATED
                  coursesReady={coursesReady}                        // UPDATED
                >
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
