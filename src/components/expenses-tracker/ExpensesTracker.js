import React, { useState } from "react";
import "./ExpnensesTracker.css";
export const ExpensesTracker = () => {
  const initialState = {
    name: "",
    amount: "",
    catagory: "",
  };
  const [ip, setIp] = useState(initialState);
  const [data, setData] = useState([]);
  const [assign, setAssign] = useState({
    Food: 0,
    Travel: 0,
    Shopping: 0,
    Others: 0,
  });
  const [flag, setFlag] = useState(true);

  const handleName = (e) => {
    const obj = {
      ...ip,
      name: e.target.value,
    };
    setIp(obj);
  };

  const handleAmt = (e) => {
    const obj = {
      ...ip,
      amount: e.target.value,
    };
    setIp(obj);
  };

  const handleOptions = (e) => {
    const obj = {
      ...ip,
      catagory: e.target.value,
    };
    setFlag(false);
    setIp(obj);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const wt = [...data, ip];
    setData(wt);
    let total = 0;
    wt.map((item) => {
      return (total = total + Number(item.amount));
    });

    let append = assign;
    wt.map((item) => {
      const val = (Number(item.amount) / total) * 100;
      const path = item.catagory;
      if (path === "Food") {
        append = {
          ...append,
          Food: val,
        };
      }
      if (path === "Travel") {
        append = {
          ...append,
          Travel: val,
        };
      }

      if (path === "Shopping") {
        append = {
          ...append,
          Shopping: val,
        };
      }

      if (path === "Others") {
        append = {
          ...append,
          Others: val,
        };
      }

      return append;
    });
    console.log(append);
    setAssign(append);
    setFlag(true);
    setIp({
      name: "",
      amount: "",
      catagory: "",
    });
  };

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div>
        <form>
          <section
            className="my-30 layout-row align-items-center justify-content-center"
            style={{ width: "1000px" }}
          >
            <input
              type="text"
              placeholder="New Expense"
              style={{ width: "40%", marginRight: "10px" }}
              name="name"
              data-testid="expense-name"
              onChange={handleName}
              value={ip.name}
            />
            <input
              type="number"
              placeholder="Enter Amount"
              style={{ width: "40%" }}
              name="amount"
              data-testid="expense-amount"
              onChange={handleAmt}
              value={ip.amount}
            />
            <select
              className="ml-2"
              name="catagory"
              data-testid="expense-type"
              onChange={handleOptions}
            >
              <option value={""} selected={flag}>
                Select Type
              </option>
              <option data-testid="expense-type-1" value={"Food"}>
                Food
              </option>
              <option data-testid="expense-type-2" value={"Travel"}>
                Travel
              </option>
              <option data-testid="expense-type-3" value={"Shopping"}>
                Shopping
              </option>
              <option data-testid="expense-type-4" value={"Other"}>
                Other
              </option>
            </select>
            <button
              type="submit"
              style={{ width: "20%" }}
              data-testid="expense-submit-button"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
          </section>
        </form>
      </div>
      <div className="flex" style={{ width: "100%" }}>
        <div style={{ width: "48%" }} className="mx-5 m-10 card">
          <p className="title">Expense List</p>
          <table>
            <thead>
              <tr>
                <td>Sr No</td>
                <td>Expense</td>
                <td>Amount</td>
                <td>Catagory</td>
              </tr>
            </thead>
            <tbody>
              {data.length > 0
                ? data.map((items, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{items.name}</td>
                        <td>{items.amount}</td>
                        <td>{items.catagory}</td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
        <div className="card ml-5 m-10" style={{ width: "50%" }}>
          <p className="title">Expenses Breakdown</p>
          <br />
          <div style={{ height: "30px", display: "flex" }}>
            <div
              data-testid="expense-distribution-food"
              style={{ width: `${assign.Food}%` }}
              className="lightblue"
            ></div>
            <div
              data-testid="expense-distribution-travel"
              style={{ width: `${assign.Travel}%` }}
              className="red"
            ></div>
            <div
              data-testid="expense-distribution-shopping"
              style={{ width: `${assign.Shopping}%` }}
              className="lightgreen"
            ></div>
            <div
              data-testid="expense-distribution-other"
              style={{ width: `${assign.Others}%` }}
              className="orange"
            ></div>
          </div>
          <br />
          <div className="flex ml-10 mb-2">
            <div className="lightblue hight-20 width-20"></div> &nbsp; Food
          </div>
          <div className="flex ml-10 mb-2">
            <div className="red hight-20 width-20"></div> &nbsp; Travel
          </div>
          <div className="flex ml-10 mb-2">
            <div className="lightgreen hight-20 width-20"></div> &nbsp; Shopping
          </div>
          <div className="flex ml-10 mb-10">
            <div className="orange hight-20 width-20"></div> &nbsp; Other
          </div>
        </div>
      </div>
    </div>
  );
};
