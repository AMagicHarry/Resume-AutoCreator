const db = require("../models");
const moment = require("moment");
const User = db.user;
const University = db.university;
const Company = db.company;
const Keyword = db.keyword;
const Bio = db.bio;
const Experience = db.experience;
const Skill = db.skill

// Find a single User with country || title
exports.findByCountry = (req, res) => {
  const country = req.body.country;
  const title = req.body.title;

  if (!country || !title) {
    res.status(400).send({ message: "Country and Title fields are required!" });
    return;
  }

  const minYear = 1990;
  const maxYear = 1995;
  const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1) + minYear);
  const enterYear = randomYear + 17;
  const currentYear = moment().year();
  const workYears = currentYear - enterYear - 4;
  let numberOfCompany = 0;
  let juniorYear, middleYear, seniorYear = 0;

  if (workYears < 9) {
    numberOfCompany = 3;
    juniorYear = 1;
    middleYear = 1;
    seniorYear = 1;
  } else if (workYears < 12) {
    numberOfCompany = 4;
    juniorYear = 1;
    middleYear = 1;
    seniorYear = 2;
  } else {
    numberOfCompany = 5;
    juniorYear = 1;
    middleYear = 2;
    seniorYear = 2;
  }

  const yearsForEachCompany = Array.from({ length: numberOfCompany }, () => 1);
  let remainingWorkYear = workYears - numberOfCompany;
  for (let i = 0; i < numberOfCompany - 1; i++) {
    const randomYear = Math.floor(Math.random() * remainingWorkYear);
    yearsForEachCompany[i] += randomYear;
    remainingWorkYear -= randomYear;
  }
  yearsForEachCompany[numberOfCompany - 1] += remainingWorkYear;

  // const userPromise = User.findOne({ country: country });
  // const universityPromise = University.findOne({ country: country });
  // const companyPromise = Company.find({ country: country }).limit(numberOfCompany);
  // const bioPromise = Bio.findOne({ title: title });
  // const skillPromise = Skill.findOne({ title: title });
  const userPromise = User.aggregate([
    { $match: { country: country } },
    { $sample: { size: 1 } }
  ]);
  const companyPromise = Company.aggregate([
    { $match: { country: country } },
    { $sample: { size: numberOfCompany } }
  ]);
  const universityPromise = University.aggregate([
    { $match: { country: country } },
    { $sample: { size: 1 } }
  ]);
  const bioPromise = Bio.aggregate([
    { $match: { title: title } },
    { $sample: { size: 1 } }
  ]);
  const skillPromise = Skill.aggregate([
    { $match: { title: title } },
    { $sample: { size: 1 } }
  ]);

  const juniorExperiencePromise = Experience.find({ title: title, level: "junior" }).limit(juniorYear);
  const middleExperiencePromise = Experience.find({ title: title, level: "middle" }).limit(middleYear);
  const seniorExperiencePromise = Experience.find({ title: title, level: "senior" }).limit(seniorYear);

  Promise.all([userPromise, universityPromise, companyPromise, bioPromise, skillPromise, juniorExperiencePromise, middleExperiencePromise, seniorExperiencePromise])
    .then((data) => {
      const [userData, universityData, companyData, bioData, skillData, juniorData, middleData, seniorData] = data;
      const userResponse = userData && userData.length ? { ...userData[0], birthYear: randomYear } : {};
      const universityResponse = universityData && universityData.length ? { ...universityData[0], enterYear: enterYear } : {};
      const profileData = bioData && bioData.length ? { ...bioData[0], skill: skillData[0]?.skill } : {};

      let addYearMiddle = 0;
      let addYearSenior = 0;

      for (var i = 0; i < juniorYear; i++) {
        juniorData[i] = juniorData[i].toObject();
        juniorData[i].company = companyData[i].company;
        juniorData[i].city = companyData[i].city;
        juniorData[i].country = companyData[i].country;
        juniorData[0].enterYear = enterYear + 4;
      }
      for (var i = juniorYear; i < juniorYear + middleYear; i++) {
        middleData[i - juniorYear] = middleData[i - juniorYear].toObject();
        middleData[i - juniorYear].company = companyData[i].company;
        middleData[i - juniorYear].city = companyData[i].city;
        middleData[i - juniorYear].country = companyData[i].country;
        addYearMiddle += yearsForEachCompany[i - juniorYear]
        middleData[i - juniorYear].enterYear = juniorData[0].enterYear + addYearMiddle;
      }
      for (var i = juniorYear + middleYear; i < juniorYear + middleYear + seniorYear; i++) {
        seniorData[i - juniorYear - middleYear] = seniorData[i - juniorYear - middleYear].toObject();
        seniorData[i - juniorYear - middleYear].company = companyData[i].company;
        seniorData[i - juniorYear - middleYear].city = companyData[i].city;
        seniorData[i - juniorYear - middleYear].country = companyData[i].country;
        addYearSenior += yearsForEachCompany[i - 1];
        seniorData[i - juniorYear - middleYear].enterYear = middleData[middleYear - 1].enterYear + addYearSenior;
      }

      const experienceData = {
        JuniorYear: juniorYear,
        MiddleYear: middleYear,
        SeniorYear: seniorYear,
        [juniorData ? "junior" : undefined]: juniorData,
        [middleData ? "middle" : undefined]: middleData,
        [seniorData ? "senior" : undefined]: seniorData
      };

      res.json({ user: userResponse, university: universityResponse, profile: profileData, experience: experienceData });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving info" });
    });
};