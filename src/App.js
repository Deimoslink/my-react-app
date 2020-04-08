import React from 'react';
import './App.css';
import Pagination from "./components/Pagination";
import axios from "axios";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      offset: 0,
      limit: 10,
      total: 0,
      results: []
    };
  }

  concatURL = () => {
    return `http://localhost:4000/movies?search=${this.state.title}&searchBy=title&offset=${this.state.offset}&limit=${this.state.limit}`;
  };

  pageSizeChange = (size) => {
    this.setState({limit: size, offset: 0}, () => {this.triggerSearch()});
  };

  pageChange = (newOffset) => {
    this.setState({offset: newOffset}, () => {this.triggerSearch()});
  };

  triggerSearch = () => {
    axios.get(this.concatURL())
        .then(res => {
          this.setState({results: res.data.data, total: res.data.totalAmount});
          console.log(res)
        });
  };

  render() {
    return (
        <div className="App">
          <div className="container">

            <div className="row justify-content-center my-4">
              <Pagination className="mb-2"
                          limit={this.state.limit}
                          offset={this.state.offset}
                          total={this.state.total}
                          onPageChange={(newOffset) => this.pageChange(newOffset)}
                          onPageSizeChange={(size) => this.pageSizeChange(size)}
              />
            </div>

            <div className="row justify-content-center my-4">
              <div className="search-wrapper">
                <div className="input-group">
                  <input type="text"
                         value={this.state.title}
                         onChange={(event) => {this.setState({title: event.target.value})}}
                         className="form-control"
                         placeholder="Title"/>
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary"
                            type="button" onClick={this.triggerSearch}>Search</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center my-4">
              <ul className="list-group">
                {this.state.results.map(el => <li className="list-group-item" key={el.id}>{el.title}</li>)}
              </ul>
            </div>

          </div>
        </div>
    );
  }

  componentDidMount() {
    this.triggerSearch();
  }

}

export default App;
