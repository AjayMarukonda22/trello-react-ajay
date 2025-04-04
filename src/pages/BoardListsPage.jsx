import React, { useEffect, useRef, useState } from 'react'
import { AppBar, Toolbar, Typography, Grid} from '@mui/material'
import {useParams } from 'react-router-dom'
import List from '../components/List'
import AddList from '../components/AddList'
import axios from 'axios'
import listingLoader from '../utils/listingLoader'
const BoardListsPage = () => {

  const {boardId} = useParams();
     
  
    const [lists, setLists] = useState([]);
    const [cardsPerList, setCardsperList] = useState({});
    const board = useRef(null);

    console.log(`Boards :`, board);
    console.log( 'Lists',lists);
    console.log('cards',cardsPerList);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const [boardData, listsData, cardsData] = await listingLoader(boardId);
          board.current = boardData;
          setLists(listsData);
          setCardsperList(cardsData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [boardId]);
    const handleListSubmit = async (name) => {
        try {
            const response = await axios.post('https://api.trello.com/1/lists', null,  
              {
                params: { key : import.meta.env.VITE_API_KEY,
                          token : import.meta.env.VITE_API_TOKEN,
                   name, idBoard : board.current.id },
                headers: { Accept: 'application/json' },
              }
        );

        setLists([...lists, response.data])
        }
        catch(err) {
          console.log('error while adding new list', err);
        }
    }

    const handleArchiveList = async (listId) => {
       try {
           const archiveList = await axios.put(`https://api.trello.com/1/lists/${listId}/closed`, null, 
            {
              params : { value : true, 
                key : import.meta.env.VITE_API_KEY,
                token : import.meta.env.VITE_API_TOKEN,
              },
              headers : {Accept : 'application/json'},
            }
           );

           const updatedList = lists.filter((list) => {
                 return list.id !== archiveList.data.id;
           })

           setLists(updatedList);
       }
       catch(err) {
          console.log('Error while archiving list', err);
       }
    }

    const filteredList = lists.filter((list) => !list.closed);

  return (
    <div>
         <AppBar position="static" sx={{ backgroundColor: 'lavender' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ width: '100%',color: 'black'}} align='center'>
        {board.current ? board.current.name : 'Loading...'}
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container wrap = 'nowrap' spacing={2} sx={{
    overflowX: 'auto',
    flexWrap: 'nowrap',
  }}>
    {filteredList.map((list) => (
      <Grid item key={list.id} sx={{ minWidth: 300 }}>
        <List name = {list.name} id = {list.id} cards = {cardsPerList[list.id]} handleArchiveList={handleArchiveList}/>
      </Grid>
    ))}
   <Grid item> 
   <AddList handleListSubmit={handleListSubmit} />
   </Grid>
  </Grid>  
    </div>
  )
}

export default BoardListsPage