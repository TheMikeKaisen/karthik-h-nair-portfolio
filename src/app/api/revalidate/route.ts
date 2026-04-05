import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: string | { current: string };
    }>(req, process.env.SANITY_REVALIDATE_SECRET);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      return new NextResponse(JSON.stringify({ message, isValidSignature }), {
        status: 401,
      });
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 });
    }

    // Logic: Determine which tags to refresh based on the document type
    const tags: string[] = [];

    if (body._type === 'article' || body._type === 'devLog') {
      tags.push('garden');
    }

    if (body._type === 'project') {
      tags.push('projects');
    }

    if (body._type === 'experience' || body._type === 'education' || body._type === 'skill' || body._type === 'activity' || body._type === 'activityMetric') {
      tags.push(body._type === 'activityMetric' ? 'heatmap' : 'professional-core');
    }

    // Always revalidate the 'all' tag if you want a global fallback
    tags.push('all');

    // Perform the revalidation
    tags.forEach((tag) => {
      // Bypassing TS mismatch for revalidateTag in this specific @types environment
      (revalidateTag as any)(tag);
      console.log(`[Revalidate] Tag: ${tag}`);
    });

    return NextResponse.json({
      revalidated: true,
      tags,
      now: Date.now(),
    });
  } catch (err: any) {
    console.error(err);
    return new NextResponse(err.message, { status: 500 });
  }
}
