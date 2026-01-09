import { useNavigate } from "react-router-dom";
import Image from "../../../components/Image";
import Header from "../../../components/admin/Header";

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Classic Snake Adventures",
      image: "/images/games/snake-game.jpg",
      route: "snake-game",
    },
    {
      title: "Tik Tak Toe",
      image: "/images/games/tik-tax-toe-game.jpg",
      route: "tik-tak-toe",
    },
  ];

  return (
    <div className="container-fluid">
      <Header title="🕹️ Games" />

      <div className="row g-4 mt-2">
        {games.map((game, index) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className="card h-100 border-0 shadow-sm game-card">
              <div className="position-relative overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.title}
                  className="card-img-top"
                  height={500}
                  style={{ objectFit: "cover" }}
                />

                {/* Dark overlay */}
                <div className="image-overlay position-absolute top-0 start-0 w-100 h-100 bg-dark"></div>

                {/* Play button */}
                <button
                  className="btn btn-primary text-dark position-absolute top-50 start-50 translate-middle fw-bold px-4 py-2"
                  onClick={() => navigate(game.route)}
                >
                  <i className="fa fa-play me-2"></i>
                  Play
                </button>
              </div>

              <div className="card-body text-center">
                <h5 className="card-title fw-semibold mb-0">
                  {game.title}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Styles */}
      <style>
        {`
          .game-card {
            transition: all 0.3s ease;
          }

          .image-overlay {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .game-card:hover .image-overlay {
            opacity: 0.45;
          }

          .game-card button {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .game-card:hover button {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default Games;
