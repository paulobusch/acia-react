 export function fileToBase64(file, completed) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    completed(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
 }
