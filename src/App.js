import { useState } from "react";
import "./index.css";
const initialFriends = [
  {
    id: 123,
    name: "Micky",
    image: "/images/Micky.jpg",
    balance: -7,
  },
  {
    id: 234,
    name: "Renu",
    image: "/images/Renu.jpg",
    balance: 20,
  },
  {
    id: 345,
    name: "Chikkie",
    image: "/images/Chikkie.jpg",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleToggleAddFriend() {
    return setShowAddFriend((showAddFriend) => !showAddFriend);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {/* <FormAddFriend /> */}
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleToggleAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You have to give ₹{Math.abs(friend.balance)} to {friend.name}
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} has to give ₹{friend.balance} to you.
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {/* <button className="button">Select</button> */}
      <Button>Select </Button>
    </li>
  );
}

function FormAddFriend() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("/images/RSK.jpeg");
  function handleSubmit(e) {
    e.preventDefault();

    // if (!name || !image) return;
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    };
    console.log("New Friend: ", newFriend);
    setName("");
    setImage("/images/RSK/jpeg");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend Name: </label>
      <input type="text" />
      <label> 🖼️ Image URL</label>
      <input type="text" />
      {/* <button className="button">Select</button> */}
      <Button>Add</Button>
    </form>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the Bill with X</h2>
      <label>💰Bill Value: </label>
      <input type="text" />
      <label>👦 Your Expense: </label>
      <input type="text" />
      <label>🧑‍🤝‍🧑 X's Expense: </label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="you">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
