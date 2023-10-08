
import styles from "./SearchInputBox.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface props {
  searchIcon?: any;
  onChange: (e: any) => void;
  placeholder: string;
  inputType?: string;
  extraClassWrapper?: string;
  extraClassImg?: string;
  extraClassInput?: string;

}

export default function SearchInputBox(props: props) {
  return (
    <div className={`${styles.searchAreaDivLLP} ${props.extraClassWrapper} `}>
      <input
        type={props.inputType || "text"}
        className={`${props.extraClassInput}`}
        placeholder={props.placeholder}
        onChange={(e: any) => {
          props.onChange(e);
        }}
      />
      <div className={styles.imgIcon}> <FontAwesomeIcon icon={faSearch} /></div> 
    </div>
  );
}
