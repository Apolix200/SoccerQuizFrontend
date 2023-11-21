import { API_URL } from '../environment/enviroment';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { hungarianTextMap } from './TextMapHun';
import moment from 'moment'
  
export default function ResultList() {

    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    var user = JSON.parse(sessionStorage.getItem("user") || "[]")

    useEffect(() => {

        if(user.isAdmin){
            fetch(API_URL +"/api/Result/GetAll?adminId="+ user.id)  
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.error(error));
        }
        else{
            fetch(API_URL +"/api/Result?userId="+ user.id)  
            .then(response => response.json())
            .then(data => setRows(data))
            .catch(error => console.error(error));
        }
    }, [user.id, user.isAdmin]);

    function handleSelectionChange(id) {
        setSelectedId(id[0]);
        var resultDeleteButton = document.getElementById("resultDeleteButton");
        if (resultDeleteButton !== null && resultDeleteButton.style.display === "none") {
            resultDeleteButton.style.display = "flex"; 
        }
    }

    async function handleDelete() {
        if(window.confirm("Biztos hogy törlöd?")) {
            try {       
                const response = await fetch(API_URL +"/api/Result?id="+ selectedId + "&adminId=" + user.id, {method: "DELETE"})  
                if(response.ok) {
                    setRows(rows.filter(f => f.id !== selectedId));
                }
            } catch (error) {
                console.error(error);
            }   
        }
    }
    
    const columns = [
        {
            field: 'userName',
            headerName: 'Név',
            flex: 1,
        },
        {
            field: 'quizName',
            headerName: 'Kvíz',
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'Pont',
            flex: 1,
            valueGetter: (params) => {
                const data = rows.find(item => item.id === params.value);
                return data !== undefined ? data.score + "/" + data.answers.length : 0
            } 
        },
        {
            field: 'created',
            headerName: 'Dátum',
            flex: 1, 
            valueGetter: params => {
                moment.locale();         
                return moment(params?.value).format("LLL");
            }
        },
    ];

    const styles = {
        wrapGrid: {
            marginTop: "20px",
        },
        deleteButton: {
            background: "#ff6900",
            color: "white",
            width: "100px",
            display: "none"
        },
    };
      
    return (
        <div style={styles.wrapGrid}>
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
                resizable={true}
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
            {user.isAdmin && <Button style={styles.deleteButton} id="resultDeleteButton" variant="contained" onClick={handleDelete}>
                Törlés
            </Button>
            }

        </div>
    );
  }
  