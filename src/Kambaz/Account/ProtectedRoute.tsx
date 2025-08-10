/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requireEnrollment = false,
  enrolledCourseIds,
  coursesReady = true, // NEW: wait until we know the student’s enrollments
}: {
  children: any;
  requireEnrollment?: boolean;
  enrolledCourseIds?: string[];
  coursesReady?: boolean;
}) {
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { cid } = useParams();

  if (!currentUser) return <Navigate to="/Kambaz/Account/Signin" />;

  if (requireEnrollment) {
    // Faculty: always allow
    if (currentUser.role === "FACULTY") return children;

    // Students: wait until we’ve loaded their enrolled course IDs
    if (!coursesReady) return null;

    // Then check membership
    const ids = new Set(enrolledCourseIds ?? []);
    if (cid && !ids.has(cid)) return <Navigate to="/Kambaz/Dashboard" replace />;
  }

  return children;
}
