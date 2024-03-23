// components/profiles/Profiles.js

import { SOCIAL_LINKS } from "../../constants";
import { Icon } from "@/components/Icons";
import styles from "./Profiles.module.scss";

const Profiles = () => {
  // Filter the SOCIAL_LINKS to include only Discord, Twitter, YouTube, and ArtStation
  const filteredSocialLinks = SOCIAL_LINKS.filter(
    (link) =>
      link.name === "discord" ||
      link.name === "twitter" ||
      link.name === "youtube" ||
      link.name === "artstation"
  );

  return (
    <div className={styles.profile}>
      {filteredSocialLinks.map(({ name, url }) => (
        <a
          href={url}
          key={name}
          className="link"
          rel="noreferrer"
          target="_blank"
          aria-label={name}
        >
          <Icon name={name} />
        </a>
      ))}
    </div>
  );
};

export default Profiles;
