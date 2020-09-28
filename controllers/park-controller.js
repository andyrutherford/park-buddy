exports.addPark = async (req, res, next) => {
  console.log(req.body);
  res.send(req.body.parkId);
};
