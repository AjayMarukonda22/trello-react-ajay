import React, { useEffect, useReducer } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import Board from './Board';
import AddItem from './AddItem';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
import ErrorDisplay from './ErrorDisplay';
import { initialState, reducer, actions } from '../utils/boardReducer';

const Boards = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { boards, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(actions.fetchStart());
        const response = await axios.get('https://api.trello.com/1/members/me/boards', {
          params: {
            key: import.meta.env.VITE_API_KEY,
            token: import.meta.env.VITE_API_TOKEN,
          },
          headers: {
            Accept: 'application/json'
          }
        });
        dispatch(actions.fetchSuccess(response.data));
      } catch (err) {
        dispatch(actions.fetchFailure({ 
          message: 'Error while fetching Boards',
          details: err 
        }));
        console.error('Error while fetching Boards', err);
      }
    };

    fetchData();
  }, []);

  const handleBoardSubmit = async (boardName) => {
    if (!boardName.trim()) return;
    
    try {
      const response = await axios.post('https://api.trello.com/1/boards/', null, {
        params: {
          name: boardName,
          key: import.meta.env.VITE_API_KEY,
          token: import.meta.env.VITE_API_TOKEN,
        }
      });
      dispatch(actions.addBoard(response.data));
      toast.success('Created new board successfully');
    } catch (err) {
      dispatch(actions.fetchFailure({
        message: 'Error while creating board',
        details: err
      }));
      console.error('Error while creating a board', err);
      toast.error('Failed to create board');
    }
  };

  if (loading) return <Spinner loading={loading} />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div style={{ overflow: 'hidden' }}>
      <Grid container spacing={2}>
        {boards.map((board) => (
          <Grid key={board.id}>
            <Board board={board} />
          </Grid>
        ))}
        <Grid size={{ xs: 12 }}>
          <AddItem name="Board" addNewItem={handleBoardSubmit} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Boards;