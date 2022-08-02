import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import axios from "axios";
import { TextField } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '40%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height:400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Home = () => {
 
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus':{
              width: '20ch',
            },
          },
        },
      }));

    function createData(id,title,completed) {
        return { id,title,completed};
      }

      const [data, setData] = useState([]);
      const [search,setSearch]=useState(''); //search state
      const [order,setOrder]=useState(true); //state for sorting the table
      const [currentUserid,setCurrentUserId]=useState(null);
      const [user,setUser]=useState([]);
      const [currtodo,setCurrtodo]=useState(null);
      
      
      //modal

      const [open, setOpen] = useState(false); //modal state
    

      const handleClickOpen = (row) => {
        
        setCurrentUserId(row.userId); //current user's id
       
        setCurrtodo(row.id);
        setOpen(true);
      };
      
      const handleClose = (value) => {
        setOpen(false);
      };
      console.log('currtodo',currtodo);
      console.log('current',currentUserid);

      //modal


     
      const handleSearch=(value)=>{
        setSearch(value);
      }


      const getUserData=async ()=>{
        const metadata=await axios.get(`https://jsonplaceholder.typicode.com/users`);
        // console.log('userdata',metadata.data);
        setUser(metadata.data);
      }
     

      const getData = async () => {
        const todos = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        // console.log(todos.data)
        setData(todos.data);
      };

      useEffect(() => {
        getData();
        getUserData();
      }, [])

      const handleD=()=>{
        setOrder(false);
      }
      const handleI=()=>{
        setOrder(true);
      }
      let res=null; //res will contain filtered data

      //search logic
      if(search!==''){
        res=data.filter((row)=>{
          return (
            row.title
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase()) ||
            row.id
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase()) ||
            row.userId
              .toString()
              .toLowerCase()
              .includes(search.toString().toLowerCase())
          );
        })
      }
      else{
        res=data;
      }
      //search logic

      console.log('order',order);
      //sorting logic
      if(order===true){
        res.sort((a,b)=>{
          
          return a.id>b.id?1:-1;
        })
      }
      else{
        res.sort((a,b)=>{
          return a.id<b.id?1:-1;
        })
      }
    //sorting logic

      
      const rows=[];
      res.map((todoObj)=>{
        let rowfield=createData(todoObj.id,todoObj.title,todoObj.completed);
        rows.push(rowfield);
        // console.log(rows);
      })

      let currentuser=user.filter((user)=>{
        return user.id===currentUserid;
      })

      // console.log('current user',currentuser);

    let currentusertodo=null;//this will store current user's info from todolist  
     if(open===true){
      currentusertodo=res.filter((obj)=>{
        return obj.id===currtodo
      })
      console.log('currentusertodo',currentusertodo);
     }

  return (
    <>

<TableContainer component={Paper} style={{maxWidth:'60%'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size='small'>
        <TableHead >
            <p style={{marginTop:'1rem',marginLeft:'1rem',fontWeight:'bolder',fontSize:'1.5rem',display:'flex',justifyContent:'space-between'}}>Todos   
            
      <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search"
          onChange={(e)=>{handleSearch(e.target.value)}}
          value={search}
          style={{display:'flex',justifyContent:'space-between',marginLeft:'60%',minWidth:'190%'}}
        />
        
            </p>
             
           
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell size='medium' align='center' style={{fontWeight:'bolder'}} >Todo ID<ArrowDropUpIcon onClick={handleD} style={{fontSize:'200%',cursor:'pointer'}}/><ArrowDropDownIcon onClick={handleI} style={{fontSize:'200%',cursor:'pointer'}}/></TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Title</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Status</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {row.id}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{(row.completed===true)?'completed':'incomplete'}</TableCell>
              <TableCell align="center"><Button variant="contained" size='small' style={{maxWidth:'2rem',maxHeight:'2.5rem'}} onClick={()=>{handleClickOpen(row)}}>View User</Button></TableCell>
            
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </TableContainer>

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" align='center' >
            User Details
          </Typography>
          <br></br>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} align='center' variant='inherit'>
            TodoID:  {(open)?currentusertodo[0].id:""}
          </Typography>
          <br></br>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} align='center' variant='inherit'>
           Todo Title:  {(open)?currentusertodo[0].title:""}
          </Typography>
          <br></br>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} align='center' variant='inherit'>
            User ID:  {(open)?currentUserid:null}
          </Typography>
          <br></br>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} align='center' variant='inherit'>
            Name:  {(open)?currentuser[0].name:null}
          </Typography>
          <br></br>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} align='center' variant='inherit'>
          Email:  {(open)?currentuser[0].email:null}
          </Typography>
          <br></br>
        </Box>
      </Modal>

    </>
  )
}

export default Home

