import React from "react";

const categories = [
  { id: 1, title: "Electronics", icon: "📱" },
  { id: 2, title: "Fashion", icon: "👕" },
  { id: 3, title: "Books", icon: "📚" },
  { id: 4, title: "Sports", icon: "🏀" },
  { id: 5, title: "Home", icon: "🏠" },
  { id: 6, title: "Beauty", icon: "💄" }
];

const TopCategories = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">Top Categories</h2>

      <div className="row g-4">
        {categories.map((cat) => (
          <div className="col-6 col-md-4 col-lg-2" key={cat.id}>
            <div className="card text-center h-100 shadow-sm border-0">
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="fs-1 mb-2">{cat.icon}</div>
                <h6 className="card-title mb-0">{cat.title}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategories;
