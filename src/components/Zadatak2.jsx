import { useState, useEffect } from "react";

const Zadatak2 = () => {
  const [searchParams, setSearchParams] = useState("");
  const [sortParams, setSortParams] = useState("relevance");
  const [articleData, setArticleData] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [visible, setVisible] = useState(15);
  const [inputError, setInputError] = useState(false);

  let url = "https://en.wikipedia.org/w/api.php";

  const params = {
    action: "query",
    list: "search",
    srsearch: searchParams,
    format: "json",
    srsort: sortParams,
    srlimit: "max",
  };

  url = url + "?origin=*";
  Object.keys(params).forEach(function (key) {
    url += "&" + key + "=" + params[key];
  });

  const getData = () => {
    if (searchParams === "") {
      setInputError(true);
    } else {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          setArticleData(response.query.search);
          setSuggestion(response.query.searchinfo.suggestion);
        })
        .catch((err) => {
          throw new Error(`Error: ${err.message}`);
        });
    }
  };

  const handleSearch = async () => {
    getData();
  };

  const loadMore = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  useEffect(() => {
    if (searchParams !== "") {
      setInputError(false);
    }
  }, [searchParams]);

  return (
    <div>
      <>
        <div className="flex">
          <div className="flex flex-col gap-4">
            <h3>Search Wiki</h3>
            <input
              className="border-[2px] border-black"
              onChange={(e) => setSearchParams(e.target.value)}
              type="text"
              value={searchParams}
            />
            <button className="text-2xl" onClick={() => handleSearch()}>
              search
            </button>
            {articleData.length > 0 && (
              <div className="border-[1px] flex justify-center items-center h-[4em]">
                <h3>Suggestions:</h3>

                <button onClick={(e) => setSearchParams(e.target.innerText)}>
                  {suggestion}
                </button>
              </div>
            )}
          </div>
          {inputError && <p>Enter a value</p>}
          <div className="flex">
            <button
              onClick={() => setSortParams("create_timestamp_asc")}
              style={{
                border:
                  sortParams === "create_timestamp_asc" && "3px solid green",
              }}
            >
              Create timestamp asc
            </button>
            <button
              onClick={() => setSortParams("create_timestamp_desc")}
              style={{
                border:
                  sortParams === "create_timestamp_desc" && "3px solid green",
              }}
            >
              Create timestamp desc
            </button>
            <button
              onClick={() => setSortParams("incoming_links_asc")}
              style={{
                border:
                  sortParams === "incoming_links_asc" && "3px solid green",
              }}
            >
              incoming_links_asc
            </button>
            <button
              onClick={() => setSortParams("incoming_links_desc")}
              style={{
                border:
                  sortParams === "incoming_links_desc" && "3px solid green",
              }}
            >
              incoming_links_desc
            </button>
            <button
              onClick={() => setSortParams("just_match")}
              style={{
                border: sortParams === "just_match" && "3px solid green",
              }}
            >
              just_match
            </button>
            <button
              onClick={() => setSortParams("last_edit_asc")}
              style={{
                border: sortParams === "last_edit_asc" && "3px solid green",
              }}
            >
              last_edit_asc
            </button>
            <button
              onClick={() => setSortParams("none")}
              style={{
                border: sortParams === "none" && "3px solid green",
              }}
            >
              none
            </button>
            <button
              onClick={() => setSortParams("last_edit_desc")}
              style={{
                border: sortParams === "last_edit_desc" && "3px solid green",
              }}
            >
              last_edit_desc
            </button>
            <button
              onClick={() => setSortParams("relevance")}
              style={{
                border: sortParams === "relevance" && "3px solid green",
              }}
            >
              relevance
            </button>
            <button
              onClick={() => setSortParams("random")}
              style={{
                border: sortParams === "random" && "3px solid green",
              }}
            >
              random
            </button>
            <button
              onClick={() => setSortParams("user_random")}
              style={{
                border: sortParams === "user_random" && "3px solid green",
              }}
            >
              user_random
            </button>
          </div>
        </div>
        <div className="relative  w-[40em] flex flex-col justify-center items-center gap-10">
          {articleData.slice(0, visible).map((article, index) => {
            return (
              <article key={index}>
                <p>{article.title}</p>
                <p dangerouslySetInnerHTML={{ __html: article.snippet }}></p>
              </article>
            );
          })}
          {articleData.length > 0 && (
            <button onClick={loadMore}>Load More</button>
          )}
        </div>
      </>
    </div>
  );
};

export default Zadatak2;
