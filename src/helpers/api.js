import { axiosClient } from 'index.js';
import axios from 'axios';

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
    axiosClient.get("/course/v1/getcourses").then((response) => {
      //console.log('[COURSES]>>>>>>>>>>>>',response.data.data)
      stateHandler({ courseData: response.data.data })
    }
    ).catch(e => {
      console.log(e);
    });
  }
  getStudents = (stateHandler) => {
    axiosClient.get("student/v1/getallstudents").then((response) => {
      //console.log('[STUDENTS]',response.data.data)
      stateHandler({ students: response.data.data })
    }
    ).catch(e => {
      console.log(e);
    });
  }

  getAgents = (stateHandler) => {
    axiosClient.get("agent/v1/getallagents").then((response) => {
      //console.log('[AGENTS]',response.data.data)
      stateHandler({ agents: response.data.data })
    }
    ).catch(e => {
      console.log(e);
    });
  }

  studentLogin = (email, password,loginUser) => {
    axiosClient.post("student/v1/login", {
      email: email,
      password: password
    })
      .then((response) => {
        loginUser(true)
      })
      .catch((error) => console.log(error));
  }
  agentLogin = (email, password,stateHandler) => {
    axiosClient.post("agent/v1/login", {
      email: email,
      password: password
    })
      .then((response) => {
        stateHandler({ login: response.data.statusCode })
      })
      .catch((error) => console.log(error));
  }
}
  


const instance = new API();
export default instance;
