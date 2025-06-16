import { useState } from "react";
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

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});

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

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  if (getUsersLoading) return <p>Data loading....</p>;
  if (getUsersError) return <p>Error: {getUsersError.message} </p>;

  const handleCreateUser = async () => {
    console.log(newUser);
    try {
      await createUser({
        variables: {
          name: newUser.name,
          age: Number(newUser.age),
          isMarried: false,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <div>
        <input
          placeholder="Name..."
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Age..."
          type="number"
          onChange={(e) =>
            setNewUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={handleCreateUser}>Create User</button>
      </div>
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
