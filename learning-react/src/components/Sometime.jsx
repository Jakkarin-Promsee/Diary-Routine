import React from "react";

const Title = () => <h1>Income and Expense Account</h1>;

const Description = () => <h3>Save Diary Details</h3>;

const Transaction = () => (
  <>
    <ul>
      <li className="test" id="i">
        Detial 1
      </li>
      <li className="test" id="i">
        Detail 2
      </li>
      <li className="test" id="i">
        Detail 3
      </li>
    </ul>
  </>
);

function Sometime() {
  return (
    <div>
      <Title />
      <Description />
      <Transaction />
    </div>
  );
}

export default Sometime;
