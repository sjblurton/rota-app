import { describe, expect, it } from "vitest";

import { SUPERADMIN_MESSAGES } from "../lib/constants/superadmin-messages";
import { openApiDocument } from "./openapi";

describe("openApiDocument", () => {
  it("includes expected top-level metadata and key paths", () => {
    expect(openApiDocument.openapi).toBe("3.0.3");
    expect(openApiDocument.info.title).toBe("Rota App API");
    expect(openApiDocument.paths).toHaveProperty(
      "/api/superadmin/organisations",
    );
    expect(openApiDocument.paths).toHaveProperty(
      "/api/superadmin/organisations/{organisation_id}",
    );
    expect(openApiDocument.paths).toHaveProperty(
      "/api/superadmin/organisations/{organisation_id}/managers/{manager_id}",
    );
    expect(openApiDocument.paths).toHaveProperty("/api/admin/staff");
    expect(openApiDocument.paths).toHaveProperty("/api/t/{token}");
    expect(openApiDocument.paths).toHaveProperty("/api/swaps/t/{token}");
  });

  it("documents superadmin organisation and manager maintenance routes", () => {
    const organisationPath =
      openApiDocument.paths["/api/superadmin/organisations/{organisation_id}"];
    const organisationManagerPath =
      openApiDocument.paths[
        "/api/superadmin/organisations/{organisation_id}/managers/{manager_id}"
      ];

    expect(organisationPath).toBeDefined();
    expect(organisationPath).toHaveProperty("patch");
    expect(organisationPath).not.toHaveProperty("delete");

    expect(organisationPath?.patch?.responses?.["409"]).toMatchObject({
      description: "Conflict — organisation with this name already exists",
      content: {
        "application/json": {
          example: {
            message: SUPERADMIN_MESSAGES.organisationAlreadyExists,
          },
        },
      },
    });

    expect(organisationManagerPath).toBeDefined();
    expect(organisationManagerPath).toHaveProperty("patch");
    expect(organisationManagerPath).not.toHaveProperty("delete");

    const managerCreatePath =
      openApiDocument.paths[
        "/api/superadmin/organisations/{organisation_id}/managers"
      ];

    expect(managerCreatePath).toBeDefined();
    expect(managerCreatePath).toHaveProperty("post");

    expect(managerCreatePath?.post?.responses?.["409"]).toMatchObject({
      description:
        "Conflict — organisation is inactive or an active manager already uses the email address",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ErrorResponse",
          },
          examples: {
            organisation_inactive: {
              value: { message: SUPERADMIN_MESSAGES.organisationInactive },
            },
            manager_email_conflict: {
              value: { message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists },
            },
          },
        },
      },
    });

    expect(
      managerCreatePath?.post?.responses?.["409"]?.content?.[
        "application/json"
      ],
    ).not.toHaveProperty("example");

    expect(organisationManagerPath?.patch?.responses?.["409"]).toMatchObject({
      description:
        "Conflict — organisation is inactive or manager email conflicts with another active manager",
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/ErrorResponse",
          },
          examples: {
            organisation_inactive: {
              value: { message: SUPERADMIN_MESSAGES.organisationInactive },
            },
            manager_email_conflict: {
              value: { message: SUPERADMIN_MESSAGES.managerEmailAlreadyExists },
            },
          },
        },
      },
    });

    expect(
      organisationManagerPath?.patch?.responses?.["409"]?.content?.[
        "application/json"
      ],
    ).not.toHaveProperty("example");
  });

  it("includes manager lifecycle routes for staff and shifts", () => {
    const staffCollectionPath = openApiDocument.paths["/api/admin/staff"];
    const staffItemPath = openApiDocument.paths["/api/admin/staff/{staff_id}"];
    const shiftsCollectionPath = openApiDocument.paths["/api/admin/shifts"];
    const shiftsItemPath =
      openApiDocument.paths["/api/admin/shifts/{shift_id}"];

    expect(staffCollectionPath).toBeDefined();
    expect(staffCollectionPath).toHaveProperty("get");
    expect(staffCollectionPath).toHaveProperty("post");

    expect(staffItemPath).toBeDefined();
    expect(staffItemPath).toHaveProperty("get");
    expect(staffItemPath).toHaveProperty("patch");
    expect(staffItemPath).toHaveProperty("delete");

    expect(shiftsCollectionPath).toBeDefined();
    expect(shiftsCollectionPath).toHaveProperty("get");
    expect(shiftsCollectionPath).toHaveProperty("post");

    expect(shiftsItemPath).toBeDefined();
    expect(shiftsItemPath).toHaveProperty("get");
    expect(shiftsItemPath).toHaveProperty("patch");
    expect(shiftsItemPath).toHaveProperty("delete");
  });

  it("documents the decision-based swap flow", () => {
    const targetStaffSwapPatch =
      openApiDocument.paths["/api/swaps/t/{token}"]?.patch;
    const managerSwapPatch =
      openApiDocument.paths["/api/admin/swaps/{swap_id}"]?.patch;
    const swapRequestSchema = openApiDocument.components.schemas.SwapRequest;

    expect(targetStaffSwapPatch).toMatchObject({
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                decision: {
                  enum: ["accept", "reject"],
                },
              },
              required: ["decision"],
            },
          },
        },
      },
    });

    expect(managerSwapPatch).toMatchObject({
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                decision: {
                  enum: ["approve", "reject"],
                },
              },
              required: ["decision"],
            },
          },
        },
      },
      responses: {
        "409": {
          description:
            "Conflict — request conflicts with the current workflow state",
        },
      },
    });

    expect(targetStaffSwapPatch).toMatchObject({
      responses: {
        "409": {
          description:
            "Conflict — request conflicts with the current workflow state",
        },
      },
    });

    expect(swapRequestSchema).toMatchObject({
      properties: {
        status: {
          enum: [
            "awaiting_target_response",
            "awaiting_manager_approval",
            "approved",
            "rejected_by_target",
            "rejected_by_manager",
            "expired",
          ],
        },
      },
    });
  });

  it("documents manager auth on admin routes and keeps shift status backend-owned", () => {
    const createShiftRequestBody = openApiDocument.paths["/api/admin/shifts"]
      ?.post?.requestBody as
      | { content?: Record<string, { schema?: unknown }> }
      | undefined;
    const updateShiftRequestBody = openApiDocument.paths[
      "/api/admin/shifts/{shift_id}"
    ]?.patch?.requestBody as
      | { content?: Record<string, { schema?: unknown }> }
      | undefined;

    const createShiftSchema =
      createShiftRequestBody?.content?.["application/json"]?.schema;
    const updateShiftSchema =
      updateShiftRequestBody?.content?.["application/json"]?.schema;
    const adminSwapPatch =
      openApiDocument.paths["/api/admin/swaps/{swap_id}"]?.patch;

    expect(createShiftSchema).toBeDefined();
    expect(createShiftSchema).not.toHaveProperty("properties.status");

    expect(updateShiftSchema).toBeDefined();
    expect(updateShiftSchema).not.toHaveProperty("properties.status");

    expect(adminSwapPatch).toMatchObject({
      security: [{ ManagerAuth: [] }],
    });
  });

  it("merges schema components and security schemes", () => {
    expect(openApiDocument.components.schemas).toHaveProperty("Staff");
    expect(openApiDocument.components.schemas).toHaveProperty(
      "PaginationMetadata",
    );
    expect(openApiDocument.components.securitySchemes).toHaveProperty(
      "SuperadminKey",
    );
    expect(openApiDocument.components.securitySchemes).toHaveProperty(
      "ManagerAuth",
    );

    const superadminKey =
      openApiDocument.components.securitySchemes.SuperadminKey;
    expect(superadminKey).toMatchObject({
      type: "apiKey",
      in: "header",
      name: "X-Superadmin-Key",
    });
  });
});
