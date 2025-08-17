// import {
//     ListGroup,
//     Button,
//     Row,
//     Col,
//     Form,
//     InputGroup,
//     Modal,
//     Dropdown,
// } from "react-bootstrap";
// import { BsCheckCircle, BsGripVertical, BsXCircle } from "react-icons/bs";
// import GreenCheckmark from "../Assignments/GreenCheckmark";
// import { IoEllipsisVertical } from "react-icons/io5";
// import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteQuiz, setQuizzes, type Quiz } from "./reducer.ts";
// import { useEffect, useState } from "react";
// import * as quizClient from "./client";
// import { RxRocket } from "react-icons/rx";

// export default function Quizzes() {
//     const { cid } = useParams();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const allQuizzes = useSelector((state: any) => state.quizzesReducer?.quizzes ?? []);
//     const quizzes = allQuizzes
//         .filter((quiz: Quiz) => quiz.course === cid)
//         .sort((a: Quiz, b: Quiz) => new Date(a.available).getTime() - new Date(b.available).getTime());

//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const isFaculty = currentUser?.role === "FACULTY";

//     const handleAddQuiz = () => {
//         navigate(`/Kambaz/Courses/${cid}/Quizzes/new`);
//     };

//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

//     const openDeleteConfirmation = (quizId: string) => {
//         setSelectedQuizId(quizId);
//         setShowConfirmModal(true);
//     };

//     const closeDeleteConfirmation = () => {
//         setSelectedQuizId(null);
//         setShowConfirmModal(false);
//     };

//     const togglePublish = async (quiz: Quiz) => {
//         try {
//             const updated = await quizClient.updateQuiz(quiz._id, {
//             ...quiz,
//             published: !quiz.published,
//             });
//             dispatch(setQuizzes(
//                 quizzes.map((q: Quiz) => (q._id === quiz._id ? updated : q))
//             ));
//         } catch (err) {
//             console.error("Failed to toggle publish status", err);
//             alert("Failed to update publish status.");
//         }
//     };

//     const confirmDelete = async () => {
//         if (selectedQuizId) {
//             try {
//                 const success = await quizClient.deleteQuiz(selectedQuizId);
//                 if (success) {
//                     dispatch(deleteQuiz(selectedQuizId));
//                 } else {
//                     alert("Failed to delete quiz");
//                 }
//             } catch (error) {
//                 console.error("Delete failed", error);
//                 alert("An error occurred");
//             } finally {
//                 closeDeleteConfirmation();
//             }
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const quizzes = await quizClient.fetchQuizzesForCourse(cid!);
//                 dispatch(setQuizzes(quizzes));
//             } catch (error) {
//                 console.error("Error loading quizzes:", error);
//             }
//         };
//         if (cid) fetchData();
//     }, [cid, dispatch]);

//     const [searchTerm, setSearchTerm] = useState("");
//     const filteredQuizzes = quizzes.filter((quiz: Quiz) =>
//         quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="quizzes-wrapper">
//             <div className="quizzes-content">
//                 <div className="quizzes-header mb-3">
//                     <Row className="align-items-center">
//                         <Col>
//                             <InputGroup>
//                                 <InputGroup.Text>
//                                     <FaSearch />
//                                 </InputGroup.Text>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Search..."
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                             </InputGroup>
//                         </Col>
//                         <Col className="d-flex justify-content-end">
//                             {isFaculty && (
//                                 <div id="wd-quiz-handling-buttons">
//                                     <Button variant="danger" onClick={handleAddQuiz}>
//                                         <FaPlus /> Quiz
//                                     </Button>
//                                     <Button variant="secondary" className="ms-2">
//                                         <IoEllipsisVertical />
//                                     </Button>
//                                 </div>
//                             )}
//                         </Col>
//                     </Row>
//                 </div>
//             </div>

//             <ListGroup className="rounded-0 modules-list">
//                 <ListGroup.Item className="module-item p-0 fs-5 border-gray">
//                     <div className="module-title p-3 ps-2 bg-secondary text-black">
//                         <BsGripVertical className="me-2 fs-3" /> Quizzes
//                     </div>
//                 </ListGroup.Item>

