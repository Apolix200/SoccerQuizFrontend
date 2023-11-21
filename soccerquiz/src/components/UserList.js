import { Button } from '@mui/material';
import { API_URL } from '../environment/enviroment';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { hungarianTextMap } from './TextMapHun';
  
export default function UserList() {

    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    var user = JSON.parse(localStorage.getItem("user") || "[]")

    useEffect(() => {
        fetch(API_URL +"/api/User?adminId="+ user.id)  
        .then(response => response.json())
        .then(data => setRows(data))
        .catch(error => console.error(error));
    }, [user.id]);

    function handleSelectionChange(id) {
        setSelectedId(id[0]);
        var userDeleteButton = document.getElementById("userDeleteButton");
        if (userDeleteButton.style.display === "none") {
            userDeleteButton.style.display = "flex"; 
        }
    }

    async function handleDelete() {
        if(window.confirm("Biztos hogy törlöd?")) {
            try {       
                const response = await fetch(API_URL +"/api/User?id="+ selectedId + "&adminId=" + user.id, {method: "DELETE"})  
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
    ];

    const styles = {
        deleteButton: {
            background: "#ff6900",
            color: "white",
            width: "100px",
            display: "none",
        },
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
            <Button style={styles.deleteButton} id="userDeleteButton" variant="contained" onClick={handleDelete}>
                Törlés
            </Button>

        </div>
    );
  }
  