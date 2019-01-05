import React from "react";
import axios from "axios";
import Organization from "./components/Organization";

const axiosGitHubGraphQL = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}`
  }
});

const TITLE = "React GraphQL GitHub Client";

const GET_ISSUES_OF_REPOS = `
  query ($organization: String!, $repository: String!) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(last: 5) {
          edges {
            node {
            id
            title
            url
          }
        }
      }
    }
  }
}
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      path: "the-road-to-learn-react/the-road-to-learn-react",
      organization: null,
      errors: null
    };
  }

  componentDidMount() {
    this.onFetchFromGitHub(this.state.path);
  }

  onChange = event => {
    event.preventDefault();
    this.setState({ path: event.target.value });
  };

  onSubmit = event => {
    this.onFetchFromGitHub(this.state.path);
    event.preventDefault();
  };

  onFetchFromGitHub = path => {
    const [organization, repository] = path.split("/");
    axiosGitHubGraphQL
      .post("", {
        query: GET_ISSUES_OF_REPOS,
        variables: { organization, repository }
      })
      .then(result => {
        console.log("result.data is: ", result.data);
        this.setState({ organization: result.data.data.organization, errors: result.data.errors });
      });
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
        {this.state.organization ? (
          <Organization organization={this.state.organization} />
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    );
  }
}

export default App;
