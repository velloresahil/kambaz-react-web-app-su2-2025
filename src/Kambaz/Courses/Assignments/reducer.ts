import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { assignments } from "../../Database"; 

const initialState = {
  assignments: assignments, 
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: uuidv4(),
        title: assignment.title,
        description: assignment.description || "No description provided.",
        points: assignment.points || 100,
        due: assignment.due || "",
        availableFrom: assignment.availableFrom || "",
        availableUntil: assignment.availableUntil || "",
        course: assignment.course,
      };
      state.assignments.push(newAssignment);
    },

    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === updatedAssignment._id ? updatedAssignment : a
      );
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;