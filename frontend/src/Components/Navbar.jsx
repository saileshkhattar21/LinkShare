import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">

        <Link class="navbar-brand" to="/">
          Link Sharing
        </Link>

        <form class="d-flex mx-auto w-50">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
          />
          <button class="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NavLink class="nav-link" to="/">Home</NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" to="/about">About</NavLink>
            </li>
            <li class="nav-item">
              <NavLink class="nav-link" to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}

