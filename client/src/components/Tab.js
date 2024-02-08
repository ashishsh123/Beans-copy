import React from "react";

const Tab = () => {
  return (
    <div className="container mt-2 border p-2 tab d-flex flex-column">
      <div className="btn-group d-flex flex-wrap" role="group">
        <button type="button" className="btn  active me-2 tab-btn fw-bold">
          Suggestion 1
        </button>
        <button type="button" className="btn  me-2 tab-btn fw-bold">
          Suggestion 2
        </button>
        <button type="button" className="btn   me-2 tab-btn fw-bold ">
          Suggestion 3
        </button>
        <button type="button" className="btn  tab-btn fw-bold">
          Suggestion 4
        </button>
      </div>

      {/* Content for each tab */}
    </div>
  );
};

export default Tab;
