import { useContext } from "react";
import DataContext from "./context/DataContext";
import Feed from "./Feed";

const Home = () => {
  const { search, setSearch, searchResults, fetchError, isLoading } =
    useContext(DataContext);
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Is Loading...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {`Error: ${fetchError}`}
        </p>
      )}

      {!isLoading && !fetchError && (
        <>
          <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search Post</label>
            <input
              type="text"
              id="search"
              required
              placeholder="Search Post"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {searchResults.length ? (
            <Feed searchResults={searchResults} />
          ) : (
            <p>No Post To Display Please Create new Post from Post page</p>
          )}
        </>
      )}
    </main>
  );
};

export default Home;
