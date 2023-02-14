const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: JSON.stringify({ postName: 'React updates ' }),
};
const domainName = 'https://lms-uel.thanhbinhbent.com';
const serverUrl = domainName + '/webservice/rest/server.php';
const loginUrl = domainName + '/login/token.php';
const moodlewsrestformat = 'moodlewsrestformat=' + 'json';

async function get_web_service_token() {
  const username = "username=" + "thanhbinh.bent@gmail.com";
  const password = "password=" + "Maiyeuuel2223@";
  const service = "service=" + "moodle_react_native_app";
  const data = [username, password, service];
  const link = loginUrl.concat("?", data.join('&'));
  const token = await postRequest(link);
  return token;
};

async function core_course_get_contents(token, id) {
  try {
    const wsfunction = 'wsfunction=' + 'core_course_get_contents';
    const wstoken = `wstoken=${token}`;
    const courseid = `courseid=${id}`;
    const data = [wstoken, wsfunction, moodlewsrestformat, courseid];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
};

async function core_user_get_course_user_profiles(token, courseId = 1, userId = 1) {
  try {
    const wsfunction = 'wsfunction=' + 'core_user_get_course_user_profiles';
    const wstoken = `wstoken=${token}`;
    const courseid = `userlist[0][courseid]=${courseId}`;
    const userid = `userlist[0][userid]=${userId}`;
    const data = [wstoken, wsfunction, moodlewsrestformat, courseid, userid];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
};

async function core_user_get_users(token, criteria_key = "auth", criteria_value = "oauth2") {
  try {
    const wsfunction = 'wsfunction=' + 'core_user_get_users';
    const wstoken = `wstoken=${token}`;
    const key = `criteria[0][key]=${criteria_key}`;
    const value = `criteria[0][value]=${criteria_value}`;
    const data = [wstoken, wsfunction, moodlewsrestformat, key, value];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
};

async function core_user_get_users_by_field(token, field = "email", field_value = "ad.thanhbinhent@gmail.com") {
  try {
    const wsfunction = 'wsfunction=' + 'core_user_get_users_by_field';
    const wstoken = `wstoken=${token}`;
    const key = `field=${field}`;
    const value = `values[0]=${field_value}`;
    const data = [wstoken, wsfunction, moodlewsrestformat, key, value];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
};

async function core_enrol_get_users_courses(token, userId, returnUserCount = 1) {
  try {
    const wsfunction = 'wsfunction=' + 'core_enrol_get_users_courses';
    const wstoken = `wstoken=${token}`;
    const userid = `userid=${userId}`;
    const returnusercount = `returnusercount=${returnUserCount}`;
    const data = [wstoken, wsfunction, moodlewsrestformat, userid, returnusercount];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
};

async function core_course_get_courses(token, courseId) {
  try {
    const wsfunction = 'wsfunction=' + 'core_course_get_courses';
    const wstoken = `wstoken=${token}`;
    const courseid = `options[ids][0]=${courseId}`;
    const data = [wstoken, wsfunction, moodlewsrestformat, courseid];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
};

async function core_course_get_course_module(token, courseModuleId) {
  try {
    const wsfunction = 'wsfunction=' + 'core_course_get_course_module';
    const wstoken = `wstoken=${token}`;
    const cmid = `cmid=${courseModuleId}`;
    const data = [wstoken, wsfunction, moodlewsrestformat, cmid];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
};

const postRequest = async (link) => {
  try {
    const response = await fetch(link, requestOptions);
    const json = await response.json();
    return json;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
}

export {
  get_web_service_token,
  core_course_get_contents,
  core_user_get_course_user_profiles,
  core_user_get_users,
  core_user_get_users_by_field,
  core_enrol_get_users_courses,
  core_course_get_courses,
  core_course_get_course_module,
};