console.log("Today I learned");

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

/*----------------------------------------------------------*/
/*~~~~~~~~~~~~~~~~~~~~~ START OF JS ~~~~~~~~~~~~~~~~~~~~~~~~*/
/*----------------------------------------------------------*/

/* CLEARING THE FACTS FROM HTML*/

const factList = document.querySelector(".fact-list");
factList.innerHTML = "";

/* INSERTING FACTS DYNAMICALLY THROUGH JS */

// createFactsList(initialFacts);

function createFactsList(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact">
  <p>
    ${fact.text}
    <a class="source"
      href=${fact.source}
      target="_blank">(source)</a>
  </p>
  <span class="tag" style="background-color: ${
    CATEGORIES.find((cat) => cat.name === fact.category).color
  } ">${fact.category}</span>
</li>`
  );
  const html = htmlArray.join("");
  factList.insertAdjacentHTML("afterbegin", html);
}

/*PULLING FACTS FROM THE SUPABASE DATABASE*/

loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://unmjyaapmkiongfmmyvl.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubWp5YWFwbWtpb25nZm1teXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyODYxOTMsImV4cCI6MTk4Njg2MjE5M30.KAry6XGDJP1-mhvcTiaNg6Sqt7WopJ8cbSsRba6dRp4",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubWp5YWFwbWtpb25nZm1teXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEyODYxOTMsImV4cCI6MTk4Njg2MjE5M30.KAry6XGDJP1-mhvcTiaNg6Sqt7WopJ8cbSsRba6dRp4",
      },
    }
  );
  const data = await res.json();
  createFactsList(data);
}

/* SHARE A FACT OPEN CLOSE */

const BtnOpen = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

BtnOpen.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    BtnOpen.textContent = "Close";
  } else {
    form.classList.add("hidden");
    BtnOpen.textContent = "share a fact";
  }
});
