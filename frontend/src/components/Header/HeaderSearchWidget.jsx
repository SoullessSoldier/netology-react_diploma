import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchString, setNavigateFromHeader } from "@/slices/productsSlice";
import "./header.css";

const HeaderSearchWidget = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { searchString } = useSelector((state) => state.products);

  const location = useLocation();
  const isShowSearch = location.pathname === "/catalog";

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const searchRef = useRef(null);

  const handleClickShowSearch = () => {
    if (!showSearch) {
      setShowSearch(!showSearch);
    } else {
      if (searchString.length >= 3) {
        dispatch(setNavigateFromHeader(true));
        setShowSearch(!showSearch);
        navigate("/catalog", { state: { internalTransition: true } });
      } else {
        dispatch(updateSearchString(""));
        setShowSearch(!showSearch);
      }
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    dispatch(updateSearchString(target.value.trim()));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
    <>
      {!isShowSearch && (
        <>
          <div
            className="header-controls-pic header-controls-search"
            onClick={handleClickShowSearch}
          ></div>
          <form
            className={`header-controls-search-form form-inline ${showSearch ? "" : "invisible"}`}
            onSubmit={handleSubmit}
          >
            <input
              ref={searchRef}
              className="form-control"
              placeholder="Поиск"
              minLength={3}
              onChange={handleChange}
            />
          </form>
        </>
      )}
    </>
  );
};

export default HeaderSearchWidget;
