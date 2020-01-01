import React, { Component, memo } from 'react';

const TriesHooks = memo(({ triesInfo }) => {
  return (
    <li>
      <div>{triesInfo.tries}</div>
      <div>{triesInfo.result}</div>
    </li>
  );
});

export default TriesHooks;
