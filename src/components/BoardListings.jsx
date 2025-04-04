import React, { useEffect, useState } from 'react';
import { Grid,} from '@mui/material';
import axios from 'axios';
import Board from './Board'
import AddItem from './AddItem';


const Boards = () => {
   const [boards, setBoards] = useState([]);

   console.log('im in boards')

   useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('https://api.trello.com/1/members/me/boards', 
            {params: {
              key : import.meta.env.VITE_API_KEY,
              token : import.meta.env.VITE_API_TOKEN,
            }},
            {headers : {
              Accept : 'application/json'
            }}
          );
          setBoards(response.data);
          console.log(response.data);
        }
        catch(err) {
          console.log(`Error while fetching Boards`, err);
        }
        }

        fetchData();

   }, [])

   const allBoards = boards.map((board) => {
    return <Grid key={board.id} item xs={12} sm={6}>
                <Board board = {board}/>
            </Grid>
   })


   const handleBoardSubmit = async (boardName) => {
      if(!boardName.trim())
        return ;
      try {
          const response = await axios.post('https://api.trello.com/1/boards/', null, {
            params : {
              name : boardName,
              key : import.meta.env.VITE_API_KEY,
              token : import.meta.env.VITE_API_TOKEN,
            }
          })
          setBoards([...boards, response.data])
      }
      catch(err) {
        console.log('Error while creating a board', err);
      }
   }
    
  return (
    <div style={{ overflow: 'hidden' }}>
      <Grid container spacing={2}>
          {allBoards}
          <Grid item>
          <AddItem name = {'Board'} addNewItem={handleBoardSubmit} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Boards;
