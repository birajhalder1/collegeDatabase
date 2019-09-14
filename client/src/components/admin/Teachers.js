import React, { Component } from "react";
import axios from "axios";

class Teachers extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      add: "",
      dept: "",
      phone: "",
      email: "",
      teachers: []
    };
    // this.onSaveTeacher = this.onSaveTeacher.bind(this)
  }
  isAllright = () => {
    if (
      this.state.name === "" ||
      this.state.add === "" ||
      this.state.dept === "" ||
      this.state.phone === "" ||
      this.state.email === ""
    ) {
      return false;
    }
    return true;
  };

  onSaveTeacher = () => {
    if (this.isAllright()) {
      //1. make the data object
      let data = {
        name: this.state.name,
        add: this.state.add,
        dept: this.state.dept,
        phone: this.state.phone,
        email: this.state.email
      };
      //2. call backend server route using axios
      axios.post("admin/teacher/teacherInfo", data).then(response => {
        console.log(response.data);
        alert("Your data is successfully inserted");
      });
    }
  };

  // Load get all teacher
  componentDidMount = () => {
    this.getAllTeacher();
  };
  getAllTeacher = () => {
    // call backend server and get all teacher info
    axios.get("admin/teacher/").then(response => {
      this.setState({ teachers: response.data });

      console.log(response.data);
    });
  };

  // call backend server and get teacher info update
  onUpdate = id => {
    axios.get(`admin/teacher/getSingle/${id}`).then(res => {
      console.log(res.data);
      this.setState({
        id: res.data._id,
        name: res.data.name,
        add: res.data.add,
        dept: res.data.dept,
        phone: res.data.phone,
        email: res.data.email
      });
    });
  };

  // Update teachers records
  onUpdateTeacher = () => {
    //1. make the data object
    let data = {
      name: this.state.name,
      add: this.state.add,
      dept: this.state.dept,
      phone: this.state.phone,
      email: this.state.email
    };
    axios.post(`admin/teacher/update/${this.state.id}`, data).then(response => {
      console.log(response.data);
    });
  };

  // Get teacher name
  onSearchTeacher = () => {
    axios
      .get("admin/teacher/name")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Enter name"
          />
          <input
            type="textarea"
            name="add"
            col="5"
            row="4"
            value={this.state.add}
            onChange={e => this.setState({ add: e.target.value })}
            placeholder="Enter address"
          />
          <input
            type="text"
            name="dept"
            value={this.state.dept}
            onChange={e => this.setState({ dept: e.target.value })}
            placeholder="Enter depertment"
          />
          <input
            type="number"
            name="phone"
            value={this.state.phone}
            onChange={e => this.setState({ phone: e.target.value })}
            placeholder="Enter phone no"
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Enter email"
          />
        </form>
        {this.state.id === "" ? (
          <button onClick={this.onSaveTeacher} className="btn btn-info">
            Submit
          </button>
        ) : (
          <button onClick={this.onUpdateTeacher}>Update</button>
        )}

        {this.state.teachers.length > 0 ? (
          //if teachers array is not empty
          this.state.teachers.map(one => (
            <div>
              <h3>{one.name} </h3>{" "}
              <button onClick={() => this.onUpdate(one._id)}>Edit</button>
            </div>
          ))
        ) : (
          <h2>No Data available</h2>
        )}

        <form>
          <input type="text" name="search" placeholder="search name" />
        </form>
        <button onClick={this.onSearchTeacher}>Search</button>
      </div>
    );
  }
}

export default Teachers;
