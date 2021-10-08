const degreesToRadians = function(degrees){
  return (degrees * Math.PI)/180
}
const getDistance = (
  originLatitude,
  originLongitude,
  destinationLatitude,
  destinationLongitude
) => {
  const EARTH_RADIUS = 6_371.071; // Earth 
  const diffLatitudeRadians = degreesToRadians(
    destinationLatitude - originLatitude
  );
  const diffLongitudeRadians = degreesToRadians(
    destinationLongitude - originLongitude
  );
  const originLatitudeRadians = degreesToRadians(
    originLatitude
  );
  const destinationLatitudeRadians = degreesToRadians(
    destinationLatitude
  );
  const kmDistance =
    2 * EARTH_RADIUS *
    Math.asin(
      Math.sqrt(
        Math.sin(diffLatitudeRadians / 2) * Math.sin(diffLatitudeRadians / 2) +
        Math.cos(originLatitudeRadians) *
        Math.cos(destinationLatitudeRadians) *
        Math.sin(diffLongitudeRadians / 2) *
        Math.sin(diffLongitudeRadians / 2)
      )
    );
  return kmDistance;
}

const getLatitude = (targetCities, targetCity) => {
  if(targetCities.length !== 0){
    for(let city in targetCities){
      if(targetCities[city].city===targetCity){
        const lat = targetCities[city].latitude;
        return lat;
      }
    }
  }
}

const getLongitude = (targetCities, targetCity) => {
  if(targetCities.length !== 0){
    for(let city in targetCities){
      if(targetCities[city].city===targetCity){
        const lon = targetCities[city].longitude;
        return lon;
      }
    }
  }
}

const calculateAdultFee = (
  international,
  selectedClass,
  distance
) => {
  if (international) {
    if (selectedClass === 'Econômica') {
      return distance * 0.5;

    } else {
      return (distance * 0.5) * 1.8
    }
  } else {
    if (selectedClass === 'Econômica') {
      return distance * 0.3
    } else {
      return (distance * 0.3) * 1.8
    }
  }
}

const calculateChildrenFee = (
  international,
  selectedClass,
  distance
) => {
  if (international) {
    if (selectedClass === 'Econômica') {
      return distance * 0.25;

    } else {
      return (distance * 0.25) * 1.4
    }
  } else {
    if (selectedClass === 'Econômica') {
      return distance * 0.15
    } else {
      return (distance * 0.3) * 1.4
    }
  }
}

// const calculatePrice = (adults, children, adultFee, childrenFee,miles) => {

// }



export{
  getDistance,
  getLatitude,
  getLongitude,
  degreesToRadians,
  calculateAdultFee,
  calculateChildrenFee
  
}