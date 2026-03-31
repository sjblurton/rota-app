import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => {
  return {
    initialiseSuperadminModule: vi.fn(),
  };
});

vi.mock("../modules/superadmin/routes/superadmin-router", () => ({
  initialiseSuperadminModule: mocks.initialiseSuperadminModule,
}));

import { initialiseModules } from "./initialise-modules";

describe("initialiseModules", () => {
  it("calls initialiseSuperadminModule", () => {
    initialiseModules();
    expect(mocks.initialiseSuperadminModule).toHaveBeenCalled();
  });
});
