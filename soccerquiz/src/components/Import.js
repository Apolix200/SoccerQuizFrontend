import { API_URL } from '../environment/enviroment';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


export default function Import() {

    const[importOk, setImportOk] = useState("");
    const formData = new FormData()

    var user = JSON.parse(localStorage.getItem("user") || "[]")

    const handleFileImport = async (event)=> {
        setImportOk("");

        if(event.target.files[0] != null) {     
            formData.append("FormFile", event.target.files[0]); 
            formData.append("AdminId", user.id); 

            try {
                const response = await fetch(API_URL +'/api/Quiz/ImportQuiz',{
                    method: 'POST',
                    body: formData,
                }) 

                if (response.ok) {
                    setImportOk("Importálás sikerült");
                }
                else if (response.status === 420) {
                    setImportOk("Csak xlsx fájl formátum támogatott");
                }
                else {
                    setImportOk("Importálás sikertelen");
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
   
    const styles = {
        importWrap: {
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            textAlign: "center",
            width: "90%",
        },
        formWrap: {
            width: "100%",
            textAlign: "center"
        },
        importButton: {
            background: "#ff6900",
            color: "white",
            height: "50px",
            width: "150px",
        },
        fileInput: {
            border: "3px solid red",
            opacity: "0",
            height: "50px",
            position: 'absolute',
            width: "150px",
        },
        title: {
            fontSize: "30px",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            textAlign: "left",
        },
        description: {
            fontSize: "20px",
            fontFamily: "sans-serif",
            margin: "auto",
            textAlign: "left",
            width: "90%"
        },
    }

    return (
        <div style={styles.importWrap}>
            <form style={styles.formWrap}>
                <Button style={styles.importButton} variant="contained" startIcon={<CloudUploadIcon />}>
                    Importálás
                    <input style={styles.fileInput} onChange={handleFileImport} type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                </Button>
                <p>
                {importOk}
                </p>
            </form>     
            <p style={styles.title}>Importálási útmutató:</p>
            <p style={styles.description}>
                1. Excel tábla neve adja meg a kvíz nevét.<br></br>
                2. Excel oszlopok: A B C D E<br></br>
                &emsp; •	A: Id(nem használt)<br></br>
                &emsp; •	B: Kérdés<br></br>
                &emsp; •	C: Betűjel(nem használt)<br></br>
                &emsp; •	D: Válaszok<br></br>
                &emsp; •	E: Helyes válasz sora<br></br>
                3. A kérdés nem lóghat túl a válaszok során<br></br>
                4. Minden egyes talált kérdéstől számított következő 4 sor számít egy elemenek<br></br>
                5. Egy elem nem lehet hosszab 4 sornál<br></br>
                6. Az excel fálj formátum xlsx kell hogy legyen<br></br>
            </p>
        </div>
    );
}
