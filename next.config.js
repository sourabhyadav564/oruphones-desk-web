const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';  
`
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "User-Agent",
            value:
              "/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/",
          },
        ],
        destination: "https://oru-phones-mobile-web.vercel.app/:path*",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      "zenrodevimages.s3.us-west-2.amazonaws.com",
      "zenrodevimages.s3-us-west-2.amazonaws.com",
      "zenrodeviceimages.s3.us-west-2.amazonaws.com",
      "www.mobiruindia.com",
      "mobiruecom.s3.us-west-2.amazonaws.com",
      "zenroecom.s3.us-west-2.amazonaws.com",
      "zenrodeviceimages.s3-us-west-2.amazonaws.com",
      "demo-bucket-c2c-001.s3.amazonaws.com",
    ],
  },
};
