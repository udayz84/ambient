import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("strapi", "max");
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");
  return NextResponse.json({ revalidated: true });
}
