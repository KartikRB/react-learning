import { useNavigate } from "react-router-dom";
import Image from "../../../components/Image"
import Header from "../../../components/admin/Header"

const Categories = () => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("snake-game")
  }

  return (
    <div>
      <Header title="🕹️ Games" />
      <div className="card" style={{ width: '18rem' }}>
      <Image src="/images/games/snake-game.jpg" className="card-img-top" alt="Snake Game" />
      <div className="card-body">
        <h5 className="card-title">Sanke Game</h5>
        <button className="btn btn-primary" onClick={onButtonClick}>
          Play Now
        </button>
      </div>
    </div>
    </div>
  );
};

export default Categories;
