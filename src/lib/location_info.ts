import * as fs from 'fs/promises';

async function getLocationInfo(locations: string[]) {
  let apiKey: string = "170292596801184127888x39017";
  let baseURL: URL = new URL("https://geocode.xyz/");

  let locationInfo: any = {};
  
  for (const location of locations) {
    let searchURL: URL = new URL(`${baseURL}${location}`);
    searchURL.searchParams.append('json', '1');
    searchURL.searchParams.append('auth', apiKey);

    try {
      let locationResponse: Response = await fetch (searchURL);
      if (locationResponse.status == 200) {
        let locationData: any = await locationResponse.json();
        locationInfo[locationData.standard.city] = { "latt": locationData.latt, "longt": locationData.longt }
      }
    } catch(e: any) {
      console.error(e);
    }
  };
  return locationInfo;
}

async function writeLocations(locations: string[]) {
  let locationInfo: any = await getLocationInfo(locations);

  try {
    fs.writeFile('./src/lib/types/location_data.json', JSON.stringify(locationInfo, null, 2));
  } catch(e: any) {
    console.error(e);
  }
}
import locationData from './types/location_data.json'
import pocketbaseInstance from '../pocketbase'
export type LocationTag = {
  longt: number,
  latt: number
}

export type CityLocation = keyof typeof locationData

export function getTagLocation(location: CityLocation): LocationTag {
  return locationData[location]
}

export async function getLocationTagsFromDb(){
  return pocketbaseInstance.getList("tags", "(type = 'location')")
}
export { writeLocations };