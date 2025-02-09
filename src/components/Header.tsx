import styles from './Header.module.css'
import { useState, useContext } from "react";
import { ThemeContext } from "@/layout";
import SwitchBox from "@/components/SwitchBox"

type SwitchBoxProps = {
    children: React.ReactNode;
};

function Header({children}: SwitchBoxProps): JSX.Element {
    const [switchChecked, setSwitchChecked] = useState<boolean>(false);
    const {darkTheme, toggleTheme} = useContext(ThemeContext);

    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#fff',
        color: darkTheme ? '#fff' : '#333',
        boxShadow: darkTheme ? 'var(--primary-box-shadow-dark-theme)' : 'var(--primary-box-shadow-light-theme)'
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