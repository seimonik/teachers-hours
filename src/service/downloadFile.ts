// const downloadFile = (responseData, fileName, fileExtantion) => {
//   const blob = new Blob([responseData]);
//   const fileURL = window.URL.createObjectURL(blob);
//   const fileLink = document.createElement("a");
//   fileLink.href = fileURL;
//   fileLink.setAttribute("download", `${fileName}${fileExtantion}`);
//   document.body.appendChild(fileLink);
//   fileLink.click();
//   document.body.removeChild(fileLink);
// };

// export default downloadFile;
