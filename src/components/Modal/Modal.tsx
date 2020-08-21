import React, { CSSProperties } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  displayName: string;
  isVisible: boolean;
  onClickOverlay?: Function;
  onOpenModal?: Function;
  mainStyle: CSSProperties;
  zIndex: number;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export default class Modal extends React.Component<Props> {
  _el: HTMLDivElement;

  static defaultProps = {
    mainStyle: { background: 'white', opacity: 0.7 },
    zIndex: 999,
  };

  constructor(props: Props) {
    super(props);
    this._el = document.createElement('div');
  }

  componentDidMount = () => {
    const { isVisible, onOpenModal } = this.props;
    isVisible && modalRoot.appendChild(this._el);
    onOpenModal && onOpenModal();
  };

  componentDidUpdate = (prevProps: Props) => {
    const { isVisible } = this.props;

    if (isVisible && !prevProps.isVisible) {
      modalRoot.appendChild(this._el);
    } else if (!isVisible && modalRoot.contains(this._el)) {
      modalRoot.removeChild(this._el);
    }
  };

  componentWillUnmount = () => {
    if (modalRoot.contains(this._el)) {
      modalRoot.removeChild(this._el);
    }
  };

  _renderContent = () => {
    const { children, onClickOverlay, mainStyle, zIndex } = this.props;
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: zIndex,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div>{children}</div>
        <div
          style={{
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            ...mainStyle,
          }}
          onClick={() => onClickOverlay && onClickOverlay()}
        />
      </div>
    );
  };

  render() {
    return ReactDOM.createPortal(this._renderContent(), this._el);
  }
}
