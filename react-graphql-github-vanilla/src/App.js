import React from "react";
import axios from "axios";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
  }
});

const TITLE = "React GraphQL GitHub Client";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      path: "the-road-to-learn-react/the-road-to-learn-react"
    };
  }

  componentDidMount() {}

  onChange = event => {
    event.preventDefault();
  };
  render() {
    return (
      <div>
        <h1>{TITLE}</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="url">Show open issues for https://github.com/</label>
          <input
            value={this.state.path}
            id="url"
            type="text"
            onChange={this.onChange}
            style={{ width: "300px" }}
          />
          <button type="submit">Search</button>
        </form>
        <hr />
      </div>
    );
  }
}

export default App;
