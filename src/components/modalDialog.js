import React from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);

    let opacity = 0;
    let display = 'block';
    let visibility = 'hidden';

    if (props.show) {
      opacity = 1;
      display = 'block';
      visibility = 'visible';
    }

    this.state = {
      opacity,
      display,
      visibility,
      show: props.show,
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.show !== props.show) {
      if (this.props.transitionSpeed) {
        if (props.show == true) this.fadeIn();
        else this.fadeOut();
      } else this.setState({ show: props.show });
    }
  }

  hideOnOuterClick = (event) => {
    // todo : hide modal on click outside the modal
  }

  fadeIn = () => {
    this.setState({
      display: 'block',
      visibility: 'visible',
      show: true,
    }, () => {
      setTimeout(() => {
        this.setState({ opacity: 1 });
      }, 10);
    });
  }

  fadeOut = () => {
    this.setState({ opacity: 0 }, () => {
      setTimeout(() => {
        this.setState({ show: false });
      }, this.props.transitionSpeed);
    });
  }

  render() {
    if (!this.state.show) return null;
    let modalStyle; let
      containerStyle;
    // completely overwrite if they use a class
    if (this.props.className) {
      modalStyle = this.props.style;
      containerStyle = this.props.containerStyle;
    } else {
      modalStyle = { ...styles.modal, ...this.props.style };
      containerStyle = { ...styles.container, ...this.props.containerStyle };
    }
    if (this.props.transitionSpeed) modalStyle = { ...this.state, ...modalStyle };

    return (
      <div {..._filteredProps(this.props)} style={modalStyle} onClick={this.hideOnOuterClick} data-modal="true">
        <div className={this.props.containerClassName} style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const _filteredProps = (props) => {
  const filtered = { ...props };
  [
    'containerStyle',
    'containerClassName',
    'closeOnOuterClick',
    'show',
    'onClose',
    'transitionSpeed',
  ].map((p) => {
    delete filtered[p];
  });
  return filtered;
};

// todo - do this with css classes
const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    zIndex: 99999,
    transition: 'opacity 0.5s ease-in',
    pointerEvents: 'auto',
    overflowY: 'auto',
  },
  container: {
    width: '400px',
    position: 'relative',
    margin: '20% auto',
    padding: '5px 20px 13px 20px',
    background: '#fff',
  },
};
