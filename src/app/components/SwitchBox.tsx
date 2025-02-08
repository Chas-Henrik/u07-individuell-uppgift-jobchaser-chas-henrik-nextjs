import { Switch } from "@/components/ui/switch"
import styles from './SwitchBox.module.css'
import { useContext } from 'react'
import { ThemeContext } from "@/layout";

type SwitchBoxProps = {
    status: string[];
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
};

function SwitchBox({status, checked, onCheckedChange}: SwitchBoxProps): JSX.Element {
    const darkTheme = useContext(ThemeContext);
    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
    };

    return (
        <article style={themeStyles} className={styles.switchBoxContainer}>
            <h2>{status[checked ? 1 : 0]}</h2>
            <Switch title={status[checked ? 1 : 0]} checked={checked} onCheckedChange={onCheckedChange} />
        </article>
    )
}

export default SwitchBox
