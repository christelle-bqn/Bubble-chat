import { SearchSvg } from "./svg/SearchSvg";

export const SearchBar = () => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ position: "absolute", top: "12px", left: "10px" }}>
        <SearchSvg />
      </div>
      <form action="/" method="get">
        <input
          type="text"
          id="header-search"
          name="search"
          className="font-montserrat"
          placeholder="Search..."
          style={{
            border: "1px solid #EBE9F1",
            borderRadius: "20px",
            height: "38px",
            color: "#B9B9C3",
            fontSize: 12,
            flexGrow: 1,
            textAlign: "center",
            width: "100%",
          }}
        />
      </form>
    </div>
  );
};
