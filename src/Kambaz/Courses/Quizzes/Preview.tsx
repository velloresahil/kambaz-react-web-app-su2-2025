/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getQuiz } from "./client";

export default function QuizPreview() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const load = async () => {
      if (!qid) return;
      const data = await getQuiz(qid);
      setQuiz(data);
      setIdx(0);
      setAnswers({});
      setSubmitted(false);
      setScore(0);
    };
    load();
  }, [qid]);

  if (!quiz) return <div className="p-3">Loading…</div>;

  const qs = quiz.questions || [];
  const q = qs[idx];

  const setAnswer = (qid: string, val: string) =>
    setAnswers({ ...answers, [qid]: val });

  const onSubmit = () => {
    // simple local scoring
    let s = 0;
    qs.forEach((qq: any) => {
      const given = (answers[qq.questionId] || "").trim();
      if (qq.questionType === "fill-in-blank") {
        const accepted: string[] = (qq.possibleAnswers || []).map((a: string) => a.toLowerCase());
        if (accepted.includes(given.toLowerCase())) s += qq.points || 0;
      } else {
        const correct = (qq.correctAnswers || "").trim();
        if (given === correct) s += qq.points || 0;
      }
    });
    setScore(s);
    setSubmitted(true);
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h5 m-0">Preview: {quiz.details?.title || "Untitled Quiz"}</h2>
        <Link to={`/Kambaz/quizzes/${quiz.quizId}`} className="btn btn-secondary">Exit Preview</Link>
      </div>

      {!submitted ? (
        <>
          <div className="card p-3 mb-3">
            <div className="fw-semibold mb-1">{q?.questionTitle}</div>
            <div className="mb-2">{q?.questionDescription}</div>

            {q?.questionType === "multiple-choice" && (
              <div>
                {(q.possibleAnswers || []).map((opt: string, i: number) => (
                  <div className="form-check" key={i}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={q.questionId}
                      checked={(answers[q.questionId] || "") === opt}
                      onChange={() => setAnswer(q.questionId, opt)}
                    />
                    <label className="form-check-label">{opt}</label>
                  </div>
                ))}
              </div>
            )}

            {q?.questionType === "true-false" && (
              <div>
                {["True", "False"].map((opt) => (
                  <div className="form-check" key={opt}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={q.questionId}
                      checked={(answers[q.questionId] || "") === opt}
                      onChange={() => setAnswer(q.questionId, opt)}
                    />
                    <label className="form-check-label">{opt}</label>
                  </div>
                ))}
              </div>
            )}

            {q?.questionType === "fill-in-blank" && (
              <input
                className="form-control"
                placeholder="Your answer"
                value={answers[q.questionId] || ""}
                onChange={(e) => setAnswer(q.questionId, e.target.value)}
              />
            )}
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-secondary"
                    disabled={idx === 0}
                    onClick={() => setIdx((n) => Math.max(0, n - 1))}>
              ← Previous
            </button>
            {idx < qs.length - 1 ? (
              <button className="btn btn-primary"
                      onClick={() => setIdx((n) => Math.min(qs.length - 1, n + 1))}>
                Next →
              </button>
            ) : (
              <button className="btn btn-success" onClick={onSubmit}>
                Submit
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="card p-3">
          <h3 className="h6">Your Score: {score} / {quiz.details?.points ?? 0}</h3>
          <hr />
          {qs.map((qq: any) => {
            const given = answers[qq.questionId] || "";
            const correct = qq.correctAnswers;
            const isCorrect =
              qq.questionType === "fill-in-blank"
                ? (qq.possibleAnswers || []).map((s: string) => s.toLowerCase()).includes((given || "").toLowerCase())
                : given === (correct || "");
            return (
              <div key={qq.questionId} className="mb-2">
                <div className="fw-semibold">{qq.questionTitle}</div>
                <div className={isCorrect ? "text-success" : "text-danger"}>
                  {isCorrect ? "✔ Correct" : "✘ Incorrect"}
                </div>
                {!isCorrect && <div className="small text-muted">Your answer: {given || "—"}</div>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
