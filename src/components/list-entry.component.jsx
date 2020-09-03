import React from "react";

import Entry from "./entry.component";

const ListEntry = ({ entries }) => {
  return (
    <div>
      {entries.map((entries) => (
        <Entry entries={entries} key={entries.id} />
      ))}
    </div>
  );
};

export default ListEntry;
