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
    }

    return (

        <form style={styles.importWrap}>
            <Button style={styles.importButton} variant="contained" startIcon={<CloudUploadIcon />}>
                Importálás
                <input style={styles.fileInput} onChange={handleFileImport} type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
            </Button>
            <p>
             {importOk}
            </p>
        </form>     
    );
}
