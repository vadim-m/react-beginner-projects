import { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

const API_URL = 'https://reqres.in/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => alert(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((prevId) => prevId !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onSearch={onSearchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
