import Head from "next/head";
import { METADATA } from "../../constants";

const Meta = ({ children }) => {
  return (
    <>
      <Head>
        <title>{METADATA.title}</title>
        <meta name="description" content={METADATA.description} />
        <meta name="keywords" content={METADATA.keywords} />
        <meta name="robots" content="index,follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content={METADATA.language} />
        <meta name="author" content={METADATA.author} />
        <meta httpEquiv="content-language" content="en" />

        {/* Open Graph / Facebook */}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={METADATA.title} />
        <meta property="og:description" content={METADATA.description} />
        <meta property="og:image" content={METADATA.image} />
        <meta property="og:url" content={METADATA.siteUrl} />
        <meta property="og:site_name" content={METADATA.title} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={METADATA.title} />
        <meta property="twitter:description" content={METADATA.description} />
        <meta property="twitter:site" content={METADATA.twitterHandle} />
        <meta name="twitter:creator" content={METADATA.twitterHandle} />
        <meta property="twitter:url" content={METADATA.siteUrl} />
        <meta property="twitter:image" content={METADATA.image} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://media.discordapp.net/attachments/1220653365919223860/1221372803882811393/Trademark_white.png?ex=66125710&is=65ffe210&hm=4b630caf92c10d35ca4a0675f843221bedffa837e60b3c38915760dea888a15f&=&format=webp&quality=lossless&width=795&height=676"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://media.discordapp.net/attachments/1220653365919223860/1221372803882811393/Trademark_white.png?ex=66125710&is=65ffe210&hm=4b630caf92c10d35ca4a0675f843221bedffa837e60b3c38915760dea888a15f&=&format=webp&quality=lossless&width=795&height=676"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://media.discordapp.net/attachments/1220653365919223860/1221372803882811393/Trademark_white.png?ex=66125710&is=65ffe210&hm=4b630caf92c10d35ca4a0675f843221bedffa837e60b3c38915760dea888a15f&=&format=webp&quality=lossless&width=795&height=676"
        />
        <meta name="msapplication-TileColor" content="#FFD900" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {children}
    </>
  );
};

export default Meta;
