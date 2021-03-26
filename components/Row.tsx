import Link from 'next/link';
import React from 'react';
import RowLoading from './RowLoading';

const Row = (props: Props) => {
  const { height, children, href, active, loading, baseHrefOverride } = props;

  return (
    <div className="relisten-row" style={{ minHeight: height }} {...props}>
      <style jsx global>{`
      .relisten-row {
        min-height: 34px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid #F1F1F1;
      }

      .relisten-row > .content {
        flex: 1;
        width: 100%;
        padding: 4px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        position: relative;
      }

      .relisten-row > .content.active:after {
        content: "";
        width: 8px;
        height: 100%;
        background: #333;
        position: absolute;
        left: 0;
        top: 0;
      }

      .relisten-row > .content > div {
        align-self: stretch;
        display: flex;
        padding: 0 2px;
        justify-content: space-around;
        flex-direction: column;
      }

      .relisten-row > .content .subtext, .relisten-row > .content > div:nth-child(2) {
        color: #979797;
        font-size: 0.7em;
      }

      .relisten-row > .content.active > div:nth-child(1) {
        padding-left: 12px;
      }

      .relisten-row > .content > div:nth-child(2) {
        text-align: right;
        min-width: 20%;
      }

    `}</style>
      {loading && <RowLoading />}
      {href || baseHrefOverride ?
        <Link href={baseHrefOverride ?? '/'} as={href}><a className={`${active ? 'active' : ''} content`}>{children}</a></Link>
        :
        children ?
          <div className={`content ${active ? 'active' : ''}`}>{children}</div>
          :
          null
      }
    </div>
  );
};

type Props = {
  height?: number,
  children?: any,
  href?: string,
  active?: any,
  loading?: any,
  baseHrefOverride?: string;
};

export default Row;