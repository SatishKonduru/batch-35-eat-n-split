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
  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((currentSelected) =>
      currentSelected?.id === friend.id ? null : friend
    );
  }
  function handleAddFriend(friend) {
    // setFriends(friends.push(friend)); => WRONG
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleToggleAddFriend() {
    return setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {/* <FormAddFriend /> */}
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleToggleAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {/* <FormSplitBill /> */}
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}{" "}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("/images/RSK.jpeg");
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    };
    console.log("New Friend: ", newFriend);
    onAddFriend(newFriend);
    setName("");
    setImage("/images/RSK/jpeg");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label> 🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
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

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the Bill with {selectedFriend.name}</h2>
      <label>💰Bill Value: </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>👦 Your Expense: </label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />
      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense: </label>
      <input type="text" value={paidByFriend} disabled />
      <label>🤑 Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="you">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
