/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getQuiz,
  updateQuiz,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} from "./client";

type Question = {
  questionId: string;
  questionType: "multiple-choice" | "true-false" | "fill-in-blank" | string;
  questionTitle: string;
  questionDescription: string;
  points: number;
  possibleAnswers?: string[];
  correctAnswers?: string | string[];
};

export default function QuizEditor() {
  const { qid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any | null>(null);
  const [tab, setTab] = useState<"details" | "questions">("details");

  // local form state for details
  const [form, setForm] = useState<any>({
    title: "",
    description: "",
    points: 0,
    quizType: "Graded Quiz",
    assignmentGroup: "Quizzes",
    shuffleAnswers: false,
    timeLimit: 20,
    multipleAttempts: false,
    maxAttempts: 1,
    showCorrectAnswers: true,
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockAfterAnswering: false,
    dates: { availableFrom: "", availableUntil: "", dueDate: "" },
  });

  const load = async () => {
    if (!qid) return;
    const data = await getQuiz(qid);
    setQuiz(data);
    const d = data?.details || {};
    setForm({
      title: d.title || "",
      description: d.description || "",
      points: d.points ?? 0,
      quizType: d.quizType || "Graded Quiz",
      assignmentGroup: d.assignmentGroup || "Quizzes",
      shuffleAnswers: !!d.shuffleAnswers,
      timeLimit: d.timeLimit ?? 20,
      multipleAttempts: !!d.multipleAttempts,
      maxAttempts: d.maxAttempts ?? 1,
      showCorrectAnswers: !!d.showCorrectAnswers,
      accessCode: d.accessCode || "",
      oneQuestionAtATime: d.oneQuestionAtATime ?? true,
      webcamRequired: !!d.webcamRequired,
      lockAfterAnswering: !!d.lockAfterAnswering,
      dates: {
        availableFrom: d.dates?.availableFrom || "",
        availableUntil: d.dates?.availableUntil || "",
        dueDate: d.dates?.dueDate || "",
      },
    });
  };

  useEffect(() => { load(); }, [qid]);

  // ---- QUESTIONS (no hook) ----
  const questions: Question[] = (quiz?.questions ?? []) as Question[];

  if (!quiz) return <div className="p-3">Loading…</div>;

  const onSaveDetails = async () => {
    if (!qid) return;
    await updateQuiz(qid, form);
    navigate(`/quizzes/${qid}`);   // <- no /Kambaz prefix
  };

  const createBlankQuestion = (): Question => ({
    questionId: "",
    questionType: "multiple-choice",
    questionTitle: "New question",
    questionDescription: "",
    points: 1,
    possibleAnswers: ["Option A", "Option B"],
    correctAnswers: "Option A",
  });

  const onAddQuestion = async () => {
    if (!qid) return;
    const q = createBlankQuestion();
    const newQ = await addQuestion(qid, q);
    await load();
    setTimeout(
      () =>
        document
          .getElementById(newQ.questionId)
          ?.scrollIntoView({ behavior: "smooth" }),
      0
    );
  };

  const onUpdateQuestion = async (q: Question) => {
    if (!qid || !q.questionId) return;
    await updateQuestion(qid, q.questionId, q);
    await load();
  };

  const onDeleteQuestion = async (questionId: string) => {
    if (!qid) return;
    await deleteQuestion(qid, questionId);
    await load();
  };

  const setField = (key: string, value: any) => setForm({ ...form, [key]: value });
  const setDate = (key: "availableFrom" | "availableUntil" | "dueDate", value: string) =>
    setForm({ ...form, dates: { ...form.dates, [key]: value } });

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 m-0">Edit Quiz</h2>
        <div className="d-flex gap-2">
          <Link to={`/quizzes/${qid}`} className="btn btn-secondary">Cancel</Link>
          <button className="btn btn-primary" onClick={onSaveDetails}>Save</button>
        </div>
      </div>

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "details" ? "active" : ""}`}
            onClick={() => setTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${tab === "questions" ? "active" : ""}`}
            onClick={() => setTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>

      {tab === "details" && (
        <div className="card p-3">
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={4}
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>

          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Quiz Type</label>
              <select
                className="form-select"
                value={form.quizType}
                onChange={(e) => setField("quizType", e.target.value)}
              >
                <option>Graded Quiz</option>
                <option>Practice Quiz</option>
                <option>Graded Survey</option>
                <option>Ungraded Survey</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Assignment Group</label>
              <select
                className="form-select"
                value={form.assignmentGroup}
                onChange={(e) => setField("assignmentGroup", e.target.value)}
              >
                <option>Quizzes</option>
                <option>Exams</option>
                <option>Assignments</option>
                <option>Project</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Points</label>
              <input
                type="number"
                className="form-control"
                value={form.points}
                onChange={(e) => setField("points", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-4">
              <label className="form-label">Shuffle Answers</label><br />
              <input
                type="checkbox"
                checked={form.shuffleAnswers}
                onChange={(e) => setField("shuffleAnswers", e.target.checked)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Time Limit (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={form.timeLimit}
                onChange={(e) => setField("timeLimit", Number(e.target.value))}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Multiple Attempts</label><br />
              <input
                type="checkbox"
                checked={form.multipleAttempts}
                onChange={(e) => setField("multipleAttempts", e.target.checked)}
              />
              {form.multipleAttempts && (
                <div className="mt-2">
                  <label className="form-label">How Many Attempts</label>
                  <input
                    type="number"
                    className="form-control"
                    value={form.maxAttempts}
                    onChange={(e) => setField("maxAttempts", Number(e.target.value))}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-4">
              <label className="form-label">Show Correct Answers</label><br />
              <input
                type="checkbox"
                checked={form.showCorrectAnswers}
                onChange={(e) => setField("showCorrectAnswers", e.target.checked)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Access Code</label>
              <input
                className="form-control"
                value={form.accessCode}
                onChange={(e) => setField("accessCode", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">One Question at a Time</label><br />
              <input
                type="checkbox"
                checked={form.oneQuestionAtATime}
                onChange={(e) => setField("oneQuestionAtATime", e.target.checked)}
              />
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-4">
              <label className="form-label">Webcam Required</label><br />
              <input
                type="checkbox"
                checked={form.webcamRequired}
                onChange={(e) => setField("webcamRequired", e.target.checked)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Lock Questions After Answering</label><br />
              <input
                type="checkbox"
                checked={form.lockAfterAnswering}
                onChange={(e) => setField("lockAfterAnswering", e.target.checked)}
              />
            </div>
          </div>

          <div className="row g-3 mt-1">
            <div className="col-md-4">
              <label className="form-label">Due date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={form.dates.dueDate || ""}
                onChange={(e) => setDate("dueDate", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Available from</label>
              <input
                type="datetime-local"
                className="form-control"
                value={form.dates.availableFrom || ""}
                onChange={(e) => setDate("availableFrom", e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Until</label>
              <input
                type="datetime-local"
                className="form-control"
                value={form.dates.availableUntil || ""}
                onChange={(e) => setDate("availableUntil", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {tab === "questions" && (
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="fw-semibold">
              Points total: {quiz?.details?.points ?? 0}
            </div>
            <button className="btn btn-primary" onClick={onAddQuestion}>
              + New Question
            </button>
          </div>

          {questions.length === 0 && (
            <div className="text-muted">No questions yet. Click “+ New Question”.</div>
          )}

          {questions.map((q) => (
            <QuestionEditor
              key={q.questionId}
              q={q}
              onSave={onUpdateQuestion}
              onDelete={() => onDeleteQuestion(q.questionId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------- inline question editor ----------
function QuestionEditor({
  q,
  onSave,
  onDelete,
}: {
  q: Question;
  onSave: (q: Question) => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState<Question>(q);
  useEffect(() => setDraft(q), [q]);

  const set = (k: keyof Question, v: any) => setDraft({ ...draft, [k]: v });

  // ensure arrays exist
  const answers = draft.possibleAnswers ?? [];

  return (
    <div className="border rounded p-3 mb-3" id={draft.questionId}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="fw-semibold">{draft.questionTitle}</div>
        <div className="d-flex gap-2">
          <button className="btn btn-sm btn-outline-secondary" onClick={() => onSave(draft)}>
            Save
          </button>
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            value={draft.questionTitle}
            onChange={(e) => set("questionTitle", e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label className="form-label">Type</label>
          <select
            className="form-select"
            value={draft.questionType}
            onChange={(e) => set("questionType", e.target.value)}
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True / False</option>
            <option value="fill-in-blank">Fill in the Blank</option>
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Points</label>
          <input
            type="number"
            className="form-control"
            value={draft.points}
            onChange={(e) => set("points", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-2">
        <label className="form-label">Question</label>
        <textarea
          className="form-control"
          rows={3}
          value={draft.questionDescription}
          onChange={(e) => set("questionDescription", e.target.value)}
        />
      </div>

      {/* multiple choice */}
      {draft.questionType === "multiple-choice" && (
        <div className="mt-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="fw-semibold">Choices</div>
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => set("possibleAnswers", [...answers, "New option"])}
            >
              + Add Choice
            </button>
          </div>
          {(answers.length ? answers : []).map((opt, i) => (
            <div className="input-group mb-2" key={i}>
              <div className="input-group-text">
                <input
                  type="radio"
                  name={draft.questionId}
                  checked={draft.correctAnswers === opt}
                  onChange={() => set("correctAnswers", opt)}
                />
              </div>
              <input
                className="form-control"
                value={opt}
                onChange={(e) => {
                  const clone = [...answers];
                  clone[i] = e.target.value;
                  set("possibleAnswers", clone);
                }}
              />
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  const clone = answers.filter((_, idx) => idx !== i);
                  set("possibleAnswers", clone);
                  if (draft.correctAnswers === opt) set("correctAnswers", "");
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* true/false */}
      {draft.questionType === "true-false" && (
        <div className="mt-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`tf_${draft.questionId}`}
              checked={draft.correctAnswers === "True"}
              onChange={() => set("correctAnswers", "True")}
            />
            <label className="form-check-label">True</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`tf_${draft.questionId}`}
              checked={draft.correctAnswers === "False"}
              onChange={() => set("correctAnswers", "False")}
            />
            <label className="form-check-label">False</label>
          </div>
        </div>
      )}

      {/* fill in the blank */}
      {draft.questionType === "fill-in-blank" && (
        <div className="mt-2">
          <label className="form-label">Acceptable Answers (one per line)</label>
          <textarea
            className="form-control"
            rows={3}
            value={Array.isArray(draft.possibleAnswers) ? draft.possibleAnswers.join("\n") : ""}
            onChange={(e) =>
              set(
                "possibleAnswers",
                e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
          <small className="text-muted">Matching is case-insensitive.</small>
        </div>
      )}
    </div>
  );
}
