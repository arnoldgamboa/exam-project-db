"use strict";

/**
 *  student controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::student.student", ({ strapi }) => ({
  async postScores(ctx) {
    let scores = ctx.request.body.testing;
    let quarter = ctx.request.body.quarter;

    let score = scores.split("\n");

    console.log("scrore", score);
    for (let s of score) {
      let names = s.split(" ");
      let name = names[0] + " " + names[1];
      let student = await strapi.entityService.findMany(
        "api::student.student",
        {
          filters: {
            name: name,
          },
        }
      );

      console.log("name", name, student);
      let studentId = 0;

      if (student.length > 0) studentId = student[0].id;
      console.log(student);

      if (student.length == 0) {
        let ss = await strapi
          .service("api::student.student")
          .create({ data: { name: name } });

        studentId = ss.id;
      }

      console.log("student", studentId);
      console.log("quarter", quarter);

      let saveHomework = false;
      let saveTest = false;

      //delete hw
      let hw = await strapi.entityService.findMany(
        "api::homework-score.homework-score",
        {
          filters: {
            student: studentId,
            quarter: quarter,
          },
        }
      );

      for (let h of hw) {
        let hw = await strapi.db
          .query("api::homework-score.homework-score")
          .delete({
            where: { id: h.id },
          });
      }

      //   delete test
      let test = await strapi.entityService.findMany(
        "api::test-score.test-score",
        {
          filters: {
            student: studentId,
            quarter: quarter,
          },
        }
      );

      for (let te of test) {
        let hw = await strapi.db.query("api::test-score.test-score").delete({
          where: { id: te.id },
        });
      }

      for (let t of names) {
        if (t === "H") {
          saveHomework = true;
          saveTest = false;
        }

        if (t === "T") {
          saveTest = true;
          saveHomework = false;
        }

        if (t > 0 && t < 101) {
          let score = {
            score: t,
            student: studentId,
            quarter: quarter,
          };

          if (saveHomework) {
            await strapi
              .service("api::homework-score.homework-score")
              .create({ data: score });
          }

          if (saveTest) {
            await strapi
              .service("api::test-score.test-score")
              .create({ data: score });
          }
        }
      }

      //   console.log(student);
    }

    //  ctx.body = ctx.params.testing;
    // return { response: true };
    ctx.body = { response: true };
  },
}));
