import { API_URL } from '../environment/enviroment';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { setQuiz } from '../reducer/QuizSlice';

export default function Home() {

    const navigate = useNavigate();

    const[quizList, setQuizList] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        fetch(API_URL + "/api/Quiz/GetActiveQuiz")  
        .then(response => response.json())
        .then(data => setQuizList(data))
        .catch(error => console.error(error));
    }, []);

    function handleOpen(i)  {
        dispatch(setQuiz(quizList[i]))
        navigate("/quiz");
    }

    const styles = {
        quizList: {
            display: "flex",
            flexDirection: "column",
            textAlign: "center"
        },
        title: {
            color: "#ff6900",
        },
    };
    

    return (
        <div style={styles.quizList}>
            <h1 style={styles.title}>Kvízek</h1>
            {quizList.map((key, i) => (
                <Button id="quizButton" size="large" variant="contained" onClick={() => handleOpen(i)} key={i}>{key.quizName}</Button>
            ))}
        </div>
    );
  }
  