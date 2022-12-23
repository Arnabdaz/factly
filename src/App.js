import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css";
const CATEGORIES = [
  { name: "technology", color: "#14b8a6" },
  { name: "science", color: "#3b82f6" },
  { name: "finance", color: "#8b5cf6" },
  { name: "society", color: "#db2777" },
  { name: "entertainment", color: "#ef4444" },
  { name: "health", color: "#f97316" },
  { name: "history", color: "#eab308" },
  { name: "news", color: "#B05B3B" },
];

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         marginBottom: "20px",
//         gap: "50px",
//       }}
//     >
//       <h1>{count}</h1>
//       <button className="btn btn-large" onClick={() => setCount((x) => x + 1)}>
//         +1
//       </button>
//     </div>
//   );
// }

function App() {
  const [showForm, setShowForm] = useState(false); // for toggling forms section
  const [facts, setFacts] = useState([]); // for adding new facts through form section
  const [isLoading, setIsLoading] = useState(false); // for showing loading... logo as long as loading
  const [errorLoading, setErrorLoading] = useState(false); // for showing error in loading
  const [CurrentCategory, setCurrentCategory] = useState("all"); // for filtering facts according to category

  useEffect(
    function () {
      setIsLoading(false);

      async function getFacts() {
        let query = supabase.from("facts").select("*");

        if (CurrentCategory !== "all") {
          query = query.eq("category", CurrentCategory);
        }

        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else setErrorLoading(true);
        setIsLoading(true);
      }
      getFacts();
    },
    [CurrentCategory]
  );

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      {/* <Counter /> */}

      <main className="main">
        <CategoryList setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          errorLoading ? (
            <ErrorInLoading />
          ) : (
            <FactList facts={facts} setFacts={setFacts} />
          )
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
}

function Loader() {
  return (
    <div className="container">
      <div className="loading">
        <div className="loading__letter">L</div>
        <div className="loading__letter">o</div>
        <div className="loading__letter">a</div>
        <div className="loading__letter">d</div>
        <div className="loading__letter">i</div>
        <div className="loading__letter">n</div>
        <div className="loading__letter">g</div>
        <div className="loading__letter">.</div>
        <div className="loading__letter">.</div>
        <div className="loading__letter">.</div>
      </div>
    </div>
  );
}

function ErrorInLoading() {
  return (
    <div className="no-facts">
      <img src="cloud.png" alt="error loading data from cloud " />
      <p> error in loading data from the database</p>
      <span>Try reloading ... If issue prevails please contact </span>
    </div>
  );
}

function Header({ setShowForm, showForm }) {
  const appTitle = "Factly";

  return (
    <header className="header">
      <div className="logo">
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="ico"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "close" : "share a fact"}
      </button>
    </header>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;
  const [valid, setValid] = useState("fact-form");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(e) {
    // 1. prevent browser from reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if the data is valid. If so create a new fact

    if (text && isValidHttpUrl(source) && category && textLength > 0) {
      console.log(`valid`);

      // 3. create a new fact object
      // const newFact = {
      //   id: Math.floor(Math.random() * 100000),
      //   text,
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // };

      // 3. upload a fact to supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();

      // 4. Add the new fact to the UI: add the fact to state
      if (!error) {
        setFacts((set) => [newFact[0], ...set]);
      }

      // 5. Reset input fields

      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      if (error)
        alert(
          "⚠️ there was an error uploading the fact to the database! 🙏 Please try again after reloading the page. "
        );
      else setShowForm(false);
    } else {
      if (text) {
        if (isValidHttpUrl(source)) {
          setValid("fact-form not-valid fact-category");
        } else {
          setValid("fact-form not-valid fact-source");
        }
      } else {
        setValid("fact-form not-valid fact-text");
      }
    }
  }

  return (
    <form className={valid} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="http://example.com"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        share
      </button>
    </form>
  );
}

function CategoryList({ setCurrentCategory }) {
  const [showOtherCategory, setShowOtherCategory] = useState(false);
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>
        <li className="category">
          <button
            className="btn btn-all-categories"
            style={{
              background: "#1f2937",
              boxShadow: "0 0 10px 2.5px #6b7280",
            }}
            onClick={() => setShowOtherCategory(!showOtherCategory)}
          >
            {showOtherCategory ? "X close" : "≡ Categories"}
          </button>
        </li>
        {showOtherCategory
          ? CATEGORIES.map((cat) => (
              <li key={cat.name} className="category">
                <button
                  className="btn btn-category"
                  style={{ backgroundColor: cat.color }}
                  onClick={() => setCurrentCategory(cat.name)}
                >
                  {cat.name}
                </button>
              </li>
            ))
          : null}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <div className="no-facts">
        <img src="emptyBox.png" alt="empty facts" />
        <p>no fact for this category yet! </p>
        <p> Create the first one 📝</p>
      </div>
    );
  }
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const isDisputed =
    (fact.votesInteresting + fact.votesMindblowing) / 2 < fact.votesFalse;

  async function handleVotes(columnName) {
    setIsUpdating(true);
    const { data: updatedVotes, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();

    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedVotes[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔Disputed]</span> : null}
        {fact.text}
        <a className="source" href={fact.source} target={`_blank`}>
          (source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVotes("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}{" "}
        </button>
        <button
          onClick={() => handleVotes("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVotes("votesFalse")} disabled={isUpdating}>
          ⛔ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
