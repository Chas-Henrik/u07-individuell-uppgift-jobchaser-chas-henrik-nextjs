'use client'

import styles from './SwitchBox.module.css';
import { useContext } from 'react';
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion"
import { ThemeContext } from "@/context/themeContext";

type SwitchBoxProps = {
    status: string[];
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
};

function SwitchBox({status, checked, onCheckedChange}: SwitchBoxProps): React.JSX.Element {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeContext is undefined");
    }
    const { darkTheme } = themeContext;
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333'
    };

    return (
        <motion.article whileHover={{ scale: 1.2}} style={themeStyles} className={styles.switchBoxContainer}>
            <h2>{status[checked ? 1 : 0]}</h2>
            <Switch title={status[checked ? 1 : 0]} checked={checked} onCheckedChange={onCheckedChange} />
        </motion.article>
    )
}

export default SwitchBox
