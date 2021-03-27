import classnames from 'classnames';
import React, { useEffect } from 'react';
import Row from '../row/Row';
import styles from './Column.module.scss';

export default function Column(props: Props) {
  const { loadingAmount = 20, className, heading, loading, children } = props;

  useEffect(() => {
    Array.prototype.forEach.call(document.querySelectorAll('.column .active'), activeRow => {
      activeRow.scrollIntoView({
        block: 'center',
      });
    });
  }, []);

  return (
    <div className={classnames(className, styles.column)}>
      {heading && <div className={styles.heading}>{heading}</div>}
      <div className={styles['column-content']}>
        {loading ?
          new Array(loadingAmount).fill(null).map((i, idx) => <Row key={idx} loading />)
          :
          children}
      </div>
    </div>
  );
}

type Props = {
  loadingAmount?: number,
  className?: string,
  heading?: string,
  loading?: boolean,
  children?: any;
};