import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersData } from './features/users/usersSlice';
import Header from './components/Header';
import UserList from './components/UserList';
import { useEffect } from 'react';
import CircularIndeterminate from './components/CircularIndeterminate';


function App() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUsersData())
  }, []);

  return (
    <Container>
      <Header title='Dashboard' />
      {isLoading ? <CircularIndeterminate/> : <UserList />}
    </Container>
  );
}

export default App;
