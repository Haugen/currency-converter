import React from 'react';

import '../../utility/date-format';

class LastUpdated extends React.Component {
  render() {
    const lastUpdatedDate = new Date(this.props.timestamp * 1000).format('M j');
    const lastUpdatedTime = new Date(this.props.timestamp * 1000).format('G:i');

    return (
      <>
        <div>
          <strong>
            Exchange rates last fetched from{' '}
            <a href="http://fixer.io/">fixer.io</a> on {lastUpdatedDate} at{' '}
            {lastUpdatedTime}.
          </strong>
        </div>
      </>
    );
  }
}

export default React.memo(LastUpdated);
