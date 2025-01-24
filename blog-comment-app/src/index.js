import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Comment from './components/comment';

class Article extends React.Component {

  constructor(props) {
    super(props);
    this.state = {comments: [], newComment: {Comment: "", Author: ""}};
    this.handleText = this.handleText.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.addComment = this.addComment.bind(this);
  }
  
  addComment(event) {
    event.preventDefault();
    let {comments, newComment} = this.state;
    this.setState({comments: [...comments, newComment], newComment: {Comment: "", Author: ""}})
  }

  handleText(event) {
    let {comments, newComment} = this.state;
    this.setState({ comments, newComment: {
      Comment: event.target.value,
      Author: newComment.Author
    }});
  }

  handleAuthor(event) {
    let {comments, newComment} = this.state;
    this.setState({comments, newComment: {
      Comment: newComment.Comment,
      Author: event.target.value
    }});
  }

  static componentDidUpdate() {
    console.debug(this.state);
  }


  render() {
 
    return (
    <>
    <hr></hr>
    <form className="new-comment" onSubmit={this.addComment}>
      <p>Have something in mind. Share your comments here.</p>
      <textarea required cols="40" rows="3" type="text" placeholder='Enter comment here' value={this.state.newComment.Comment} onChange={this.handleText} />
      <br/>
      <input required type="text" placeholder='Enter your name' value={this.state.newComment.Author} onChange={this.handleAuthor} />
      <input type="submit" />
    </form>
    <ul>
      { this.state.comments().map((comment) => 
        <li>
          <Comment model={comment} ></Comment>
        </li>)}
    </ul>
    </>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<Article />);
