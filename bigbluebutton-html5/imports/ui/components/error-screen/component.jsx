import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { Meteor } from 'meteor/meteor';
import Button from '/imports/ui/components/button/component';
import logoutRouteHandler from '/imports/utils/logoutRouteHandler';
import { styles } from './styles';

const intlMessages = defineMessages({
  500: {
    id: 'app.error.500',
    defaultMessage: 'Ops, something went wrong',
  },
  404: {
    id: 'app.error.404',
    defaultMessage: 'Not found',
  },
  401: {
    id: 'app.error.401',
  },
  leave: {
    id: 'app.error.leaveLabel',
    description: 'aria-label for leaving',
  },
});

const propTypes = {
  code: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

const defaultProps = {
  code: 500,
};

class ErrorScreen extends React.PureComponent {
  componentDidMount() {
    Meteor.disconnect();
  }

  render() {
    const {
      intl,
      code,
      children,
    } = this.props;

    let formatedMessage = intl.formatMessage(intlMessages[defaultProps.code]);

    if (code in intlMessages) {
      formatedMessage = intl.formatMessage(intlMessages[code]);
    }

    return (
      <div className={styles.background}>
        <h1>
          {code}
        </h1>
        <h1 className={styles.message}>
          {formatedMessage}
        </h1>
        <div>
          {children}
        </div>
        <div>
          <Button
            size="sm"
            onClick={logoutRouteHandler}
            label={intl.formatMessage(intlMessages.leave)}
          />
        </div>
      </div>
    );
  }
}

export default injectIntl(ErrorScreen);

ErrorScreen.propTypes = propTypes;
ErrorScreen.defaultProps = defaultProps;
