// get the list of all highlight code blocks
const highlights = document.querySelectorAll("div.highlight")

highlights.forEach(div => {
  // create the copy button
  const copy = document.createElement("button")
  copy.innerHTML = "Copy"
  // add the event listener to each click
  copy.addEventListener("click", handleCopyClick)
  // append the copy button to each code block
  div.append(copy)
})