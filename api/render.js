import { compressToEncodedURIComponent } from 'lz-string';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST is allowed' });
  }

  const { diagram } = req.body;
  if (!diagram) {
    return res.status(400).json({ error: 'Missing \"diagram\" field' });
  }

  try {
    const encoded = compressToEncodedURIComponent(diagram);
    const url = `https://mermaid.ink/img/${encoded}`;
    res.status(200).json({ url });
  } catch (err) {
    res.status(500).json({ error: 'Encoding failed', details: err.message });
  }
}

