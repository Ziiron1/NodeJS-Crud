const form = document.querySelector("#register-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const password = form.elements.password.value;

  axios.post("/users", { name, email, password }).then((response) => {
    console.log(response.data);
  });
});
