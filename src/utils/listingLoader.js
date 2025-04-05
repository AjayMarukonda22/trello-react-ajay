import axios from "axios";

const listingLoader = async (boardId) => {
  try {
    const config = {
      params: {
        key: import.meta.env.VITE_API_KEY,
        token: import.meta.env.VITE_API_TOKEN,
      },
      headers: {
        Accept: "application/json",
      },
    };

    // Make all 3 API calls concurrently
    const [boardRes, listsRes, cardsRes] = await Promise.all([
      axios.get(`https://api.trello.com/1/boards/${boardId}`, config),
      axios.get(`https://api.trello.com/1/boards/${boardId}/lists`, config),
      axios.get(`https://api.trello.com/1/boards/${boardId}/cards`, config),
    ]);

    
    const CardsPerList = cardsRes.data.reduce((acc, curr) => {
      let listId = curr.idList;
      if (!acc[listId]) {
        acc[listId] = [];
      }
      acc[listId].push(curr);
      return acc;
    }, {});

    return [boardRes.data, listsRes.data, CardsPerList];
  } catch (err) {
    console.error("Error fetching board data:", err);
  }
};

export default listingLoader;
