import { axiosClient } from 'index.js';


class API {

  // POST requests

  registerUser(data) {
    axiosClient.post("user/register", {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      password: data.password,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }



  // getCourses = (stateHandler) => {
  //   axiosClient.get("http://localhost:8000​/api​/course​/v1​/getcourses​/").then((response) => {
  //     console.log('[COURSE API]', response)
  //     stateHandler({courses: response})
  //   }
  //   );
  // }
  // getAgents = (stateHandler) => {
  //   axiosClient.get("https://launchpad-red.au-syd.mybluemix.net/agregator/api/agentprofile").then((response) => {
  //     console.log('[AGENTS]', response.data.agents)
  //     stateHandler({ agents: response.data.agents })
  //   }
  //   ).catch(e => {
  //     console.log(e);
  //   });
  // }
  getCourses = (stateHandler) => {
    axiosClient.get("/v1/course/getcourses").then((response) => {
      //console.log('[COURSES]>>>>>>>>>>>>',response.data.data)
      stateHandler({ courseData: response.data.data })
    }
    ).catch(e => {
      console.log(e);
    });
  }
  getStudents = (stateHandler) => {
    axiosClient.get("/v1/students/getallstudents").then((response) => {
      //console.log('[STUDENTS]',response.data.data)
      stateHandler({ students: response.data.data })
    }
    ).catch(e => {
      console.log(e);
    });
  }

  getAgents = (stateHandler) => {
    axiosClient.get("v1/agent/getallagents").then((response) => {
      //console.log('[AGENTS]',response.data.data)
      stateHandler({ agents: response.data.data })
    }
    ).catch(e => {
      console.log(e);
    });
  }

  studentLogin = (email, password, loginUser) => {
    axiosClient.post("/v1/students/login", {
      email: email,
      password: password
    })
      .then((response) => {
        window.localStorage.setItem('studentid', response.data.data[0]._id)
        loginUser(true)
      })
      .catch((error) => console.log(error));
  }
  agentLogin = (email, password, stateHandler) => {
    axiosClient.post("v1/agent/login", {
      email: email,
      password: password
    })
      .then((response) => {
        stateHandler({ login: response.data.statusCode })
      })
      .catch((error) => console.log(error));
  }

  sendCourseInterest = (studentid, interestedCourses) => {
    console.log('[DATA TYPE]', interestedCourses)
    axiosClient.put("/v1/students/update/student/interestedcourses/" + studentid, {
      interestedCourses: interestedCourses
    })
      .then((response) => {
        this.createApplication(studentid, interestedCourses)
      })
      .catch((error) => console.log(error));

  }

  createApplication = (studentId, courseId) => {
    console.log('[API]', courseId)
    axiosClient.post("/v1/create/application/", {
      studentId: studentId,
      courseId: courseId
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error));

  }

  getStudentApplications = (studentId, stateHandler, callback) => {
    axiosClient.get("/v1/getapplication/" + studentId)
      .then((response) => {
        stateHandler({ application: response.data.data })
        callback()
      })
      .catch((error) => console.log(error));

  }

  updateApplicationStatus = (studentId, courseId, status) => {
    console.log('[API]', courseId)
    axiosClient.put("/v1/update/application/", {
      studentId: studentId,
      courseId: courseId,
      status: status
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error));

  }

  uploadDocuments = (files, studentId) => {
    let file = new FormData()
    files.forEach(element => {
      file.append('file', element)
    })
    file.append('studentId', studentId)
    console.log('====================', file)
    axiosClient.post("/v1/students/upload/documents", file, {})
      .then((response) => {
        console.log(response)
      })
      .catch((error) => console.log(error));

  }

  downloadDocuments = (studentId, stateHandler) => {
    axiosClient.get("/v1/students/download/documents/" + studentId)
      .then((response) => {
        //console.log('==============================>', response.data.data)

        stateHandler({ files: response.data.data, getDocuments: false })
      })
      .catch((error) => console.log(error));

  }

}

const instance = new API();
export default instance;
