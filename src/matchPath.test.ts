import { Match, matchPath, MatchPathOptions } from "./matchPath";

test("basic test", () => {
    const path = "user/2";
    const options: MatchPathOptions = {
        path: "user/:id",
        exact: true,
        sensitive: false,
        strict: true,
    };

    interface Params {
        id: string;
    }

    const res: Match<Params> = matchPath<Params>(path, options);

    expect(res.path).toBe("user/:id");
    expect(res.params.id).toBeDefined;
    expect(res.params.id).toBe("2");
    expect(res.isExact).toBe(true);
    expect(res.url).toBe("user/2");
});
