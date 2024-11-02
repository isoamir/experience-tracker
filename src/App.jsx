import { useReducer, useState } from "react";
import "./App.css";

const initialState = { money: 0, cards: [] };

function moneyReducer(state, action) {
  switch (action.type) {
      case "income":
      return {
        ...state,
        money: state.money + action.plus.amount,
        cards: [
          ...state.cards,
          { name: action.plus.name, price: action.plus.amount },
        ],
      };
      case "expenses":
      return {
        ...state,
        money: state.money - action.plus.amount,
        cards: [
          ...state.cards,
          { name: action.plus.name, price: -action.plus.amount },
        ],
      };
      case "Reset":
      return { ...state, money: 0, cards: [] };
      default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(moneyReducer, initialState);
  const [incomeName, setIncomeName] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [expensesName, setExpensesName] = useState("");
  const [spendAmount, setSpendAmount] = useState("");

  const submit = () => {
    if (incomeName && incomeAmount) {
      dispatch({
        type: "income",
        plus: { name: incomeName, amount: parseInt(incomeAmount) },
      });
      setIncomeName("");
      setIncomeAmount("");
    }
  };

  const sendSubmit = () => {
    if (expensesName && spendAmount) {
      dispatch({
        type: "expenses",
        plus: { name: expensesName, amount: parseInt(spendAmount) },
      });
      setExpensesName("");
      setSpendAmount("");
    }
  };

  return (
    <div className="main">
      <div className="h1">{state.money}</div>
      <div className="inputs">
        <div className="inputone">
          <input
            type="text"
            placeholder="income Name"
            value={incomeName}
            onChange={(e) => setIncomeName(e.target.value)}
          />
          <input
            type="number"
            placeholder="income Amount"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
          />
          <button onClick={submit}>ADD</button>
        </div>
        <div className="inputtwo">
          <input
            type="text"
            placeholder="expenses Name"
            value={expensesName}
            onChange={(e) => setExpensesName(e.target.value)}
          />
          <input
            type="number"
            placeholder="expenses Amount"
            value={spendAmount}
            onChange={(e) => setSpendAmount(e.target.value)}
          />
          <button onClick={sendSubmit}>ADD</button>
        </div>
        <div className="btna" >
        <button className="btn4" onClick={() => dispatch({ type: "Reset" })}>Reset</button>
        </div>
      </div>
      <div className="cards">
        {state.cards.map((card, item) => (
          <div key={item} className="card">
            <h3>{card.name}</h3>
            <p>Price: {card.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
