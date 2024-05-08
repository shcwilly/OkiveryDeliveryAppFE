import React, { useEffect, useState } from "react";
import "./OrderStatus.css";
import Header from "@components/common/header/Header";
import Button from "@components/common/button/Button";
import { PacmanLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import orderSuccessIcon from "../../assets/icons/orderSuccessIcon.png";

const OrderStatusPage: React.FC = () => {
  const [isOrderStatus, setIsOrderStatus] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // 처음 렌더링 될 로딩스피너 10초동안 보여줌(아직 자세한 기능 미구현)
  useEffect(() => {
    const timer = setTimeout((): void => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = (): void => {
    setIsOrderStatus(!isOrderStatus);
  };

  const handleSuccess = (): void => {
    navigate("/orders");
  };

  const handleFailed = (): void => {
    alert("고객센터로 이동합니다");
  };

  return (
    <>
      <Header hasBackIcon={true} title="" hasCartIcon={false} />

      <div>
        {isLoading ? (
          <div className="loadingBar">
            <PacmanLoader color="#ff6347" size="50px" speedMultiplier={0.8} />
            <h2>
              "Your order is in
              <br /> progress..."
            </h2>
          </div>
        ) : (
          <>
            <div className="statusContentContainer">
              <div className="statusText">
                {isOrderStatus ? (
                  <>
                    <img src={orderSuccessIcon} />
                    <h1>
                      "Order successfully
                      <br />
                      completed."
                    </h1>
                  </>
                ) : (
                  <>
                    <h1>"Sorry,</h1>
                    <h1>
                      we encountered an issue
                      <br /> processing your order."
                    </h1>
                    <span className="errorMessage">error message</span>
                  </>
                )}
              </div>
              <button
                style={{
                  width: "100px",
                  height: "30px",
                  fontSize: "20px",
                }}
                onClick={handleToggle}
              >
                toggle
              </button>
            </div>
            <div className="bottomSection">
              <Button
                name={isOrderStatus ? "Check your order" : "Ask for help"}
                handleClick={isOrderStatus ? handleSuccess : handleFailed}
                buttonType="bigButton"
                type="button"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderStatusPage;