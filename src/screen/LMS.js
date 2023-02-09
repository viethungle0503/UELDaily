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
}

async function core_course_get_contents(id, token) {
  try {
    const wsfunction = 'wsfunction=' + 'core_course_get_contents';
    const wstoken = 'wstoken=' + token;
    const courseid = 'courseid=' + id;
    const data = [wstoken, wsfunction, moodlewsrestformat, courseid];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
}

async function core_user_get_course_user_profiles(token) {
  try {
    const wsfunction = 'wsfunction=' + 'core_user_get_course_user_profiles';
    const wstoken = 'wstoken=' + token;
    const courseid = 'userlist[0][courseid]=' + 4;
    const userid = 'userlist[0][userid]=' + 2;
    const data = [wstoken, wsfunction, moodlewsrestformat, courseid, userid];
    const link = serverUrl.concat("?", data.join('&'));
    const parameter = await postRequest(link);
    return parameter;
  }
  catch (error) {
    console.error(error);
  } finally {
  }
}

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
};