import { API_URL } from '../environment/enviroment';
import { Button, TextField, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCorrectAnswer, setQuizName, setQuestion, addAnswer, setAnswer, deleteAnswer, addQna, deleteQna} from '../reducer/QuizEditSlice';
import { setLoading } from '../reducer/LoadingSlice';

export default function QuizEdit() {

    const[currentPage, setCurrentPage] = useState(0);
    const quiz = useSelector(state => state.quizEdit);

    const pageSize = 5;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    var user = JSON.parse(sessionStorage.getItem("user") || "[]")
  
    useEffect(() => {
        dispatch(setLoading(false));   
        if(quiz.value.length === 0 && !quiz.new) {
            navigate("/admin");
        }
    }, [quiz, navigate, dispatch]);

    async function handleSave() {
        if(quiz.value.questionAndAnswers.length === 0) {
            navigate("/admin");
        } 
        else {
            try {
                const response = await fetch(API_URL +'/api/Quiz', {
                    method: quiz.new ? 'POST' : 'PUT',
                    body: JSON.stringify({
                        quiz: quiz.value,
                        userId: user.id
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });  
    
                if(response.ok) {
                    navigate("/admin");
                }
            } catch (error) {
                console.error(error)
            }
        }
    }

    function handleQuestionDelete(index) {
        dispatch(deleteQna(index))
    }

    function handlePageChange(event, pageCount) {
        setCurrentPage(pageCount - 1);
    }


    const styles = {
        quizWrap: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            margin: "auto",
            textAlign: "center",
            width: "90%",
        },
        qnaWrap: {
            border: "solid 3px #b34900",
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            margin: "auto",
            marginBottom: "20px",
            textAlign: "center",
            width: "90%",
        },
        questionWrap: {
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            textAlign: "center",
        },
        questionNumber: {
            color: "#b34900",
            fontSize: "20px",
            margin: "0px",
            marginTop: "30px",
            width: "90%",
        },
        answerWrap: {
            display: "flex",
            flexDirection: "row",
            margin: "auto",
            textAlign: "center",
        }
    };

    return (
        <div style={styles.quizWrap}>
            <Button                     
                sx={{
                    background: "white",
                    border: "solid 3px #b34900",
                    color: "#ff6900",
                    fontSize: "20px",
                    fontFamily: "sans-serif",
                    fontWeight: "bold",
                    margin: "10px auto",
                    textTransform: "none",
                    padding: "10px 5px",
                    width: "90%",
                    "&:hover": {
                        backgroundColor: "green",
                        border: "solid 3px darkgreen",
                        color: "white",
                    },
                    "@media (min-width: 1024px)": {
                        width: "45%",
                    }
                }}
                size="large" 
                variant="contained" 
                onClick={() => handleSave()}>
                Mentés
            </Button>
             <TextField 
                label="Kvíz neve"
                value={quiz.value.quizName}
                onChange={(e) => dispatch(setQuizName(e.target.value))}
                sx={{
                    margin: "20px auto",
                    width: "90%",
                    ".MuiInputLabel-outlined": {
                        color: "black",
                    },
                    ".MuiInputBase-input.MuiOutlinedInput-input": {
                        color: "#b34900",
                    },
                    "@media (min-width: 1024px)": {
                        width: "60%",
                    },
                }}
            />
            {quiz.value.length !== 0 && quiz.value.questionAndAnswers.slice(currentPage * pageSize, currentPage * pageSize + pageSize).map((parent, i) => (
                <div style={styles.qnaWrap} key={i}>
                    <h1 style={styles.questionNumber}>{currentPage * pageSize + i + 1} / {quiz.value.questionAndAnswers.length}</h1>
                    <div style={styles.questionWrap} id="qeQnaWrap">
                        <TextField 
                            label="Kérdés"
                            value={quiz.value.questionAndAnswers[currentPage * pageSize + i].question}
                            multiline={true}
                            rows={1}
                            onChange={(e) => (dispatch(setQuestion({currentPage: currentPage * pageSize + i, question: e.target.value})))}
                            sx={{
                                margin: "20px 0px",
                                width: "90%",
                                ".MuiInputLabel-outlined": {
                                    color: "black",
                                },
                                ".MuiInputBase-input.MuiOutlinedInput-input": {
                                    color: "#b34900",
                                },
                            }}
                        />
                        <Button                     
                            sx={{
                                background: "white",
                                border: "solid 3px darkgreen",
                                color: "green",
                                fontSize: "20px",
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                                margin: "15px auto",
                                width: "5%",
                                "&:hover": {
                                    backgroundColor: "green",
                                    border: "solid 3px darkgreen",
                                    color: "white",
                                },
                            }}
                            variant="contained" 
                            onClick={() => dispatch(addQna({currentPage: currentPage * pageSize + i, qna: {question: "Kérdés", answers: ["Válasz 1", "Válasz 2", "Válasz 3", "Válasz 4"], correctAnswer: 0}}))}>
                            +
                        </Button>
                        <Button                     
                            sx={{
                                background: "white",
                                border: "solid 3px darkred",
                                color: "red",
                                fontSize: "20px",
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                                margin: "15px 0px",
                                width: "5%",
                                "&:hover": {
                                    backgroundColor: "red",
                                    border: "solid 3px darkred",
                                    color: "white",
                                },
                            }}
                            variant="contained" 
                            onClick={() => handleQuestionDelete(currentPage * pageSize + i)}>
                            X
                        </Button>
                    </div>
                    {parent.answers.map((element, j) => (
                        <div style={styles.answerWrap} id="qeAnswerWrap" key={j}>
                            <TextField 
                                label="Válasz"
                                value={quiz.value.questionAndAnswers[currentPage * pageSize + i].answers[j]}
                                multiline={true}  
                                rows={1}               
                                sx={{
                                    margin: "20px 0px",
                                    width: "80%",
                                    ".MuiInputLabel-outlined": {
                                        color: "black",
                                    },
                                    ".MuiInputBase-input.MuiOutlinedInput-input": {
                                        color: "#ff6900",
                                    },
                                }}
                                onChange={(e) => dispatch(setAnswer({currentPage: currentPage * pageSize + i, index: j, answer: e.target.value}))}
                            />
                            <Button                     
                                sx={{
                                    background:(j === parent.correctAnswer) ? "green" : "white",
                                    border: (j === parent.correctAnswer) ?  "solid 3px darkgreen" : "solid 3px #b34900",
                                    color: (j === parent.correctAnswer) ? "white" : "#ff6900",
                                    margin: "15px 0px",
                                    width: "5%",
                                    "&:hover": {
                                        backgroundColor: "green",
                                        border: "solid 3px darkgreen",
                                        color: "white",
                                    },
                                }}
                                variant="contained" 
                                onClick={() => dispatch(setCorrectAnswer({currentPage: currentPage * pageSize + i, index: j}))}>
                            </Button>
                            <Button                     
                                sx={{
                                    background: "white",
                                    border: "solid 3px darkred",
                                    color: "red",
                                    fontSize: "20px",
                                    fontFamily: "sans-serif",
                                    fontWeight: "bold",
                                    margin: "15px 0px",
                                    width: "5%",
                                    "&:hover": {
                                        backgroundColor: "red",
                                        border: "solid 3px darkred",
                                        color: "white",
                                    },
                                }}
                                variant="contained" 
                                onClick={() => dispatch(deleteAnswer({currentPage: currentPage * pageSize + i, index: j}))}>
                                X
                            </Button>
                        </div>
                    ))}
                    <div style={styles.answerWrap} id="qeAnswerWrap">
                        <Button                     
                            sx={{
                                background: "white",
                                border: "solid 3px darkgreen",
                                color: "green",
                                fontSize: "20px",
                                fontFamily: "sans-serif",
                                fontWeight: "bold",
                                margin: "15px auto",
                                padding: "12px",
                                width: "5%",
                                "&:hover": {
                                    backgroundColor: "green",
                                    border: "solid 3px darkgreen",
                                    color: "white",
                                },
                            }}
                            variant="contained" 
                            onClick={() => dispatch(addAnswer({currentPage: currentPage * pageSize + i, answer: "Új válasz"}))}>
                            +
                        </Button>
                    </div>
                </div>
            ))}
            {Math.ceil(quiz.value.questionAndAnswers.length / pageSize) === currentPage + 1 &&
            <div style={styles.answerWrap} id="qeAnswerWrap">
                <Button                     
                    sx={{
                        background: "white",
                        border: "solid 3px darkgreen",
                        color: "green",
                        fontSize: "20px",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        margin: "15px auto",
                        padding: "12px",
                        width: "5%",
                        "&:hover": {
                            backgroundColor: "green",
                            border: "solid 3px darkgreen",
                            color: "white",
                        },
                    }}
                    variant="contained" 
                    onClick={() => dispatch(addQna({currentPage: currentPage * pageSize + pageSize - 1, qna: {question: "Kérdés", answers: ["Válasz 1", "Válasz 2", "Válasz 3", "Válasz 4"], correctAnswer: 0}}))}>
                    +
                </Button>
            </div>
            }
            <Pagination 
                count={quiz.value.length === 0 ? 0 : Math.ceil(quiz.value.questionAndAnswers.filter(item => item.correctAnswer !== -1).length / pageSize)} 
                variant="outlined" 
                size="large" 
                showFirstButton 
                showLastButton
                boundaryCount={0}
                page={currentPage + 1 }
                onChange={handlePageChange}
                sx={{
                    margin: "20px 0px",
                    width: "100%",
                    ul: {
                        justifyContent: "center",
                    },
                    button:{
                        borderColor: "#b34900",
                        color: "#ff6900"
                    },
                }}
            />
        </div>
    );
  }
  