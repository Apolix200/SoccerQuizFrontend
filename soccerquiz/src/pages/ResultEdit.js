import { API_URL } from '../environment/enviroment';
import { Pagination } from "@mui/material";
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

export default function ResultEdit() {

    const[quiz, setQuiz] = useState({});
    const[currentPage, setCurrentPage] = useState(0);
    const result = useSelector(state => state.quizResult);
    const navigate = useNavigate();

    var user = JSON.parse(sessionStorage.getItem("user") || "[]")

    useEffect(() => {
        if(result.value.length === 0) {
            navigate("/result");
        }
        else {
            fetch(API_URL +"/api/Result/GetQuizByResult?id="+ result.value.id + "&userId=" + user.id)  
            .then(response => response.json())
            .then(data => setQuiz(data))
            .catch(error => console.error(error));
        }
    }, [result, navigate, user.id]);

    if(result.value.length === 0 || Object.keys(quiz).length === 0) {
        return null;
    }

    function handlePageChange(event, pageCount) {
        setCurrentPage(pageCount - 1);
    }

    function handleBackNavigation() {
        setCurrentPage(currentPage - 1);
    }

    const handleNextNavigation = async () => {
        if(quiz.questionAndAnswers.length - 1 === currentPage) {
            if(window.confirm("Biztos hogy befejezed?")) {
                try {
                    const response = await fetch(API_URL +'/api/Result/CalculateResult', {
                        method: 'POST',
                        body: JSON.stringify({
                            quiz: quiz,
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

    var test = false;

    return (
        <div style={styles.quizWrap}>
            <h1 style={styles.currentOfAllPage}>{currentPage + 1} / {quiz.questionAndAnswers.length}</h1>
            <h1 style={styles.question}>{quiz.questionAndAnswers[currentPage].question}</h1>
            {quiz.questionAndAnswers[currentPage].answers.map((element, index) => (  
                <TextField   
                    label=""
                    value={element}
                    variant="outlined"
                    disabled       
                    sx={{
                        width: "90%",
                        ".MuiInputBase-formControl": {
                            background: 
                            (index === result.value.answers[currentPage]) ?  
                            ((index === quiz.questionAndAnswers[currentPage].correctAnswer) ? "green" : "red") :
                            ((index === quiz.questionAndAnswers[currentPage].correctAnswer) ? "lightgreen" : "white"),
                            border: 
                            (index === result.value.answers[currentPage]) ?  
                            ((index === quiz.questionAndAnswers[currentPage].correctAnswer) ? "solid 3px darkgreen" : "solid 3px darkred") :
                            ((index === quiz.questionAndAnswers[currentPage].correctAnswer) ? "solid 3px green" : "solid 3px #b34900"),
                            fontSize: "20px",
                            fontFamily: "sans-serif",
                            fontWeight: "bold",
                            margin: "10px auto",
                            textTransform: "none",
                            width: "100%",
                        },
                        ".MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled": {
                            WebkitTextFillColor:
                            (index === result.value.answers[currentPage]) ?  
                            "white":
                            "#ff6900",
                            textAlign: "center",
                            padding: "12px 5px",
                        },
                        "@media (min-width: 1024px)": {
                            width: "45%",        
                        }
                    }}        
                    key={index}
                />
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
                        display: (quiz.questionAndAnswers.length - 1 > currentPage) ? "flex" : "none",
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
                    Következő {">"}
                </Button>
            </div>
            <Pagination 
                count={quiz.questionAndAnswers.filter(item => item.correctAnswer !== -1).length} 
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
  