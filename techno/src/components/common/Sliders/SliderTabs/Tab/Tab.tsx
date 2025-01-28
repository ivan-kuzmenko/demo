'use client'

import Link from 'next/link'
import styles from './Tab.module.scss'
import { FC, useMemo } from 'react'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { cutName } from '@/lib/utils';

interface TabProps {
  url: string;
  name: string;
}

export const Tab:FC<TabProps> = ({
  url,
  name,
}) => {
  const pathname = usePathname();

  const tabClasses = clsx(styles.tab, {
    [styles.active]: pathname === url,
  })

  const shortName = useMemo(() => cutName(name), [name])

  return (
    <Link href={url} className={tabClasses}>
      <span className={styles.tabLabel}>{shortName}</span>
    </Link>
  )
}