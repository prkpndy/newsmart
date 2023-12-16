const url = "https://newsmartbackend-production.up.railway.app";

var majorHeadlinesDiv = document.getElementById("tdi_66");
var majorHeadlinesHtml =
  majorHeadlinesDiv.getElementsByClassName("td-module-title");

const headlines = [];
const links = [];

for (let headline of majorHeadlinesHtml) {
  headlines.push(headline?.children[0]?.innerText);
  links.push(headline?.children[0]?.href);
}

const articles = new Array(links.length);

links.forEach((link, i) => {
  if (i > -1) {
    fetch(link)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        // Getting the article
        var parser = new DOMParser();

        var page = parser.parseFromString(html, "text/html");

        var postExcerpt = page.getElementById("postexcerpt");
        var postContent = page.getElementById("postcontent");

        var postExcerptP = postExcerpt.getElementsByTagName("p");
        var postContentP = postContent.getElementsByTagName("p");

        var s = "";

        for (let p of postExcerptP) {
          if (
            p.children.length !== 0 &&
            (p.children[0].nodeName === "SCRIPT" ||
              p.children[0].nodeName === "EM")
          ) {
            continue;
          }
          if (p.parentNode === postExcerpt) {
            s = s + p.innerText;
          }
        }

        for (let p of postContentP) {
          if (
            p.children.length !== 0 &&
            (p.children[0].nodeName === "SCRIPT" ||
              p.children[0].nodeName === "EM")
          ) {
            continue;
          }
          if (p.parentNode === postContent) {
            s = s + p.innerText;
          }
        }

        articles[i] = s;

        // Sending a request to backend api
        fetch(`${url}/api/v1/postData`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            headline: headlines[i],
            link: link,
            article: s,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(`Received data for ${link}`);
            if (data.rhyme) {
              majorHeadlinesHtml[i].children[0].innerText = data.rhyme;
            }
          })
          .catch((error) => {
            console.log(`Failed to get data from API for ${link}`, error);
          });
      })
      .catch(function (error) {
        console.log(`Failed to fetch page: ${link}`, error);
      });
  }
});
