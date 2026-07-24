import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      message: "Submissions sync endpoint not implemented",
    },
    { status: 501 }
  );
}
