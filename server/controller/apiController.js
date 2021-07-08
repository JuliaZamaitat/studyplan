const axios = require("axios"),
  url = "https://modulehandbook-fork.herokuapp.com";

axios.defaults.headers.common["AUTH-TOKEN"] = "xyz"; //For consuming the API without logging in

function getParams(params) {
  const data = {
    program: params.program,
    stupo: params.stupo,
    course: params.course,
    course2: params.course2,
    semester: params.semester,
  };
  return data;
}

module.exports = {
  programs: (req, res) => {
    return axios
      .get(url + "/programs.json")
      .then((programs) => {
        res.json(programs.data);
      })
      .catch((e) => console.log(e));
  },
  programWithStuPo: (req, res) => {
    const data = getParams(req.params);
    return axios
      .get(url + `/${data.program}/${data.stupo}.json`)
      .then((program) => {
        res.json(program.data);
      })
      .catch((e) => console.log(e));
  },
  courseProgram: (req, res) => {
    const data = getParams(req.params);
    return axios
      .get(url + `/${data.program}/${data.stupo}/${data.course}.json`)
      .then((course) => {
        res.json(course.data);
      })
      .catch((e) => console.log(e));
  },

  courseProgramWithSemester: (req, res) => {
    const data = getParams(req.params);
    return axios
      .get(
        url +
          `/${data.program}/${data.stupo}/${data.course}/semester/${data.semester}.json`
      )
      .then((course) => {
        res.json(course.data);
      })
      .catch((e) => {
        res.sendStatus(e.response.status);
        console.log(e);
      });
  },
};
