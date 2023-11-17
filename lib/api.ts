import { NextResponse } from "next/server";

export const RESPONSE = {
  UNAUTHOZED: new NextResponse("Unauthorized", { status: 401 }),
  INTERNAL_SERVER_ERROR: new NextResponse("Internal Server Error", {
    status: 500,
  }),
};
