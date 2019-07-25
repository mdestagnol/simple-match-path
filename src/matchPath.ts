// Original code on https://github.com/ReactTraining/react-router (MIT License)
// Extracted and ported to Typescript by Martin Destagnol

import pathToRegexp from "path-to-regexp";

const cache = {};
const cacheLimit = 10000;
let cacheCount = 0;

export interface MatchPathOptions {
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}

export interface Match<Params extends { [K in keyof Params]?: string } = {}> {
    params: Params;
    isExact: boolean;
    path: string;
    url: string;
}

/**
 * Public API for matching a URL pathname to a path.
 */
export function matchPath<Params extends { [K in keyof Params]?: string } = {}>(
    pathname: string,
    options: string | MatchPathOptions = {},
): Match<Params> | null {
    if (typeof options === "string" || Array.isArray(options)) {
        options = { path: options };
    }

    const { path, exact = false, strict = false, sensitive = false } = options;

    const paths: string[] = [].concat(path);

    return paths.reduce((matched: Match<Params>, path: string) => {
        if (!path) {
            return null;
        }
        if (matched) {
            return matched;
        }

        const { regexp, keys } = compilePath(path, {
            end: exact,
            strict,
            sensitive,
        });
        const match = regexp.exec(pathname);

        if (!match) {
            return null;
        }

        const [url, ...values] = match;
        const isExact = pathname === url;

        if (exact && !isExact) {
            return null;
        }

        const u: string = path === "/" && url === "" ? "/" : url;
        const p = keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
        }, {});

        return {
            path, // the path used to match
            url: u, // the matched portion of the URL
            isExact, // whether or not we matched exactly
            params: p as Params,
        };
    }, null);
}

interface CompilePathOptions {
    end?: boolean;
    strict?: boolean;
    sensitive?: boolean;
}

function compilePath(
    path: string,
    options: CompilePathOptions = {},
): {
    regexp: RegExp;
    keys: pathToRegexp.Key[];
} {
    const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
    const pathCache = cache[cacheKey] || (cache[cacheKey] = {});

    if (pathCache[path]) {
        return pathCache[path];
    }

    const keys: pathToRegexp.Key[] = [];
    const regexp = pathToRegexp(path, keys, options);
    const result = { regexp, keys };

    if (cacheCount < cacheLimit) {
        pathCache[path] = result;
        cacheCount++;
    }

    return result;
}

export default matchPath;
