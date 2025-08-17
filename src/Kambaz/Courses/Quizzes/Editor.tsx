// import {
//   Form,
//   FormSelect,
//   InputGroup,
//   Button,
// } from "react-bootstrap";
// import { IoCalendarOutline } from "react-icons/io5";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { addQuiz, updateQuiz } from "./reducer";
// import type { Quiz } from "./reducer";
// import { useState, useEffect } from "react";
// import * as quizClient from "./client";
// import { Tabs, Tab } from "react-bootstrap";

// import Questions from "./Questions/index";

// export default function QuizEditor() {
//     const { cid, qid } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const quizzes = useSelector((state: any) => state.quizzesReducer?.quizzes ?? []);
//     const existingQuiz = quizzes.find((a: Quiz) => a._id === qid);
//     const isNewQuiz = qid === "new" || !existingQuiz;

//     const [formData, setFormData] = useState<Partial<Quiz>>({
//         title: "Unnamed Quiz",
//         description: "",
//         points: 100,
//         displayGrade: "Percentage",
//         assignTo: "Everyone",
//         due: "",
//         available: "",
//         until: "",
//         quizType: "Graded Quiz",
//         assignmentGroup: "Quizzes",
//         shuffleAnswers: true,
//         timeLimit: 20,
//         multipleAttempts: false,
//         showCorrectAnswers: "After Due Date",
//         accessCode: "",
//         oneQuestionAtATime: true,
//         webcamRequired: false,
//         lockQuestionsAfterAnswering: false,
//     });

//     useEffect(() => {
//         if (!isNewQuiz && existingQuiz) {
//         setFormData({ ...existingQuiz });
//         } else if (isNewQuiz) {
//         const now = new Date();
//         const tomorrow = new Date(now);
//         tomorrow.setDate(tomorrow.getDate() + 1);
//         const nextWeek = new Date(now);
//         nextWeek.setDate(nextWeek.getDate() + 7);

//         setFormData((prev) => ({
//             ...prev,
//             due: nextWeek.toISOString().split("T")[0],
//             available: now.toISOString().split("T")[0],
//             until: nextWeek.toISOString().split("T")[0],
//             course: cid,
//         }));
//         }
//     }, [qid, existingQuiz, isNewQuiz, cid]);

//     const formatDate = (iso: string) => iso?.split?.("T")?.[0] || "";

//     const handleInputChange = (field: keyof Quiz, value: any) => {
//         setFormData((prev) => ({
//         ...prev,
//         [field]: value,
//         }));
//     };

//     const handleSave = async () => {
//         if (!formData.title?.trim()) {
//             alert("Quiz name is required");
//             return;
//         }

//         const quizData: Quiz = {
//             _id: isNewQuiz ? Date.now().toString() : formData._id!,
//             title: formData.title!,
//             description: formData.description || "",
//             points: Number(formData.points) || 100,
//             displayGrade: formData.displayGrade || "Percentage",
//             assignTo: formData.assignTo || "Everyone",
//             due: formData.due || "",
//             available: formData.available || "",
//             until: formData.until || "",
//             course: cid!,
//             quizType: formData.quizType || "Graded Quiz",
//             assignmentGroup: formData.assignmentGroup || "Quizzes",
//             shuffleAnswers: formData.shuffleAnswers ?? true,
//             timeLimit: Number(formData.timeLimit) || 20,
//             multipleAttempts: formData.multipleAttempts ?? false,
//             showCorrectAnswers: formData.showCorrectAnswers || "After Due Date",
//             accessCode: formData.accessCode || "",
//             oneQuestionAtATime: formData.oneQuestionAtATime ?? true,
//             webcamRequired: formData.webcamRequired ?? false,
//             lockQuestionsAfterAnswering: formData.lockQuestionsAfterAnswering ?? false,
//             published: formData.published ?? false,
//         };

//         try {
//         if (isNewQuiz) {
//             const created = await quizClient.createQuiz(cid!, quizData);
//             dispatch(addQuiz(created));
//         } else {
//             const updated = await quizClient.updateQuiz(formData._id!, quizData);
//             dispatch(updateQuiz(updated));
//         }

//         navigate(`/Kambaz/Courses/${cid}/Quizzes`);
//         } catch (err) {
//         console.error("Error saving quiz:", err);
//         alert("Failed to save quiz.");
//         }
//     };

//     const handlePublish = async () => {
//         if (!formData._id) return;

