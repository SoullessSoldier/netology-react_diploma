import { Link, NavLink } from "react-router-dom";
import HeaderSearchWidget from "./HeaderSearchWidget";
import "./header.css";
const Header = () => {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">
              <img src="/img/header-logo.png" alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? " nav-link active" : "nav-link"
                    }
                    state={{ internalTransition: true }}
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/catalog"
                    className={({ isActive }) =>
                      isActive ? " nav-link active" : "nav-link"
                    }
                    state={{ internalTransition: true }}
                  >
                    Каталог
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? " nav-link active" : "nav-link"
                    }
                    state={{ internalTransition: true }}
                  >
                    О магазине
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/contacts"
                    className={({ isActive }) =>
                      isActive ? " nav-link active" : "nav-link"
                    }
                    state={{ internalTransition: true }}
                  >
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <HeaderSearchWidget />
                  <Link to="/cart">
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
