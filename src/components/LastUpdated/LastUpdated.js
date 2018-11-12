import React from 'react';

import '../../utility/date-format';

class LastUpdated extends React.Component {
  render() {
    const lastUpdatedDate = new Date(this.props.timestamp * 1000).format('M j');
    const lastUpdatedTime = new Date(this.props.timestamp * 1000).format('G:i');

    return (
      <>
        <div className="message is-info">
          <p className="message-header">
            <strong>
              Exchange rates last fetched from{' '}
              <a href="http://fixer.io/">fixer.io</a> on {lastUpdatedDate} at{' '}
              {lastUpdatedTime}.
            </strong>
          </p>
        </div>
      </>
    );
  }
}

export default React.memo(LastUpdated);
