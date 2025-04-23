import { compressToEncodedURIComponent } from 'lz-string/libs/lz-string';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Only POST allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { diagram } = await req.json();

    if (!diagram) {
      return new Response(JSON.stringify({ error: 'Missing "diagram" field' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const encoded = compressToEncodedURIComponent(diagram);
    const url = `https://mermaid.ink/img/${encoded}`;

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Failed to generate diagram', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
