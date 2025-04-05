import React, { useEffect, useReducer } from 'react';
import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import List from '../components/List';
import axios from 'axios';
import listingLoader from '../utils/listingLoader';
import AddItem from '../components/AddItem';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import ErrorDisplay from '../components/ErrorDisplay';
import { initialState, reducer, actions } from '../utils/boardListsReducer';

const BoardListsPage = () => {
  const { boardId } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { board, lists, cardsPerList, loading, error } = state;


  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(actions.fetchStart());
        const [boardData, listsData, cardsData] = await listingLoader(boardId);
        dispatch(actions.fetchSuccess(boardData, listsData, cardsData));
      } catch (err) {
        dispatch(actions.fetchFailure({
          message: 'Error loading board data',
          details: err
        }));
        console.error('Error fetching data:', err);
      }
    };
  
    fetchData();
  }, [boardId]);

  const handleListSubmit = async (name) => {
    try {
      const response = await axios.post('https://api.trello.com/1/lists', null, {
        params: { 
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_API_TOKEN,
          name, 
          idBoard: board.id 
        },
        headers: { Accept: 'application/json' },
      });
      dispatch(actions.addList(response.data));
      toast.success('Created new list successfully');
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: 'Error creating list',
        details: err
      }));
      console.error('Error while adding new list', err);
      toast.error('Failed to create list');
    }
  };

  const handleArchiveList = async (listId) => {
    try {
      await axios.put(`https://api.trello.com/1/lists/${listId}/closed`, null, {
        params: { 
          value: true, 
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_API_TOKEN,
        },
        headers: { Accept: 'application/json' },
      });
      dispatch(actions.archiveList(listId));
      toast.success('Archived list successfully');
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: 'Error archiving list',
        details: err
      }));
      console.error('Error while archiving list', err);
      toast.error('Failed to archive list');
    }
  };

  const handleCardSubmit = async (idList, name) => {
    try {
      const response = await axios.post(`https://api.trello.com/1/cards`, null, {
        params: {
          idList,
          name,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_API_TOKEN,
        },
        headers: { Accept: 'application/json' },
      });
      dispatch(actions.addCard(idList, response.data));
      toast.success('Created new card successfully');
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: 'Error creating card',
        details: err
      }));
      console.error('Error while creating new card', err);
      toast.error('Failed to create card');
    }
  };

  const handleDeleteCard = async (listId, cardId) => {
    try {
      await axios.delete(`https://api.trello.com/1/cards/${cardId}`, {
        params: {
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_API_TOKEN,
        }
      });
      dispatch(actions.deleteCard(listId, cardId));
      toast.success('Deleted card successfully');
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: 'Error deleting card',
        details: err
      }));
      console.error('Error while deleting a card', err);
      toast.error('Failed to delete card');
    }
  };

  const filteredList = lists.filter((list) => !list.closed);

  if (loading) return <Spinner loading={loading} />;
  if (error) return <ErrorDisplay error={error}  />;

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'lavender' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ width: '100%', color: 'black' }} align='center'>
            {board ? board.name : 'Loading...'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container wrap='nowrap' spacing={2} sx={{
        overflowX: 'auto',
        flexWrap: 'nowrap',
      }}>
        {filteredList.map((list) => (
          <Grid key={list.id} sx={{ minWidth: 300 }}>
            <List 
              name={list.name} 
              id={list.id} 
              cards={cardsPerList[list.id]} 
              handleArchiveList={handleArchiveList} 
              handleCardSubmit={handleCardSubmit} 
              handleDeleteCard={handleDeleteCard}
            />
          </Grid>
        ))}
        <Grid sx={{ marginTop: 1 }}> 
          <AddItem name={'List'} addNewItem={handleListSubmit} />
        </Grid>
      </Grid>  
    </div>
  );
};

export default BoardListsPage;