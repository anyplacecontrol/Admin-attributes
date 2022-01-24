import { fetchJSON, throwFetchError } from "../utils/fetchUtils.js";
import * as serviceFuncs from "../utils/serviceFunctions";

export async function changeImages(
  targetId,
  newImgs,
  prevImages,
  endpoint,
  imageType
) {
  let result = true;

  //Delete images
  if (prevImages) {
    for (let i = 0; i < prevImages.length; i++) {
      let prevImage = prevImages[i];

      if (!prevImage.id) return;

      let found = false;
      if (newImgs) {
        found = newImgs.find(function(img) {
          return img && img.id && img.id === prevImage.id;
        });
      }
      if (found) continue;

      try {
        await fetchJSON(endpoint + "/" + prevImage.id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        });        
      } catch (e) {
        result = false;
        console.log(
          "======Exception in imagesApi.changeImage() - DELETE ====="
        );
        console.log(e);
      }
    }
  }

  //Add images
  if (newImgs) {
    for (let i = 0; i < newImgs.length; i++) {
      let newImage = newImgs[i];
      let found = false;
      if (prevImages) {
        found = prevImages.find(function(img) {
          return serviceFuncs.isObjectsEquivalent(img, newImage);
        });
      }

      if (found || !newImage.src) continue;

      let newImage_ = { ...newImage };
      let substring = "base64,";
      let pos = newImage_.src.indexOf(substring);
      if (pos < 0) {
        result = false;
        return;
      }

      newImage_.src = newImage_.src.substring(pos + substring.length);

      try {
        let response = await fetchJSON(endpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            type: imageType,
            targetId: targetId,
            image: newImage_.src
          })
        });        
        //console.log(response);
      } catch (e) {        
        result = false;
        console.log("======Exception in imagesApi.changeImage() - POST =====");
        console.log(e);
      }
    }
  }  

  return result;
}
