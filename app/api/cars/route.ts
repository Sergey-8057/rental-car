import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../_utils/utils';
import { DEFAULT_LIMIT, DEFAULT_PAGE } from '@/constants/pagination';

export async function GET(request: NextRequest) {
  try {
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? DEFAULT_LIMIT);
    const page = Number(request.nextUrl.searchParams.get('page') ?? DEFAULT_PAGE);

    const res = await api('/cars', {
      params: { limit, page },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
