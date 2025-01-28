'use client';

import {HTMLAttributes, useEffect, useState} from 'react';
import styles from './Select.module.scss';
import arrow from '@/assets/svg/arrowWhite.svg'
import Image from "next/image";
import {OptionType} from "@/lib/types";
import clsx from "clsx";
import {Option} from "@/components/common/Inputs/Select/Option";

interface SelectProps extends HTMLAttributes<HTMLDivElement>  {
    onOptionSelect(option: OptionType): void;
    setIsBackdropShow(boolean: boolean): void;
    isBackdropShow: boolean;
    label: string;
    options: OptionType[];
}

export const Select = ({
    label,
    options,
    setIsBackdropShow,
    isBackdropShow,
    onOptionSelect
}: SelectProps) => {

    const [activeOption, setActiveOption] = useState<OptionType>(options[0])
    const [isOptionsShow, setIsOptionsShow] = useState<boolean>(false);

    useEffect(() => {
        if (!isBackdropShow) setIsOptionsShow(false);
    }, [isBackdropShow]);

    const clickOnSelect = () => {
        setIsBackdropShow(true);
        setIsOptionsShow(true);
    }

    const handleClickOnBaseOption = (option: OptionType) => {
        setActiveOption(option);
        setIsOptionsShow(false);
        setIsBackdropShow(false);
    }

    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>
            <div className={styles.selectWrapper} onClick={() => {clickOnSelect()}}>
                <div className={styles.select}>{activeOption.title}</div>
                <div className={clsx(styles.arrowWrapper, {
                    [styles.arrowWrapperActive]: isOptionsShow
                })}>
                    <Image className={styles.arrow} src={arrow} alt={'Стрелочка'}/>
                </div>
            </div>
            <div className={clsx(styles.options, {
                [styles.optionsActive]: isOptionsShow
            })}>
                {options.map((option, index) => {
                    return (
                        <Option
                            onOptionSelect={onOptionSelect}
                            key={index}
                            option={option}
                            handleClickOnBaseOption={handleClickOnBaseOption}
                        />
                    )
                })}
            </div>
        </div>
    );
};