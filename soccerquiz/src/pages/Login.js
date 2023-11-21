import { API_URL } from '../environment/enviroment';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Grid , Button } from '@mui/material';

export default function Login() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [nameErrorText, setNameErrorText] = useState("");

    const [password, setPassowrd] = useState("");
    const [passwordErrorText, setPasswordErrorText] = useState("");

    function validation() {
        setNameErrorText("");
        setPasswordErrorText("");

        var check = true;
        if(name.length === 0) {
            setNameErrorText("Mező üres")
            check = false;
        }

        if(password.length === 0) {
            setPasswordErrorText("Mező üres")
            check = false;
        }

        return check;
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        if(validation()) {
            try {
                const response = await fetch(API_URL +'/api/User/Login', {
                    method: 'POST',
                    body: JSON.stringify({
                        userName: name,
                        password: password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json()
    
                if(result.status === 401) {
                    setNameErrorText("Név nem létezik");
                }
                else if (result.status === 403) {
                    setPasswordErrorText("Jelszó helytelen")
                }
                else if(response.ok) {
                    localStorage.setItem("user", JSON.stringify(result));
                    navigate("/home");
                }
            } catch (error) {
                console.error(error)
            }
        }
    };

    const styles = {
        title: {
            color: "#ff6900",
        },
        loginButton: {
            background: "#ff6900",
            padding: "10px 40px",
        },
        goToRegisterdButton: {
            borderColor: "#ff6900",
            color: "#ff6900",
        }, 
        accountLabel: {
            marginRight: "10px",
        }
    };
    
    return (
        <div id="userSiteWrap">
            <form id="userForm" onSubmit={handleSubmit}>
                <h1 style={styles.title}>Belépés</h1>
                <Grid container spacing={2} justifyContent="center" direction="column">
                    <Grid item xs={8}>
                        <TextField 
                        label="Név" 
                        variant="outlined" 
                        required={true}
                        error={nameErrorText.length > 0}
                        helperText={nameErrorText}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField 
                        label="Jelszó" 
                        variant="outlined" 
                        required={true}
                        error={passwordErrorText.length > 0}
                        helperText={passwordErrorText}
                        onChange={(e) => setPassowrd(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button style={styles.loginButton} size="large" type="submit" variant="contained">Belép</Button>
                    </Grid>
                    <Grid item xs={10}>    
                        <label style={styles.accountLabel}>Nincsen fiókod?</label>               
                        <Button style={styles.goToRegisterdButton} size="small" variant="outlined" component={Link} to="/register">Regisztrálás</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
  }
  