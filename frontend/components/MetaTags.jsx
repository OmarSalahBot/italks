import React from 'react';
import { Helmet } from "react-helmet-async";

const MetaTags = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="iTalks" />
        </Helmet>
    );
}

export default MetaTags;
