/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    "headers": [
        {
            "source": "/(.*)",
            "headers" : [
                {
                    "key" : "Cache-Control",
                    "value" : "public, s-maxage=10, stale-while-revalidate=59"
                }
            ]
        }
    ]
}
  
module.exports = nextConfig
