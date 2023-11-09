const URL = "https://tame-pink-cobra.cyclic.app";
// const URL = "http://localhost:1020";
const userEmail = localStorage.getItem("userEmail");

const insightsCont = document.getElementById("insights-cont");

window.addEventListener("load", () => {
  if (!userEmail) {
    window.location.href = "../index.html";
    return;
  }

  getInsightsData();
});

async function getInsightsData() {
  const userInfo = {
    userEmail: userEmail,
  };

  const responseInfo = await fetch(`${URL}/insights-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });

  if (!responseInfo.ok) {
    // Handle error cases
    const errorData = await responseInfo.json();

    // Display the response message in table body.
    insightsCont.innerHTML = `<tr class="tbody-place-holder">
    <td colspan="6">
        ${
          responseInfo.status === 404
            ? "Insights are not available"
            : errorData.message || "Error in request"
        }
    </td>
    </tr>`;
    return;
  }

  const userInsightsHistory = await responseInfo.json();

  renderInsights(userInsightsHistory);
}

function renderInsights(data) {
  insightsCont.innerHTML = null;

  data.forEach((ele, index) => {
    const tr = document.createElement("tr");

    const dName = createTableCell(ele.domainName);

    const wordCount = createTableCell(ele.wordCount);

    const addAppropriateColor = ele.isFavorite
      ? "fav-insight"
      : "not-fav-insight";
    const fav = createTableCell(ele.isFavorite, addAppropriateColor);

    const webLinksCont = createTableCell("");
    const webLinks = document.createElement("ul");
    webLinks.innerHTML = createLinkElements(ele.webLinks);
    webLinksCont.append(webLinks);

    const mediaLinksCont = createTableCell("");
    const mediaLinks = document.createElement("ul");
    mediaLinks.innerHTML = createLinkElements(ele.mediaLinks);
    mediaLinksCont.append(mediaLinks);

    const actions = createTableCell("", "action-btns");

    const addToFav = document.createElement("button");
    addToFav.innerText = !ele.isFavorite ? "Add to Fav" : "Remove from Fav";
    addToFav.setAttribute("class", "btn btn-primary");

    addToFav.addEventListener("click", async () => {
      try {
        addToFav.innerText = "Loading...";
        const response = await fetch(`${URL}/insights/${ele._id}`, {
          method: "PATCH",
        }).then((res) => res.json());

        if (response.message === "Insight updated") {
          getInsightsData();
          return;
        }

        alert(response.message);
      } catch (error) {
        alert(error.message || error);
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute("class", "btn btn-danger");

    deleteBtn.addEventListener("click", async () => {
      try {
        deleteBtn.innerText = "Loading...";
        const response = await fetch(`${URL}/insights/${ele._id}`, {
          method: "DELETE",
        }).then((res) => res.json());

        if (response.message === "Insight deleted") {
          getInsightsData();
          return;
        }

        alert(response.message);
      } catch (error) {
        alert(error.message || error);
      }
    });

    actions.append(addToFav, deleteBtn);
    tr.append(dName, wordCount, fav, webLinksCont, mediaLinksCont, actions);

    insightsCont.append(tr);
  });
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
