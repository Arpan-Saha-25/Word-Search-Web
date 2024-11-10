let subBtn = document.getElementById("submit-btn");

let resultContainer = document.getElementsByClassName("result")[0];
let result = document.createElement("p");
resultContainer.appendChild(result);

subBtn.addEventListener("click", () => {
    let word = document.getElementById("word-input").value.trim();

    if (!word) {    // if not word is searched
        result.textContent = "Please enter a word to look up.";
        return;
    }

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Word not found.");
            }
            return response.json();
        })
        .then(data => {
            const definition = data[0].meanings[0].definitions[0].definition;

            // Clear previous content and show the new definition
            result.textContent = definition;
        })
        .catch(error => {
            result.textContent = "Error: " + error.message;
        });
});
