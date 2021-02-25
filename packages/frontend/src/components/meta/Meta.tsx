import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type IMeta = {
  description?: string;
  title?: string;
  icon?: string;
  image?: string;
};

const Meta = ({
  description,
  icon,
  image,
  title,
}: IMeta): React.ReactElement => {
  const router = useRouter();
  const { asPath } = router;
  const baseURL = 'https://liferay.com';
  const url = `${baseURL}${asPath}`;

  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="twitter:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="twitter:card" content="summary_large_image" />

      {title && (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          <meta property="twitter:title" content={title} />
        </>
      )}

      {description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
          <meta property="twitter:description" content={description} />
        </>
      )}

      {icon && <link rel="shortcut icon" href={icon} />}

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="twitter:image" content={image} />
        </>
      )}
    </Head>
  );
};

export default Meta;
