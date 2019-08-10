import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ExampleComponent = (props) => {
  ExampleComponent.propTypes = {
    text: PropTypes.string.isRequired,
  };

  const { text } = props;

  const [state, setState] = useState(`ExampleComponent loading with text: ${text}`);

  useEffect(() => {
    async function loadState() {
      const newState = await Promise.resolve(`ExampleComponent loaded with text: ${text}`);
      setState(newState);
    }
    loadState();
  });

  return (
    <div>
      <span>View ExampleComponent.js as an example of a component to edit using react hooks!</span>
      <br />
      <b>
        {state}
      </b>
    </div>
  );
};

export default ExampleComponent;
