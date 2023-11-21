import { API_URL } from '../environment/enviroment';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { TextField, Grid , Button } from '@mui/material';

export default function Register() {

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
        else if (password.length < 8) {
            setPasswordErrorText("Legalább 8 karakter")
            check = false;
        }

        return check;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(validation()) {
            try {
                const response = await fetch(API_URL +'/api/User/Register', {
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
    
                if(result.status === 422) {
                    setNameErrorText("Név foglalt")
                }
                else if (result.status === 420) {
                    setPasswordErrorText("Legalább 8 karakter")
                }
                else if(response.ok) {
                    navigate("/login");
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
        registerButton: {
            background: "#ff6900",
            padding: "10px 40px",
        },
        goToLoginButton: {
            borderColor: "#ff6900",
            color: "#ff6900",
        }, 
        accountLabel: {
            marginRight: "10px",
        }
    };

    return (
        <div id="userSiteWrap" >
            <form id="userForm" onSubmit={handleSubmit}>
                <h1 style={styles.title}>Regisztrálás</h1>
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
                        <Button style={styles.registerButton} size="large" type="submit" variant="contained">Regisztrálj</Button>
                    </Grid>
                    <Grid item xs={10}>    
                        <label style={styles.accountLabel}>Van felhasználód?</label>               
                        <Button style={styles.goToLoginButton} size="small" variant="outlined" component={Link} to="/login">Belépés</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
  }
  