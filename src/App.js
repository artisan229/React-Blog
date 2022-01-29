import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { findRenderedDOMComponentWithClass } from 'react-dom/cjs/react-dom-test-utils.production.min';

function App() {

  let [posts, setPosts] = useState(['Next.js 사용기', 'Stack overflow', '데이터 마이그레이션']);
  let [likes, setLikes] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [input, setInput] = useState('');
  let [search, setSearch] = useState('');

  function likeChange(i) {
    var newArray = [...likes];
    newArray[i] = likes[i] + 1;
    setLikes(newArray);
  }

  function publish(text) {
    var newPosts = [...posts];
    var newLikes = [...likes];
    newPosts.unshift(text);
    newLikes.unshift(0);
    setPosts(newPosts);
    setLikes(newLikes);
  }

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div>
      </div>
      <div className="publish">
        <h3>새로운 글 쓰기</h3>
        <input onChange={(e) => { setInput(e.target.value) }} />
        <button className="btn red-btn" onClick={() => { publish(input) }} >저장</button>
      </div>

      <div className="search">
        <h3>글 검색</h3>
        <input onChange={(e) => { setSearch(e.target.value) }}></input>
        {
          posts.map((post, idx) => {
            if (post.includes(search)) {
              return (
                <div className="list" key={idx}>
              <h3 onClick={() => { setTitle(idx) }}> {posts[idx]}
                <button className="btn glass-btn font-medium" onClick={() => { likeChange(idx) }}>👍</button> {likes[idx]} </h3>
              <hr />
            </div>
              )
            } else {
              return null;
            }
          })
        }
      </div>
      <button className="btn blue-btn" onClick={() => { setModal(!modal) }}>열고닫기</button>
      {
        modal === true
          ? <Modal posts={posts} title={title} like={likes} />
          : null
      }

    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h2>{props.posts[props.title]}</h2>
      <p className="bold">👍 {props.like[props.title]} likes!!</p>
    </div>
  )
}

export default App;
