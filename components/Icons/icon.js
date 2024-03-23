// components/Icons.js

import {
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaArtstation,
} from "react-icons/fa";

const Icon = ({ name }) => {
  switch (name) {
    case "twitter":
      return <FaTwitter />;
    case "youtube":
      return <FaYoutube />;
    case "discord":
      return <FaDiscord />;
    case "artstation":
      return <FaArtstation />;
    default:
      return null;
  }
};

export default Icon;
