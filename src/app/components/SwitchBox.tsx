import { Switch } from "@/components/ui/switch"
import styles from './SwitchBox.module.css'

type SwitchBoxProps = {
    status: string[];
    checked: boolean;
    onCheckedChange: (value: boolean) => void;
};

function SwitchBox({status, checked, onCheckedChange}: SwitchBoxProps): JSX.Element {

    return (
        <article className={styles.switchBoxContainer}>
            <h2>{status[checked ? 1 : 0]}</h2>
            <Switch title={status[checked ? 1 : 0]} checked={checked} onCheckedChange={onCheckedChange} />
        </article>
    )
}

export default SwitchBox
