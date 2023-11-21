import { API_URL } from '../environment/enviroment';
import { Pagination } from "@mui/material";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setCorrectAnswer } from '../reducer/QuizSlice';

export default function Quiz() {

    const[currentPage, setCurrentPage] = useState(0);
    const quiz = useSelector(state => state.quiz);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    var user = JSON.parse(localStorage.getItem("user") || "[]")

    useEffect(() => {
        if(quiz.value.length === 0) {
            navigate("/home");
        }
    }, [quiz, navigate]);

    if(quiz.value.length === 0) {
        return null;
    }

    function handleSelect(i)  {
        dispatch(setCorrectAnswer({currentPage: currentPage, index: i}))
    }

    function handlePageChange(event, pageCount) {
        setCurrentPage(pageCount - 1);
    }

    function handleBackNavigation() {
        setCurrentPage(currentPage - 1);
    }

    const handleNextNavigation = async () => {
        if(quiz.value.questionAndAnswers.length - 1 === currentPage) {
            if(window.confirm("Biztos hogy befejezed?")) {
                try {
                    const response = await fetch(API_URL +'/api/Result/CalculateResult', {
                        method: 'POST',
                        body: JSON.stringify({
                            quiz: quiz.value,
                            userId: user.id
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
        
                    if(response.ok) {
                        navigate("/result");
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
        else {
            setCurrentPage(currentPage + 1);
        }
    }

    const styles = {
        quizWrap: {
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            textAlign: "center",
        },
        question: {
            color: "#b34900",
            fontSize: "20px",
            marginTop: "0px",
            marginBottom: "10px",
            width: "80%",
        },
        currentOfAllPage: {
            color: "#b34900",
            fontSize: "20px",
            width: "80%",
            marginTop: "10px",
        },
        navigateButtonWrap: {
            width: "90%",
            margin: "10px auto",
            display: "flex",
            flexDirection: "row",
        }
    };

    return (
        <div style={styles.quizWrap}>
            <h1 style={styles.currentOfAllPage}>{currentPage + 1} / {quiz.value.questionAndAnswers.length}</h1>
            <h1 style={styles.question}>{quiz.value.questionAndAnswers[currentPage].question}</h1>
            {quiz.value.questionAndAnswers[currentPage].answers.map((element, index) => (
                <Button                     
                    sx={{
                        background: (index === quiz.value.questionAndAnswers[currentPage].correctAnswer) ? "#0096FF" : "white",
                        border: "solid 3px #b34900",
                        color: (index === quiz.value.questionAndAnswers[currentPage].correctAnswer) ? "white" : "#ff6900",
                        fontSize: "20px",
                        fontFamily: "sans-serif",
                        fontWeight: "bold",
                        margin: "10px auto",
                        textTransform: "none",
                        padding: "10px 5px",
                        width: "90%",
                        "&:hover": {
                            backgroundColor: "#0096FF",
                            color: "white",
                        },
                        "@media (min-width: 1024px)": {
                            width: "45%",
                        }
                    }}
                    size="large" 
                    variant="contained" 
                    key={index}
                    onClick={() => handleSelect(index)}>
                    {element}
                </Button>
            ))}
            <div style={styles.navigateButtonWrap}>
                <Button 
                    sx={{
                        display: (currentPage > 0) ? "block" : "none",
                        background: "#ff6900",
                        color: "white",
                        width: "140px",
                        height: "40px",
                        "&:hover": {
                            background: "#ff6900",
                            color: "white",
                        },
                        "@media (min-width: 480px)": {
                            width: "200px",
                            height: "50px",
                        }
                    }}
                    variant="contained" 
                    onClick={handleBackNavigation}>
                    {"<"} Vissza
                </Button>
                <Button 
                    sx={{
                        display: (quiz.value.questionAndAnswers.length - 1 >= currentPage && quiz.value.questionAndAnswers[currentPage].correctAnswer !== -1) ? "flex" : "none",
                        background: "#ff6900",
                        color: "white",
                        width: "140px",
                        height: "40px",
                        marginLeft: "auto",
                        "&:hover": {
                            background: "#ff6900",
                            color: "white",
                        },
                        "@media (min-width: 480px)": {
                            width: "200px",
                            height: "50px",
                        }
                    }}
                    variant="contained" 
                    onClick={handleNextNavigation}>
                    {quiz.value.questionAndAnswers.length - 1 === currentPage ? "Befejez" : "Következő"} {">"}
                </Button>
            </div>
            <Pagination 
                count={quiz.value.questionAndAnswers.filter(item => item.correctAnswer !== -1).length} 
                variant="outlined" 
                size="large" 
                showFirstButton 
                showLastButton
                hidePrevButton 
                hideNextButton
                boundaryCount={0}
                page={currentPage + 1}
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
  