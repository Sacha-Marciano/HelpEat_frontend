import { Link } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found__page">
      <h1>404</h1>
      <h2>It look like the adress is incorrect</h2>
      <Link to="/">
        <p>Click here to access the app !</p>
      </Link>
    </div>
  );
}

export default NotFound;
