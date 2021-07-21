async function submitForm() {
  const input = document.getElementById("form-input");
  console.log(input.value);
  const response = await fetch("/send-review", {
    method: "POST",
    body: JSON.stringify({ phoneNumber: input.value }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
