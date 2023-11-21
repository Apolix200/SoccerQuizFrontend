import { Button } from '@mui/material';
import { API_URL } from '../environment/enviroment';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { hungarianTextMap } from './TextMapHun';
import { addQuizEdit, setQuizEdit } from '../reducer/QuizEditSlice';
import { setLoading } from '../reducer/LoadingSlice';
  
export default function QuizList() {

    const loading = useSelector(state => state.loading);

    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    var user = JSON.parse(sessionStorage.getItem("user") || "[]")

    useEffect(() => {
        fetch(API_URL +"/api/Quiz?adminId="+ user.id)  
        .then(response => response.json())
        .then(data => setRows(data))
        .catch(error => console.error(error));
    }, [user.id]);

    useEffect(() => {
        if(loading.value) {
            dispatch(setQuizEdit(rows.find(item => item.id === selectedId)));      
            navigate("/quizedit"); 
        }
    }, [loading]);


    const columns = [
        {
            field: 'quizName',
            headerName: 'Név',
            minWidth: "200",
            editable: true,
        },
        {
            field: 'isActive',
            headerName: 'Aktív',
            minWidth: "50",
            sortable: false,
            renderCell: (params) => {
                const onClick = async (event) => {  
                    try {
                        const response = await fetch(API_URL +"/api/Quiz/ActivateQuiz?id="+ params.rowNode.id + "&adminId=" + user.id + "&isActive=" + params.value, {method: "PUT"});

                        if(response.ok) {
                            setRows(list => (
                                list.map(item => (
                                    item.id === params.rowNode.id ? 
                                    {...item, isActive: !params.value}  : item
                                )
                            )));
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                };
    
                if(params.value === true){
                    return <Button sx={{bgcolor: "green", border: "black 1px solid", color: "white" }} variant="contained" onClick={onClick}>Aktív</Button>;
                }
                else {
                    return <Button sx={{bgcolor: "red", border: "black 1px solid", color: "white" }} variant="contained" onClick={onClick}>Inaktív</Button>;
                }
            }
        },
      ];
    

    function handleSelectionChange(id) {
        setSelectedId(id[0]);
        var quizDeleteButton = document.getElementById("quizDeleteButton");
        var quizOpenButton = document.getElementById("quizOpenButton");
        if (quizDeleteButton.style.display === "none" ) {
            quizDeleteButton.style.display = "flex"; 
        }
        if(quizOpenButton.style.display === "none") {
            quizOpenButton.style.display = "flex";    
        }
    }

    async function handleDelete() {
        if(window.confirm("Biztos hogy törlöd?")) {
            try {       
                const response = await fetch(API_URL +"/api/Quiz?id="+ selectedId + "&adminId=" + user.id, {method: "DELETE"})  
                if(response.ok) {
                    setRows(rows.filter(f => f.id !== selectedId));
                }
            } catch (error) {
                console.error(error);
            }   
        }
    }

    function handleOpen() {
        dispatch(setLoading(true));     
    }

    function handleCreate() {
        setSelectedId(rows.length);
        dispatch(setLoading(true)); 
    }

    const styles = {
        deleteButton: {
            background: "#ff6900",
            color: "white",
            width: "100px",
            marginRight: "10px",
            display: "none"
        },
        createButton: {
            background: "#ff6900",
            color: "white",
            width: "100px",
            marginRight: "10px",
        },
        editButtons: {
            display: "flex",
            flexDirection: "row"
        }
    };
      
    return (
        <div>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                    pageSize: 8,
                    },
                },
                }}
                pageSizeOptions={[8]}
                onRowSelectionModelChange={(id) => handleSelectionChange(id)}
                localeText={hungarianTextMap}
                disableMultipleSelection={true}
                disableColumnSelector={true} 
                sx={{
                    '.MuiDataGrid-columnHeaders': {
                      backgroundColor: '#ff6900',
                      color: "white"
                    },
                    '.MuiDataGrid-row.Mui-hovered': {
                        backgroundColor: '#99d5ff',
                    },
                    ".MuiDataGrid-row.Mui-selected.Mui-hovered": {
                        backgroundColor: '#0096FF',
                        color: "white",
                    },
                    ".MuiDataGrid-row.Mui-selected": {
                        backgroundColor: '#0096FF',
                        color: "white",
                    },
                    "@media (max-width: 1024px)": {
                        ".MuiDataGrid-selectedRowCount": {
                            visibility: "visible"
                        },
                    }
                }}
            />
            <div style={styles.editButtons}>
{/*                 <Button style={styles.createButton} id="quizCreateButton" variant="contained" onClick={handleCreate}>
                    Hozzáad
                </Button> */}
                <Button style={styles.deleteButton} id="quizOpenButton" variant="contained" onClick={handleOpen}>
                    Megnyitás
                </Button>
                <Button style={styles.deleteButton} id="quizDeleteButton" variant="contained" onClick={handleDelete}>
                    Törlés
                </Button>
            </div>
        </div>
    );
  }
  