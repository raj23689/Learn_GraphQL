import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      age
      id
      isMarried
      name
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      age
      id
      isMarried
      name
    }
  }
`;

function App() {
  const {
    data: getUsersData,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByIdErrpr,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  if (getUsersLoading) return <p>Data loading....</p>;
  if (getUsersError) return <p>Error: {getUsersError.message} </p>;

  return (
    <>
      <div>
        {getUserByIdLoading ? (
          <p> Loading User....</p>
        ) : (
          <>
            <h1>Choosen User:</h1>
            <p>{getUserByIdData.getUserById.name}</p>
            <p>{getUserByIdData.getUserById.age}</p>
          </>
        )}
      </div>
      <h1> Users </h1>
      <div>
        {getUsersData.getUsers.map((user) => (
          <div>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is this user married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
