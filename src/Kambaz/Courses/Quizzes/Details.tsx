// src/Kambaz/Courses/Quizzes/Details.tsx
import { useEffect, useState } from "react";
import {  useParams, Link } from "react-router-dom";
import { getQuiz, setPublish } from "./client";
//import useNavigate from "react-router-dom";

export default function QuizDetails() {
  const { qid } = useParams();   // quizId from /quizzes/:qid
  //const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);

  const load = async () => {
    if (!qid) return;
    const data = await getQuiz(qid);
    setQuiz(data);
  };

  useEffect(() => { load(); }, [qid]);

  if (!quiz) return <div className="p-3">Loading…</div>;

  const d = quiz.details || {};
  const dates = d.dates || {};

  

  const onTogglePublish = async () => {
    await setPublish(quiz.quizId, !quiz.published);
    await load();
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 m-0">{d.title || "Untitled Quiz"}</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={onTogglePublish}>
            {quiz.published ? "Unpublish" : "Publish"}
          </button>
          <Link to={`/Kambaz/quizzes/${quiz.quizId}/preview`} className="btn btn-outline-primary">Preview</Link>
         <Link to={`/Kambaz/quizzes/${quiz.quizId}/edit`} className="btn btn-primary">Edit</Link>
        </div>
      </div>

      <div className="card p-3">
        <div className="row">
          <div className="col-6 small">
            <div><b>Quiz Type:</b> {d.quizType}</div>
            <div><b>Points:</b> {d.points ?? 0}</div>
            <div><b>Assignment Group:</b> {d.assignmentGroup}</div>
            <div><b>Shuffle Answers:</b> {d.shuffleAnswers ? "Yes" : "No"}</div>
            <div><b>Time Limit:</b> {d.timeLimit} Minutes</div>
            <div><b>Multiple Attempts:</b> {d.multipleAttempts ? "Yes" : "No"}</div>
            {d.multipleAttempts && <div><b>How Many Attempts:</b> {d.maxAttempts}</div>}
            <div><b>Show Correct Answers:</b> {d.showCorrectAnswers ? "Yes" : "No"}</div>
            <div><b>Access Code:</b> {d.accessCode || "—"}</div>
          </div>
          <div className="col-6 small">
            <div><b>One Question at a Time:</b> {d.oneQuestionAtATime ? "Yes" : "No"}</div>
            <div><b>Webcam Required:</b> {d.webcamRequired ? "Yes" : "No"}</div>
            <div><b>Lock After Answering:</b> {d.lockAfterAnswering ? "Yes" : "No"}</div>
            <div><b>Due date:</b> {dates?.dueDate ? new Date(dates.dueDate).toLocaleString() : "—"}</div>
            <div><b>Available from:</b> {dates?.availableFrom ? new Date(dates.availableFrom).toLocaleString() : "—"}</div>
            <div><b>Until:</b> {dates?.availableUntil ? new Date(dates.availableUntil).toLocaleString() : "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
