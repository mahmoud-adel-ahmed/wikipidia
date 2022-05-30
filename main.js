const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultsDOM.innerHTML =
      '<div class="error"> please enter valid search term</div>';
    return;
  }
  resultsDOM.innerHTML = `<div class="loading"></div>`;
  try {
    const response = await fetch(`${url}${value}`);
    const data = await response.json();
    const results = data.query.search;
    if (!results.length) {
      resultsDOM.innerHTML =
        '<div class="error">no matching results. Please try again</div>';
      return;
    }
    const cardsList = results
      .map((item) => {
        const { title, snippet, pageid } = item;
        return `
        <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank" class="box">
              <h4>${title}</h4>
              <p>
                ${snippet}.
              </p>
        </a>      
            `;
      })
      .join("");

    inputDOM.value = "";
    resultsDOM.innerHTML = `<div class="row">
            ${cardsList}
          </div>`;
  } catch (error) {
    resultsDOM.innerHTML = '<div class="error"> there was an error...</div>';
  }
});
