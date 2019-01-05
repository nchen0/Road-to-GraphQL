import React from "react";

const Organization = ({ organization, errors }) => {
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
      <Repository repository={organization.repository} />
    </div>
  );
};

const Repository = ({ repository }) => (
  <div>
    <div>
      <strong>In Repository: </strong>
      <a href={repository.url}>{repository.name}</a>
      <ul>
        {repository.issues.edges.map(issue => {
          return (
            <li key={issue.node.id}>
              <a href={issue.node.url}>{issue.node.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export default Organization;