//                 {filteredQuizzes.length === 0 ? (
//                     <ListGroup.Item className="p-3 text-muted fst-italic">
//                         No quizzes available. Click the "+ Quiz" button to add one.
//                     </ListGroup.Item>
//                 ) : (
//                     filteredQuizzes.map((quiz: Quiz) => (
//                         <ListGroup.Item key={quiz._id} className="quiz-item p-3" style={{ borderLeft: '4px solidrgb(0, 128, 0)' }}>
//                             <div className="d-flex justify-content-between align-items-center w-100">
//                                 <div className="d-flex align-items-center">
//                                     <RxRocket className="me-2 fs-3 text-success" />
//                                     <div>
//                                         <div className="quiz-header text-black fs-4 mb-1">
//                                             {isFaculty ? (
//                                                 <Link
//                                                     to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Details`}
//                                                     className="text-danger text-decoration-none"
//                                                 >
//                                                     {quiz.title}
//                                                 </Link>
//                                             ) : (
//                                                 <span className="text-danger">{quiz.title}</span>
//                                             )}
//                                         </div>
//                                         <div className="fs-6 text-muted">
//                                             {/* <span className="red-font">Multiple Modules</span>
//                                             <span className="mx-2">|</span> */}
//                                             <span>
//                                                 <b>Available</b>{" "}
//                                                 {new Date(quiz.available).toLocaleString("en-US", {
//                                                     month: "short",
//                                                     day: "numeric",
//                                                     hour: "numeric",
//                                                     minute: "numeric",
//                                                     hour12: true,
//                                                 })}
//                                             </span>
//                                             <span className="mx-2">|</span>
//                                             <span>
//                                                 <b>Due</b>{" "}
//                                                 {new Date(quiz.due).toLocaleString("en-US", {
//                                                     month: "short",
//                                                     day: "numeric",
//                                                     hour: "numeric",
//                                                     minute: "numeric",
//                                                     hour12: true,
//                                                 })}
//                                             </span>
//                                             <span className="mx-2">|</span>
//                                             <span>{quiz.points} pts</span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {isFaculty && (
//                                     <div className="d-flex align-items-center">
//                                         {quiz.published ? (
//                                             <GreenCheckmark />
//                                         ) : null}
//                                         <Dropdown align="end">
//                                             <Dropdown.Toggle variant="link" className="p-0 ms-2 text-light">
//                                                 <IoEllipsisVertical className="fs-4 text-dark" />
//                                             </Dropdown.Toggle>
//                                             <Dropdown.Menu>
//                                                 <Dropdown.Item
//                                                     onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)}
//                                                 >
//                                                     <FaEdit className="me-2" />
//                                                     Edit
//                                                 </Dropdown.Item>
//                                                 <Dropdown.Item
//                                                     onClick={() => openDeleteConfirmation(quiz._id)}
//                                                 >
//                                                     <FaTrash className="me-2 text-danger" />
//                                                     Delete
//                                                 </Dropdown.Item>
//                                                 <Dropdown.Item onClick={() => togglePublish(quiz)}>
//                                                     {quiz.published ? (
//                                                         <span>
//                                                             <BsXCircle className="text-danger me-2" title="Unpublish" />Unpublish</span>
//                                                     ) : (
//                                                         <span>
//                                                             <BsCheckCircle className="text-success me-2" title="Publish" />Publish</span>
//                                                     )}
//                                                 </Dropdown.Item>
//                                             </Dropdown.Menu>
//                                         </Dropdown>
//                                     </div>
//                                 )}
//                             </div>
//                         </ListGroup.Item>
//                     ))
//                 )}
//             </ListGroup>

//             <Modal show={showConfirmModal} onHide={closeDeleteConfirmation} centered>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Confirm Deletion</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={closeDeleteConfirmation}>
//                         Cancel
//                     </Button>
//                     <Button variant="danger" onClick={confirmDelete}>
//                         Yes, Delete
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// }

import {
    ListGroup,
    Button,
    Row,
    Col,
    Form,
    InputGroup,
    Modal,
    Dropdown,
} from "react-bootstrap";
import { BsCheckCircle, BsGripVertical, BsXCircle } from "react-icons/bs";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus, FaSearch, FaEdit, FaTrash, FaPlay } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuiz, setQuizzes, type Quiz } from "./reducer.ts";
import { useEffect, useState } from "react";
import * as quizClient from "./client";
import { RxRocket } from "react-icons/rx";

