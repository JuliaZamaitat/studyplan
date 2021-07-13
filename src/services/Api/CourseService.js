import Api from "@/services/Api/Api";
import authHeader from "../AuthHeader";

export default {
  fetchCourse(program, version, code) {
    code = unifyCode(code);
    program = program.replace(/\//g, "");
    version = version.replace(/\//g, "");
    return Api().get(`${program}/${version}/${code}`, {
      headers: authHeader(),
    });
  },
  fetchCourseWithSemester(program, version, code, semester) {
    code = unifyCode(code);
    semester = semester.replace(/\//g, "");
    program = program.replace(/\//g, "");
    version = version.replace(/\//g, "");
    return Api().get(
      `${program}/${version}/${code}/semester/${semester.toLowerCase()}`,
      {
        headers: authHeader(),
      }
    );
  },
};

function unifyCode(code) {
  const umlautMap = {
    "\u00dc": "U",
    "\u00c4": "A",
    "\u00d6": "O",
    "\u00fc": "u",
    "\u00e4": "a",
    "\u00f6": "o",
    "\u00df": "ss",
  };
  code = code.replace(/\./g, "-").toLowerCase(); //replacing 20.1 with 20-1
  code = decodeURI(code).replace(/\s/g, "-"); //replacing m1ws%20russisch with m1ws-russisch
  code = code
    .replace(/[\u00dc|\u00c4|\u00d6][a-z]/g, (a) => {
      const big = umlautMap[a.slice(0, 1)];
      return big.charAt(0) + big.charAt(1).toLowerCase() + a.slice(1);
    })
    .replace(
      new RegExp("[" + Object.keys(umlautMap).join("|") + "]", "g"),
      (a) => umlautMap[a]
    );
  return code;
}