//         try {
//             const updated = await quizClient.updateQuiz(formData._id, {
//             ...formData,
//             published: true,
//             });
//             setFormData(updated);
//             dispatch(updateQuiz(updated));
//         } catch (err) {
//             console.error("Failed to publish:", err);
//             alert("Failed to update publish status.");
//         }
//     };

//     const handleSavePublish = async () => {
//         handleSave();
//         handlePublish();
//     };

//     const handleCancel = () => {
//         navigate(`/Kambaz/Courses/${cid}/Quizzes`);
//     };

//     if (!isNewQuiz && !existingQuiz) {
//         return <div>Quiz not found.</div>;
//     }

//     return (
//         <div id="wd-quizzes-editor" className="container mt-4">
//             <Tabs defaultActiveKey="details" className="mb-4 text-danger">
//                 <Tab eventKey="details" title="Details" className="text-danger">
//                     <Form.Group className="mb-3" controlId="wd-quiz-name">
//                         <Form.Label>Quiz Name</Form.Label>
//                         <Form.Control
//                         type="text"
//                         value={formData.title || ""}
//                         onChange={(e) => handleInputChange("title", e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="wd-quiz-description">
//                         <Form.Label>Quiz Instructions:</Form.Label>
//                         <Form.Control
//                         as="textarea"
//                         rows={3}
//                         value={formData.description || ""}
//                         onChange={(e) => handleInputChange("description", e.target.value)}
//                         />
//                     </Form.Group>

//                     {/* Quiz Type */}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Quiz Type</Form.Label>
//                         <FormSelect
//                         value={formData.quizType}
//                         onChange={(e) => handleInputChange("quizType", e.target.value)}
//                         >
//                         <option>Graded Quiz</option>
//                         <option>Practice Quiz</option>
//                         <option>Graded Survey</option>
//                         <option>Ungraded Survey</option>
//                         </FormSelect>
//                     </Form.Group>

//                     {/* Points */}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Points</Form.Label>
//                         <Form.Control
//                         type="number"
//                         value={formData.points}
//                         onChange={(e) => handleInputChange("points", Number(e.target.value))}
//                         />
//                     </Form.Group>

//                     {/* Assignment Group */}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Assignment Group</Form.Label>
//                         <FormSelect
//                         value={formData.assignmentGroup}
//                         onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}
//                         >
//                         <option>Quizzes</option>
//                         <option>Exams</option>
//                         <option>Assignments</option>
//                         <option>Project</option>
//                         </FormSelect>
//                     </Form.Group>

//                     {/* Boolean and Config Options */}
//                     <Form.Check
//                         type="checkbox"
//                         label="Shuffle Answers"
//                         checked={formData.shuffleAnswers}
//                         onChange={(e) => handleInputChange("shuffleAnswers", e.target.checked)}
//                     />

//                     <Form.Group className="mb-3">
//                         <Form.Label>Time Limit (minutes)</Form.Label>
//                         <Form.Control
//                         type="number"
//                         value={formData.timeLimit}
//                         onChange={(e) => handleInputChange("timeLimit", Number(e.target.value))}
//                         />
//                     </Form.Group>

//                     <Form.Check
//                         type="checkbox"
//                         label="Allow Multiple Attempts"
//                         checked={formData.multipleAttempts}
//                         onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)}
//                     />

//                     <Form.Group className="mb-3">
//                         <Form.Label>Show Correct Answers</Form.Label>
//                         <FormSelect
//                         value={formData.showCorrectAnswers}
//                         onChange={(e) => handleInputChange("showCorrectAnswers", e.target.value)}
//                         >
//                         <option value="After Due Date">After Due Date</option>
//                         <option value="Immediately">Immediately</option>
//                         <option value="Never">Never</option>
//                         </FormSelect>
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Access Code</Form.Label>
//                         <Form.Control
//                         type="text"
//                         value={formData.accessCode}
//                         onChange={(e) => handleInputChange("accessCode", e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Check
//                         type="checkbox"
//                         label="One Question at a Time"
//                         checked={formData.oneQuestionAtATime}
//                         onChange={(e) => handleInputChange("oneQuestionAtATime", e.target.checked)}
//                     />

//                     <Form.Check
//                         type="checkbox"
//                         label="Webcam Required"
//                         checked={formData.webcamRequired}
//                         onChange={(e) => handleInputChange("webcamRequired", e.target.checked)}
//                     />

//                     <Form.Check
//                         type="checkbox"
//                         label="Lock Questions After Answering"
//                         checked={formData.lockQuestionsAfterAnswering}
//                         onChange={(e) => handleInputChange("lockQuestionsAfterAnswering", e.target.checked)}
//                     />

