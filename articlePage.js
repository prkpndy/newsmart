console.log("---> Running articlePage.js");
const url = "https://newsmartbackend-production.up.railway.app";

const addBias = async () => {
  var headlineDiv = document.getElementsByClassName("tdb-title-text");
  var subHeadlineDiv = document.getElementsByClassName("tdi_67");

  const link = headlineDiv[0].baseURI;
  const className = subHeadlineDiv[0].children[2].className;

  try {
    let res = await fetch(`${url}/api/v1/getOneData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: link,
      }),
    });

    const data = await res.json();

    const htmlToAdd = `<div className=${className}><h2 style="color:blue"> Bias summary: ${data.bias}</h2></div>`;

    subHeadlineDiv[0].insertAdjacentHTML("beforeend", htmlToAdd);
  } catch (error) {
    console.log("---> Failed to get data", error);
  }
};

addBias();
