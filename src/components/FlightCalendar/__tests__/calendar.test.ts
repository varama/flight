import { getDate } from "utils/getDate";

describe("parseDate", () => {
  it("Returns changed date style", () => {
    const result = getDate(
      "Sun Jan 12 2025 18:39:28 GMT+0400 (Georgia Standard Time)"
    );
    expect(result).toEqual("2025-01-12");
  });
});
