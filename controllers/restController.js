const Rest = require("../models/restModel");
const restDB = require("../../db/michelin-restaurants-uk.json");

const restUploadHandler = () => {
  for (let i in restDB) {
    const rest = new Rest({
      name: restDB[i].name,
      latitude: restDB[i].latitude,
      longitude: restDB[i].longitude,
      city: restDB[i].city,
      region: restDB[i].region,
      cuisine: restDB[i].cuisine,
      url: restDB[i].url,
      stars: restDB[i].stars,
    });
    rest.save();
  }
};

//get all rests
const getRests = async (req, res) => {
  const rests = await Rest.find({});
  await res.status(200).json(rests);
};

const getRestsByFilter = async (req, res) => {
  const { stars, cuisine, city } = req.body;
  const intStars = parseInt(stars);
  if (stars && cuisine && city) {
    const rests = await Rest.find({ stars: intStars, cuisine, city });
    res.status(200).json(rests);
    return;
  }

  if (stars) {
    if (cuisine) {
      const rests = await Rest.find({ stars: intStars, cuisine });
      res.status(200).json(rests);
      return;
    }
    if (city) {
      const rests = await Rest.find({ stars: intStars, city });
      res.status(200).json(rests);
      return;
    }
    const rests = await Rest.find({ stars: intStars });
    res.status(200).json(rests);
  }

  if (cuisine) {
    if (stars) {
      const rests = await Rest.find({ stars: intStars, cuisine });
      res.status(200).json(rests);
      return;
    }
    if (city) {
      const rests = await Rest.find({ cuisine, city });
      res.status(200).json(rests);
      return;
    }
    const rests = await Rest.find({ cuisine });
    res.status(200).json(rests);
  }
  if (city) {
    if (stars) {
      const rests = await Rest.find({ stars: intStars, city });
      res.status(200).json(rests);
      return;
    }
    if (cuisine) {
      const rests = await Rest.find({ cuisine, city });
      res.status(200).json(rests);
      return;
    }
    const rests = await Rest.find({ city });
    res.status(200).json(rests);
  }
};

//add new restaurant
const addRest = async (req, res) => {
  const { name, latitude, longitude, city, region, cuisine, url, stars } =
    req.body;

  const newRest = await new Rest({
    name,
    latitude,
    longitude,
    city,
    region,
    cuisine,
    url,
    stars,
  });
  await newRest.save((err) => {
    if (err) {
      res.send("Restaurant didn't save");
    } else {
      res.send("Restaurant uploaded Successfully");
    }
  });
};

module.exports = { getRests, getRestsByFilter, addRest, restUploadHandler };
