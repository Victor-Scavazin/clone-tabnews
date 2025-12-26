import styles from "styles/hero.module.css";
import Image from "next/image";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1>Victor Scavazin</h1>
      <Image
        src="/profile_picture.jpg"
        alt="Foto de Victor"
        width={182.4}
        height={273.6}
        className={styles.avatar}
      />
      <p>Software Engineer.</p>
    </section>
  );
}
