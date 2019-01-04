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
    <p>
      <strong>Issues from Organization: </strong>
      <a href={organization.url}>{organization.name}</a>
    </p>
  );
};

export default Organization;
