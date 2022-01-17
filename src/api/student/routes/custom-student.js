module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "POST",
      path: "/students/post-scores",
      handler: "student.postScores",
    },
  ],
};
