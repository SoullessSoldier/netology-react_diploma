import { Link, NavLink, useLocation } from "react-router-dom";
import "./header.css";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const location = useLocation();

  const handleClickShowSearch = () => {
    setShowSearch(!showSearch);
  };

  useEffect(() => {
    if (showSearch) {
      searchRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    setShowSearch(false);
  }, [location]);

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
                  >
                    Контакты
                  </NavLink>
                </li>
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div
                    className="header-controls-pic header-controls-search"
                    onClick={handleClickShowSearch}
                  ></div>
                  <Link to="/cart">
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
                <form
                  className={`header-controls-search-form form-inline ${showSearch ? "" : "invisible"}`}
                >
                  <input
                    ref={searchRef}
                    className="form-control"
                    placeholder="Поиск"
                  />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
