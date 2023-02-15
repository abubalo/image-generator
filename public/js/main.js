function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.error').style.visibility = 'hidden'
  document.querySelector('#image').src = ''

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    errorMessage('Input cannot be empty');
    return;
  }

  genearetImageRequest(prompt, size);
}

function errorMessage(message) {
  document.querySelector(".error").textContent = message;
  document.querySelector(".error").style.visibility = 'visible'
}

async function genearetImageRequest(prompt, size) {

  try {
    showSpinner();

    const response = await fetch('/openai/generateimage', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    if (!response.ok) {
      removeSpinner();
      throw new Error("Image could not be generated");
    }

    const data = await response.json();
    const imageUrl = data.data;

    document.querySelector('#image').src = imageUrl;

    removeSpinner();
  } catch (error) {
    errorMessage(error)
  }
}

function showSpinner() {
  document.querySelector(".spinner-container").classList.add("show");
}

function removeSpinner() {
  document.querySelector(".spinner-container").classList.remove("show");
}

document.querySelector("form").addEventListener("submit", onSubmit);
