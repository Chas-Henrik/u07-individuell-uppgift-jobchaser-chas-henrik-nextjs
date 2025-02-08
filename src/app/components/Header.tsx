import styles from './Header.module.css'
import { useState, useContext } from "react";
import SwitchBox from "@/components/SwitchBox"
import { ThemeContext, ThemeUpdateContext } from "@/layout";

type SwitchBoxProps = {
    children: React.ReactNode;
};

function Header({children}: SwitchBoxProps): JSX.Element {
    const [switchChecked, setSwitchChecked] = useState<boolean>(false);
    const darkTheme = useContext(ThemeContext);
    const toggleTheme = useContext(ThemeUpdateContext);

    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)',
    };

    const handleCheckedChange = (value: boolean) => {
        setSwitchChecked(value);
        toggleTheme();
    };

    return (
        <header style={themeStyles} className={styles.header}>
            {children}
            <SwitchBox status={["Dark/light-mode", "Dark/light-mode"]} checked={switchChecked} onCheckedChange={handleCheckedChange} />
        </header>
    )
}

export default Header