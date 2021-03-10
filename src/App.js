import React, { Component } from "react";
import "./App.scss";
import CommentList from "./CommentList";
import AdminMode from "./AdminMode";
import CommentForm from "./CommentForm";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class App extends Component {
  state = {
    comments: [],
    isAdmin: false,
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/comments").then((res) => {
      console.log(res.data);
      this.setState({
        comments: res.data.filter((comment) => comment.postId == 1),
      });
    });
  }

  addComment = (name, message) => {
    axios
      .post("https://jsonplaceholder.typicode.com/comments", {
        name: name,
        body: message,
        postId: 1,
      })
      .then((res) => {
        this.setState({
          comments: [...this.state.comments, res.data],
        });
      });
  };

  deleteComment = (id) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/comments/" + id)
      .then((res) => {
        let comments = this.state.comments.filter(
          (comment) => comment.id !== id
        );
        this.setState({
          comments: comments,
        });
      });
  };

  changeMode = () => {
    this.setState({
      isAdmin: !this.state.isAdmin,
    });
  };

  render() {
    return (
      <div className="App container">
        <AdminMode changeMode={this.changeMode} isAdmin={this.state.isAdmin} />
        <div className="columns">
          <div className="column">
            <CommentForm addComment={this.addComment} />
          </div>
          <div className="column">
            <CommentList
              comments={this.state.comments}
              deleteComment={this.deleteComment}
              isAdmin={this.state.isAdmin}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
