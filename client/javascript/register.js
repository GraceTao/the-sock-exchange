document.getElementById("registerButton").addEventListener("click", () => {
  const name = document.getElementById("newName").value;
  const email = document.getElementById("newEmail").value;

  fetch("http://localhost:9000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, email: email }),
  })
    .then((response) => response.json())
    .then((data) => console.log("POST:", data))
    .catch((error) => console.error("Error:", error));
});
