import { NextResponse } from 'next/server';
import { getAddress, Oracle } from '@chopinframework/next';
import { query } from '../../lib/db';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const address = await getAddress();
    if (!address) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const timestamp = await Oracle.now();
    const notarizationResult = await Oracle.notarize(() => content);

    const result = await query(
      'INSERT INTO notes (user_address, content, timestamp, notarization_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [address, content, timestamp, notarizationResult.id]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error saving note:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const address = await getAddress();
    if (!address) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const result = await query('SELECT * FROM notes WHERE user_address = $1', [address]);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}