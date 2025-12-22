import { SERVER_URL } from "@/lib/serverUrl";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const next = req.nextUrl.searchParams.get("next");
  const response = await fetch(
    `${SERVER_URL}/todo${next ? `?cursor=${next}` : ''}`,
    {
      method: "GET",
    }
  );
  if (response.ok) {
    const { data, cursor } = await response.json();
    return NextResponse.json(
      { data: data, next: cursor },
      { status: response.status }
    );
  } else
    return NextResponse.json(
      { error: "Unexpected Error" },
      { status: response.status }
    );
}
