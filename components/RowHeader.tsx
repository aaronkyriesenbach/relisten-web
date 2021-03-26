import React from 'react';

const RowHeader = (props: Props) => {
  const { height, children } = props || {};

  return (
    <div className="header" style={{ minHeight: children ? height : 16 }}>
      <style jsx>{`
      .header {
        min-height: 24px;
        background: #F0EFF4;
        display: flex;
        color: #696969;
        font-size: 0.7em;
        padding: 0 4px;
        align-items: center;
      }
    `}</style>
      <div>{children}</div>
    </div>
  );
};

type Props = {
  height?: number,
  children?: any;
};

export default RowHeader;