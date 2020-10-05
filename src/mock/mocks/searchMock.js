const API = require("../../apis");
const Random = require("mockjs").Random;

const searchInfoVO = {
  data: {
    total: Random.natural(100, 1000),
    "info|8": [
      {
        "abst|1": /[A-Z]([a-z]{5,8} ){0,100}\./,
        doi: "10.1109/ASE.2019.00010",
        "id|+1": Random.natural(1, 1000),
        keywords: /(([a-z]{4,8};){0,4}[a-z]{4,8})?/,
        publication:
          "2016 31st IEEE/ACM International Conference on Automated Software Engineering (ASE)",
        publicationYear: /201[6-9]/,
        title: /[A-Z]([a-z]{5,8} ){5,15}/,
        author: "@first @last"
      }
    ]
  },
  message: "ok"
};

module.exports = {
  comsearch: [API.COM_SEARCH, "post", searchInfoVO],
};