export default function Quizzes() {
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const allQuizzes = useSelector((state: any) => state.quizzesReducer?.quizzes ?? []);
    const quizzes = allQuizzes
        .filter((quiz: Quiz) => quiz.course === cid)
        .sort((a: Quiz, b: Quiz) => new Date(a.available).getTime() - new Date(b.available).getTime());

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";

    // Filter quizzes based on user role
    const displayedQuizzes = isFaculty 
        ? quizzes 
        : quizzes.filter((quiz: Quiz) => quiz.published);

    const handleAddQuiz = () => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/new`);
    };

    const handleTakeQuiz = (quizId: string) => {
        navigate(`/Kambaz/Courses/${cid}/Quizzes/${quizId}/Preview`);
    };

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedQuizId, setSelectedQuizId] = useState<string | null>(null);

    const openDeleteConfirmation = (quizId: string) => {
        setSelectedQuizId(quizId);
        setShowConfirmModal(true);
    };

    const closeDeleteConfirmation = () => {
        setSelectedQuizId(null);
        setShowConfirmModal(false);
    };

    const togglePublish = async (quiz: Quiz) => {
        try {
            const updated = await quizClient.updateQuiz(quiz._id, {
            ...quiz,
            published: !quiz.published,
            });
            dispatch(setQuizzes(
                quizzes.map((q: Quiz) => (q._id === quiz._id ? updated : q))
            ));
        } catch (err) {
            console.error("Failed to toggle publish status", err);
            alert("Failed to update publish status.");
        }
    };

    const confirmDelete = async () => {
        if (selectedQuizId) {
            try {
                const success = await quizClient.deleteQuiz(selectedQuizId);
                if (success) {
                    dispatch(deleteQuiz(selectedQuizId));
                } else {
                    alert("Failed to delete quiz");
                }
            } catch (error) {
                console.error("Delete failed", error);
                alert("An error occurred");
            } finally {
                closeDeleteConfirmation();
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const quizzes = await quizClient.fetchQuizzesForCourse(cid!);
                dispatch(setQuizzes(quizzes));
            } catch (error) {
                console.error("Error loading quizzes:", error);
            }
        };
        if (cid) fetchData();
    }, [cid, dispatch]);

    const [searchTerm, setSearchTerm] = useState("");
    const filteredQuizzes = displayedQuizzes.filter((quiz: Quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if quiz is available for taking
    const isQuizAvailable = (quiz: Quiz) => {
        const now = new Date();
        const availableDate = new Date(quiz.available);
        return now >= availableDate;
    };

    return (
        <div className="quizzes-wrapper">
            <div className="quizzes-content">
                <div className="quizzes-header mb-3">
                    <Row className="align-items-center">
                        <Col>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            {isFaculty && (
                                <div id="wd-quiz-handling-buttons">
                                    <Button variant="danger" onClick={handleAddQuiz}>
                                        <FaPlus /> Quiz
                                    </Button>
                                    <Button variant="secondary" className="ms-2">
                                        <IoEllipsisVertical />
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>

            <ListGroup className="rounded-0 modules-list">
                <ListGroup.Item className="module-item p-0 fs-5 border-gray">
                    <div className="module-title p-3 ps-2 bg-secondary text-black">
                        <BsGripVertical className="me-2 fs-3" /> Quizzes
                    </div>
                </ListGroup.Item>

                {filteredQuizzes.length === 0 ? (
                    <ListGroup.Item className="p-3 text-muted fst-italic">
                        {isFaculty 
                            ? "No quizzes available. Click the \"+ Quiz\" button to add one."
                            : "No published quizzes available."
                        }
                    </ListGroup.Item>
                ) : (
                    filteredQuizzes.map((quiz: Quiz) => (
                        <ListGroup.Item key={quiz._id} className="quiz-item p-3" style={{ borderLeft: '4px solid rgb(0, 128, 0)' }}>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <div className="d-flex align-items-center flex-grow-1">
                                    <RxRocket className="me-2 fs-3 text-success" />
                                    <div className="flex-grow-1">
                                        <div className="quiz-header text-black fs-4 mb-1">
                                            {isFaculty ? (
                                                <Link
                                                    to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/Details`}
                                                    className="text-danger text-decoration-none"
                                                >
                                                    {quiz.title}
                                                </Link>
                                            ) : (
                                                <span className="text-danger">{quiz.title}</span>
                                            )}
                                        </div>
                                        <div className="fs-6 text-muted">
                                            <span>
                                                <b>Available</b>{" "}
                                                {new Date(quiz.available).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true,
                                                })}
                                            </span>
                                            <span className="mx-2">|</span>
                                            <span>
                                                <b>Due</b>{" "}
                                                {new Date(quiz.due).toLocaleString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true,
                                                })}
                                            </span>
                                            <span className="mx-2">|</span>
                                            <span>{quiz.points} pts</span>
                                            {!isFaculty && !isQuizAvailable(quiz) && (
                                                <>
                                                    <span className="mx-2">|</span>
                                                    <span className="text-warning">
                                                        <b>Not Yet Available</b>
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    {/* Student Take Quiz Button */}
                                    {!isFaculty && isQuizAvailable(quiz) && (
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleTakeQuiz(quiz._id)}
                                        >
                                            <FaPlay className="me-1" />
                                            Take Quiz
                                        </Button>
                                    )}

                                    {isFaculty && (
                                        <>
                                            {quiz.published ? (
                                                <GreenCheckmark />
                                            ) : null}
                                            <Dropdown align="end">
                                                <Dropdown.Toggle variant="link" className="p-0 ms-2 text-light">
                                                    <IoEllipsisVertical className="fs-4 text-dark" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)}
                                                    >
                                                        <FaEdit className="me-2" />
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={() => handleTakeQuiz(quiz._id)}
                                                    >
                                                        <FaPlay className="me-2" />
                                                        Preview
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        onClick={() => openDeleteConfirmation(quiz._id)}
                                                    >
                                                        <FaTrash className="me-2 text-danger" />
                                                        Delete
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => togglePublish(quiz)}>
                                                        {quiz.published ? (
                                                            <span>
                                                                <BsXCircle className="text-danger me-2" title="Unpublish" />Unpublish</span>
                                                        ) : (
                                                            <span>
                                                                <BsCheckCircle className="text-success me-2" title="Publish" />Publish</span>
                                                        )}
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </>
                                    )}
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>

            <Modal show={showConfirmModal} onHide={closeDeleteConfirmation} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteConfirmation}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Yes, Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}