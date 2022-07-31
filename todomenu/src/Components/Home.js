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
import List from './List';



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
      const [search,setSearch]=useState('');
      const [dataSource,setDataSource]= useState(data);
      const [filterTable,setTableFilter]=useState([])

      const handleSearch=(e)=>{
 
        if(e.target.value!==""){
          setSearch(e.target.value);
          const filterTable=dataSource.filter((row) =>
          // note that I've incorporated the searchedVal length check here
          !search.length 
            .toString()
            .toLowerCase()
            .includes(search.toString().toLowerCase()) 
        )

            
            
            setTableFilter([...filterTable]);
            console.log('datasource',dataSource);
            console.log('filter->',filterTable);
        }
        else{
          setSearch(e.target.value);
          setDataSource([...dataSource])
        }

        // let lowerCase = e.target.value.toLowerCase();
        // setSearch(lowerCase);
      }

     

      const getData = async () => {
        const todos = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
        console.log(todos.data)
        setData(todos.data);
      };

      useEffect(() => {
        getData();
      }, [])
      
      
      
    //   const rows = [
    //     createData('Frozen yoghurt', 159, 6.0),
    //     createData('Ice cream sandwich', 237, 9.0),
    //     createData('Eclair', 262, 16.0),
    //     createData('Cupcake', 305, 3.7),
    //     createData('Gingerbread', 356, 16.0),
    //   ];

      let res=data;
      const rows=[];
      res.map((todoObj)=>{
        let rowfield=createData(todoObj.id,todoObj.title,todoObj.completed);
        rows.push(rowfield);
        // console.log(rows);
      })

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
          onChange={handleSearch}
          value={search}
          style={{display:'flex',justifyContent:'space-between',marginLeft:'60%',minWidth:'190%'}}
        />
        
            </p>
             {/* <List data={res} input={search}/> */}
           
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell size='medium' align='center' style={{fontWeight:'bolder'}} >Todo ID</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Title</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Status</TableCell>
            <TableCell align="center" style={{fontWeight:'bolder'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {search.length>0 ?filterTable.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {row.id}
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{(row.completed===true)?'completed':'incomplete'}</TableCell>
              <TableCell align="center"><Button variant="contained" size='small' style={{maxWidth:'2rem',maxHeight:'2.5rem'}}>View User</Button></TableCell>
              
            </TableRow>
          ))
        :
        rows.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row" align='center'>
              {row.id}
            </TableCell>
            <TableCell align="center">{row.title}</TableCell>
            <TableCell align="center">{(row.completed===true)?'completed':'incomplete'}</TableCell>
            <TableCell align="center"><Button variant="contained" size='small' style={{maxWidth:'2rem',maxHeight:'2.5rem'}}>View User</Button></TableCell>
            
          </TableRow>
        ))
        }
        </TableBody>
      </Table>
    </TableContainer>

    </>
  )
}

export default Home