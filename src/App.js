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
  query ($organization: String!, $repository: String!, $cursor: String) {
    organization(login: $organization) {
      name
      url
      repository(name: $repository) {
        name
        url
        issues(first: 5, after: $cursor, states: [OPEN]) {
          edges {
            node {
            id
            title
            url                        
            reactions(last: 3) {
              edges {
                node {
                  id
                  content
                }
              }
            }           
          }            
        }
        totalCount
pageInfo {
endCursor
hasNextPage
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

  onFetchFromGitHub = (path, cursor) => {
    const [organization, repository] = path.split("/");
    axiosGitHubGraphQL
      .post("", {
        query: GET_ISSUES_OF_REPOS,
        variables: { organization, repository, cursor }
      })
      .then(result => {
        this.setState({ organization: result.data.data.organization, errors: result.data.errors });
      });
  };

  onFetchMoreIssues = () => {
    const { endCursor } = this.state.organization.repository.issues.pageInfo;
    this.onFetchFromGitHub(this.state.path, endCursor);
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
          <Organization
            organization={this.state.organization}
            errors={this.state.errors}
            onFetchMoreIssues={this.onFetchMoreIssues}
          />
        ) : (
          <p>No information yet...</p>
        )}
      </div>
    );
  }
}

export default App;
