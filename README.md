# matchpath

matchpath checks whether one or multiple paths (ex. \"/user/:id\") match with a specified URL (ex. \"/user/2\"), and tells how it matched.

Based on matchPath function in https://github.com/ReactTraining/react-router (MIT License)

Extracted and ported to Typescript by Martin Destagnol

## How to install?

```bash
npm i matchpath
```

## How to use it?

```ts
import { matchPath } from "matchpath";

const options = {
    path: "/user/:id",
    exact: false,
    sensitive: false,
    strict: true
};

const url = "/user/2/details";

interface Params {
    id: string;
}

const res = matchPath<Params>(url, options);
console.log(res);

/*res returns:
{
  params: {
    id: "2",
  },
  isExact: true,
  path: "/user/:id",
  matchedURL: "/user/2",
}
*/
```

## Params

-   **url**: The url you want to compare against your paths
-   **options**:
    -   path (_string or string[]_): one or more paths to try to match it against (ex: ["/user/:id", "/home"] )
    -   exact (_boolean_): if false, both "/user/2" and "/user/2/details" will match. If true, only "/user/2" will match.
    -   sensitive (_boolean_): if false, "/USER/2" will match "/user/:id", but won't if true.
    -   strict (_boolean_): When true, a path that has a trailing slash will only match a route with a trailing slash. This has no effect when there are additional URL segments in the route

## Result

-   **params**: an array of params extracted from the URL based on the path.
-   **isExact**: whether the match was exact or not
-   **path**: what path matched (useful if you pass more than one path)
-   **matchedURL**: the part of the url that matched.
