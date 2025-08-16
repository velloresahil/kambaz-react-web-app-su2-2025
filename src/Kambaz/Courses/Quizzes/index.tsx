// src/Kambaz/Courses/Quizzes/index.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  listQuizzesByCourse,
  createQuiz,
  deleteQuiz,
  setPublish,
} from "./client";

type Quiz = any;

export default function QuizzesList() {
  const { cid } = useParams();              // course id from URL
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!cid) return;
    setLoading(true);
    const data = await listQuizzesByCourse(cid);
    // sort by availableFrom (rubric)
    data.sort((a: any, b: any) => {
      const ax = a?.details?.dates?.availableFrom
        ? new Date(a.details.dates.availableFrom).getTime()
        : 0;
      const bx = b?.details?.dates?.availableFrom
        ? new Date(b.details.dates.availableFrom).getTime()
        : 0;
      return ax - bx;
    });
    setQuizzes(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [cid]);

  const onAdd = async () => {
    if (!cid) return;
    const q = await createQuiz(cid);
    // take them to details for now (we’ll add editor next)
    navigate(`/Kambaz/quizzes/${q.quizId}`);
  };

  const onDelete = async (quizId: string) => {
    await deleteQuiz(quizId);
    load();
  };

  const togglePublish = async (q: Quiz) => {
    await setPublish(q.quizId, !q.published);
    load();
  };

  if (loading) return <div>Loading…</div>;

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 m-0">Quizzes</h2>
        <button className="btn btn-primary" onClick={onAdd}>+ Quiz</button>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-muted">
          No quizzes yet. Click <b>+ Quiz</b> to create one.
        </div>
      ) : (
        <ul className="list-group">
          {quizzes.map((q: any) => {
            const d = q.details?.dates || {};
            const now = Date.now();
            const from = d.availableFrom ? new Date(d.availableFrom).getTime() : null;
            const until = d.availableUntil ? new Date(d.availableUntil).getTime() : null;
            let availability = "Not available";
            if (from && until) {
              if (now < from) availability = `Not available until ${new Date(from).toLocaleString()}`;
              else if (now > until) availability = "Closed";
              else availability = "Available";
            }

            return (
              <li key={q.quizId} className="list-group-item">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Link to={`/Kambaz/quizzes/${q.quizId}`} className="fw-semibold">
                      {q.details?.title || "Untitled Quiz"}
                    </Link>
                    <div className="small text-muted">
                      {availability} · Due {d?.dueDate ? new Date(d.dueDate).toLocaleString() : "—"} ·
                      Points {q.details?.points ?? 0} ·
                      Questions {q.questions?.length ?? 0}
                    </div>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      className={`btn btn-sm ${q.published ? "btn-success" : "btn-outline-secondary"}`}
                      title={q.published ? "Unpublish" : "Publish"}
                      onClick={() => togglePublish(q)}
                    >
                      {q.published ? "✅" : "🚫"}
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(q.quizId)}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
