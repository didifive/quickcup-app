import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-light bg-dark py-4 mt-4">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-3">
          <div className="col">
            <p className="my-2">QuickCup @ 2024</p>
          </div>
          <div className="col"></div>
          <div className="col">
            <ul className="list-inline my-2">
              <li className="list-inline-item">
                <a
                  className="link-secondary"
                  target="_blank"
                  href="https://zancanela.dev.br/"
                >
                  zancanela.dev
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  className="link-secondary"
                  target="_blank"
                  href="https://github.com/didifive/quickcup-app"
                >
                  Repo GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
