const copyBtn = document.querySelector("#btn-copy");
const pasteBtn = document.querySelector("#btn-paste");
const pasteArticle = document.querySelector("#content-paste");

copyBtn.addEventListener("click", async function () {
  const targetContent = document.querySelector("#content-copy").textContent;
  // access cliboard in javascript
  await navigator.clipboard.writeText(targetContent); // write to the clipboard
  const copiedContent = await navigator.clipboard.readText(); // get copied content
  console.log(copiedContent);
});

pasteBtn.addEventListener("click", async function () {
  // overwrite existing content in article
  try {
    pasteArticle.textContent = "";
    const data = navigator.clipboard.read();
    const clipBoardContent = data[0];

    const imgBlob = await clipBoardContent.getType("image/png");
    const blobUrl = window.URL.createObjectURL(imgBlob);
    const img = document.createElement("img");
    img.src = blobUrl;
    pasteArticle.appendChild(img);
  } catch (error) {
    console.log(error);
    const text = await navigator.clipboard.readText();
    pasteArticle.textContent = text;
  }
});
