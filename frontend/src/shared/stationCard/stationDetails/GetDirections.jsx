import styles from "./styles/GetDirections.module.css";
import { useNavigate } from "react-router-dom";

export default function GetDirections({ station }) {
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.stopPropagation();
    console.log("🤔 Is the station being passed??:", station);
    navigate("/directions", { state: { station } });
  };
  return (
    <main className={styles.getDirections}>
      <button onClick={handleClick}>
        <h5>Get Directions</h5>
        <img src="/assets/icons/misc/NextButton.png" alt="" />
      </button>
    </main>
  );
}
