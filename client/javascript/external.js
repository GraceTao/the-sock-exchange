let pageNum = 1

async function getNewPageData() {
    console.log(pageNum);
    if (pageNum < 5) {
        pageNum++;
    } else {
        alert('No more data to fetch! Starting over from the beginning.');
        pageNum = 1;
    }
    await(getData(pageNum));
}

async function getData(pageNum) {
  const socks = await fetch(`http://localhost:9000/api/socks/${pageNum}/10`).then(
    (res) => res.json()
  );
  updateHTML(socks);
}

function updateHTML(socks) {
  // let sockDiv = document.createElement("div");
  // sockDiv.innerHTML = `<div>Color: ${sock.color}</div><div>Size: ${sock.size}</div>`;
  const table = document.getElementById("table");
  table.innerHTML = "";

  // create header row containing all sock properties
  const header = document.createElement("tr");

  Object.keys(socks[0]["sockDetails"]).forEach((property) => {
    const item = document.createElement("th");
    item.innerHTML = property;
    header.appendChild(item);
  });
  const imgHeader = document.createElement("th");
  imgHeader.innerHTML = "picture";
  header.appendChild(imgHeader);

  table.appendChild(header);

  // add a row for each sock
  socks.forEach((sock) => {
    const row = document.createElement("tr");

    Object.values(sock["sockDetails"]).forEach((val) => {
      const item = document.createElement("td");
      item.innerHTML = val;
      row.appendChild(item);
    });

    const sockImg = document.createElement("td");
    sockImg.innerHTML = `
                            <img src="https://www.primary.com/cdn/shop/files/grown-up-socks-in-stripe_s-m_spruce-ivory-stripe_P.jpg?v=1725898410"
                                alt="sock-image"
                                style="display: block"
                                width="10%" 
                                height="10%" />
                        `;
    row.appendChild(sockImg);

    table.appendChild(row);
  });
}

//   if (socks.color) {
//     document.querySelector("#color").style.backgroundColor = socks.color;
//   }

getData(pageNum);
