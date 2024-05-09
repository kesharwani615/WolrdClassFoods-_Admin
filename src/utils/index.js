function createFormData(obj) {
    const formData = new FormData();
  
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
  
    return formData;
  };


  function convertFileToImageUrl(event) {
    const fileInfo = (event.target)?.files;
    if (!fileInfo?.length) return;
    let images = [];

    for (let i = 0; i < fileInfo.length; i++) {
   const file = fileInfo[i];
   const fileUrl = URL.createObjectURL(file);
   images.push(fileUrl);
    }
    return images

  }



  export {
    createFormData,
    convertFileToImageUrl
  }