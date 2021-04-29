const fetch = require("node-fetch");

const jsonFormat = "format=json";
const paginationFalse = "pagination=false";

const getAllCategories = async (req, res) => {
  let categoriesList = await fetch(
    `http://api.sr.se/api/v2/programcategories/?${jsonFormat}&${paginationFalse}`
  );
  categoriesList = await categoriesList.json();
  res.json(categoriesList.programcategories);
};

const getAllProgramsInCategory = async (req, res) => {
  let programList = await fetch(
    `http://api.sr.se/api/v2/programs/index?${jsonFormat}&${paginationFalse}&programcategoryid=${req.params.categoryId}`
  );
  programList = await programList.json();
  res.json(programList.programs);
};

module.exports = {
  getAllCategories,
  getAllProgramsInCategory,
};
