import React, { Component } from "react";
import { TEACHER } from "../../services/api";
import Header from "../common/Header";
import { Link } from "react-router-dom";

class TeacherSchoolClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grade: "",
      section: "",
      schoolYearName: "",
      students: []
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer  " + localStorage.getItem("token")
      }
    };

    const { teacherId, schoolClassId, courseId } = this.props.match.params;
    const path =
      TEACHER + teacherId + "/course/" + courseId + "/class/" + schoolClassId;
    fetch(path, requestOptions)
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            this.setState({
              grade: data.grade,
              section: data.section,
              schoolYearName: data.schoolYear.name,
              students: data.students
            });
          });
        } else {
          response.text().then(message => alert(message));
        }
      })
      .catch(error => console.log(error));
  }

  

  render() {
    const { teacherId, courseId } = this.props.match.params;
    const linkStyle = {
      textDecoration: "none",
      color: "rgb(220, 174, 29)",
      fontSize: "25px",
      fontWeight: "bold"
    };
    return (
      <div>
        <Header />
        <div className="courses_links">
          <Link to='/teacher/home'  style={linkStyle}>Back</Link>
        </div>
        <h4 className="class_heading">
          {this.state.grade} / {this.state.section} ({this.state.schoolYearName}
          )
        </h4>
        <ol className="center">
          {this.state.students.map(student => (
            <li key={student.id} className="students_list">
              {student.lastName}, {student.firstName}
              <button
              className="ok_button create_space"
                onClick={() =>
                  this.props.history.push(`/teacher/${teacherId}/student/${student.id}/course/${courseId}`)
                }
              >
                See details
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default TeacherSchoolClass;