//                     {/* Dates */}
//                     <Form.Group className="mb-3">
//                         <Form.Label>Assign To</Form.Label>
//                         <Form.Control
//                         type="text"
//                         value={formData.assignTo}
//                         onChange={(e) => handleInputChange("assignTo", e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Due Date</Form.Label>
//                         <InputGroup>
//                         <Form.Control
//                             type="date"
//                             value={formatDate(formData.due || "")}
//                             onChange={(e) => handleInputChange("due", e.target.value)}
//                         />
//                         <InputGroup.Text><IoCalendarOutline /></InputGroup.Text>
//                         </InputGroup>
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Available From</Form.Label>
//                         <InputGroup>
//                         <Form.Control
//                             type="date"
//                             value={formatDate(formData.available || "")}
//                             onChange={(e) => handleInputChange("available", e.target.value)}
//                         />
//                         <InputGroup.Text><IoCalendarOutline /></InputGroup.Text>
//                         </InputGroup>
//                     </Form.Group>

//                     <Form.Group className="mb-3">
//                         <Form.Label>Until Date</Form.Label>
//                         <InputGroup>
//                         <Form.Control
//                             type="date"
//                             value={formatDate(formData.until || "")}
//                             onChange={(e) => handleInputChange("until", e.target.value)}
//                         />
//                         <InputGroup.Text><IoCalendarOutline /></InputGroup.Text>
//                         </InputGroup>
//                     </Form.Group>

//                     {/* Buttons */}
//                     <hr />
//                     <div className="float-end">
//                         <Button variant="secondary" onClick={handleCancel}>
//                         Cancel
//                         </Button>
//                         <Button variant="danger" className="ms-2" onClick={handleSave}>
//                         Save
//                         </Button>
//                         <Button variant="success" className="ms-2" onClick={handleSavePublish}>
//                         Save and Publish
//                         </Button>
//                     </div>
//                 </Tab >
//                 <Tab eventKey="questions" title="Questions" className="text-danger">
//                     <Questions />
//                 </Tab>
//             </Tabs>
//         </div>
//     );
// }

