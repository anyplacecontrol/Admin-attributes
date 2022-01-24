import {fetchJSON} from "../utils/fetchUtils.js";
import * as serviceFuncs from "../utils/serviceFunctions";

export async function changeAddress(
  targetId,
  newAddress,
  prevAddress,
  endpoint
) {
  let result = true;

  try {
    if (!targetId) {
      throw "targetId is empty";
    }

    newAddress.coordinates.latitude = newAddress.coordinates.latitude.trim();
    newAddress.coordinates.longitude = newAddress.coordinates.longitude.trim();

    if (serviceFuncs.isObjectsEquivalent(newAddress, {}) && !prevAddress) {
      return result;
    }
    if (serviceFuncs.isObjectsEquivalent(prevAddress, newAddress)) {
      return result;
    }

    let url = endpoint + targetId;
    await fetchJSON(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAddress)
    });
  } catch (e) {
    result = false;
    console.warn("======Exception in addressesApi.changeAddress() - PUT =====");
    console.warn(e);
  }

  return result;
}
