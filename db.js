// const db = {
//     user: "postgres",
//     host: "152.67.33.238",
//     database: "yates-calidad",
//     password: "LN#OjsdA29Msd",
//     port: 5432,
// };

// const db_aws = {
//     user: "xsunlcmeebeczc",
//     host: "ec2-54-160-96-70.compute-1.amazonaws.com",
//     database: "dbtfbu578gqvk6",
//     password: "847fc19d67b0b4d987d9c12ad748702a10346a52cbcfbd2e267ae6012d5bdbe3",
//     port: 5432,
//     ssl: { rejectUnauthorized: false }
// }
const fs = require("fs");

const db_aws = {
  user: "postgres",
  host: "18.117.253.28",
  database: "yates_calidad",
  password: "AsD85.DklmnO",
  port: 3080,
  ssl: process.env.DATABASE_SSL === `true`,
};

module.exports = db_aws;
