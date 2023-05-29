const requestOptions = {
  method: 'GET',
};

// const domainName = 'https://uel.azurewebsites.net';
// const domainName = 'http://thanhbinhbent-001-site1.gtempurl.com';
const domainName = 'http://tranthanhbinh-001-site1.htempurl.com';

const all_students = "/api/student/" //Dữ liệu trả về dạng JSON, hiển thị tất cả sinh viên UEL.
const all_courses = "/api/course" //Dữ liệu trả về dạng JSON, hiển thị tất cả khoá học tại UEL.
const activityscore = "/api/activityscore/" //Dữ liệu trả về dạng JSON, hiển thị điểm rèn luyện của 1 sinh viên cụ thể bằng cách truyền đối số là mã số sinh viên muốn tra cứu.
const course = "/api/course/" //Dữ liệu trả về dạng JSON, hiển thị danh sách môn học đã đăng ký của 1 sinh viên cụ thể bằng cách truyền đối số là mã số sinh viên muốn tra cứu.
const schedule = "/api/schedule/" //Dữ liệu trả về dạng JSON, hiển thị danh sách thời gian biểu của 1 sinh viên cụ thể bằng cách truyền đối số là mã số sinh viên muốn tra cứu.
const scoreboard = "/api/scoreboard/" //Dữ liệu trả về dạng JSON, hiển thị danh sách điểm học tập của 1 sinh viên trong tất cả học kỳ cụ thể bằng cách truyền đối số là mã số sinh viên muốn tra cứu.
const testschedule = "/api/testschedule/" //Dữ liệu trả về dạng JSON, hiển thị danh sách lịch thi của 1 sinh viên trong tất cả học kỳ cụ thể bằng cách truyền đối số là mã số sinh viên muốn tra cứu.
const tuition = "/api/tuition/" //Dữ liệu trả về dạng JSON, hiển thị danh sách học phí, số tiền đã đóng, cần đóng của 1 sinh viên trong tất cả học kỳ cụ thể bằng cách truyền đối số là mã số sinh viên muốn tra cứu.
const student = "/api/student/" //Dữ liệu trả về dạng JSON, hiển thị thông tin cá nhân chi tiết của 1 sinh viên cụ thể bằng cách truyền đối số là mã số sinh viên muốn tra cứu.
export default async function post_data(dataName, studentId = "") {
  try {
    var link = "";
    switch (dataName) {
      case "activityscore": link = `${domainName}${activityscore}${studentId}`; break;
      case "course": link = `${domainName}${course}${studentId}`; break;
      case "schedule": link = `${domainName}${schedule}${studentId}`; break;
      case "scoreboard": link = `${domainName}${scoreboard}${studentId}`; break;
      case "testschedule": link = `${domainName}${testschedule}${studentId}`; break;
      case "tuition": link = `${domainName}${tuition}${studentId}`; break;
      case "student": link = `${domainName}${student}${studentId}`; break;
      case "all_students": link = `${domainName}${all_students}`; break;
      case "all_courses": link = `${domainName}${all_courses}`; break;
      default: link = "gg";
    };
    const response = await fetch(link, requestOptions);
    if (!response.ok) {
      throw new Error('Something is wrong')
    }
    const json = await response.json();
    return json;
  }
  catch (error) {
    console.log(error);
    throw new Error('Network request failed')
  }
  finally {

  }
}

