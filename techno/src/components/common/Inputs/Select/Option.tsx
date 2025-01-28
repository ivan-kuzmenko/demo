import React, {FC, JSX} from 'react';
import styles from "@/components/common/Inputs/Select/Select.module.scss";
import {OptionType, SelectOptionBase} from "@/lib/types";

interface OptionProps {
    option: OptionType;
    onOptionSelect: (option: OptionType) => void;
    handleClickOnBaseOption: (option: SelectOptionBase) => void;
}

export const Option: FC<OptionProps> = ({option, handleClickOnBaseOption}) => {

    // const handleClickToOption = (option: OptionType) => {
    //     if (option.type === 'inputs') {
    //
    //     }
    // }

    const getOptionByType = (option: OptionType): JSX.Element => {
        if ('inputs' in option) {
            return (
                <div className={styles.option}>
                    <div className="">{option.title}</div>
                    <div className={styles.inputs}>
                        {option.inputs.map((input, index) => {
                            return (
                                <div className={styles.inputWrapper} key={index}>
                                    <div className={styles.inputLabel}>{input.title}</div>
                                    <input className={styles.input} type="number" placeholder={input.placeholder}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }
        if ('buttons' in option) {
            return (
                <div className={styles.option}>
                    <div className={styles.label}>{option.title}</div>
                    <div className={styles.buttons}>
                        {option.buttons.map((btn, index) => {
                            return (
                                <div key={index} className={styles.button}>{btn.title}</div>
                            )
                        })}
                    </div>
                </div>
            )
        }
        if (option.type === 'base') {
            const clickHandler = (option: SelectOptionBase) => {
                handleClickOnBaseOption(option);
            }
            return (
                <div className={styles.option} onClick={() => clickHandler(option)}>
                    {option.title}
                </div>
            )
        }
        return <></>
    }

    return (
        <>
            {getOptionByType(option)}
        </>
    );
};

