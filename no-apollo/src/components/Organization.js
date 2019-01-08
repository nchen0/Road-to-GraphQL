import React from "react";

const Organization = ({ organization, errors, onFetchMoreIssues }) => {
  if (errors) {
    return (
      <p>
        <strong>Something went wrong:</strong>
        {errors.map(error => error.message).join(" ")}
      </p>
    );
  }
  return (
    <div>
      <strong>Issues from Organization: </strong>
      <a href={organization.url}>{organization.name}</a>
      <Repository repository={organization.repository} onFetchMoreIssues={onFetchMoreIssues} />
    </div>
  );
};

const Repository = ({ repository, onFetchMoreIssues }) => {
  return (
    <div>
      <div>
        <strong>In Repository: </strong>
        <a href={repository.url}>{repository.name}</a>
        <ul>
          {repository.issues.edges.map(issue => {
            return (
              <li key={issue.node.id}>
                <a href={issue.node.url}>{issue.node.title}</a>
                <Reactions reaction={issue.node.reactions} />
              </li>
            );
          })}
        </ul>
      </div>
      <hr />
      {repository.issues.pageInfo.hasNextPage && <button onClick={onFetchMoreIssues}>More</button>}
    </div>
  );
};

const Reactions = ({ reaction }) => {
  return (
    <div>
      {reaction.edges.map(rxn => {
        return <div key={rxn.node.id}>{rxn.node.content}</div>;
      })}
    </div>
  );
};

export default Organization;
