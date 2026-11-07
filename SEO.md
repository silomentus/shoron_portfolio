# Search setup after deployment

The default production address is https://shoron.vercel.app. The site generates
a canonical link, robots.txt, sitemap.xml, and WebSite/ProfilePage/Person JSON-LD.

1. Deploy the changes to the existing Vercel project.
2. Add `https://shoron.vercel.app/` as a URL-prefix property in Google Search Console.
3. Choose HTML tag verification. Copy only the tag's `content` value into the
   Vercel production environment variable `GOOGLE_SITE_VERIFICATION`, redeploy,
   then click Verify in Search Console. Never put an account password here.
4. Submit `sitemap.xml` in Search Console's Sitemaps screen.
5. Inspect the homepage URL, run the live test, and request indexing.
6. Link this portfolio from your GitHub and LinkedIn profiles. Use the same
   full name and nickname consistently across those profiles.
7. Monitor indexing and search queries in Search Console. Publish original
   project case studies with useful technical details when available.

If moving to a custom domain, set `SITE_URL` to its HTTPS origin in Vercel,
redeploy, and redirect the old address to the new primary domain. Verify the
new property and submit its sitemap. Do not use a temporary preview URL as SITE_URL.

These settings help discovery and identity matching; they do not guarantee
indexing or a particular ranking. Search Console verification and submission
must be completed in the site owner's Google account.
