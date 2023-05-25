// Redirecting unauthenticated users to the login page.
// Validating user input for title, price, description, stock, and image.
// Submitting the product registration form with a POST request.
// Displaying success or error messages as toast notifications.

window.onload = checkAccessTokenAndRedirect;
function validateInput(title, price, description, stock, image) {
  if (!title.trim()) {
    return "Title cannot be empty.";
  }
  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    return "Price must be a valid number greater than 0.";
  }
  if (!description.trim()) {
    return "Description cannot be empty.";
  }
  if (!stock || isNaN(stock) || parseInt(stock) <= 0) {
    return "Stock must be a valid integer greater than 0.";
  }
  if (!image) {
    return "Image cannot be empty.";
  }
  return "";
}

document.getElementById("myform").addEventListener("submit", async (event) => {
  event.preventDefault();
  event.stopPropagation();

  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const stock = document.getElementById("stock").value;
  const image = document.getElementById("image").files[0];

  const validationError = validateInput(
    title,
    price,
    description,
    stock,
    image
  );

  if (validationError) {
    showToastMessage(validationError, "error");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("price", price);
  formData.append("description", description);
  formData.append("stock", stock);
  formData.append("image", image);

  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      showToastMessage("Product registered successfully!", "success");
    } else {
      showToastMessage("Error registering product.", "error");
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    showToastMessage("Error registering product.", "error");
    console.error("Error:", error);
  }
});

function checkAccessTokenAndRedirect() {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    window.location.href = "login.html";
  }
}
function showToastMessage(message, type) {
  const toast = document.createElement("div");
  toast.classList.add("toast", type === "success" ? "success" : "error");
  toast.innerHTML = `
    ${message}
    <button onclick="this.parentElement.remove()">×</button>
  `;

  document.body.appendChild(toast);

  toast.classList.add("show");

  setTimeout(() => {
    toast.remove();
  }, 1000);
}
