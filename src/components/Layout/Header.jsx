import React from "react";
import { Link } from "react-router-dom"
import logo from "../assets/img/quickcup-logo.png"

const Header = () => {
  return (
    <nav
      className="navbar navbar-expand-md bg-dark py-3 mb-3"
      data-bs-theme="dark"
    >
      <div className="container">
        <a className="navbar-brand d-flex" href="#">
          <img src={logo} alt="QuickCup" style={{ height: "55px", width: "55px" }} />
        </a>
        <ul className="navbar-nav d-flex float-end flex-row justify-content-between justify-content-md-around justify-content-lg-evenly w-75">
          <li>
            <Link
              to="/"
              className="nav-item d-flex flex-column justify-content-center align-items-center text-light text-decoration-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                className="fs-1"
              >
                <path
                  d="M6 2.5C5.44772 2.5 5 2.94772 5 3.5V5.5C5 6.05228 5.44772 6.5 6 6.5C6.55228 6.5 7 6.05228 7 5.5V3.5C7 2.94772 6.55228 2.5 6 2.5Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 21.5C15.973 21.5 18.441 19.3377 18.917 16.5H19C21.2091 16.5 23 14.7091 23 12.5C23 10.2909 21.2091 8.5 19 8.5V7.5H1V15.5C1 18.8137 3.68629 21.5 7 21.5H13ZM3 9.5V15.5C3 17.7091 4.79086 19.5 7 19.5H13C15.2091 19.5 17 17.7091 17 15.5V9.5H3ZM21 12.5C21 13.6046 20.1046 14.5 19 14.5V10.5C20.1046 10.5 21 11.3954 21 12.5Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M9 3.5C9 2.94772 9.44771 2.5 10 2.5C10.5523 2.5 11 2.94772 11 3.5V5.5C11 6.05228 10.5523 6.5 10 6.5C9.44771 6.5 9 6.05228 9 5.5V3.5Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M14 2.5C13.4477 2.5 13 2.94772 13 3.5V5.5C13 6.05228 13.4477 6.5 14 6.5C14.5523 6.5 15 6.05228 15 5.5V3.5C15 2.94772 14.5523 2.5 14 2.5Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Menu</span>
            </Link>
          </li>
          <li>
            <Link
              to="/carrinho"
              className="nav-item d-flex flex-column justify-content-center align-items-center text-light text-decoration-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                className="fs-1"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Carrinho</span>
            </Link>
          </li>
          <li className="nav-item d-flex flex-column justify-content-center align-items-center">
            <Link
              to="/pedidos"
              className="nav-item d-flex flex-column justify-content-center align-items-center text-light text-decoration-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                className="fs-1"
              >
                <path
                  d="M15.8787 4.87866H3.87872V6.87866H15.8787V4.87866Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M15.8787 8.87866H3.87872V10.8787H15.8787V8.87866Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M3.87872 12.8787H11.8787V14.8787H3.87872V12.8787Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.7574 12.7573C12.5858 13.9289 12.5858 15.8284 13.7574 17C14.681 17.9236 16.0571 18.1191 17.1722 17.5864L18.7071 19.1213L20.1213 17.7071L18.5864 16.1722C19.1191 15.057 18.9236 13.681 18 12.7573C16.8284 11.5858 14.9289 11.5858 13.7574 12.7573ZM15.1716 15.5858C15.5621 15.9763 16.1953 15.9763 16.5858 15.5858C16.9763 15.1952 16.9763 14.5621 16.5858 14.1716C16.1953 13.781 15.5621 13.781 15.1716 14.1716C14.7811 14.5621 14.7811 15.1952 15.1716 15.5858Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span>Pedidos</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