import {
  Row,
  Col,
  Form,
  FormSelect,
  InputGroup,
  Card,
  Button,
} from "react-bootstrap";
import { IoCalendarOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import type { Quiz } from "./reducer";
import { useState, useEffect } from "react";
import * as quizClient from "./client";
import { Tabs, Tab } from "react-bootstrap";
import Editor from 'react-simple-wysiwyg';

import Questions from "./Questions/index";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const quizzes = useSelector((state: any) => state.quizzesReducer?.quizzes ?? []);
    const existingQuiz = quizzes.find((a: Quiz) => a._id === qid);
    const isNewQuiz = qid === "new" || !existingQuiz;

    const [formData, setFormData] = useState<Partial<Quiz>>({
        title: "Unnamed Quiz",
        description: "",
        points: 100,
        displayGrade: "Percentage",
        assignTo: "Everyone",
        due: "",
        available: "",
        until: "",
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: "After Due Date",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
    });

    useEffect(() => {
        if (!isNewQuiz && existingQuiz) {
        setFormData({ ...existingQuiz });
        } else if (isNewQuiz) {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);

        setFormData((prev) => ({
            ...prev,
            due: nextWeek.toISOString().split("T")[0],
            available: now.toISOString().split("T")[0],
            until: nextWeek.toISOString().split("T")[0],
            course: cid,
        }));
        }
    }, [qid, existingQuiz, isNewQuiz, cid]);

    const formatDate = (iso: string) => iso?.split?.("T")?.[0] || "";

    const handleInputChange = (field: keyof Quiz, value: any) => {
        setFormData((prev) => ({
        ...prev,
        [field]: value,
        }));
    };

    const handleSave = async () => {
        if (!formData.title?.trim()) {
            alert("Quiz name is required");
            return;
        }

        const quizData: Quiz = {
            _id: isNewQuiz ? Date.now().toString() : formData._id!,
            title: formData.title!,
            description: formData.description || "",
            points: Number(formData.points) || 100,
            displayGrade: formData.displayGrade || "Percentage",
            assignTo: formData.assignTo || "Everyone",
            due: formData.due || "",
            available: formData.available || "",
            until: formData.until || "",
            course: cid!,
            quizType: formData.quizType || "Graded Quiz",
            assignmentGroup: formData.assignmentGroup || "Quizzes",
            shuffleAnswers: formData.shuffleAnswers ?? true,
            timeLimit: Number(formData.timeLimit) || 20,
            multipleAttempts: formData.multipleAttempts ?? false,
            showCorrectAnswers: formData.showCorrectAnswers || "After Due Date",
            accessCode: formData.accessCode || "",
            oneQuestionAtATime: formData.oneQuestionAtATime ?? true,
            webcamRequired: formData.webcamRequired ?? false,
            lockQuestionsAfterAnswering: formData.lockQuestionsAfterAnswering ?? false,
            published: formData.published ?? false,
        };

        try {
        if (isNewQuiz) {
            const created = await quizClient.createQuiz(cid!, quizData);
            dispatch(addQuiz(created));
        } else {
            const updated = await quizClient.updateQuiz(formData._id!, quizData);
            dispatch(updateQuiz(updated));
        }

        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        } catch (err) {
        console.error("Error saving quiz:", err);
        alert("Failed to save quiz.");
        }
    };

    const handlePublish = async () => {
        if (!formData._id) return;

        try {
            const updated = await quizClient.updateQuiz(formData._id, {
            ...formData,
            published: true,
            });
            setFormData(updated);
            dispatch(updateQuiz(updated));
        } catch (err) {
            console.error("Failed to publish:", err);
            alert("Failed to update publish status.");
        }
    };

    const handleSavePublish = async () => {
        handleSave();
        handlePublish();
    };

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    };

    if (!isNewQuiz && !existingQuiz) {
        return <div>Quiz not found.</div>;
    }

    return (
        <div id="wd-quizzes-editor" className="container mt-4">
            <Tabs defaultActiveKey="details" className="mb-4 text-danger">
                <Tab eventKey="details" title="Details" className="text-danger">
                    {/* Quiz Name */}
                    <Form.Group className="mb-3" controlId="wd-quiz-name">
                        <Form.Label>Quiz Title</Form.Label>
                        <Form.Control
                        type="text"
                        value={formData.title || ""}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        />
                    </Form.Group>

                    {/* Quiz Instructions */}
                    <Form.Group className="mb-3" controlId="wd-quiz-description">
                        <Form.Label>Quiz Description</Form.Label>
                        <Editor className="text-dark"
                        // as="textarea"
                        // rows={8}
                        value={formData.description || ""}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        />
                    </Form.Group>

                    {/* Quiz Type */}
                    <Form.Group as={Row} className="mb-3" controlId="wd-quiz-type">
                        <Form.Label column sm="2" className="text-end">Quiz Type</Form.Label>
                        <Col sm="10">
                            <FormSelect
                            value={formData.quizType}
                            onChange={(e) => handleInputChange("quizType", e.target.value)}
                            >
                            <option>Graded Quiz</option>
                            <option>Practice Quiz</option>
                            <option>Graded Survey</option>
                            <option>Ungraded Survey</option>
                            </FormSelect>
                        </Col>
                    </Form.Group>

                    {/* Points */}
                    <Form.Group as={Row} className="mb-3" controlId="wd-points">
                        <Form.Label column sm="2" className="text-end">Points</Form.Label>
                        <Col sm="10">
                            <Form.Control
                            type="number"
                            value={formData.points}
                            onChange={(e) => handleInputChange("points", Number(e.target.value))}
                            />
                        </Col>
                    </Form.Group>

                    {/* Assignment Group */}
                    <Form.Group as={Row} className="mb-3" controlId="wd-assignment-group">
                        <Form.Label column sm="2" className="text-end">Assignment Group</Form.Label>
                        <Col sm="10">
                            <FormSelect
                            value={formData.assignmentGroup}
                            onChange={(e) => handleInputChange("assignmentGroup", e.target.value)}
                            >
                            <option>Quizzes</option>
                            <option>Exams</option>
                            <option>Assignments</option>
                            <option>Project</option>
                            </FormSelect>
                        </Col>
                    </Form.Group>

                    {/* Display Grade */}
                    <Form.Group as={Row} className="mb-3" controlId="wd-display-grade">
                        <Form.Label column sm="2" className="text-end">Display Grade as</Form.Label>
                        <Col sm="10">
                            <FormSelect
                            value={formData.displayGrade}
                            onChange={(e) => handleInputChange("displayGrade", e.target.value)}
                            >
                            <option value="Percentage">Percentage</option>
                            <option value="Decimal">Decimal</option>
                            <option value="Number">Number</option>
                            </FormSelect>
                        </Col>
                    </Form.Group>

                    {/* Quiz Options */}
                    <Form.Group as={Row} className="mb-3" controlId="wd-quiz-options">
                        <Form.Label column sm="2" className="text-end">Quiz Options</Form.Label>
                        <Col sm="10">
                            <Card className="mb-4">
                                <Card.Body>
                                    <Form.Check
                                        type="checkbox"
                                        label="Shuffle Answers"
                                        checked={formData.shuffleAnswers}
                                        onChange={(e) => handleInputChange("shuffleAnswers", e.target.checked)}
                                    />
                                    
                                    <br />
                                    <Form.Check
                                        type="checkbox"
                                        label="Time Limit (minutes)"
                                    />
                                    <Form.Control
                                    type="number"
                                    value={formData.timeLimit}
                                    onChange={(e) => handleInputChange("timeLimit", Number(e.target.value))}
                                    />

                                    <br />
                                    <Form.Check
                                        type="checkbox"
                                        label="Allow Multiple Attempts"
                                        checked={formData.multipleAttempts}
                                        onChange={(e) => handleInputChange("multipleAttempts", e.target.checked)}
                                    />

                                    <br />
                                    <Form.Label><b>Show Correct Answers</b></Form.Label>
                                    <FormSelect
                                    value={formData.showCorrectAnswers}
                                    onChange={(e) => handleInputChange("showCorrectAnswers", e.target.value)}
                                    >
                                    <option value="After Due Date">After Due Date</option>
                                    <option value="Immediately">Immediately</option>
                                    <option value="Never">Never</option>
                                    </FormSelect>

                                    <br />
                                    <Form.Label><b>Access Code</b></Form.Label>
                                    <Form.Control
                                    type="text"
                                    value={formData.accessCode}
                                    onChange={(e) => handleInputChange("accessCode", e.target.value)}
                                    />

                                    <br />
                                    <Form.Check
                                        type="checkbox"
                                        label="One Question at a Time"
                                        checked={formData.oneQuestionAtATime}
                                        onChange={(e) => handleInputChange("oneQuestionAtATime", e.target.checked)}
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        label="Webcam Required"
                                        checked={formData.webcamRequired}
                                        onChange={(e) => handleInputChange("webcamRequired", e.target.checked)}
                                    />

                                    <Form.Check
                                        type="checkbox"
                                        label="Lock Questions After Answering"
                                        checked={formData.lockQuestionsAfterAnswering}
                                        onChange={(e) => handleInputChange("lockQuestionsAfterAnswering", e.target.checked)}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Form.Group>

                    {/* Assign Section */}
                    <Form.Group as={Row} className="mb-3" controlId="wd-assign">
                        <Form.Label column sm="2" className="text-end">Assign</Form.Label>
                        <Col sm="10">
                            <Card className="mb-4">
                                <Card.Body>
                                    <Form.Label><b>Assign to</b></Form.Label>
                                    <Form.Control
                                    type="text"
                                    value={formData.assignTo}
                                    onChange={(e) => handleInputChange("assignTo", e.target.value)}
                                    />
                                    <br />
                                    <Form.Label><b>Due</b></Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type="date"
                                            value={formatDate(formData.due || "")}
                                            onChange={(e) => handleInputChange("due", e.target.value)}
                                        />
                                        <InputGroup.Text><IoCalendarOutline /></InputGroup.Text>
                                    </InputGroup>
                                    <Form.Group as={Row} className="mb-3" controlId="wd-assign-availability">
                                        <Col sm="6">
                                            <Form.Label><b>Available From</b></Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="date"
                                                    value={formatDate(formData.available || "")}
                                                    onChange={(e) => handleInputChange("available", e.target.value)}
                                                />
                                                <InputGroup.Text><IoCalendarOutline /></InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                        <Col sm="6">
                                            <Form.Label><b>Until</b></Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type="date"
                                                    value={formatDate(formData.until || "")}
                                                    onChange={(e) => handleInputChange("until", e.target.value)}
                                                />
                                                <InputGroup.Text><IoCalendarOutline /></InputGroup.Text>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Form.Group>

                    {/* Buttons */}
                    <hr />
                    <div className="float-end">
                        <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                        </Button>
                        <Button variant="danger" className="ms-2" onClick={handleSave}>
                        Save
                        </Button>
                        <Button variant="success" className="ms-2" onClick={handleSavePublish}>
                        Save and Publish
                        </Button>
                    </div>
                </Tab>
                <Tab eventKey="questions" title="Questions" className="text-danger">
                    <Questions />
                </Tab>
            </Tabs>
        </div>
    );
}