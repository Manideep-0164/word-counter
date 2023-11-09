const URL = "https://tame-pink-cobra.cyclic.app";

const regForm = document.getElementById("reg-form");
const regBtn = document.getElementById("reg-btn");

regForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userInfo = {
    name: regForm.username.value,
    email: regForm.email.value,
  };

  if (!userInfo.name || !userInfo.email)
    return alert("Please enter required fields");

  try {
    regBtn.innerText = "Loading...";

    const response = await fetch(`${URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    }).then((res) => res.json());

    if (
      response?.message === "Successfully Registered" ||
      response?.message === "User already exists"
    ) {
      localStorage.setItem("userEmail", userInfo.email);
      window.location.href = "../insights.html";
    } else {
      alert(response.message);
    }
  } catch (error) {
    alert(error.message || error);
  } finally {
    regBtn.innerText = "Register";
  }
});
