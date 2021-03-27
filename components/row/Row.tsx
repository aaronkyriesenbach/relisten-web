import classnames from 'classnames';
import Link from 'next/link';
import React from 'react';
import RowLoading from '../RowLoading';
import styles from './Row.module.scss';

export default function Row(props: Props) {
  const { height, children, href, active, loading, baseHrefOverride } = props;

  return (
    <div className={styles['relisten-row']} style={{ minHeight: height }}>
      {loading && <RowLoading />}
      {href || baseHrefOverride ?
        <Link href={baseHrefOverride ?? '/'} as={href}>
          <a className={classnames('content', { active })}>
            {children}
          </a>
        </Link>
        :
        children ?
          <div className={classnames('content', { active })}>
            {children}
          </div>
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