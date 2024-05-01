import React from "react";
import MyOrderEmptyImg from "../../../assets/images/myOrderEmptyImg.png";
import "./MyOrderEmpty.css";

const MyOrderEmpty: React.FC = () => {
  return (
    <div className="myOrderEmptyContainer">
      <div>
        <img src={MyOrderEmptyImg} />
      </div>
      <div className="MEmessage">
        " No orders on record yet. <br />
        Start your order now!"
      </div>
    </div>
  );
};

export default MyOrderEmpty;
