import { matchPath } from "./matchPath";

test("basic", () => {
    const url = "/user/2/details";
    const options = {
        path: "/user/:id",
        exact: false,
        sensitive: false,
        strict: false,
    };

    interface Params {
        id: string;
    }

    const res = matchPath<Params>(url, options);

    expect(res.path).toBe("/user/:id");
    expect(res.params.id).toBeDefined;
    expect(res.params.id).toBe("2");
    expect(res.isExact).toBe(false);
    expect(res.matchedURL).toBe("/user/2");
});

test("exact", () => {
    const path = "/user/2/details";
    const options = {
        path: "/user/:id",
        exact: true,
        sensitive: false,
        strict: false,
    };

    interface Params {
        id: string;
    }

    const res = matchPath<Params>(path, options);

    expect(res).toBeNull;
});
