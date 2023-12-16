const url = "https://newsmartbackend-production.up.railway.app";

const getData = (event) => {
  event.preventDefault();
  const password = document.getElementById("password").value;

  fetch(`${url}/api/v1/getAllData`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // display the data
      document.getElementById("login").style.display = "none";
      const dataContainer = document.getElementById("data");

      data.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.style.paddingBlock = "10px";

        itemDiv.innerHTML = `<div><strong>Headline:</strong> ${item.headline}</div>
                             <div><strong>Rhyme:</strong> ${item.rhyme}</div>
                             <div><strong>Bias: </strong> ${item.bias}</div>
                             <div><strong>Link: </strong> ${item.link}</div>`;
        dataContainer.appendChild(itemDiv);
      });
    })
    .catch((error) => {
      console.log(`Failed to get data`, error);
    });
};

document.getElementById("submit").addEventListener("click", getData);
