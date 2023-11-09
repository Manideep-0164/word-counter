const URL = "https://tame-pink-cobra.cyclic.app";
const userEmail = localStorage.getItem("userEmail");

window.addEventListener("load", () => {
  if (!userEmail) {
    window.location.href = "../index.html";
  }
});

const insightForm = document.getElementById("insights-form");
const insightsCont = document.getElementById("insights-cont");
const getInsightsBtn = document.getElementById("get-insights");

insightForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userInfo = {
    domainName: insightForm.domain.value,
    user: userEmail,
  };

  if (!userEmail) {
    alert("Please Register!");
    window.location.href = "../index.html";
    return;
  }

  try {
    getInsightsBtn.innerText = "Loading...";
    const responseInfo = await fetch(`${URL}/insights`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    });

    if (!responseInfo.ok) {
      const errorData = await responseInfo.json();
      insightsCont.innerHTML = null;
      alert(errorData.message || "Error in request");
      return;
    }

    const response = await responseInfo.json();

    if (response.message) {
      insightsCont.innerHTML = null;
      return alert(response.message);
    }

    renderInsights(response.insights);
  } catch (error) {
    alert(error.message || error);
  } finally {
    getInsightsBtn.innerText = "Get Insights";
  }
});

function renderInsights(insights) {
  insightsCont.innerHTML = null;

  const tr = document.createElement("tr");

  const dName = createTableCell(insights.domainName);

  const wordCount = createTableCell(insights.wordCount);

  const webLinksCont = createTableCell("");
  const webLinks = document.createElement("ul");
  webLinks.innerHTML = createLinkElements(insights.webLinks);
  webLinksCont.append(webLinks);

  const mediaLinksCont = createTableCell("");
  const mediaLinks = document.createElement("ul");
  mediaLinks.innerHTML = createLinkElements(insights.mediaLinks);
  mediaLinksCont.append(mediaLinks);

  tr.append(dName, wordCount, webLinksCont, mediaLinksCont);

  insightsCont.append(tr);
}

// Create table cells
function createTableCell(content, className = "") {
  const td = document.createElement("td");
  td.textContent = content;
  if (className) {
    td.classList.add(className);
  }
  return td;
}

// Create link elements
function createLinkElements(links) {
  return links.length > 0
    ? links
        .map(
          (link, index) =>
            `<li><a href="${link}">${
              link.length < 50 ? link : `Link ${index + 1}`
            }</a></li>`
        )
        .join(" ")
    : "No Links available";
}
