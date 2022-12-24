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
        destination: "https://mobile.oruphones.com/:path*",
        permanent: false,
      },
    ];
  },
  images: {
    domains: [
      "zenrodevimages.s3.us-west-2.amazonaws.com",
      "zenrodevimages.s3.us-west-2.amazonaws.com",
      "zenrodevimages.s3.us-west-2.amazonaws.com",
    "zenrodevimages.s3-us-west-2.amazonaws.com",
      "zenrodeviceimages.s3.us-west-2.amazonaws.com",
      "www.mobiruindia.com",
      "www.oruphones.com",
      "mobiruecom.s3.us-west-2.amazonaws.com",
      "zenroecom.s3.us-west-2.amazonaws.com",
      "zenrodeviceimages.s3-us-west-2.amazonaws.com",
      "demo-bucket-c2c-001.s3.amazonaws.com",
      "d1tl44nezj10jx.cloudfront.net"
    ],
  },
};
