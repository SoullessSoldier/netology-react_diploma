import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchString, setNavigateFromHeader } from "@/actions/actionCreators";
import "./header.css";

const HeaderSearchWidget = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { searchString } = useSelector((state) => state.products);

  const location = useLocation();
  const isShowSearch = location.pathname === "/catalog";

  const dispatch = useDispatch();

  const handleClickShowSearch = () => {
    if (!showSearch) {
      setShowSearch(!showSearch);
    } else {
      /* 
      если длина строки поиска >= 3
          сделать dispatch(setNavigateFromHeader(true))
          сделать setShowSearch(!showSearch);
          сделать dispatch(loadProductsRequest({q:searchString}))
          сделать navigateToCatalog
      иначе
        сделать  dispatch(updateSearchString("")) 
        сделать setShowSearch(!showSearch);      
      */
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    dispatch(updateSearchString(target.value.trim()));
  };

  const searchRef = useRef(null);

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
